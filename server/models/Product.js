const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Men', 'Women', 'Footwear', 'Accessories'],
    required: true,
  },
  cashbackPercentage: {
    type: Number,
    default: 10,
  },
  rating: {
    type: Number,
    default: 4.0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  store: {
    name: String,
    distance: String,
    isOpen: {
      type: Boolean,
      default: true,
    },
    isOnline: {
      type: Boolean,
      default: true,
    },
    totalPurchases: {
      type: Number,
      default: 0,
    },
  },
  availability: {
    type: String,
    enum: ['Online available', 'Store available', 'Both'],
    default: 'Both',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);