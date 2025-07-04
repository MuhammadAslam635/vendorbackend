import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../useAuth';
import { AdminDashboardLayout } from '../layout/AdminDashboardLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';

interface Transaction {
  id: number;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  transactionId: string | null;
  createdAt: string;
  updatedAt: string;
  subscribePackageId: number;
  userId: number;
  user?: {
    name: string;
    email: string;
  };
  subscription?: {
    id: number;
    startDate: string;
    endDate: string;
    package?: {
      name: string;
    };
  };
}

const Transactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchFilters, setSearchFilters] = useState({
    transactionId: '',
    user: '',
    package: '',
    amount: '',
    paymentMethod: '',
    paymentStatus: '',
    date: '',
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchFilters, transactions]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/transactions/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTransactions(response.data);
      setFilteredTransactions(response.data);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    const filtered = transactions.filter((transaction) => {
      return (
        (searchFilters.transactionId
          ? transaction.transactionId?.toLowerCase().includes(searchFilters.transactionId.toLowerCase())
          : true) &&
        (searchFilters.user
          ? transaction.user?.name.toLowerCase().includes(searchFilters.user.toLowerCase())
          : true) &&
        (searchFilters.package
          ? transaction.subscription?.package?.name
              ?.toLowerCase()
              .includes(searchFilters.package.toLowerCase())
          : true) &&
        (searchFilters.amount
          ? transaction.amount.toString().includes(searchFilters.amount)
          : true) &&
        (searchFilters.paymentMethod
          ? transaction.paymentMethod.toLowerCase().includes(searchFilters.paymentMethod.toLowerCase())
          : true) &&
        (searchFilters.paymentStatus
          ? transaction.paymentStatus.toLowerCase().includes(searchFilters.paymentStatus.toLowerCase())
          : true) &&
        (searchFilters.date
          ? new Date(transaction.createdAt).toLocaleDateString().includes(searchFilters.date)
          : true)
      );
    });
    setFilteredTransactions(filtered);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>, column: string) => {
    setSearchFilters({ ...searchFilters, [column]: e.target.value });
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredTransactions.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);

  return (
    <AdminDashboardLayout title="Transactions" user={user}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">All Transactions</h2>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading transactions...</div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Input
                      placeholder="Search Transaction ID"
                      value={searchFilters.transactionId}
                      onChange={(e) => handleSearchChange(e, 'transactionId')}
                      className="w-full"
                    />
                  </TableHead>
                  <TableHead>
                    <Input
                      placeholder="Search User"
                      value={searchFilters.user}
                      onChange={(e) => handleSearchChange(e, 'user')}
                      className="w-full"
                    />
                  </TableHead>
                  <TableHead>
                    <Input
                      placeholder="Search Package"
                      value={searchFilters.package}
                      onChange={(e) => handleSearchChange(e, 'package')}
                      className="w-full"
                    />
                  </TableHead>
                  <TableHead>
                    <Input
                      placeholder="Search Amount"
                      value={searchFilters.amount}
                      onChange={(e) => handleSearchChange(e, 'amount')}
                      className="w-full"
                    />
                  </TableHead>
                  <TableHead>
                    <Input
                      placeholder="Search Payment Method"
                      value={searchFilters.paymentMethod}
                      onChange={(e) => handleSearchChange(e, 'paymentMethod')}
                      className="w-full"
                    />
                  </TableHead>
                  <TableHead>
                    <Input
                      placeholder="Search Status"
                      value={searchFilters.paymentStatus}
                      onChange={(e) => handleSearchChange(e, 'paymentStatus')}
                      className="w-full"
                    />
                  </TableHead>
                  <TableHead>
                    <Input
                      placeholder="Search Date"
                      value={searchFilters.date}
                      onChange={(e) => handleSearchChange(e, 'date')}
                      className="w-full"
                    />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentRows.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.transactionId || '-'}</TableCell>
                    <TableCell>{transaction.user?.name || `User ${transaction.userId}`}</TableCell>
                    <TableCell>
                      {transaction.subscription?.package?.name || `Subscription ${transaction.subscribePackageId}`}
                    </TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>{transaction.paymentMethod}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(transaction.paymentStatus)}`}>
                        {transaction.paymentStatus}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
                   
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </Button>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default Transactions;