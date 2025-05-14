import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "./DashboardLayout";
import UserProfilesCard, { UserProfile } from "./UserProfileCard";
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
    navigate("/vendor/profile/update");
  };

  // Function to safely transform User to UserProfile
  const getUserProfile = (user: User): UserProfile => {
    return {
      ...user,
      zipcodes: user.zipcodes || [] // Ensure zipcodes is always an array
    };
  };

  return (
    <DashboardLayout title="Vendor Dashboard" user={user}>
      <div className="space-y-6">
        {user && (
          <UserProfilesCard 
            user={getUserProfile(user)}
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