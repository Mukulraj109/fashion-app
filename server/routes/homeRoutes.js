const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/home/user-data
router.get('/user-data', async (req, res) => {
  try {
   
    const userId = '507f1f77bcf86cd799439011'; // Demo user ID
   
    const userData = {
      id: userId,
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      wallet: 952,
      partnerLevel: 'Gold',
      totalOrders: 47,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      location: 'BTM Bangalore'
    };

    const categories = [
      { name: 'Fashion', icon: 'Shirt', color: 'bg-purple-500' },
      { name: 'Food', icon: 'Utensils', color: 'bg-orange-500' },
      { name: 'Electronics', icon: 'Smartphone', color: 'bg-blue-500' },
      { name: 'Grocery', icon: 'Coffee', color: 'bg-green-500' },
    ];

    const services = [
      { name: 'Recharge', icon: 'Zap', color: 'bg-yellow-500' },
      { name: 'Travel', icon: 'MapPin', color: 'bg-red-500' },
      { name: 'Gift', icon: 'Gift', color: 'bg-pink-500' },
      { name: 'Restaurant', icon: 'Utensils', color: 'bg-indigo-500' },
      { name: 'Grocery', icon: 'ShoppingBag', color: 'bg-teal-500' },
      { name: 'Medicine', icon: 'Heart', color: 'bg-rose-500' },
    ];

    res.json({
      success: true,
      data: {
        user: userData,
        categories,
        services
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching home data',
      error: error.message
    });
  }
});

module.exports = router;