const express = require('express');
const Order = require('../models/Order');
const Inventory = require('../models/Inventory');
const Customer = require('../models/Customer');
const Product = require('../models/Product');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// Create order
router.post('/', verifyToken, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart cannot be empty' });
    }

    // Calculate totals
    let totalAmount = 0;
    const tax = 5;
    const shippingCost = 10;

    for (const item of items) {
      totalAmount += item.price * item.quantity;
    }

    const grandTotal = totalAmount + tax + shippingCost;
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order
    const order = new Order({
      orderId,
      userId: req.userId,
      items,
      totalAmount,
      tax,
      shippingCost,
      grandTotal,
      shippingAddress,
      paymentMethod,
      status: 'Pending',
      paymentStatus: 'Pending',
    });

    await order.save();

    // Update inventory
    for (const item of items) {
      const inventory = await Inventory.findOneAndUpdate(
        { productId: item.productId },
        { $inc: { currentStock: -item.quantity, soldCount: item.quantity } },
        { new: true }
      );

      // Check if low stock
      if (inventory && inventory.currentStock <= inventory.reorderLevel) {
        await Inventory.findByIdAndUpdate(inventory._id, { status: 'Low Stock' });
      }
    }

    // Update customer record
    const customer = await Customer.findOneAndUpdate(
      { userId: req.userId },
      {
        $inc: { totalOrders: 1, totalSpent: grandTotal },
        lastOrderDate: new Date(),
      },
      { new: true }
    );

    res.status(201).json({
      message: 'Order created successfully',
      order,
      orderId: order.orderId,
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Server error creating order' });
  }
});

// Get all orders (admin)
router.get('/admin/all', verifyAdmin, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;
    const orders = await Order.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments(filter);

    res.json({
      orders,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ error: 'Server error fetching orders' });
  }
});

// Get user's orders
router.get('/user/my-orders', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ error: 'Server error fetching orders' });
  }
});

// Get single order
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'name email');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if user owns the order or is admin
    if (order.userId._id.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Server error fetching order' });
  }
});

// Update order status (admin only)
router.put('/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const order = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      message: 'Order status updated',
      order,
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ error: 'Server error updating order' });
  }
});

// Get order statistics
router.get('/stats/summary', verifyAdmin, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$grandTotal' } } },
    ]);

    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    res.json({
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      ordersByStatus,
    });
  } catch (error) {
    console.error('Get order stats error:', error);
    res.status(500).json({ error: 'Server error fetching statistics' });
  }
});

module.exports = router;
