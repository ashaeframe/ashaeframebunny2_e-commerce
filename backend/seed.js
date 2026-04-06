require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const Customer = require('./models/Customer');
const Inventory = require('./models/Inventory');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...');

    // If mongoose is not connected, connect with fallback (same logic as before)
    let createdConnection = false;
    if (mongoose.connection.readyState !== 1) {
      const { MongoMemoryServer } = require('mongodb-memory-server');

      const connectWithFallback = async () => {
        let mongoUri = process.env.MONGODB_URI;

        if (mongoUri) {
          try {
            await mongoose.connect(mongoUri, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            });
            console.log('✓ Connected to MongoDB');
            return;
          } catch (err) {
            console.warn(`⚠️ Failed to connect to provided MONGODB_URI (${mongoUri}). Falling back to in-memory MongoDB. Error: ${err.message}`);
          }
        }

        const mongod = await MongoMemoryServer.create();
        mongoUri = mongod.getUri();
        await mongoose.connect(mongoUri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        createdConnection = true;
        console.log('🔁 Using in-memory MongoDB for seeding');
      };

      await connectWithFallback();
    } else {
      console.log('✓ Using existing MongoDB connection');
    }

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Customer.deleteMany({});
    await Inventory.deleteMany({});

    // Create sample users
    console.log('👥 Creating users...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    const customerPassword = await bcrypt.hash('customer123', 10);

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@bunny.com',
      password: adminPassword,
      phone: '+1-555-0100',
      role: 'admin',
      isActive: true,
    });

    const customer = await User.create({
      name: 'John Doe',
      email: 'customer@bunny.com',
      password: customerPassword,
      phone: '+1-555-0101',
      role: 'customer',
      isActive: true,
    });

    console.log('✓ Users created');

    // Create sample products
    console.log('📦 Creating products...');
    const products = await Product.create([
      {
        name: 'Wireless Headphones',
        category: 'Electronics',
        description: 'Premium wireless headphones with noise cancellation',
        price: 149.99,
        stock: 50,
        reorderLevel: 10,
        image: '/assets/product-headphones.svg',
        status: 'Active',
        rating: 4.5,
        reviews: 0,
      },
      {
        name: 'USB-C Cable',
        category: 'Accessories',
        description: 'Fast charging USB-C cable, 2 meters',
        price: 12.99,
        stock: 200,
        reorderLevel: 50,
        image: '/assets/product-cable.svg',
        status: 'Active',
        rating: 4.3,
        reviews: 0,
      },
      {
        name: 'Phone Case',
        category: 'Accessories',
        description: 'Protective phone case with anti-shock technology',
        price: 24.99,
        stock: 150,
        reorderLevel: 30,
        image: '/assets/product-case.svg',
        status: 'Active',
        rating: 4.7,
        reviews: 0,
      },
      {
        name: 'Screen Protector',
        category: 'Accessories',
        description: 'Tempered glass screen protector, pack of 3',
        price: 9.99,
        stock: 300,
        reorderLevel: 100,
        image: '/assets/product-protector.svg',
        status: 'Active',
        rating: 4.4,
        reviews: 0,
      },
      {
        name: 'Phone Stand',
        category: 'Accessories',
        description: 'Adjustable phone stand for desk or table',
        price: 19.99,
        stock: 100,
        reorderLevel: 20,
        image: '/assets/product-stand.svg',
        status: 'Active',
        rating: 4.6,
        reviews: 0,
      },
      {
        name: 'Wireless Keyboard',
        category: 'Electronics',
        description: 'Compact wireless keyboard with rechargeable battery',
        price: 79.99,
        stock: 75,
        reorderLevel: 15,
        image: '/assets/product-keyboard.svg',
        status: 'Active',
        rating: 4.5,
        reviews: 0,
      },
    ]);

    console.log('✓ Products created');

    // Create inventory records
    console.log('📊 Creating inventory records...');
    for (const product of products) {
      await Inventory.create({
        productId: product._id,
        currentStock: product.stock,
        reorderLevel: product.reorderLevel,
        reorderQuantity: product.stock,
        status: 'In Stock',
      });
    }
    console.log('✓ Inventory records created');

    // Create customer profile
    console.log('👤 Creating customer profiles...');
    await Customer.create({
      userId: customer._id,
      firstName: 'John',
      lastName: 'Doe',
      email: customer.email,
      phone: customer.phone,
      totalOrders: 0,
      totalSpent: 0,
      status: 'Active',
    });
    console.log('✓ Customer profiles created');

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('  Admin:');
    console.log('    Email: admin@bunny.com');
    console.log('    Password: admin123');
    console.log('\n  Customer:');
    console.log('    Email: customer@bunny.com');
    console.log('    Password: customer123');

    // If this script created the connection, close it. Only close if we connected here.
    if (mongoose.connection.readyState === 1 && createdConnection) {
      await mongoose.connection.close();
      console.log('🔒 Connection closed.');
    }

    return;
  } catch (error) {
    console.error('❌ Seeding error:', error);
    throw error;
  }
};

module.exports = { seedDatabase };

if (require.main === module) {
  // If executed directly, run the seeder and exit appropriately
  seedDatabase()
    .then(() => {
      console.log('Seeding complete. Exiting.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Seeding failed:', err);
      process.exit(1);
    });
}
