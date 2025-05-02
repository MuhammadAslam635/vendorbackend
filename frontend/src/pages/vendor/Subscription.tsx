import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import { useAuth } from '../../useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { DashboardLayout } from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Check, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { PaymentModal } from './PaymentModal';
import { Alert, AlertDescription } from '../../components/ui/alert';

interface Package {
  id: number;
  name: string;
  price: number;
  duration: number;
  status: string;
}

const Subscription = () => {
  const { user } = useAuth();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle URL parameters for payment status messages
  const searchParams = new URLSearchParams(location.search);
  const success = searchParams.get('success') === 'true';
  const canceled = searchParams.get('canceled') === 'true';
  const error = searchParams.get('error');

  // Clear URL parameters after displaying status
  useEffect(() => {
    if (success || canceled || error) {
      // Show toast only once when URL params are detected
      if (success) {
        toast.success('Payment successful! Your subscription is now active.');
      } else if (canceled) {
        toast.info('Payment was canceled.');
      } else if (error) {
        toast.error('There was an issue with your payment.');
      }
      
      // Clear URL parameters after a short delay
      const timer = setTimeout(() => {
        navigate('/dashboard/subscription', { replace: true });
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [success, canceled, error, navigate]);

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
      toast.error('Failed to fetch subscription packages');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribeClick = (pkg: Package) => {
    setSelectedPackage(pkg);
  };

  return (
    <DashboardLayout title="Subscriptions" user={user}>
      <div className="max-w-7xl mx-auto py-6 space-y-8">
        {/* Status Alerts */}
        {success && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Your payment was successful! Your subscription is now active.
            </AlertDescription>
          </Alert>
        )}
        
        {canceled && (
          <Alert className="bg-yellow-50 border-yellow-200">
            <XCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              Your payment was canceled. No charges were made.
            </AlertDescription>
          </Alert>
        )}
        
        {error && (
          <Alert className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              There was an error processing your payment. Please try again or contact support.
            </AlertDescription>
          </Alert>
        )}

        <section>
          <h2 className="text-2xl font-bold mb-6">Available Packages</h2>
          {loading ? (
            <div className="text-center py-8">Loading packages...</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <Card key={pkg.id} className="relative overflow-hidden">
                  {pkg.status === 'ACTIVE' && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      Active
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    <p className="text-3xl font-bold text-[#a0b830]">
                      ${pkg.price}
                      <span className="text-sm text-gray-500 font-normal">
                        /{pkg.duration} Year{pkg.duration > 1 ? 's' : ''}
                      </span>
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                   
                    <Button
                      className="w-full bg-[#a0b830] hover:bg-[#8fa029]"
                      onClick={() => handleSubscribeClick(pkg)}
                      disabled={pkg.status === 'INACTIVE'}
                    >
                      {pkg.status === 'ACTIVE' ? 'Subscribe Now' : 'Currently Active'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>

      {selectedPackage && (
        <PaymentModal
          isOpen={!!selectedPackage}
          onClose={() => setSelectedPackage(null)}
          packageId={selectedPackage.id}
          packageName={selectedPackage.name}
          amount={selectedPackage.price}
        />
      )}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </DashboardLayout>
  );
};

export default Subscription;