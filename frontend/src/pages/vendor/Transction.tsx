import { useEffect, useState } from 'react';
import { useAuth } from '../../useAuth';
import { Card, CardContent } from '../../components/ui/card';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { DashboardLayout } from './DashboardLayout';

interface Transaction {
  id: number;
  amount: number;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
  subscriptionId: string | null; // Assuming subscriptionId can be null
  package: Package;
}

interface Package {
  id: number;
  name: string;
  price: number;
  duration: number;
  status: string;
}

const Transaction = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('${import.meta.env.VITE_BACKEND_URL}/transactions/my/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log("object", response.data);
      setTransactions(response.data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch transactions';
      setError(message);
      toast.error('Failed to fetch transaction history');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout title="Transaction History" user={user}>
      <div className="max-w-7xl mx-auto py-6 space-y-8">
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-[#a0b830]" />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-64">
                <p className="text-red-500 mb-2">Failed to load transactions</p>
                <button 
                  onClick={fetchTransactions}
                  className="text-[#a0b830] hover:underline"
                >
                  Try again
                </button>
              </div>
            ) : transactions.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">No transactions found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SubscriptionId
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Gateway
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(transaction.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transaction.subscriptionId || "N/A"} {/* Add null check and fallback */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        ${transaction.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.paymentStatus)}`}
                        >
                          {transaction.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full`}
                        >
                          {transaction.paymentMethod}
                        </span>
                      </td>
                      
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Transaction;