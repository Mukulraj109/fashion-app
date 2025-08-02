import  { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Gift, Coins } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  image: string;
  cashbackPercentage: number;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateWallet } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [coinsToUse, setCoinsToUse] = useState(0);
  const [applyCashback, setApplyCashback] = useState(true);

  useEffect(() => {
    // Get product data from navigation state
    if (location.state?.product) {
      setProduct(location.state.product);
    } else {
      // If no product data, redirect back
      navigate('/');
    }
  }, [location.state, navigate]);

  if (!product || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const maxCoinsToUse = Math.min(user.wallet, product.price);
  const cashbackAmount = applyCashback ? Math.round((product.price * product.cashbackPercentage) / 100) : 0;
  const finalPrice = product.price - coinsToUse;
  const savings = (product.originalPrice - product.price) + coinsToUse;

  const handleCoinsChange = (value: number) => {
    const newValue = Math.max(0, Math.min(maxCoinsToUse, value));
    setCoinsToUse(newValue);
  };

  const handlePurchase = () => {
    // Deduct coins from wallet
    if (coinsToUse > 0) {
      updateWallet(-coinsToUse);
    }
    
    // Navigate to confirmation with purchase details
    navigate('/confirmation', {
      state: {
        product,
        finalPrice,
        coinsUsed: coinsToUse,
        cashbackEarned: cashbackAmount,
        purchaseType: 'buy-now'
      }
    });
  };

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 pt-12 pb-4">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Checkout</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Product Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="flex space-x-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-800">₹{product.price}</span>
                <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cashback Option */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Gift size={20} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Cashback Offer</h3>
                <p className="text-sm text-gray-600">Earn {product.cashbackPercentage}% cashback</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={applyCashback}
                onChange={(e) => setApplyCashback(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
          {applyCashback && (
            <div className="bg-purple-50 rounded-lg p-3">
              <p className="text-purple-700 font-semibold">You'll earn ₹{cashbackAmount} cashback!</p>
            </div>
          )}
        </div>

        {/* Coins Usage */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Coins size={20} className="text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Use Rez Coins</h3>
              <p className="text-sm text-gray-600">Available: ₹{user.wallet}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleCoinsChange(coinsToUse - 50)}
                className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={coinsToUse <= 0}
              >
                <Minus size={16} className="text-gray-600" />
              </button>
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max={maxCoinsToUse}
                  step="10"
                  value={coinsToUse}
                  onChange={(e) => handleCoinsChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              <button
                onClick={() => handleCoinsChange(coinsToUse + 50)}
                className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={coinsToUse >= maxCoinsToUse}
              >
                <Plus size={16} className="text-gray-600" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Coins to use:</span>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max={maxCoinsToUse}
                  value={coinsToUse}
                  onChange={(e) => handleCoinsChange(parseInt(e.target.value) || 0)}
                  className="w-20 px-2 py-1 border border-gray-300 rounded-lg text-center"
                />
                <span className="text-gray-600">₹</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleCoinsChange(Math.round(maxCoinsToUse * 0.25))}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                25%
              </button>
              <button
                onClick={() => handleCoinsChange(Math.round(maxCoinsToUse * 0.5))}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                50%
              </button>
              <button
                onClick={() => handleCoinsChange(Math.round(maxCoinsToUse * 0.75))}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                75%
              </button>
              <button
                onClick={() => handleCoinsChange(maxCoinsToUse)}
                className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
              >
                Max
              </button>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Price Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Original Price</span>
              <span className="text-gray-800">₹{product.originalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Discount</span>
              <span className="text-green-600">-₹{product.originalPrice - product.price}</span>
            </div>
            {coinsToUse > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Rez Coins Used</span>
                <span className="text-yellow-600">-₹{coinsToUse}</span>
              </div>
            )}
            <hr className="border-gray-200" />
            <div className="flex justify-between text-lg font-semibold">
              <span className="text-gray-800">Final Amount</span>
              <span className="text-gray-800">₹{finalPrice}</span>
            </div>
            {applyCashback && (
              <div className="flex justify-between text-sm">
                <span className="text-purple-600">Cashback to earn</span>
                <span className="text-purple-600">+₹{cashbackAmount}</span>
              </div>
            )}
            <div className="bg-green-50 rounded-lg p-3 mt-4">
              <p className="text-green-700 font-semibold text-center">
                Total Savings: ₹{savings}
              </p>
            </div>
          </div>
        </div>

        {/* Purchase Button */}
        <div className="space-y-3">
          <button
            onClick={handlePurchase}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-shadow"
          >
            Complete Purchase - ₹{finalPrice}
          </button>
          <p className="text-center text-sm text-gray-600">
            {applyCashback && `You'll earn ₹${cashbackAmount} cashback after purchase`}
          </p>
        </div>
      </div>

      <style >{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #9333ea;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #9333ea;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;