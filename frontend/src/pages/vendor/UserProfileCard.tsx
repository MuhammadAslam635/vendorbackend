import { User, Zipcode } from '../../ProtectedRouteProps';
import { Building2, MapPin, Mail, Phone, Package} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';
import CardInfoItem from '../../CardInfoItem';

export interface UserProfile extends Omit<User, 'zipcodes' | 'packageActive'> {
  zipcodes: Zipcode[];
  packageActive?: string;
}

interface UserProfileCardProps {
  user: UserProfile;
  onCompleteProfile: () => void;
}

const UserProfileCard = ({ user, onCompleteProfile }: UserProfileCardProps) => {
  const isProfileComplete = user.company && user.businessName && user.address;
  const isPackageActive = user.packageActive === 'YES';

  if (!isPackageActive) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto">
        <div className="text-center py-8">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            No Active Package
          </h2>
          <p className="text-gray-600 mb-6">
            Please subscribe to a package to access all features
          </p>
          <Link to="/vendor/subscriptions">
            <Button className="bg-[#a0b830] hover:bg-[#8fa029] text-white">
              View Subscription Plans
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          {user.companyLogo ? (
            <img 
              src={user.companyLogo} 
              alt="Company Logo" 
              className="w-16 h-16 rounded-full object-cover border-2 border-[#a0b830]"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          {!isProfileComplete && (
            <Button 
              onClick={onCompleteProfile}
              className="bg-[#a0b830] hover:bg-[#8fa029] text-white"
            >
              Update Profile
            </Button>
          )}
        </div>
      </div>

      {/* Company Details Section */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Building2 className="w-5 h-5 mr-2 text-[#a0b830]" />
          Company Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardInfoItem label="Business Name" value={user.businessName} />
          <CardInfoItem label="Company" value={user.company} />
          <CardInfoItem label="Phone" value={user.phone} icon={Phone} />
          <CardInfoItem label="Address" value={user.address} icon={MapPin} />
          <CardInfoItem label="City" value={user.city} />
          <CardInfoItem label="State" value={user.state} />
          <CardInfoItem label="Country" value={user.country} />
        </div>
      </div>

      {/* Zipcodes Section */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-[#a0b830]" />
            Service Areas
          </h3>
          <span className="text-sm text-gray-600">
            {user.zipcodes.length} ZIP codes added
          </span>
        </div>
        {user.zipcodes.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {user.zipcodes.map((zipcode) => (
              <span 
                key={zipcode.id} 
                className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 border border-gray-200 hover:border-[#a0b830] transition-colors"
              >
                {zipcode.zipcode}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No ZIP codes added yet</p>
        )}
      </div>

      {/* Package Status */}
      <div className="mt-6 text-center">
        <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium">
          <Package className="w-4 h-4 mr-2" />
          Active Package
        </span>
      </div>
    </div>
  );
};



export default UserProfileCard;