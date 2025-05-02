import { useAuth } from "../../useAuth";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "./DashboardLayout";
import { WelcomeCard } from "./WelcomeCard";

const VendorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCompleteProfile = () => {
    navigate("/vendor/profile/complete");
  };

  return (
    <DashboardLayout title="Vendor Dashboard" user={user}>
      <div className="space-y-6">
        {user && (
          <WelcomeCard user={user} onCompleteProfile={handleCompleteProfile} />
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