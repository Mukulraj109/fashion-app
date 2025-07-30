const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/users/profile/:id
router.get('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Mock user data
    const user = {
      id,
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      wallet: 952,
      partnerLevel: 'Gold',
      totalOrders: 47,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      location: 'BTM Bangalore'
    };

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message
    });
  }
});

// PUT /api/users/wallet/:id
router.put('/wallet/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const newBalance = 952 + amount;

    res.json({
      success: true,
      message: 'Wallet updated successfully',
      data: {
        newBalance,
        transaction: {
          amount,
          type: 'cashback',
          date: new Date()
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating wallet',
      error: error.message
    });
  }
});

module.exports = router;