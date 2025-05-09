import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, Pin, MapPin, CheckCircle, Loader2, Search, Globe } from "lucide-react";
import { Input } from "../components/ui/input";
import { toast } from "react-toastify";
import Header from "./components/home/Header";
import Hero from "./components/home/Hero";
import Footer from "./components/home/Footer";
import { Link } from "react-router-dom";

interface VendorProfile {
    id: number;
    company: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    companyLogo: string;
    fb: string;
    ln: string;
    in: string;
    yt: string;
    webUrl: string;
}

const MyAds = () => {
    const [vendors, setVendors] = useState<VendorProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vendor/profiles`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
            });
            setVendors(response.data);
        } catch (error) {
            console.error("Error fetching vendors:", error);
            toast.error("Failed to load vendor profiles");
        } finally {
            setLoading(false);
        }
    };

    // Filter vendors based on search term
    const filteredVendors = vendors.filter((vendor) =>
        Object.values(vendor).some(
            (value) =>
                value &&
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-[#a0b830]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">My Ads</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search vendors..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVendors.map((vendor) => (
                        <Card
                            key={vendor.id}
                            className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 overflow-hidden"
                        >
                            <CardHeader className="relative p-0">
                                <div className="w-full h-48 bg-[#a0b830] rounded-t-lg mb-4 overflow-hidden">
                                    <img
                                        src={`${vendor.companyLogo}`}
                                        alt={`${vendor.company} Logo`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/placeholder-logo.png'; // Add a placeholder image
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
                                        {vendor.address}, {vendor.zipcode}
                                    </CardDescription>
                                    <CardDescription className="text-gray-600 mt-2 flex items-center">
                                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                        {vendor.city}, {vendor.country}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 pt-0">
                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center text-gray-600">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        <span className="text-sm">Verified Business</span>
                                    </div>
                                </div>
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
                                    {vendor.ln &&(
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                                            
                                        >
                                            <Link to={vendor.ln} target="_blank">
                                            <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                                            </Link>
                                        </Button>
                                    )}
                                    {vendor.webUrl &&(
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
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MyAds;