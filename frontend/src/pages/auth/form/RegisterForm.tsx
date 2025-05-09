import { ChangeEvent, useState } from "react";
import { ArrowLeft, UserPlus } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Label } from "recharts";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreeToTerms?: string;
    [key: string]: string | undefined;
}
interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
        status?: number;
    };
}
const RegisterForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });

        // Clear error for this field when user starts typing
        if (errors[id]) {
            setErrors({
                ...errors,
                [id]: ""
            });
        }
    };

    const handleCheckboxChange = (checked: boolean) => {
        setFormData({
            ...formData,
            agreeToTerms: checked
        });

        if (errors.agreeToTerms) {
            setErrors({
                ...errors,
                agreeToTerms: ""
            });
        }
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};

        // Validate first name
        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        // Validate last name
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        // Validate password
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = "Password must be at least 8 characters with a number and special character";
        }

        // Validate confirm password
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        // Validate terms agreement
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = "You must agree to the terms";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
                name: formData.firstName + " " + formData.lastName,
                email: formData.email,
                password: formData.password
            });

            if (response.status === 201 || response.status === 200) {
                toast.success("Registration successful!",{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                navigate("/login");
            }
        } catch (error) {
            console.error("Registration error:", error);

            const apiError = error as ApiError;

            if (apiError.response?.data?.message) {
                toast.error(apiError.response.data.message);
            } else if (apiError.response?.status === 409) {
                toast.error("A user with this email already exists");
            } else {
                toast.error("Registration failed. Please try again later.");
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
                    <CardHeader className="space-y-1 text-center">
                        <div className="flex items-center justify-center mb-2">
                            <div className="bg-purple-100 p-3 rounded-full shadow-md">
                                <UserPlus className="h-8 w-8 text-[#a0b830]" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
                        <CardDescription className="text-gray-600">
                            Enter your information to register for VendorLocator
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>First Name</Label>
                                    <Input
                                        id="firstName"
                                        placeholder="John"
                                        className={`border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 ${errors.firstName ? 'border-red-500' : ''}`}
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                    {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Last Name</Label>
                                    <Input
                                        id="lastName"
                                        placeholder="Doe"
                                        className={`border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 ${errors.lastName ? 'border-red-500' : ''}`}
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                    {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john.doe@example.com"
                                    className={`border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 ${errors.email ? 'border-red-500' : ''}`}
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    className={`border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 ${errors.password ? 'border-red-500' : ''}`}
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <p className="text-xs text-gray-500">Password must be at least 8 characters with a number and special character</p>
                                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    className={`border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onCheckedChange={handleCheckboxChange}
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="terms1"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Accept terms and conditions
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                        You agree to our Terms of Service and Privacy Policy.
                                    </p>
                                </div>
                            </div>
                            {errors.agreeToTerms && <p className="text-xs text-red-500">{errors.agreeToTerms}</p>}
                        </CardContent>
                        <CardFooter>
                            <Button
                                type="submit"
                                className="w-full bg-[#a0b830] hover:bg-[#a0b830] text-white transition duration-300"
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating Account..." : "Create Account"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#a0b830] font-medium hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </main>
        
    );
};

export default RegisterForm;