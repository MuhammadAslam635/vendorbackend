import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";

const ResetForm =()=>{
    return(
    <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <a href="/login" className="inline-flex items-center text-sm text-[#a0b830] mb-6 hover:text-purple-800">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Login
          </a>
          
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-2">
                <div className="bg-purple-100 p-3 rounded-full">
                  <ShieldCheck className="h-8 w-8 text-[#a0b830]" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
              <CardDescription className="text-center">
                Create a new password for your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input id="password" type="password" />
                <p className="text-xs text-gray-500">Password must be at least 8 characters with a number and special character</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Reset Password</Button>
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
)}
export default ResetForm;