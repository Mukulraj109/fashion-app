import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gift, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { updateWallet } = useAuth();
  const updated = useRef(false); // Prevent double updates

  useEffect(() => {
    if (!updated.current) {
      updateWallet(220);
      updated.current = true;
    }
  }, [updateWallet]);

  return (
    <div className="pb-20 bg-gradient-to-br from-purple-100 to-pink-100 min-h-screen">
      {/* Header */}
      <div className="bg-transparent px-4 pt-12 pb-4">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/')} className="p-2">
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Review</h1>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-8">
        <div className="text-center mb-8">
          {/* Icon Badge */}
          <div className="relative mx-auto w-32 h-32 mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
            <div className="relative bg-white rounded-full w-full h-full flex items-center justify-center shadow-lg">
              <div className="relative">
                <Gift size={48} className="text-purple-600" />
                <div className="absolute -top-2 -right-2">
                  <Sparkles size={20} className="text-yellow-500 animate-bounce" />
                </div>
              </div>
            </div>
          </div>

          {/* Cashback Info Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl mb-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-purple-600 mb-2">10%</h2>
              <p className="text-xl font-semibold text-gray-800 mb-2">You have earned</p>
              <p className="text-gray-600">Cashback successfully credited to your wallet!</p>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-center space-x-2">
                <Gift size={24} />
                <span className="text-2xl font-bold">₹220</span>
              </div>
              <p className="text-center mt-2 opacity-90">Added to your wallet</p>
            </div>

            {/* Confetti Emojis */}
            <div className="flex justify-center space-x-4 mb-6">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-yellow-700">🎉</span>
              </div>
              <div className="w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center animate-bounce delay-100">
                <span className="text-pink-700">✨</span>
              </div>
              <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center animate-bounce delay-200">
                <span className="text-purple-700">🎊</span>
              </div>
            </div>

            <p className="text-gray-600 text-center">
              Thank you for your review! Your cashback will be processed within 24 hours.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-shadow"
            >
              Continue Shopping
            </button>
            <button 
              onClick={() => navigate('/wallet')}
              className="w-full bg-white text-purple-600 py-4 rounded-2xl font-semibold text-lg border-2 border-purple-600 hover:bg-purple-50 transition-colors"
            >
              View Wallet
            </button>
          </div>

          {/* Share Section */}
          <div className="mt-8 p-4 bg-white/50 rounded-2xl">
            <p className="text-gray-700 mb-3">Share your achievement</p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors">
                <span className="text-sm font-semibold">Facebook</span>
              </button>
              <button className="bg-pink-500 text-white p-3 rounded-xl hover:bg-pink-600 transition-colors">
                <span className="text-sm font-semibold">Instagram</span>
              </button>
              <button className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition-colors">
                <span className="text-sm font-semibold">WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
