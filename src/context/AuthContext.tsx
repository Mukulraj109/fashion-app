import React, { createContext, useContext, useState, ReactNode } from 'react';
import { userAPI } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  wallet: number;
  partnerLevel: string;
  totalOrders: number;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  updateWallet: (amount: number) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    wallet: 952,
    partnerLevel: 'Gold',
    totalOrders: 47,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
  });

  const login = (email: string, password: string) => {
   
    console.log('Logging in with:', email, password);
  };

  const logout = () => {
    setUser(null);
  };

  const updateWallet = (amount: number) => {
    if (user) {
      setUser({ ...user, wallet: user.wallet + amount });
     
      userAPI.updateWallet(user.id, amount).catch(console.error);
    }
  };

  const refreshUser = async () => {
    if (user) {
      try {
        const response = await userAPI.getProfile(user.id);
        setUser(response.data.data);
      } catch (error) {
        console.error('Failed to refresh user data:', error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateWallet, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};