const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGODB_URI;

    if (mongoUri) {
      // Try connecting to provided URI first
      try {
        const conn = await mongoose.connect(mongoUri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return conn;
      } catch (err) {
        console.warn(`⚠️ Failed to connect to provided MONGODB_URI (${mongoUri}). Falling back to in-memory MongoDB. Error: ${err.message}`);
      }
    }

    // Start an in-memory MongoDB instance for development
    const mongod = await MongoMemoryServer.create();
    mongoUri = mongod.getUri();
    console.log('🔁 Using in-memory MongoDB for development');

    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected (memory): ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
