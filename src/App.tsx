
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import FashionPage from './pages/FashionPage';
import ProductPage from './pages/ProductPage';
import StorePage from './pages/StorePage';
import ReviewPage from './pages/ReviewPage';
import ConfirmationPage from './pages/ConfirmationPage';
import Navigation from './components/Navigation';
import { Wallet } from './pages/Wallet';


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-md mx-auto bg-white min-h-screen relative">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/fashion" element={<FashionPage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/store/:id" element={<StorePage />} />
                <Route path="/review/:id" element={<ReviewPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
                <Route path="/wallet" element={<Wallet/>} />
              </Routes>
              <Navigation />
            </div>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;