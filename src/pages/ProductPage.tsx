import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { productAPI } from '../services/api';

const ProductPage = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const filters = ['All', 'Men', 'Women', 'Online', 'Store', 'Cashback'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getProductList({ category: 'fashion' });
        const data = response.data.data;

        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!products.length) return;

    const lowerFilter = selectedFilter.toLowerCase();

    const filtered = products.filter((p) => {
      if (lowerFilter === 'all') return true;
      if (lowerFilter === 'online') return p.store?.isOnline;
      if (lowerFilter === 'store') return p.store && !p.store?.isOnline;
      if (lowerFilter === 'cashback') return p.cashbackPercentage && p.cashbackPercentage > 0;
      if (lowerFilter === 'men' || lowerFilter === 'women') {
        return p.category?.toLowerCase() === lowerFilter;
      }
      return true;
    });

    setFilteredProducts(filtered);
  }, [selectedFilter, products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="pb-20">
   
      <div className="bg-gradient-to-br from-purple-700 to-purple-500 px-4 pt-12 pb-6 rounded-b-3xl text-white">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate('/fashion')} className="p-2">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="text-xl font-semibold">Store List Page</h1>
          <button className="p-2">
            <Search size={24} className="text-white" />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for the service"
            className="w-full bg-white rounded-xl py-3 pl-12 pr-4 text-gray-800 placeholder-gray-500"
          />
        </div>
      </div>

      <div className="flex space-x-2 overflow-x-auto px-4 py-4 scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedFilter === filter
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="px-4">
        <p className="text-xs text-gray-500 mb-1">Free Shipping</p>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-blue-600">R</span>
          </div>
          <h2 className="font-medium text-sm">Reliance Trends</h2>
          <span className="text-xs text-gray-500">• 0.7 Km, BTM</span>
          <span className="text-xs text-green-600">• Open</span>
          <span className="text-xs text-gray-500">• Online available</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 py-4">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-purple-50 p-2 rounded-xl relative cursor-pointer"
            onClick={() => navigate(`/store/${product._id}`)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="rounded-md mb-2 w-full h-40 object-cover"
            />
            {product.cashbackPercentage > 0 && (
              <div className="absolute top-2 right-2 bg-purple-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                {product.cashbackPercentage}% Cashback
              </div>
            )}
            <p className="text-xs font-medium line-clamp-2">{product.name}</p>
            <p className="text-sm font-bold">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
