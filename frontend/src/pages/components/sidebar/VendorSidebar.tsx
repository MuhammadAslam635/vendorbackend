import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { useAuth } from "../../../useAuth";
import {LayoutDashboard, Package, ShoppingCart, Settings, LogOutIcon } from "lucide-react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

const VendorSidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            logout();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast.success('Logged out successfully');
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Failed to logout. Please try again.');
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
                    <Button
                        variant={isActiveRoute("/vendor/dashboard") ? "secondary" : "ghost"}
                        className="w-full justify-start"
                    >
                        <Link to="/vendor/dashboard" className="flex items-center">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        My Profile
                        </Link>
                    </Button>
                    <Button
                        variant={isActiveRoute("/my-ads") ? "secondary" : "ghost"}
                        className="w-full justify-start"
                    >
                        <Link to="/my-ads" className="flex items-center">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        My Ads</Link>
                    </Button>
                    
                    
                        <Button
                            variant={isActiveRoute("/vendor/subscriptions") ? "secondary" : "ghost"}
                            className="w-full justify-start"
                        >
                            <Link to="/vendor/subscriptions" className="flex items-center">
                                <Package className="mr-2 h-4 w-4" />
                                Packages
                            </Link>
                        </Button>
                  
                    <Button
                        variant={isActiveRoute("/vendor/transactions") ? "secondary" : "ghost"}
                        className="w-full justify-start"
                    >
                        <Link to="/vendor/transactions" className="flex items-center">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Transaction</Link>
                    </Button>
                    
                    {/* <Button
                        variant={isActiveRoute("/vendor/profiles") ? "secondary" : "ghost"}
                        className="w-full justify-start"
                    >
                        <Link to="/vendor/profiles" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Vendor Profile</Link>
                    </Button> */}
                    <Button
                        variant={isActiveRoute("/vendor/reset-password") ? "secondary" : "ghost"}
                        className="w-full justify-start"
                    >
                        <Link to="/vendor/reset-password" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Reset Password</Link>
                    </Button>
                     
                </div>
            </nav>
            
            <div className="border-t p-4">
                <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                        <AvatarImage src="/placeholder.png" alt={user?.name} />
                        <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
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
        </div>
    );
}

export default VendorSidebar;