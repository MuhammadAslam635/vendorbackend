import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Eye, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../../useAuth';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import { Button } from '../../../components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from '../../../components/ui/input';
import { AdminDashboardLayout } from '../layout/AdminDashboardLayout';

interface User {
    id: number;
    name: string;
    email: string;
    status: 'PENDING' | 'ACTIVE' | 'SUSPENDED';
    createdAt: string;
    vendor?: {
        company: string;
        businessName: string;
        state: string;
        city: string;
        zipcode: string;
        address: string;
        country: string;
        companyLogo: string;
        profileImg: string;
    };
}

const Vendors = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        fetchVendors();
    }, []);

    useEffect(() => {
        applySearchFilter();
    }, [searchQuery, users]);

    const fetchVendors = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(response.data);
            setFilteredUsers(response.data);
        } catch (error) {
            toast.error('Failed to fetch vendors');
        } finally {
            setLoading(false);
        }
    };

    const applySearchFilter = () => {
        const filtered = users.filter((user) => {
            const query = searchQuery.toLowerCase();
            return (
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.vendor?.company?.toLowerCase().includes(query) ||
                user.vendor?.address?.toLowerCase().includes(query) ||
                user.vendor?.city?.toLowerCase().includes(query) ||
                user.vendor?.state?.toLowerCase().includes(query) ||
                user.vendor?.country?.toLowerCase().includes(query)
            );
        });
        setFilteredUsers(filtered);
    };

    const handleStatusUpdate = async (vendorId: number, currentStatus: string) => {
        let newStatus;

        switch (currentStatus) {
            case 'PENDING':
                newStatus = 'ACTIVE';
                break;
            case 'ACTIVE':
                newStatus = 'SUSPENDED';
                break;
            case 'SUSPENDED':
                newStatus = 'ACTIVE';
                break;
            default:
                newStatus = currentStatus;
        }

        try {
            await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}/user/${vendorId}/status`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            toast.success('Vendor status updated successfully');
            fetchVendors();
        } catch (error) {
            toast.error('Failed to update vendor status');
        }
    };

    const handleDelete = async (vendorId: number) => {
        if (!window.confirm('Are you sure you want to delete this vendor?')) {
            return;
        }

        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/${vendorId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success('Vendor deleted successfully');
            fetchVendors();
        } catch (error) {
            toast.error('Failed to delete vendor');
        }
    };

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return 'bg-green-100 text-green-800';
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'SUSPENDED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

    return (
        <AdminDashboardLayout title="Manage Vendors" user={user}>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Vendors</h2>
                    <Input
                        type="text"
                        placeholder="Search vendors..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-1/3"
                    />
                </div>

                {loading ? (
                    <div className="text-center py-8">Loading vendors...</div>
                ) : (
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Business</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentRows.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.vendor?.company || 'Not set'}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeColor(user.status)}`}>
                                                {user.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setSelectedUser(user)}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Vendor Details</DialogTitle>
                                                        </DialogHeader>
                                                        {selectedUser && (
                                                            <div className="space-y-6">
                                                                {/* Personal Information */}
                                                                <div className="p-4 border rounded-lg shadow-md bg-white">
                                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h3>
                                                                    <p className="text-gray-600">
                                                                        <span className="font-medium">Name:</span> {selectedUser.name}
                                                                    </p>
                                                                    <p className="text-gray-600">
                                                                        <span className="font-medium">Email:</span> {selectedUser.email}
                                                                    </p>
                                                                </div>

                                                                {/* Business Information */}
                                                                {selectedUser.vendor && (
                                                                    <div className="p-4 border rounded-lg shadow-md bg-white">
                                                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Business Information</h3>
                                                                        <div className="flex items-center space-x-4">
                                                                            <img
                                                                                src={selectedUser.vendor.companyLogo}
                                                                                alt={`${selectedUser.vendor.company} Logo`}
                                                                                className="w-16 h-16 object-cover rounded-full border"
                                                                            />
                                                                            <div>
                                                                                <p className="text-gray-800 text-lg font-medium">{selectedUser.vendor.company}</p>
                                                                                <p className="text-gray-600 text-sm">{selectedUser.vendor.address}</p>
                                                                                <p className="text-gray-600 text-sm">
                                                                                    {selectedUser.vendor.city}, {selectedUser.vendor.state}, {selectedUser.vendor.country} - {selectedUser.vendor.zipcode}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </DialogContent>
                                                </Dialog>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleStatusUpdate(user.id, user.status)}
                                                    title={
                                                        user.status === 'PENDING'
                                                            ? 'Approve vendor'
                                                            : user.status === 'ACTIVE'
                                                                ? 'Suspend vendor'
                                                                : 'Activate vendor'
                                                    }
                                                >
                                                    {user.status === 'PENDING' ? (
                                                        <CheckCircle className="h-4 w-4 text-yellow-500" />
                                                    ) : user.status === 'ACTIVE' ? (
                                                        <XCircle className="h-4 w-4 text-red-500" />
                                                    ) : (
                                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                                    )}
                                                </Button>

                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
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
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss theme="light" />
        </AdminDashboardLayout>
    );
};

export default Vendors;