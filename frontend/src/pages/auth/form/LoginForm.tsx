import { useState } from "react";
import { ArrowLeft, LogIn } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import { useAuth } from "../../../useAuth";

interface LoginFormData {
    email: string;
    password: string;
    remember: boolean;
}

interface ApiError {
    response?: {
        data?: {
            message?: string;
            error?: string;
            statusCode?: number;
        };
        status?: number;
    };
}

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // Use the hook properly
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
        remember: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleCheckboxChange = (checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            remember: checked
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
                email: formData.email,
                password: formData.password
            });

            if (response.data?.access_token && response.data?.user) {
                // Store token in localStorage if remember me is checked
                if (formData.remember) {
                    localStorage.setItem('token', response.data.access_token);
                } else {
                    // Use sessionStorage if remember me is not checked
                    sessionStorage.setItem('token', response.data.access_token);
                }
                
                // Update auth state using the hook properly
                login(response.data.user, response.data.access_token);
                
                toast.success("Login successful!");
                
                // Redirect based on user type
                console.log("user", response.data.user);
                
                // Use setTimeout to ensure state updates complete before navigation
                setTimeout(() => {
                    switch (response.data.user.utype) {
                        case "ADMIN":
                        case "SUBADMIN":
                            navigate("/admin/dashboard");
                            break;
                        case "VENDOR":
                            navigate("/vendor/dashboard");
                            break;
                        default:
                            navigate("/");
                    }
                }, 100);
            }
        } catch (error) {
            console.error("Login error:", error);
            const apiError = error as ApiError;

            if (apiError.response?.data?.message) {
                toast.error(apiError.response.data.message);
            } else if (apiError.response?.status === 401) {
                toast.error("Invalid email or password. Please try again.");
            }else {
                toast.error("Login failed. Please check your credentials and try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto">
                <Link to="/" className="inline-flex items-center text-sm text-[#a0b830] mb-6 hover:text-purple-800 transition duration-300">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Home
                </Link>
                
                <Card className="shadow-lg rounded-lg border border-gray-200">
                    <form onSubmit={handleSubmit}>
                        <CardHeader className="space-y-1 text-center">
                            <div className="flex items-center justify-center mb-2">
                                <div className="bg-purple-100 p-3 rounded-full shadow-md">
                                    <LogIn className="h-8 w-8 text-[#a0b830]" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
                            <CardDescription className="text-gray-600">
                                Enter your credentials to access your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email" 
                                    type="email" 
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="john.doe@example.com" 
                                    className="border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                                    required 
                                    disabled={isLoading}
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link to="/forgot-password" className="text-sm text-[#a0b830] hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                                <Input 
                                    id="password" 
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                                    required 
                                    disabled={isLoading}
                                />
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember" 
                                    checked={formData.remember}
                                    onCheckedChange={handleCheckboxChange}
                                    disabled={isLoading}
                                />
                                <Label htmlFor="remember" className="text-sm">Remember me</Label>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button 
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#a0b830] hover:bg-[#8fa029] text-white transition duration-300 disabled:opacity-50"
                            >
                                {isLoading ? "Signing in..." : "Sign In"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
                
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-[#a0b830] font-medium hover:underline">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </main>
    );
};

export default LoginForm;