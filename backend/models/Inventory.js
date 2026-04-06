const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      unique: true,
    },
    currentStock: {
      type: Number,
      required: true,
      default: 0,
    },
    reorderLevel: {
      type: Number,
      required: true,
      default: 10,
    },
    reorderQuantity: {
      type: Number,
      required: true,
      default: 50,
    },
    lastRestocked: {
      type: Date,
      default: Date.now,
    },
    soldCount: {
      type: Number,
      default: 0,
    },
    warehouseLocation: String,
    status: {
      type: String,
      enum: ['In Stock', 'Low Stock', 'Out of Stock', 'Reordered'],
      default: 'In Stock',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inventory', inventorySchema);
