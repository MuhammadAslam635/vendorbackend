import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, Pin, MapPin, CheckCircle, Loader2, Globe } from "lucide-react";
import { toast } from "react-toastify";
import Header from "./components/home/Header";
import Footer from "./components/home/Footer";
import { Link } from "react-router-dom";

interface VendorProfile {
    id: number;
    company: string;
    address: string;
    city: string;
    state: string;
    country: string;
    companyLogo: string;
    fb: string;
    ln: string;
    in: string;
    yt: string;
    webUrl: string;
    zipcodes: ZipCode[];
}

interface ZipCode {
    id: number;
    zipcode: string;
}

const MyAds = () => {
    const [vendor, setVendor] = useState<VendorProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVendor();
    }, []);

    const fetchVendor = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setVendor(response.data);
        } catch (error) {
            console.error("Error fetching vendor:", error);
            toast.error("Failed to load vendor profile");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-[#a0b830]" />
            </div>
        );
    }

    if (!vendor) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">My Ads</h1>
                    <p className="text-gray-600">No profile found.</p>
                    <Link to="/vendor/dashboard" className="text-blue-500 hover:underline">Return to Dashboard</Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="container max-w-xl mx-auto px-4 py-8 justify-center items-center">
                <div className="mt-10 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">My Ads</h1>
                    <Link to="/vendor/dashboard" className="text-blue-500 hover:underline">Return to Dashboard</Link>
                </div>

                <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                    <CardHeader className="relative p-0">
                        <div className="w-full h-48 bg-[#a0b830] rounded-t-lg mb-4 overflow-hidden">
                            <img
                                src={vendor.companyLogo}
                                alt={`${vendor.company} Logo`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/placeholder-logo.png';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-[#a0b830]">
                                Featured
                            </div>
                        </div>
                        <div className="p-6">
                            <CardTitle className="text-xl font-bold bg-[#a0b830] bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                                {vendor.company}
                            </CardTitle>
                            <CardDescription className="text-gray-600 mt-2 flex items-center">
                                <Pin className="w-4 h-4 mr-2 text-gray-400" />
                                {vendor.address}
                            </CardDescription>
                            <CardDescription className="text-gray-600 mt-2 flex items-center">
                                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                {vendor.city}, {vendor.country}
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-3 mb-4">
                            <div className="flex items-center text-gray-600">
                                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                <span className="text-sm">Verified Business</span>
                            </div>
                            
                            {/* Display Zipcodes */}
                            <div className="mt-4">
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">Service Areas:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {vendor.zipcodes.map((zipcode) => (
                                        <span
                                            key={zipcode.id}
                                            className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                                        >
                                            {zipcode.zipcode}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="flex gap-2">
                            {vendor.fb && (
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                                >
                                    <Link to={vendor.fb} target="_blank">
                                        <Facebook className="w-4 h-4 text-[#1877F2]" />
                                    </Link>
                                </Button>
                            )}
                            {vendor.ln && (
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                                >
                                    <Link to={vendor.ln} target="_blank">
                                        <Linkedin className="w-4 h-4 text-[#0077B5]" />
                                    </Link>
                                </Button>
                            )}
                            {vendor.in && (
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                                >
                                    <Link to={vendor.in} target="_blank">
                                        <Instagram className="w-4 h-4 text-[#E4405F]" />
                                    </Link>
                                </Button>
                            )}
                            {vendor.yt && (
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                                >
                                    <Link to={vendor.yt} target="_blank">
                                        <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                                    </Link>
                                </Button>
                            )}
                            {vendor.webUrl && (
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                                >
                                    <Link to={vendor.webUrl} target="_blank">
                                        <Globe className="w-4 h-4 text-[#a0b830]" />
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default MyAds;