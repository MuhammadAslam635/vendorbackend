import { useState } from "react";
import { AdminDashboardLayout } from "../layout/AdminDashboardLayout";
import { useAuth } from "../../../useAuth";
import { toast } from "react-toastify";
import { Input } from "../../../components/ui/input";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Label } from "../../../components/ui/label";

interface CreateUserProps {
    name: string;
    email: string;
    phone: string;
    utype: string;
    status: string;
    password: string; // Assuming password is required for user creation
}

const CreateUser = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState<CreateUserProps>({
        name: '',
        email: '',
        phone: '',
        utype: '',
        status: '',
        password: '' // Initialize password field
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setIsLoading(true);

        // Basic validation
        if (!userData.name || !userData.email || !userData.phone || !userData.utype || !userData.status) {
            setError('All fields are required');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/admin/create-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create user');
            }

            const data = await response.json();
            console.log('User created:', data);
            // Show success message
            const successMessage = data.message || 'User created successfully';
            setSuccess(successMessage);
            toast.success(successMessage);
            
            // Reset form
            setUserData({
                name: '',
                email: '',
                phone: '',
                utype: '',
                status: '',
                password: '' // Reset password field
            });
        } catch (e: any) {
            const errorMessage = e.message || 'An error occurred while creating the user';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AdminDashboardLayout title="Admin Dashboard" user={user}>
            <div className="space-y-6">
                <Card className="max-w-5xl mx-auto p-6">
                    <CardHeader>
                        <h1 className="text-2xl font-bold">Create User</h1>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700">Name</Label>
                                    <Input
                                        type="text"
                                        value={userData.name}
                                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700">Email</Label>
                                    <Input
                                        type="email"
                                        value={userData.email}
                                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700">Phone</Label>
                                    <Input
                                        type="tel"
                                        value={userData.phone}
                                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700">Password</Label>
                                    <Input
                                        type="text"
                                        value={userData.password}
                                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700">User Type</Label>
                                    <Select
                                        value={userData.utype}
                                        onValueChange={(value) => setUserData({ ...userData, utype: value })}
                                        disabled={isLoading}
                                    >
                                        <SelectTrigger className="mt-1 w-full">
                                            <SelectValue placeholder="Select User Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ADMIN">Admin</SelectItem>
                                            <SelectItem value="VENDOR">Vendor</SelectItem>
                                            <SelectItem value="SUBADMIN">Sub Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700">Status</Label>
                                    <Select
                                        value={userData.status}
                                        onValueChange={(value) => setUserData({ ...userData, status: value })}
                                        disabled={isLoading}
                                    >
                                        <SelectTrigger className="mt-1 w-full">
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ACTIVE">Active</SelectItem>
                                            <SelectItem value="INACTIVE">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            
                            {error && (
                                <div className="text-red-500 text-sm mt-2">
                                    {error}
                                </div>
                            )}
                            
                            {success && (
                                <div className="text-green-500 text-sm mt-2">
                                    {success}
                                </div>
                            )}
                            
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Creating...' : 'Create User'}
                                </button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminDashboardLayout>
    );
};

export default CreateUser;