const express = require('express');
const Payment = require('../models/Payment');
const Order = require('../models/Order');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// Create payment
router.post('/', verifyToken, async (req, res) => {
  try {
    const { orderId, amount, paymentMethod, cardDetails } = req.body;

    if (!orderId || !amount || !paymentMethod) {
      return res.status(400).json({ error: 'Order ID, amount, and payment method are required' });
    }

    // Verify order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Verify amount matches
    if (amount !== order.grandTotal) {
      return res.status(400).json({ error: 'Amount mismatch' });
    }

    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Simulate payment processing
    const payment = new Payment({
      orderId,
      userId: req.userId,
      amount,
      paymentMethod,
      transactionId,
      status: 'Success', // In real app, integrate with payment gateway
      cardDetails: cardDetails || {},
    });

    await payment.save();

    // Update order payment status
    await Order.findByIdAndUpdate(orderId, { paymentStatus: 'Success', status: 'Processing' });

    res.status(201).json({
      message: 'Payment processed successfully',
      payment,
      transactionId,
    });
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({ error: 'Server error processing payment' });
  }
});

// Get all payments (admin)
router.get('/admin/all', verifyAdmin, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;
    const payments = await Payment.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('userId', 'name email')
      .populate('orderId', 'orderId')
      .sort({ createdAt: -1 });

    const total = await Payment.countDocuments(filter);

    res.json({
      payments,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({ error: 'Server error fetching payments' });
  }
});

// Get user's payments
router.get('/user/my-payments', verifyToken, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.userId })
      .populate('orderId', 'orderId')
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    console.error('Get user payments error:', error);
    res.status(500).json({ error: 'Server error fetching payments' });
  }
});

// Get payment statistics
router.get('/stats/summary', verifyAdmin, async (req, res) => {
  try {
    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'Success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const paymentsByMethod = await Payment.aggregate([
      { $group: { _id: '$paymentMethod', count: { $sum: 1 }, total: { $sum: '$amount' } } },
    ]);

    const successfulTransactions = await Payment.countDocuments({ status: 'Success' });
    const failedTransactions = await Payment.countDocuments({ status: 'Failed' });

    res.json({
      totalRevenue: totalRevenue[0]?.total || 0,
      paymentsByMethod,
      successfulTransactions,
      failedTransactions,
    });
  } catch (error) {
    console.error('Get payment stats error:', error);
    res.status(500).json({ error: 'Server error fetching statistics' });
  }
});

module.exports = router;
