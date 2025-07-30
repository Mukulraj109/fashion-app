const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const Offer = require('./models/Offer');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cashback-fashion');

const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    await Offer.deleteMany({});

    // Seed Users
    const users = [
      {
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        password: 'password123',
        wallet: 952,
        partnerLevel: 'Gold',
        totalOrders: 47,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        location: 'BTM Bangalore'
      },
      {
        name: 'Swathi Reddy',
        email: 'swathi@example.com',
        password: 'password123',
        wallet: 1200,
        partnerLevel: 'Platinum',
        totalOrders: 89,
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ];

    await User.insertMany(users);

    // Seed Products
    const products = [
      {
        name: 'Little Big Comfort Tee',
        brand: 'Reliance Trends',
        price: 2199,
        originalPrice: 2999,
        description: 'Little Big Comfort Tee offers a perfect blend of relaxed fit and ultra-luxe fabric for all-day comfort and effortless style.',
        image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Men',
        cashbackPercentage: 10,
        rating: 4.5,
        reviewCount: 128,
        store: {
          name: 'Reliance Trends',
          distance: '0.7 km BTM',
          isOpen: true,
          isOnline: true,
          totalPurchases: 1200
        },
        availability: 'Online available'
      },
      {
        name: 'Summer Casual Dress',
        brand: 'H&M',
        price: 1899,
        originalPrice: 2499,
        description: 'Perfect summer dress with breathable fabric and elegant design.',
        image: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Women',
        cashbackPercentage: 15,
        rating: 4.3,
        reviewCount: 167,
        store: {
          name: 'H&M Store',
          distance: '2.1 km',
          isOpen: true,
          isOnline: false,
          totalPurchases: 890
        },
        availability: 'Store available'
      },
      {
        name: 'Formal Shirt Collection',
        brand: 'Peter England',
        price: 1499,
        originalPrice: 2199,
        description: 'Premium formal shirts perfect for office and business meetings.',
        image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Men',
        cashbackPercentage: 12,
        rating: 4.7,
        reviewCount: 256,
        store: {
          name: 'Myntra',
          distance: '0.5 km',
          isOpen: true,
          isOnline: true,
          totalPurchases: 1500
        },
        availability: 'Both'
      }
    ];

    await Product.insertMany(products);

    // Seed Offers
    const offers = [
      {
        title: 'Wedding Glam in a Flash sale',
        description: 'Get ready for wedding season with our exclusive collection',
        brand: 'Zara',
        discount: '50%',
        cashback: '10%',
        image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Fashion',
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      },
      {
        title: 'Summer Collection',
        description: 'Beat the heat with our cool summer styles',
        brand: 'H&M',
        discount: '40%',
        cashback: '8%',
        image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Fashion',
        validUntil: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000) // 45 days from now
      }
    ];

    await Offer.insertMany(offers);

    console.log('✅ Database seeded successfully!');
    console.log(`📊 Created ${users.length} users`);
    console.log(`👕 Created ${products.length} products`);
    console.log(`🎯 Created ${offers.length} offers`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();