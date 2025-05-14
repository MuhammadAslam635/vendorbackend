import { useState, useEffect } from "react";
import { CheckCircle, Facebook, Globe, Instagram, Linkedin, MapPin, Pin, Twitter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

// Define the interface for the data structure
interface ZipcodeWithUser {
  id: number;
  zipcode: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: string;
    address: string;
    city: string;
    state: string;
    country: string;
    companyLogo: string;
    packageActive: string;
    fb: string;
    in: string;
    ln: string;
    yt: string;
    webUrl: string;
    addedzipcodes: number;
    totalzipcodes: number;
  };
}

const Vendors = ({ vendors }: { vendors: ZipcodeWithUser[] }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredVendors, setFilteredVendors] = useState<ZipcodeWithUser[]>(vendors);
    
    useEffect(() => {
        setFilteredVendors(vendors);
    }, [vendors]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        
        if (!vendors || vendors.length === 0) return;
        
        const filtered = vendors.filter((vendor) => {
            const user = vendor.user;
            return (
                user.company.toLowerCase().includes(query) ||
                user.city.toLowerCase().includes(query) ||
                user.country.toLowerCase().includes(query) ||
                user.address.toLowerCase().includes(query) ||
                vendor.zipcode.toLowerCase().includes(query)
            );
        });
        
        setFilteredVendors(filtered);
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-4 bg-[#a0b830] bg-clip-text text-transparent">
                    Top Vendors
                </h2>
                <p className="text-center text-gray-600 mb-12">
                    Discover top-rated service providers in your area
                </p>

                {/* Search Input */}
                <div className="mb-8">
                    <Input
                        type="text"
                        placeholder="Search by company name, address, city, country, etc."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full p-4 border border-gray-300 rounded-lg"
                    />
                </div>

                {/* Vendor Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
                    {filteredVendors && filteredVendors.length > 0 ? (
                        filteredVendors.map((vendorData) => {
                            const vendor = vendorData.user;
                            return (
                                <Card
                                    key={`${vendorData.id}-${vendor.id}`}
                                    className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 overflow-hidden"
                                >
                                    <CardHeader className="relative p-0">
                                        <div className="w-full h-48 bg-[#a0b830] rounded-t-lg mb-4 overflow-hidden">
                                            <img
                                                src={vendor.companyLogo}
                                                alt={`${vendor.company} Logo`}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-[#a0b830]">
                                                {vendor.packageActive === "YES" ? "Featured" : "Basic"}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <CardTitle className="text-xl font-bold bg-[#a0b830] bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                                                {vendor.company}
                                            </CardTitle>
                                            <CardDescription className="text-gray-600 mt-2 flex items-center">
                                                <Pin className="w-4 h-4 mr-2 text-gray-400" />
                                                {vendor.address}, {vendorData.zipcode}
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
                                                    onClick={() => window.open(vendor.fb, '_blank')}
                                                >
                                                    <Facebook className="w-4 h-4 text-[#1877F2]" />
                                                </Button>
                                            )}
                                            {vendor.yt && (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                                                    onClick={() => window.open(vendor.yt, '_blank')}
                                                >
                                                    <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                                                </Button>
                                            )}
                                            {vendor.in && (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                                                    onClick={() => window.open(vendor.in, '_blank')}
                                                >
                                                    <Instagram className="w-4 h-4 text-[#E4405F]" />
                                                </Button>
                                            )}
                                            {vendor.ln && (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                                                    onClick={() => window.open(vendor.ln, '_blank')}
                                                >
                                                    <Linkedin className="w-4 h-4 text-[#0077B5]" />
                                                </Button>
                                            )}
                                            {vendor.webUrl && (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                                                    onClick={() => window.open(vendor.webUrl, '_blank')}
                                                >
                                                    <Globe className="w-4 h-4 text-[#a0b830]" />
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-8">
                            <p className="text-gray-500">No vendors found matching your search criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Vendors;