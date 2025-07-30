import  { useEffect, useState } from 'react';
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
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Product not found.
      </div>
    );
  }

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
     
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-200 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <div className="flex space-x-3">
          <Share className="text-gray-700" />
          <Heart className="text-gray-700" />
        </div>
      </div>

  
      <div className="px-4 pt-6 relative">
        <div className="rounded-2xl overflow-hidden aspect-[3/3.5]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        {product.cashbackPercentage && (
          <div className="absolute top-6 right-6 bg-purple-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
            Save {product.cashbackPercentage}%
          </div>
        )}
      </div>

      
      <div className="px-4 mt-6">
        <h1 className="text-xl font-bold text-gray-900">{product.name}</h1>

        {product.category && (
          <p className="text-sm font-medium text-purple-600 mt-1">
            Category: {product.category}
          </p>
        )}

      
        <p className="text-sm text-gray-600 mt-2">{product.description}</p>

      
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-800">₹{product.price}</span>
            {product.originalPrice && (
              <span className="line-through text-gray-400">₹{product.originalPrice}</span>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-700 space-x-1">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span>{product.rating || 4.2}</span>
            <span>({product.reviewCount || 25})</span>
          </div>
        </div>

       
        {product.store && (
          <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
            <MapPin size={16} />
            <span>{product.store.distance || 'Nearby'}</span>
            {product.store.isOpen && (
              <span className="text-green-600">• Open</span>
            )}
          </div>
        )}

       
        <button
          onClick={() => navigate(`/review/${product._id}`)}
          className="mt-4 w-full bg-purple-100 text-purple-700 font-medium py-3 rounded-xl"
        >
          Write a review and earn cashback
        </button>

        <div className="mt-5 flex items-center gap-2 text-sm bg-white p-4 rounded-xl shadow-sm">
          <Users size={18} />
          <span className="font-semibold text-gray-800">
            {product.store?.totalPurchases || 'Few'}
          </span>
          <span className="text-gray-600">people bought today</span>
        </div>

        
        <div className="mt-6 flex flex-col gap-3">
          <button className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold text-lg">
            STORE VISIT
          </button>
          <button className="w-full bg-gray-100 text-gray-800 py-4 rounded-xl font-semibold text-lg">
            Book Now
          </button>

       
          <div className="bg-white p-4 rounded-xl border mt-2">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-800">Pay your bill</p>
              <span className="text-purple-600 text-sm">Save 20%</span>
            </div>
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Enter the amount"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
              />
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition">
                Pay Bill
              </button>
            </div>
          </div>

          
          <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2">
            <Instagram size={20} />
            <span>Earn from Instagram</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
