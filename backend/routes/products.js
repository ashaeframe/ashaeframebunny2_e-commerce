const express = require('express');
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    let filter = { status: 'Active' };

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;
    const products = await Product.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('reviews');

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Server error fetching products' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Server error fetching product' });
  }
});

// Create product (admin only)
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { name, category, description, price, stock, reorderLevel, image, status } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Name, price, and category are required' });
    }

    const product = new Product({
      name,
      category,
      description,
      price,
      stock: stock || 0,
      reorderLevel: reorderLevel || 10,
      image,
      status: status || 'Active',
      rating: 0,
      reviews: [],
    });

    await product.save();

    // Create inventory record
    const inventory = new Inventory({
      productId: product._id,
      currentStock: stock || 0,
      reorderLevel: reorderLevel || 10,
    });

    await inventory.save();

    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Server error creating product' });
  }
});

// Update product (admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { name, category, description, price, stock, reorderLevel, image, status, rating } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category, description, price, stock, reorderLevel, image, status, rating },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update inventory
    await Inventory.findOneAndUpdate(
      { productId: req.params.id },
      { currentStock: stock, reorderLevel: reorderLevel },
      { new: true }
    );

    res.json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Server error updating product' });
  }
});

// Delete product (admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete inventory record
    await Inventory.findOneAndDelete({ productId: req.params.id });

    res.json({
      message: 'Product deleted successfully',
      product,
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Server error deleting product' });
  }
});

// Get product categories
router.get('/categories/all', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Server error fetching categories' });
  }
});

module.exports = router;
