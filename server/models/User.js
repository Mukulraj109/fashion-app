const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  wallet: {
    type: Number,
    default: 0,
  },
  partnerLevel: {
    type: String,
    enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
    default: 'Bronze',
  },
  totalOrders: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
    default: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  location: {
    type: String,
    default: 'BTM Bangalore',
  },
  cashbackHistory: [{
    amount: Number,
    source: String,
    productId: mongoose.Schema.Types.ObjectId,
    date: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);