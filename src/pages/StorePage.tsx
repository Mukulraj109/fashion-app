import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Share, Heart, Star, MapPin, Users, Instagram } from 'lucide-react';
import { productAPI } from '../services/api';

const StorePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const response = await productAPI.getProductById(id);
        setProduct(response.data.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
      
    };

    fetchProduct();
  }, [id]);

  const recentEarners = [
    { name: 'Swathi earned', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50' },
    { name: 'Priya earned', avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=50' },
    { name: 'Priya earned', avatar: 'https://images.pexels.com/photos/1239287/pexels-photo-1239287.jpeg?auto=compress&cs=tinysrgb&w=50' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Product not found</h2>
          <button 
            onClick={() => navigate('/products')}
            className="text-purple-600 hover:text-purple-700"
          >
            Go back to products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/products')} className="p-2">
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <div className="flex space-x-2">
            <button className="p-2">
              <Share size={24} className="text-gray-700" />
            </button>
            <button className="p-2">
              <Heart size={24} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Image */}
      <div className="px-4 py-6">
        <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Store Info */}
      <div className="px-4 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <span className="text-lg font-bold text-blue-600">R</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{product.store.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin size={14} />
              <span>{product.store.distance}</span>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Open</span>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-800">₹{product.price}</span>
            <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star size={16} className="text-yellow-400 fill-current" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-gray-500">({product.reviewCount} reviews)</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <div className="bg-purple-600 text-white px-4 py-2 rounded-lg">
            <span className="font-semibold">{product.cashbackPercentage}%</span>
          </div>
          <div className="bg-gray-100 px-4 py-2 rounded-lg">
            <span className="font-semibold">{product.reviewCount}</span>
          </div>
          <button 
            onClick={() => navigate(`/review/${product._id}`)}
            className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-200 transition-colors"
          >
            Write a review and earn cashback
          </button>
        </div>

        {/* Purchase Stats */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Users size={20} className="text-gray-600" />
            <span className="font-semibold text-gray-800">{product.store.totalPurchases}</span>
            <span className="text-gray-600">People brought today</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-purple-700 transition-colors">
            STORE VISIT
          </button>
          <button 
            onClick={() => navigate('/checkout', { 
              state: { 
                product: {
                  id: product.id,
                  name: product.name,
                  brand: product.brand,
                  price: product.price,
                  originalPrice: product.originalPrice,
                  image: product.image,
                  cashbackPercentage: product.cashbackPercentage
                }
              } 
            })}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-shadow"
          >
            BUY NOW
          </button>
          <button className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-colors">
            Book Now
          </button>
          
          {/* Pay Bill Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-gray-800">Pay your bill</span>
              <span className="text-sm text-purple-600 font-medium">Save 20%</span>
            </div>
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Enter the amount"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
              />
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Pay Bill
              </button>
            </div>
          </div>

          {/* Instagram Earning */}
          <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:shadow-lg transition-shadow">
            <Instagram size={20} />
            <span>Earn from Instagram</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StorePage;