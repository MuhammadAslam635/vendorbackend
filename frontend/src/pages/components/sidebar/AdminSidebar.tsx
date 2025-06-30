import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { useAuth } from "../../../useAuth";
import { LayoutDashboard, Package, ShoppingCart, LogOutIcon, Users, Lock } from "lucide-react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      logout();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  const location = useLocation();

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">Menu</h2>
      </div>

      <nav className="flex-1 px-2 py-2">
        <div className="space-y-1">
          <Link
            to="/admin/dashboard"
            className={`flex items-center w-full px-4 py-2 rounded-md ${isActiveRoute("/admin/dashboard")
                ? "bg-[#a0b830] text-white"
                : "hover:bg-gray-100 text-gray-700"
              }`}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
          {user && user.utype === "ADMIN" && (
            <Link
              to="/admin/create-user"
              className={`flex items-center w-full px-4 py-2 rounded-md ${isActiveRoute("/admin/create-user")
                  ? "bg-[#a0b830] text-white"
                  : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              <Users className="mr-2 h-4 w-4" />
              Create User
            </Link>
          )}

          <Link
            to="/admin/packages"
            className={`flex items-center w-full px-4 py-2 rounded-md ${isActiveRoute("/admin/packages")
                ? "bg-[#a0b830] text-white"
                : "hover:bg-gray-100 text-gray-700"
              }`}
          >
            <Package className="mr-2 h-4 w-4" />
            Packages
          </Link>

          <Link
            to="/admin/transactions"
            className={`flex items-center w-full px-4 py-2 rounded-md ${isActiveRoute("/admin/transactions")
                ? "bg-[#a0b830] text-white"
                : "hover:bg-gray-100 text-gray-700"
              }`}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Transactions
          </Link>
          {user && user.utype === "ADMIN" && (
            <Link
              to="/admin/users"
            className={`flex items-center w-full px-4 py-2 rounded-md ${isActiveRoute("/admin/users")
                ? "bg-[#a0b830] text-white"
                : "hover:bg-gray-100 text-gray-700"
              }`}
            >
            <Users className="mr-2 h-4 w-4" />
            All Users
          </Link>
          )}
        <Link
          to="/admin/reset-password"
          className={`flex items-center w-full px-4 py-2 rounded-md ${isActiveRoute("/admin/reset-password")
              ? "bg-[#a0b830] text-white"
              : "hover:bg-gray-100 text-gray-700"
            }`}
        >
          <Lock className="mr-2 h-4 w-4" />
          Reset Password
        </Link>
    </div>
      </nav >

  <div className="border-t p-4">
    <div className="flex items-center gap-4 mb-4">
      <Avatar>
        <AvatarImage src="/placeholder.png" alt={user?.name} />
        <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">{user?.name}</p>
        <p className="text-xs text-gray-500">{user?.email}</p>
      </div>
    </div>
    <Button
      variant="destructive"
      className="w-full justify-start text-white hover:text-white"
      onClick={handleLogout}
    >
      <LogOutIcon className="mr-2 h-4 w-4" />
      Logout
    </Button>
  </div>
    </div >
  );
};

export default AdminSidebar;