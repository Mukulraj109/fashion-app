import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { homeAPI } from '../services/api';

import {
  Wallet,
  Gift,
  Search,
  Star,
  MapPin,
  ShoppingBag,
  Zap,
  Truck,
  Utensils,
  Smartphone,
  Shirt,
  Coffee,
  Heart,
} from 'lucide-react';

// Map icon names to components
const iconMap: Record<string, React.ElementType> = {
  wallet: Wallet,
  gift: Gift,
  search: Search,
  star: Star,
  mappin: MapPin,
  shoppingbag: ShoppingBag,
  zap: Zap,
  truck: Truck,
  utensils: Utensils,
  smartphone: Smartphone,
  shirt: Shirt,
  coffee: Coffee,
  heart: Heart,
};

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [homeData, setHomeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await homeAPI.getUserData();
        setHomeData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const categories = homeData?.categories || [];
  const services = homeData?.services || [];

  return (
    <div className="pb-20">
  
      <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 px-4 pt-12 pb-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <p className="text-sm opacity-90">Good evening</p>
              <p className="font-semibold">{user?.name}!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 px-3 py-1 rounded-full flex items-center space-x-2">
              <Wallet size={16} />
              <span className="font-semibold">₹{user?.wallet}</span>
            </div>
            <div className="bg-white/20 p-2 rounded-full">
              <Gift size={18} />
            </div>
          </div>
        </div>

      
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for the service"
            className="w-full bg-white rounded-xl py-3 pl-12 pr-4 text-gray-800 placeholder-gray-500"
          />
        </div>

       
        <div className="bg-white/20 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <Star size={18} className="text-yellow-700" />
            </div>
            <div>
              <p className="text-sm opacity-90">Partner Level</p>
              <p className="font-semibold">{user?.partnerLevel}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">All Orders</p>
            <p className="font-semibold">{user?.totalOrders}</p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="grid grid-cols-4 gap-4">
            <QuickAction icon={Gift} label="Voucher" onClick={() => navigate('/voucher')} />
            <QuickAction icon={Wallet} label="Wallet" onClick={() => navigate('/wallet')} />
            <QuickAction icon={Gift} label="Offers" onClick={() => navigate('/offers')} />
            <QuickAction icon={Search} label="Explore" onClick={() => navigate('/explore')} />
          </div>
        </div>
      </div>

      <div className="px-4 mb-6">
        <SectionHeader title="Going Out" />
        <div className="grid grid-cols-4 gap-4">
          {categories.map((cat: any, i: number) => {
            const iconKey = cat.icon?.trim().toLowerCase();
            const Icon = iconMap[iconKey] || Shirt;
            

            return (
              <button
                key={i}
                onClick={() => cat.name === 'Fashion' && navigate('/fashion')}
                className="flex flex-col items-center space-y-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`bg-purple-400 p-3 rounded-xl`}>
                  <Icon size={24} className="text-white" />
                </div>
                <span className="text-xs font-medium text-gray-700">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 mb-6">
        <SectionHeader title="Home Delivery" />
        <div className="grid grid-cols-3 gap-4">
          {services.slice(0, 6).map((srv: any, i: number) => {
            const iconKey = srv.icon?.trim().toLowerCase();
            const Icon = iconMap[iconKey] || Heart;
           

            return (
              <button
                key={i}
                className="flex flex-col items-center space-y-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`bg-purple-400 p-3 rounded-xl`}>
                  <Icon size={20} className="text-white" />
                </div>
                <span className="text-xs font-medium text-gray-700">{srv.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const QuickAction = ({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
  >
    <div className="bg-gray-100 p-3 rounded-xl">
      <Icon size={24} className="text-gray-700" />
    </div>
    <span className="text-xs font-medium text-gray-700">{label}</span>
  </button>
);

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    <button className="text-purple-600 text-sm font-medium">View all</button>
  </div>
);

export default HomePage;
