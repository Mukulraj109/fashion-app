const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const homeRoutes = require('./routes/homeRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cashback-fashion', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api/home', homeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.get('/api/merchants', async (req, res) => {
  try {
    const Store = require('./models/Store');
    const stores = await Store.find({ isActive: true });
    
    
    const merchants = stores.map(store => ({
      id: store._id,
      name: store.name,
      category: store.category,
      cashback: store.cashback.percentage,
      rating: store.rating.average,
      image: store.banner,
      description: store.description,
      location: store.location?.address || 'BTM Bangalore'
    }));
    
    res.json(merchants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/wallet/:userId', async (req, res) => {
  try {
    const User = require('./models/User');
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      userId: user._id,
      balance: user.wallet.balance,
      transactions: user.wallet.transactions
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});