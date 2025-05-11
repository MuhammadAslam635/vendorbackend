import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "./DashboardLayout";
import UserProfilesCard from "./UserProfileCard";
import { User } from '../../ProtectedRouteProps';
import axios from 'axios';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleCompleteProfile = () => {
    navigate("/vendor/profile/complete");
  };

  return (
    <DashboardLayout title="Vendor Dashboard" user={user}>
      <div className="space-y-6">
        {user && (
          <UserProfilesCard 
            user={user} // Type assertion since we know the structure matches
            onCompleteProfile={handleCompleteProfile} 
          />
        )}
        
        {/* Dashboard Content */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Add your dashboard cards/stats here */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VendorDashboard;