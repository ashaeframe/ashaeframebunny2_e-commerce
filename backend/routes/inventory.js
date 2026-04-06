const express = require('express');
const Inventory = require('../models/Inventory');
const Product = require('../models/Product');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all inventory
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;
    const inventory = await Inventory.find(filter)
      .populate('productId', 'name price')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ updatedAt: -1 });

    const total = await Inventory.countDocuments(filter);

    res.json({
      inventory,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get inventory error:', error);
    res.status(500).json({ error: 'Server error fetching inventory' });
  }
});

// Get inventory item
router.get('/:id', verifyAdmin, async (req, res) => {
  try {
    const inventoryItem = await Inventory.findById(req.params.id).populate('productId');

    if (!inventoryItem) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }

    res.json(inventoryItem);
  } catch (error) {
    console.error('Get inventory item error:', error);
    res.status(500).json({ error: 'Server error fetching inventory item' });
  }
});

// Update inventory stock
router.put('/:id/stock', verifyAdmin, async (req, res) => {
  try {
    const { currentStock, reorderQuantity } = req.body;

    const inventoryItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      {
        currentStock,
        reorderQuantity,
        status:
          currentStock === 0
            ? 'Out of Stock'
            : currentStock <= (req.body.reorderLevel || inventoryItem.reorderLevel)
            ? 'Low Stock'
            : 'In Stock',
      },
      { new: true }
    ).populate('productId');

    if (!inventoryItem) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }

    // Update product stock
    await Product.findByIdAndUpdate(inventoryItem.productId._id, {
      stock: currentStock,
    });

    res.json({
      message: 'Inventory updated successfully',
      inventory: inventoryItem,
    });
  } catch (error) {
    console.error('Update inventory error:', error);
    res.status(500).json({ error: 'Server error updating inventory' });
  }
});

// Get low stock items
router.get('/items/low-stock', verifyAdmin, async (req, res) => {
  try {
    const lowStockItems = await Inventory.find({ status: 'Low Stock' })
      .populate('productId', 'name price')
      .sort({ currentStock: 1 });

    res.json(lowStockItems);
  } catch (error) {
    console.error('Get low stock error:', error);
    res.status(500).json({ error: 'Server error fetching low stock items' });
  }
});

// Get inventory statistics
router.get('/stats/summary', verifyAdmin, async (req, res) => {
  try {
    const totalItems = await Inventory.countDocuments();
    const outOfStock = await Inventory.countDocuments({ status: 'Out of Stock' });
    const lowStock = await Inventory.countDocuments({ status: 'Low Stock' });
    const inStock = await Inventory.countDocuments({ status: 'In Stock' });

    const totalStockValue = await Inventory.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ['$currentStock', '$product.price'] } },
        },
      },
    ]);

    const topSoldProducts = await Inventory.find()
      .populate('productId', 'name price')
      .sort({ soldCount: -1 })
      .limit(5);

    res.json({
      totalItems,
      outOfStock,
      lowStock,
      inStock,
      totalStockValue: totalStockValue[0]?.total || 0,
      topSoldProducts,
    });
  } catch (error) {
    console.error('Get inventory stats error:', error);
    res.status(500).json({ error: 'Server error fetching statistics' });
  }
});

module.exports = router;
