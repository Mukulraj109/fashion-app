const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  cashback: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  validUntil: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Offer', offerSchema);