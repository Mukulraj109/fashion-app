const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const User = require('../models/User');
const Product = require('../models/Product');

// GET /api/reviews/recent-earners/:productId
router.get('/recent-earners/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    
    // Mock recent earners data
    const recentEarners = [
      { 
        id: 1,
        name: 'Swathi earned', 
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60',
        amount: 220,
        date: new Date()
      },
      { 
        id: 2,
        name: 'Priya earned', 
        avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=60',
        amount: 180,
        date: new Date()
      },
      { 
        id: 3,
        name: 'Priya earned', 
        avatar: 'https://images.pexels.com/photos/1239287/pexels-photo-1239287.jpeg?auto=compress&cs=tinysrgb&w=60',
        amount: 150,
        date: new Date()
      },
    ];

    res.json({
      success: true,
      data: recentEarners
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching recent earners',
      error: error.message
    });
  }
});

// POST /api/reviews/submit
router.post('/submit', async (req, res) => {
  try {
    const { productId, userId, rating, comment } = req.body;

    if (!productId || !userId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    
    const cashbackAmount = 220; // Mock amount

    const review = {
      id: Date.now(),
      productId,
      userId,
      rating,
      comment,
      cashbackEarned: cashbackAmount,
      createdAt: new Date()
    };

   
    const updatedWallet = 952 + cashbackAmount; // Current wallet + cashback

    res.json({
      success: true,
      message: 'Review submitted successfully',
      data: {
        review,
        cashbackEarned: cashbackAmount,
        newWalletBalance: updatedWallet
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting review',
      error: error.message
    });
  }
});

module.exports = router;