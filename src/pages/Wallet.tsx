import React, { useState, useEffect } from 'react';
import {
  Coins,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  Gift,
} from 'lucide-react';

interface Transaction {
  id: number;
  type: string;
  amount: number;
  description: string;
  date: string;
}

interface Wallet {
  userId: number;
  balance: number;
  transactions: Transaction[];
}

export const Wallet: React.FC = () => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const dummyData: Wallet = {
        userId: 1,
        balance: 325,
        transactions: [
          { id: 1, type: 'cashback', amount: 100, description: 'Order Cashback', date: '2025-07-25T10:30:00Z' },
          { id: 2, type: 'reward', amount: 50, description: 'Referral Bonus', date: '2025-07-20T14:15:00Z' },
          { id: 3, type: 'cashback', amount: 75, description: 'Service Booking Cashback', date: '2025-07-18T09:45:00Z' },
          { id: 4, type: 'refund', amount: 100, description: 'Refunded Coins', date: '2025-07-10T08:00:00Z' },
        ],
      };
      setWallet(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto px-4 py-6">
     
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Wallet</h1>
        <p className="text-sm text-gray-600">Track your ReZ Coins and history</p>
      </div>

     
      <div className="bg-gradient-to-r from-purple-600 to-teal-600 rounded-xl p-6 text-white mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm">Total Balance</p>
            <div className="flex items-center space-x-2">
              <Coins className="w-6 h-6" />
              <span className="text-3xl font-bold">{wallet?.balance}</span>
              <span className="text-sm text-purple-100">ReZ Coins</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-purple-400/30 text-sm flex justify-between">
          <span className="text-purple-100">Equivalent</span>
          <span className="font-semibold">₹{(wallet?.balance * 0.1).toFixed(2)}</span>
        </div>
      </div>

     
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-xs">Total Earned</p>
              <p className="text-lg font-bold text-gray-900">{wallet?.balance}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-xs">Transactions</p>
              <p className="text-lg font-bold text-gray-900">{wallet?.transactions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Gift className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600 text-xs">Rewards</p>
              <p className="text-lg font-bold text-gray-900">Active</p>
            </div>
          </div>
        </div>
      </div>

     
      <div className="bg-white rounded-xl shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Transaction History</h2>
        </div>

        <div className="p-4 space-y-4">
          {wallet?.transactions.length ? (
            wallet.transactions
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${
                        transaction.type === 'cashback' ? 'bg-green-100' : 'bg-blue-100'
                      }`}
                    >
                      {transaction.type === 'cashback' ? (
                        <Coins className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{transaction.description}</p>
                      <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <p
                      className={`font-bold ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      +{transaction.amount}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">{transaction.type}</p>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center py-8">
              <Coins className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-700 font-medium">No transactions yet</p>
              <p className="text-sm text-gray-500">Start booking to earn ReZ Coins!</p>
            </div>
          )}
        </div>
      </div>

      
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl text-sm border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Gift className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">How to use ReZ Coins</h3>
            <ul className="list-disc ml-4 text-gray-600 space-y-1">
              <li>1 ReZ Coin = ₹0.10 discount</li>
              <li>Min. 100 coins to redeem</li>
              <li>Coins expire after 12 months</li>
              <li>Transfer (coming soon)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
