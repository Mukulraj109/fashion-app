const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products/fashion/categories
router.get('/fashion/categories', async (req, res) => {
  try {
    const categories = [
      { name: 'Men', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { name: 'Women', image: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { name: 'Footwear', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { name: 'Accessories', image: 'https://images.pexels.com/photos/1346706/pexels-photo-1346706.jpeg?auto=compress&cs=tinysrgb&w=200' },
    ];

    const offers = [
      {
        id: 1,
        brand: 'Zara',
        title: 'Wedding Glam in a Flash sale',
        discount: '50%',
        cashback: '10%',
        image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        id: 2,
        brand: 'H&M',
        title: 'Summer Collection',
        discount: '40%',
        cashback: '8%',
        image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
    ];

    res.json({
      success: true,
      data: {
        categories,
        offers
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching fashion categories',
      error: error.message
    });
  }
});




router.get('/list', async (req, res) => {
  try {
    
    const { category, filter } = req.query;

    const products = await Product.find(filter);

    console.log(products);

    // // Mock products data
    // const products = [
    //   {
    //     id: 1,
    //     name: 'Little Big Comfort Tee',
    //     brand: 'Reliance Trends',
    //     price: 2199,
    //     originalPrice: 2999,
    //     rating: 4.5,
    //     reviewCount: 128,
    //     cashbackPercentage: 10,
    //     availability: 'Online available',
    //     store: {
    //       name: 'Amazon',
    //       distance: '0.7 km',
    //       isOpen: true,
    //       isOnline: true,
    //     },
    //     image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=300',
    //     category: 'Men'
    //   },
    //   {
    //     id: 2,
    //     name: 'Little Big Comfort Tee',
    //     brand: 'Reliance Trends',
    //     price: 2199,
    //     originalPrice: 2999,
    //     rating: 4.2,
    //     reviewCount: 89,
    //     cashbackPercentage: 8,
    //     availability: 'Store available',
    //     store: {
    //       name: 'Max Fashion',
    //       distance: '1.2 km',
    //       isOpen: true,
    //       isOnline: false,
    //     },
    //     image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300',
    //     category: 'Women'
    //   },
    //   {
    //     id: 3,
    //     name: 'Formal Shirt Collection',
    //     brand: 'Peter England',
    //     price: 1499,
    //     originalPrice: 2199,
    //     rating: 4.7,
    //     reviewCount: 256,
    //     cashbackPercentage: 12,
    //     availability: 'Online available',
    //     store: {
    //       name: 'Myntra',
    //       distance: '0.5 km',
    //       isOpen: true,
    //       isOnline: true,
    //     },
    //     image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300',
    //     category: 'Men'
    //   },
    //   {
    //     id: 4,
    //     name: 'Summer Casual Wear',
    //     brand: 'H&M',
    //     price: 1899,
    //     originalPrice: 2499,
    //     rating: 4.3,
    //     reviewCount: 167,
    //     cashbackPercentage: 15,
    //     availability: 'Store available',
    //     store: {
    //       name: 'H&M Store',
    //       distance: '2.1 km',
    //       isOpen: true,
    //       isOnline: false,
    //     },
    //     image: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=300',
    //     category: 'Women'
    //   },
    // ];

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
});




// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

   
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product details',
      error: error.message,
    });
  }
});


module.exports = router;