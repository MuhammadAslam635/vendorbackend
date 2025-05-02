import { ArrowLeft, KeyRound } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";

const ForgetForm = () => {
    return (
        <main className="flex-grow container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto">
                <Link to="/login" className="inline-flex items-center text-sm text-[#a0b830] mb-6 hover:text-purple-800 transition duration-300">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Login
                </Link>
                
                <Card className="shadow-lg rounded-lg border border-gray-200">
                    <CardHeader className="space-y-1 text-center">
                        <div className="flex items-center justify-center mb-2">
                            <div className="bg-purple-100 p-3 rounded-full shadow-md">
                                <KeyRound className="h-8 w-8 text-[#a0b830]" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
                        <CardDescription className="text-gray-600">
                            Enter your email and we'll send you a password reset link
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="john.doe@example.com" className="border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-[#a0b830] hover:bg-[#a0b830] text-white transition duration-300">Send Reset Link</Button>
                    </CardFooter>
                </Card>
                
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Remember your password?{' '}
                        <Link to="/login" className="text-[#a0b830] font-medium hover:underline">
                            Back to login
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default ForgetForm;