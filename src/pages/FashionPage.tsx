import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Shirt,
  Gem,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { productAPI } from '../services/api';
import header from './header.png';

const FashionPage = () => {
  const navigate = useNavigate();
  const [fashionData, setFashionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchFashionData = async () => {
      try {
        const response = await productAPI.getFashionCategories();
        setFashionData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch fashion data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFashionData();
  }, []);

  const handleScroll = () => {
    if (!sliderRef.current) return;

    const scrollLeft = sliderRef.current.scrollLeft;
    const width = sliderRef.current.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    setActiveIndex(newIndex);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const categories = fashionData?.categories || [];
  const offers = fashionData?.offers || [];

  return (
    <div className="pb-20 bg-white min-h-screen">
    
<div className="relative w-full h-[180px] rounded-xl overflow-hidden">

  <img
    src={header}
    alt="Wedding Glam Sale"
    className="w-full h-full object-cover"
  />

  
  <button
    onClick={() => navigate(-1)}
    className="absolute top-4 left-4 p-2 bg-white bg-opacity-80 rounded-full shadow-md backdrop-blur-sm hover:bg-opacity-100 transition"
  >
    <ArrowLeft size={20} className="text-purple-700" />
  </button>
</div>




<div className="mt-4">
  <div className="flex space-x-6 overflow-x-auto px-4 scrollbar-hide">
    {[
      { name: 'Men', icon: User },
      { name: 'Women', icon: Shirt },
      { name: 'Jewelry', icon: Gem },
      { name: 'Bags', icon: ShoppingBag },
      { name: 'Beauty', icon: Sparkles },
    ].map((item, index) => {
      const Icon = item.icon;
      return (
        <div
          key={index}
          onClick={() => navigate(`/products?category=${item.name.toLowerCase()}`)}
          className="flex-shrink-0 text-center cursor-pointer group transition duration-300 ease-in-out transform hover:scale-105"
        >
          <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mx-auto group-hover:bg-purple-100">
            <Icon size={28} className="text-purple-700 group-hover:text-purple-900" />
          </div>
          <p className="text-sm text-gray-700 mt-1 font-medium group-hover:text-purple-800">
            {item.name}
          </p>
        </div>
      );
    })}
  </div>
</div>


    
      <div className="px-4 my-6">
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          onClick={() => navigate('/products')}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
        >
          {offers.map((offer: any, index: number) => (
            <div
              key={index}
              className="relative w-72 min-w-[260px] h-[400px] rounded-3xl overflow-hidden shadow-lg flex-shrink-0 snap-center"
            >
              <img
                src={offer.image}
                alt={offer.brand}
               
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 right-4 bg-purple-600 text-white text-[10px] px-2 py-1 rounded-md rotate-12 shadow-md font-bold">
                CASHBACK 10%
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 flex flex-col justify-end">
                <h4 className="text-white text-xl font-semibold">{offer.brand}</h4>
                <p className="text-white text-sm">{offer.title}</p>
                <button
                  onClick={() => navigate('/products')}
                  className="mt-4 bg-white text-black text-sm px-4 py-2 rounded-full flex items-center justify-between font-medium shadow-md w-full"
                >
                  Cashback upto {offer.cashback}
                  <span className="ml-auto pl-2">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

     
        <div className="flex justify-center mt-4 gap-2">
          {offers.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'bg-purple-600 scale-110' : 'bg-purple-200'
              }`}
            />
          ))}
        </div>
      </div>

    
      <div className="px-4 mb-6">
        <div className="flex space-x-4">
          <button className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
            Near me
          </button>
          <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
            New offer
          </button>
          <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
            Wasil coins
          </button>
        </div>
      </div>
    </div>
  );
};

export default FashionPage;
