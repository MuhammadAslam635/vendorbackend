import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { 
  Building2, 
  MapPin, 
  User, 
  Package, 
  Store, 
  Calendar, 
  CheckCircle,
  Facebook,
  Instagram,
  Linkedin,
  Globe,
  Mail,
  Award,
  Pin,
  Youtube
} from "lucide-react";
import { format } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import { VendorProfile } from "../../ProtectedRouteProps";



interface UserProfile {
  id: number;
  name: string;
  email: string;
  status: string;
  packageActive: string;
  profiles?: VendorProfile[];
}

interface UserProfilesCardProps {
  user: UserProfile;
  onCompleteProfile: () => void;
}

const UserProfilesCard: React.FC<UserProfilesCardProps> = ({ user: initialUser, onCompleteProfile }) => {
  const [user, setUser] = useState<UserProfile | null>(initialUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        setUser(response.data);
        
        // Store only the user data (without profiles) in localStorage
        const { profiles, ...userData } = response.data;
        localStorage.setItem('userData', JSON.stringify(userData));
      } catch (err: any) {
        console.error("Error fetching user data:", err);
        setError(err.response?.data?.message || "Failed to load user data");
        toast.error("Failed to load user profiles");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const renderStatusBadge = (status: string) => {
    const statusConfig = {
      ACTIVE: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
      PENDING: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200" },
      SUSPENDED: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
      BLOCKED: { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text} ${config.border}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a0b830]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">No data! </strong>
        <span className="block sm:inline">No user profile data found.</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Your Profiles</h2>
        <Button 
          className="bg-[#a0b830] hover:bg-[#8fa029] text-white"
          onClick={() => {
            onCompleteProfile();
            window.location.href = "/vendor/create/profile";
          }}
        >
          <Store className="w-4 h-4 mr-2" />
          Create New Profile
        </Button>
      </div>

      {user.status !== 'ACTIVE' && (
        <div className={`
          ${user.status === 'PENDING' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 
           user.status === 'SUSPENDED' ? 'bg-red-50 border-red-200 text-red-800' : 
           'bg-gray-50 border-gray-200 text-gray-800'}
          border rounded-lg p-4 mb-6
        `}>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {user.status === 'PENDING' ? (
                <Award className="h-5 w-5 text-yellow-400" />
              ) : (
                <User className="h-5 w-5 text-red-400" />
              )}
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium">
                Account Status: {user.status}
              </h3>
              <div className="mt-2 text-sm">
                <p>
                  {user.status === 'PENDING' 
                    ? 'Your account is pending approval. You can create profiles, but they will not be visible until your account is approved.' 
                    : 'Your account has been restricted. Please contact support for assistance.'}
                </p>
              </div>
              {user.status !== 'PENDING' && (
                <div className="mt-4">
                  <Button 
                    size="sm"
                    variant="outline" 
                    className="text-sm"
                    onClick={() => window.location.href = "/"}
                  >
                    Contact Support
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {user.packageActive === 'NO' && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Package className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3 flex justify-between w-full items-center">
              <div>
                <h3 className="text-sm font-medium">
                  No Active Package
                </h3>
                <div className="mt-2 text-sm">
                  <p>
                    You need to subscribe to a package to unlock all features.
                  </p>
                </div>
              </div>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => window.location.href = "/vendor/subscriptions"}
              >
                <Package className="w-4 h-4 mr-2" />
                View Packages
              </Button>
            </div>
          </div>
        </div>
      )}

      {user?.profiles && user.profiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.profiles.map((profile) => (
            <Card
              key={profile.id}
              className="group hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden bg-white"
            >
              <CardHeader className="relative p-0">
                <div className="w-full h-48 bg-gradient-to-br from-[#a0b830] to-[#8fa029] rounded-t-lg overflow-hidden">
                  {profile.companyLogo ? (
                    <img
                      src={profile.companyLogo}
                      alt={`${profile.company || profile.businessName} Logo`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 className="w-16 h-16 text-white/50" />
                    </div>
                  )}
                  
                  
                  
                  {/* Status badge */}
                  <div className="absolute top-4 right-4">
                    {renderStatusBadge('ACTIVE')}
                  </div>
                </div>
                
                <div className="p-6 pt-12">
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-[#a0b830] transition-colors duration-300">
                    {profile.company || profile.businessName}
                  </CardTitle>
                  
                  {/* Location info */}
                  <div className="space-y-2 mt-3">
                    {profile.address && (
                      <CardDescription className="text-gray-600 flex items-start">
                        <Pin className="w-4 h-4 mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span>{profile.address}</span>
                      </CardDescription>
                    )}
                    
                    {(profile.city || profile.state || profile.country) && (
                      <CardDescription className="text-gray-600 flex items-start">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span>
                          {[profile.city, profile.state, profile.country]
                            .filter(Boolean)
                            .join(', ')}
                        </span>
                      </CardDescription>
                    )}
                    
                    {/* Creation date */}
                    <CardDescription className="text-gray-500 flex items-center text-xs">
                      <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                      <span>Created {format(new Date(profile.createdAt), 'MMM dd, yyyy')}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 pt-0">
                <div className="flex flex-col space-y-4">
                  {/* Verification badge */}
                  <div className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    <span className="text-sm">Verified Business</span>
                  </div>
                  
                  {/* Contact info */}
                  <div className="space-y-2">
                    {user.email && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        <a href={`mailto:${user.email}`} className="hover:text-[#a0b830] transition-colors">
                          {user.email}
                        </a>
                      </div>
                    )}
                    
                  </div>
                  
                  {/* Social media links */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {profile.webUrl && (
                      <a 
                        href={profile.webUrl.startsWith('http') ? profile.webUrl : `https://${profile.webUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-200 hover:border-[#a0b830] hover:bg-[#a0b830]/10 transition-all duration-300"
                        >
                          <Globe className="w-4 h-4 text-[#a0b830]" />
                        </Button>
                      </a>
                    )}
                    
                    {profile.fb && (
                      <a 
                        href={profile.fb.startsWith('http') ? profile.fb : `https://${profile.fb}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-200 hover:border-[#1877F2] hover:bg-[#1877F2]/10 transition-all duration-300"
                        >
                          <Facebook className="w-4 h-4 text-[#1877F2]" />
                        </Button>
                      </a>
                    )}
                    
                    {profile.ln && (
                      <a 
                        href={profile.ln.startsWith('http') ? profile.ln : `https://${profile.ln}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-200 hover:border-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-all duration-300"
                        >
                          <Linkedin className="w-4 h-4 text-[#1DA1F2]" />
                        </Button>
                      </a>
                    )}
                    
                    {profile.in && (
                      <a 
                        href={profile.in.startsWith('http') ? profile.in : `https://${profile.in}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-200 hover:border-[#E4405F] hover:bg-[#E4405F]/10 transition-all duration-300"
                        >
                          <Instagram className="w-4 h-4 text-[#E4405F]" />
                        </Button>
                      </a>
                    )}
                    
                    {profile.yt && (
                      <a 
                          href={profile.yt.startsWith('http') ? profile.yt : `https://${profile.yt}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-200 hover:border-[#0077B5] hover:bg-[#0077B5]/10 transition-all duration-300"
                        >
                          <Youtube className="w-4 h-4 text-[#0077B5]" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
             
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
          <Store className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Profiles Yet</h3>
          <p className="text-gray-600 mb-6">You haven't created any business profiles yet. Create your first profile to start selling.</p>
          <Button 
            className="bg-[#a0b830] hover:bg-[#8fa029] text-white"
            onClick={() => {
              onCompleteProfile();
              window.location.href = "/vendor/create/profile";
            }}
          >
            <Store className="w-4 h-4 mr-2" />
            Create First Profile
          </Button>
        </div>
      )}
      
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default UserProfilesCard;