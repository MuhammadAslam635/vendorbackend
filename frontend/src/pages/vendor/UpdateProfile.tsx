import { useEffect, useState } from "react";
import { useAuth } from "../../useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Building2, Loader2, PlusCircle, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { DashboardLayout } from "./DashboardLayout";
import { Textarea } from "../../components/ui/textarea";
import { Link } from "react-router-dom";
interface VendorProfileForm {
  company: string;
  address: string;
  city: string;
  state: string;
  country: string;
  fb: string;
  ln: string;
  in: string;
  yt: string;
  webUrl: string;
  zipcodes: Zipcode[];
}

// Ensure we match the Zipcode interface structure
interface Zipcode {
  zipcode: string;
}

const UpdateProfile = () => {
  console.log('Component mounting');
  console.log('VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL);

  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [files, setFiles] = useState<{
    companyLogo?: File;
  }>({});

  const [previews, setPreviews] = useState({
    companyLogo: ''
  });

  const [newZipcode, setNewZipcode] = useState("");
  const [formData, setFormData] = useState<VendorProfileForm>({
    company: "",
    address: "",
    city: "",
    state: "",
    zipcodes: [],
    country: "",
    fb: "",
    ln: "",
    in: "",
    yt: "",
    webUrl: "",
  });
  const [existingLogo, setExistingLogo] = useState<string>('');
  
  // Add error state
  const [error, setError] = useState<string | null>(null);
  
  // Track totalZipcodes separately from user object to ensure it's always available
  const [totalZipcodes, setTotalZipcodes] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsFetching(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('No authentication token found');
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Add debug logging
        console.log('Profile data:', response.data);

        // Transform the response data to match our form structure
        const userData = response.data;
        setFormData({
          company: userData.company || "",
          address: userData.address || "",
          city: userData.city || "",
          state: userData.state || "",
          country: userData.country || "",
          fb: userData.fb || "",
          ln: userData.ln || "",
          in: userData.in || "",
          yt: userData.yt || "",
          webUrl: userData.webUrl || "",
          zipcodes: userData.zipcodes || [],
        });
        
        // Store total zipcodes separately to ensure it's always available
        setTotalZipcodes(userData.totalzipcodes || 0);
        setExistingLogo(userData.companyLogo || '');
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error instanceof Error ? error.message : 'Failed to load profile data');
        toast.error("Failed to load profile data");
      } finally {
        setIsFetching(false);
      }
    };
    
    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'companyLogo') => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFiles(prev => ({
        ...prev,
        [field]: file
      }));

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreviews(prev => ({
        ...prev,
        [field]: previewUrl
      }));
    }
  };

  const handleAddZipcode = () => {
    if (!newZipcode.trim()) return;
    
    // Use our separately tracked totalZipcodes instead of relying on user object
    if (formData.zipcodes.length >= totalZipcodes) {
      toast.error(`You can only add up to ${totalZipcodes} ZIP codes. Please upgrade your package.`);
      return;
    }
    
    // Check if the zipcode is already added
    if (formData.zipcodes.some(z => z.zipcode === newZipcode)) {
      toast.error("This zipcode is already added");
      return;
    }
    
    // Add the new zipcode to the list
    setFormData(prev => ({
      ...prev,
      zipcodes: [...prev.zipcodes, { zipcode: newZipcode }]
    }));
    
    setNewZipcode("");
  };

  const handleRemoveZipcode = (code: string) => {
    setFormData(prev => ({
      ...prev,
      zipcodes: prev.zipcodes.filter(z => z.zipcode !== code)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "zipcodes") {
          // Convert zipcodes array to JSON string
          formDataToSend.append("zipcodes", JSON.stringify(value));
        } else if (value) {
          formDataToSend.append(key, value.toString());
        }
      });

      if (files.companyLogo) {
        formDataToSend.append('companyLogo', files.companyLogo);
      }

      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/user/update`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Update local user data if the response includes updated user info
      if (response.data?.user) {
        // Assuming your auth context has a method to update user data
        // If not, you might need to refresh the page or handle it differently
        window.location.href = '/vendor/profiles';
      } else {
        toast.success("Profile updated successfully!");
        window.location.href = '/vendor/profiles';
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      Object.values(previews).forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previews]);

  // Add error display
  if (error) {
    return (
      <DashboardLayout title="Vendor Profile" user={user}>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </DashboardLayout>
    );
  }

  // Make loading state more visible
  if (isFetching) {
    return (
      <DashboardLayout title="Vendor Profile" user={user}>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#a0b830] mx-auto" />
            <p className="mt-2">Loading profile...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Vendor Profile" user={user}>
      <div className="max-w-4xl mx-auto py-6">
        {user?.packageActive == 'NO' ? (
          <div className="bg-red-500 text-white p-4 rounded-md mb-4">
            <p className="mb-5">You are not subscribed to any package. Please subscribe to a package to update your profile.</p>
            <Link to="/vendor/subscriptions" className="bg-[#a0b830] hover:bg-[#8fa029] text-white px-4 py-2 rounded-md my-2">Subscribe</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
            {/* Profile Images Section */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Images</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-1 gap-6">
                <div>
                  <Label htmlFor="companyLogo">Company Logo</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="h-24 w-24 rounded bg-gray-100 flex items-center justify-center">
                      {previews.companyLogo ? (
                        // Show new selected image preview
                        <img
                          src={previews.companyLogo}
                          alt="Company Logo"
                          className="h-24 w-24 rounded object-cover"
                        />
                      ) : existingLogo ? (
                        // Show existing image from server
                        <img
                          src={existingLogo}
                          alt="Company Logo"
                          className="h-24 w-24 rounded object-cover"
                        />
                      ) : (
                        <Building2 className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                    <Input
                      id="companyLogo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'companyLogo')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle>Address Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter street address"
                    rows={3}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter state"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="Enter country"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Zipcode Management */}
            <Card>
              <CardHeader>
                <CardTitle>ZIP Code Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    ZIP codes: {formData.zipcodes.length} of {totalZipcodes} used
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Input
                    id="newZipcode"
                    value={newZipcode}
                    onChange={(e) => setNewZipcode(e.target.value)}
                    placeholder="Enter ZIP code"
                  />
                  <Button 
                    type="button"
                    onClick={handleAddZipcode}
                    className="bg-[#a0b830] hover:bg-[#8fa029] text-white"
                    disabled={formData.zipcodes.length >= totalZipcodes}
                  >
                    <PlusCircle className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
                
                <div className="mt-4">
                  <Label>Current ZIP Codes</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.zipcodes.length === 0 ? (
                      <p className="text-sm text-gray-500">No ZIP codes added yet</p>
                    ) : (
                      formData.zipcodes.map((zipcode) => (
                        <div 
                          key={zipcode.zipcode}
                          className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1"
                        >
                          <span>{zipcode.zipcode}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveZipcode(zipcode.zipcode)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media & Website */}
            <Card>
              <CardHeader>
                <CardTitle>Social Media & Website</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fb">Facebook Account</Label>
                  <Input
                    id="fb"
                    value={formData.fb}
                    onChange={handleInputChange}
                    placeholder="Enter Facebook URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ln">LinkedIn Account</Label>
                  <Input
                    id="ln"
                    value={formData.ln}
                    onChange={handleInputChange}
                    placeholder="Enter LinkedIn URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="in">Instagram Account</Label>
                  <Input
                    id="in"
                    value={formData.in}
                    onChange={handleInputChange}
                    placeholder="Enter Instagram URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yt">YouTube Account</Label>
                  <Input
                    id="yt"
                    value={formData.yt}
                    onChange={handleInputChange}
                    placeholder="Enter YouTube URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webUrl">Website URL</Label>
                  <Input
                    id="webUrl"
                    value={formData.webUrl}
                    onChange={handleInputChange}
                    placeholder="Enter Website URL"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-[#a0b830] hover:bg-[#8fa029] text-white"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </div>
          </form>
        )}
      </div>
      <ToastContainer />
    </DashboardLayout>
  );
};

export default UpdateProfile;