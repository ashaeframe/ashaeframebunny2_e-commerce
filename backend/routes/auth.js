const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Customer = require('../models/Customer');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    let { name, email, password, phone } = req.body;

    // Normalize inputs
    name = name ? name.trim() : '';
    email = email ? email.toLowerCase().trim() : '';

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      role: 'customer',
      isActive: true,
    });

    await user.save();

    // Create customer profile
    const customer = new Customer({
      userId: user._id,
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[1] || '',
      email,
      phone: phone || '',
    });

    await customer.save();

    // Create JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    const resp = { error: 'Server error during registration' };
    if (process.env.NODE_ENV !== 'production') resp.details = error.message;
    res.status(500).json(resp);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email ? email.toLowerCase().trim() : '';

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user (case-insensitive email match)
    const user = await User.findOne({ email });
    if (!user) {
      const msg = process.env.NODE_ENV === 'production' ? 'Invalid credentials' : 'User not found';
      return res.status(401).json({ error: msg });
    }
    // Check password field exists
      if (!user.password || typeof user.password !== 'string') {
      console.error('Login error: user password is missing or invalid for', email);
      return res.status(500).json({ error: 'Account data is invalid. Please register again.' });
      }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const msg = process.env.NODE_ENV === 'production' ? 'Invalid credentials' : 'Invalid password';
      return res.status(401).json({ error: msg });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ error: 'Account is inactive' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    const resp = { error: 'Server error during login' };
    if (process.env.NODE_ENV !== 'production') resp.details = error.message;
    res.status(500).json(resp);
  }
});

// Get current user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const customer = await Customer.findOne({ userId: req.userId });

    res.json({
      user,
      customer,
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Server error fetching profile' });
  }
});

// Logout (frontend should delete token)
router.post('/logout', verifyToken, (req, res) => {
  res.json({ message: 'Logout successful' });
});

// Update profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { name, phone, address, city, country, zipCode } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name: name || undefined, phone: phone || undefined },
      { new: true }
    ).select('-password');

    const customer = await Customer.findOneAndUpdate(
      { userId: req.userId },
      { address, city, country, zipCode },
      { new: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user,
      customer,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error updating profile' });
  }
});

module.exports = router;
