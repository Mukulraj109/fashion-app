# 🛍️ Cashback Fashion App

A full-stack cashback rewards platform where users can browse fashion items, visit stores, and earn cashback by writing reviews. Built with React.js, Node.js, Express.js, and MongoDB.

![App Preview](https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800)

## 🚀 Features

### 📱 Frontend Features
- **6 Complete Screens**: Seamless user journey from home to cashback confirmation
- **Modern UI/UX**: Beautiful purple gradient theme with smooth animations
- **Responsive Design**: Mobile-first approach optimized for all devices
- **Real-time Updates**: Instant wallet and cashback tracking
- **Interactive Elements**: Hover states, transitions, and micro-interactions
- **State Management**: Context API for authentication and cart management

### 🔧 Backend Features
- **RESTful API**: Complete Express.js server with organized routing
- **MongoDB Integration**: Full database schema with Mongoose ODM
- **Data Models**: User, Product, Review, and Offer schemas
- **Seed Data**: Pre-populated database with fashion products and users
- **Error Handling**: Comprehensive validation and error responses
- **CORS Support**: Cross-origin resource sharing enabled

## 🧱 Tech Stack

### Frontend
- **React.js** - UI library with hooks and context
- **TypeScript** - Type safety and better development experience
- **React Router** - Client-side routing and navigation
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API communication

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📂 Project Structure

```
cashback-fashion-app/
├── src/                          # Frontend source code
│   ├── components/               # Reusable UI components
│   │   └── Navigation.tsx        # Bottom navigation bar
│   ├── context/                  # React context providers
│   │   ├── AuthContext.tsx       # Authentication state
│   │   └── CartContext.tsx       # Shopping cart state
│   ├── hooks/                    # Custom React hooks
│   │   └── useAPI.ts            # API data fetching hooks
│   ├── pages/                    # Application screens
│   │   ├── HomePage.tsx          # Home dashboard
│   │   ├── FashionPage.tsx       # Fashion categories
│   │   ├── ProductPage.tsx       # Product listings
│   │   ├── StorePage.tsx         # Store/product details
│   │   ├── ReviewPage.tsx        # Review submission
│   │   └── ConfirmationPage.tsx  # Cashback confirmation
│   ├── services/                 # API service layer
│   │   └── api.ts               # Axios configuration and endpoints
│   ├── App.tsx                   # Main application component
│   ├── main.tsx                  # Application entry point
│   └── index.css                 # Global styles
├── server/                       # Backend source code
│   ├── models/                   # MongoDB schemas
│   │   ├── User.js              # User data model
│   │   ├── Product.js           # Product data model
│   │   ├── Review.js            # Review data model
│   │   └── Offer.js             # Offer data model
│   ├── routes/                   # API route handlers
│   │   ├── homeRoutes.js        # Home page endpoints
│   │   ├── productRoutes.js     # Product endpoints
│   │   ├── reviewRoutes.js      # Review endpoints
│   │   └── userRoutes.js        # User endpoints
│   ├── server.js                # Express server setup
│   ├── seedData.js              # Database seeding script
│   └── package.json             # Backend dependencies
├── package.json                  # Frontend dependencies
├── tailwind.config.js           # Tailwind CSS configuration
├── vite.config.ts               # Vite build configuration
└── README.md                    # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd cashback-fashion-app
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd server
npm install
cd ..
```

### 4. Environment Configuration
Create a `.env` file in the `server` directory:
```env
MONGODB_URI=mongodb://localhost:27017/cashback-fashion
PORT=5000
JWT_SECRET=your-jwt-secret-key
NODE_ENV=development
```

### 5. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# For local MongoDB installation
mongod

# Or use MongoDB Atlas cloud connection
# Update MONGODB_URI in .env file with your Atlas connection string
```

### 6. Seed the Database
```bash
cd server
npm run seed
cd ..
```

### 7. Start the Development Servers

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend Development Server:**
```bash
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## 📱 Application Screens

### 1. 🏠 Home Page (`/`)
- User dashboard with greeting and wallet balance
- Partner status and order statistics
- Quick action buttons (Voucher, Wallet, Offers, Explore)
- Category navigation (Fashion, Food, Electronics, etc.)
- Service shortcuts for home delivery options

### 2. 👗 Fashion Page (`/fashion`)
- Promotional banners and sales announcements
- Category carousel (Men, Women, Footwear, Accessories)
- Featured brand offers with cashback information
- Navigation to product listings

### 3. 📋 Product List Page (`/products`)
- Filterable product listings
- Store information and availability
- Price comparison and ratings
- Cashback percentage display
- Quick access to store details

### 4. 🏪 Store/Product Detail Page (`/store/:id`)
- Detailed product information and images
- Store location and operating hours
- Purchase statistics and user reviews
- Multiple action buttons:
  - Store Visit
  - Book Now
  - Pay Bill
  - Earn from Instagram

### 5. ⭐ Review & Cashback Page (`/review/:id`)
- Review submission form
- Cashback earning opportunity (10%)
- Recent cashback earners list
- Star rating system

### 6. 🎉 Cashback Confirmation Page (`/confirmation`)
- Success animation and celebration
- Cashback amount confirmation
- Wallet balance update
- Social sharing options
- Navigation back to shopping

## 🔌 API Endpoints

### Home Routes
- `GET /api/home/user-data` - Fetch user dashboard data

### Product Routes
- `GET /api/products/fashion/categories` - Get fashion categories
- `GET /api/products/list` - Get product listings with filters
- `GET /api/products/:id` - Get specific product details

### Review Routes
- `GET /api/reviews/recent-earners/:productId` - Get recent cashback earners
- `POST /api/reviews/submit` - Submit product review and earn cashback

### User Routes
- `GET /api/users/profile/:id` - Get user profile information
- `PUT /api/users/wallet/:id` - Update user wallet balance

## 🎨 Design System

### Color Palette
- **Primary**: Purple gradient (`from-purple-600 to-pink-600`)
- **Secondary**: Blue accents (`blue-500`, `blue-600`)
- **Success**: Green (`green-500`)
- **Warning**: Orange (`orange-500`)
- **Error**: Red (`red-500`)
- **Neutral**: Gray scale (`gray-50` to `gray-900`)

### Typography
- **Headings**: Font weights 600-800
- **Body**: Font weight 400-500
- **Captions**: Font weight 300-400
- **Line Height**: 1.5 for body, 1.2 for headings

### Spacing System
- Based on 8px grid system
- Consistent padding and margins
- Responsive breakpoints for mobile-first design

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
```bash
npm run build
# Deploy the 'dist' folder to your hosting platform
```

### Backend Deployment (Heroku/Railway)
```bash
cd server
# Set environment variables on your hosting platform
# Deploy the server directory
```

### Database (MongoDB Atlas)
- Create a MongoDB Atlas cluster
- Update the `MONGODB_URI` in your environment variables
- Ensure network access is configured properly

## 🧪 Testing

### Run Frontend Tests
```bash
npm run test
```

### Run Backend Tests
```bash
cd server
npm run test
```

## 📈 Performance Optimizations

- **Code Splitting**: React.lazy for route-based splitting
- **Image Optimization**: Responsive images with proper sizing
- **API Caching**: Efficient data fetching with custom hooks
- **Bundle Optimization**: Vite for fast builds and hot reloading
- **Database Indexing**: Optimized MongoDB queries

## 🔒 Security Features

- **Input Validation**: Server-side validation for all endpoints
- **CORS Configuration**: Proper cross-origin resource sharing
- **Error Handling**: Secure error messages without sensitive data
- **Environment Variables**: Sensitive data stored securely

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Design inspiration from modern e-commerce applications
- Icons provided by [Lucide React](https://lucide.dev/)
- Images sourced from [Pexels](https://pexels.com/)
- Built with love using React.js and Node.js

