import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Building2, MapPin, User, Package, Store, Calendar } from "lucide-react";
import { format } from "date-fns";

interface User {
  id: number;
  name: string;
  email: string;
  status: 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'BLOCKED';
  packageActive: 'YES' | 'NO';
  vendor?: {
    id: number;
    businessName: string;
    companyLogo: string;
    profileImg: string;
    company?: string;
    state?: string;
    city?: string;
    zipcode?: string;
    address?: string;
    country?: string;
    createdAt: Date;
  } | null;
}

interface WelcomeCardProps {
  user:any;
  onCompleteProfile: () => void;
}

export const WelcomeCard = ({ user, onCompleteProfile }: WelcomeCardProps) => {
  const navigate = useNavigate();
      console.log("object", user);
  const renderContent = () => {
    // Handle suspended or blocked status first
    if (user?.status === 'SUSPENDED' || user?.status === 'BLOCKED') {
      return (
        <div className="bg-red-500/20 border border-red-500/50 rounded-md p-4 mt-4">
          <p className="text-white/90">
            Your account is {user.status.toLowerCase()}. Please contact admin support for assistance.
          </p>
          <Button
            variant="secondary"
            className="mt-3 bg-white text-red-600 hover:bg-white/90"
            onClick={() => navigate('/contact-support')}
          >
            Contact Support
          </Button>
        </div>
      );
    }

    // Handle pending status
    if (user?.status === 'PENDING') {
      return (
        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-md p-4 mt-4">
          <p className="text-white/90">
            Your profile is pending approval. Once approved, you'll be able to add your vendor details and start selling.
          </p>
        </div>
      );
    }

    // Handle active status but no package
    if (user?.packageActive === 'NO') {
      return (
        <div className="bg-blue-500/20 border border-blue-500/50 rounded-md p-4 mt-4">
          <p className="text-white/90">
            Please subscribe to one of our packages to start using the platform.
          </p>
          <Button
            variant="secondary"
            className="mt-3 bg-white text-[#a0b830] hover:bg-white/90"
            onClick={() => navigate('/vendor/subscriptions')}
          >
            <Package className="w-4 h-4 mr-2" />
            Subscribe Now
          </Button>
        </div>
      );
    }

    // Handle active status with package but no vendor profile
    if (!user?.vendor) {
      return (
        <div className="bg-blue-500/20 border border-blue-500/50 rounded-md p-4 mt-4">
          <p className="text-white/90">
            Please complete your vendor profile to start using the platform.
          </p>
          <Button
            variant="secondary"
            className="mt-3 bg-white text-[#a0b830] hover:bg-white/90"
            
          >
            <Link to="/vendor/profile" className="flex items-center">
            <Store className="w-4 h-4 mr-2" />
            Complete Profile
            </Link>
          </Button>
        </div>
      );
    }

    // Active status with package and vendor profile
    return (
      <div className="space-y-6">
        {/* Profile Information */}
        <div className="flex items-start space-x-4">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20">
              {user.vendor.profileImg ? (
                <img
                  src={user.vendor.profileImg}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-white/10 flex items-center justify-center">
                  <User className="w-10 h-10 text-white/60" />
                </div>
              )}
            </div>
          </div>

          {/* Vendor Details */}
          <div className="flex-grow space-y-3">
            {/* Business Info */}
            <div className="flex items-center space-x-2 text-white">
              <Building2 className="w-5 h-5" />
              <span className="font-medium text-lg">
                {user.vendor.company || user.vendor.businessName}
              </span>
            </div>

            {/* Company Logo if exists */}
            {user.vendor.companyLogo && (
              <div className="w-12 h-12 rounded overflow-hidden">
                <img
                  src={user.vendor.companyLogo}
                  alt="Company Logo"
                  className="w-full h-full object-contain bg-white/10"
                />
              </div>
            )}

            {/* Address Info */}
            {user.vendor.address && (
              <div className="flex items-start space-x-2 text-white/80">
                <MapPin className="w-5 h-5 mt-1" />
                <div className="text-sm">
                  <p>{user.vendor.address}</p>
                  <p>
                    {[
                      user.vendor.city,
                      user.vendor.state,
                      user.vendor.zipcode,
                      user.vendor.country
                    ].filter(Boolean).join(', ')}
                  </p>
                </div>
              </div>
            )}

            {/* Member Since */}
            <div className="flex items-center space-x-2 text-white/70 text-sm">
              <Calendar className="w-4 h-4" />
              <span>
                Member since {format(new Date(user.vendor.createdAt), 'MMMM yyyy')}
              </span>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex justify-between items-center pt-4 border-t border-white/20">
          <p className="text-white/90">Manage your store settings and profile</p>
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              className="bg-white text-[#a0b830] hover:bg-white/90"
              onClick={onCompleteProfile}
            >
              <Store className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button
              variant="secondary"
              className="bg-[#8fa029] text-white hover:bg-[#7d8c24]"
              onClick={() => navigate('/vendor/dashboard')}
            >
              <Store className="w-4 h-4 mr-2" />
              View Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-[#a0b830] rounded-lg shadow-lg p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Welcome back, {user?.name}</h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default WelcomeCard;