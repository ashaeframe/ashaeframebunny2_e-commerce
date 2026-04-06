const express = require('express');
const Customer = require('../models/Customer');
const Order = require('../models/Order');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all customers (admin only)
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;
    const customers = await Customer.find(filter)
      .populate('userId', 'name email phone')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Customer.countDocuments(filter);

    res.json({
      customers,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get customers error:', error);
    res.status(500).json({ error: 'Server error fetching customers' });
  }
});

// Get customer by ID (admin only)
router.get('/:id', verifyAdmin, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate('userId', 'name email phone');

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Get customer orders
    const orders = await Order.find({ userId: customer.userId }).sort({ createdAt: -1 });

    res.json({
      customer,
      orders,
    });
  } catch (error) {
    console.error('Get customer error:', error);
    res.status(500).json({ error: 'Server error fetching customer' });
  }
});

// Update customer (admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { firstName, lastName, phone, address, city, country, zipCode, status, loyaltyPoints } = req.body;

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, phone, address, city, country, zipCode, status, loyaltyPoints },
      { new: true }
    ).populate('userId', 'name email');

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json({
      message: 'Customer updated successfully',
      customer,
    });
  } catch (error) {
    console.error('Update customer error:', error);
    res.status(500).json({ error: 'Server error updating customer' });
  }
});

// Get customer statistics
router.get('/stats/summary', verifyAdmin, async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    const activeCustomers = await Customer.countDocuments({ status: 'Active' });
    const totalSpent = await Customer.aggregate([
      { $group: { _id: null, total: { $sum: '$totalSpent' } } },
    ]);

    const topCustomers = await Customer.find()
      .populate('userId', 'name email')
      .sort({ totalSpent: -1 })
      .limit(5);

    res.json({
      totalCustomers,
      activeCustomers,
      totalSpent: totalSpent[0]?.total || 0,
      topCustomers,
    });
  } catch (error) {
    console.error('Get customer stats error:', error);
    res.status(500).json({ error: 'Server error fetching statistics' });
  }
});

module.exports = router;
