import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast,ToastContainer } from 'react-toastify';
import { AdminDashboardLayout } from '../layout/AdminDashboardLayout';
import { Link } from 'react-router-dom';

interface Package {
  id: number;
  name: string;
  price: number;
  duration: number;
  status: string;
  createdAt: string;
}

const AdminPackages = () => {
  const { user } = useAuth();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get('${import.meta.env.VITE_BACKEND_URL}/packages', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPackages(response.data);
    } catch (error) {
      toast.error('Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/packages/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success('Package deleted successfully');
      fetchPackages();
    } catch (error) {
      toast.error('Failed to delete package');
    }
  };

  return (
    <AdminDashboardLayout title="Manage Packages" user={user}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Packages</h2>
          <Button className="bg-[#a0b830] hover:bg-[#8fa029]">
            <Link to="/admin/create-package" className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Package</Link>
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading packages...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <Card key={pkg.id} className="relative">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>{pkg.name}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      pkg.status === 'ACTIVE' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {pkg.status}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold text-[#a0b830]">
                    ${pkg.price}
                    <span className="text-sm text-gray-500 font-normal">
                      /{pkg.duration} year{pkg.duration > 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Link to={`/admin/packages/${pkg.id}/edit`} className="flex items-center">
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit</Link>
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(pkg.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminPackages;