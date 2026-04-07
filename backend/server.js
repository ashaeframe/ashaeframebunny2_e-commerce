require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB and optionally seed
(async () => {
  try {
    const conn = await connectDB();

    // Seed DB on startup in development if SEED_DB=true
    if (process.env.SEED_DB === 'true' || process.env.SEED_DB === '1') {
      try {
        const { seedDatabase } = require('./seed');
        console.log('🌱 SEED_DB enabled - running database seeder...');
        await seedDatabase();
        console.log('🌱 Seeder finished');
      } catch (err) {
        console.error('Seeder error:', err);
      }
    }
  } catch (err) {
    console.error('Failed to connect to DB before starting server:', err);
  }
})();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : true,
  credentials: true,
};
app.use(cors(corsOptions));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/inventory', require('./routes/inventory'));

// Dev-only admin routes (safe in development)
if (process.env.NODE_ENV !== 'production') {
  app.use('/api/admin', require('./routes/admin'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    status: err.status || 500,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Frontend connected to http://localhost:5173`);
});
