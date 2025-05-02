import { useEffect, useState } from "react";
import { useAuth } from "../../useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Building2,Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { DashboardLayout } from "./DashboardLayout";
import { Textarea } from "../../components/ui/textarea";

interface VendorProfileForm {
  company: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  fb: string;
  ln: string;
  in: string;
  yt: string;
}

const Profile = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [files, setFiles] = useState<{
    companyLogo?: File;
  }>({});
  
  const [previews, setPreviews] = useState({
    companyLogo: ''
  });

  const [formData, setFormData] = useState<VendorProfileForm>({
    company: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    fb:"",
    ln:"",
    in:"",
    yt:""
  });

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vendor/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const vendorData = response.data;
        setFormData({
          company: vendorData.company || "",
          address: vendorData.address || "",
          city: vendorData.city || "",
          state: vendorData.state || "",
          zipcode: vendorData.zipcode || "",
          country: vendorData.country || "",
          ln: vendorData.ln || "",
          in: vendorData.in || "",
          fb: vendorData.fb || "",
          yt: vendorData.yt || "",
        });

        setPreviews({
          companyLogo: vendorData.companyLogo || ''
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'companyLogo' | 'profileImg') => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataToSend.append(key, value);
      });

      if (files.companyLogo) {
        formDataToSend.append('companyLogo', files.companyLogo);
      }

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/vendor/profile`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      toast.success("Profile updated successfully!");
      // Refresh data after update
      window.location.reload();
    } catch (error) {
      console.error("Profile update error:", {error});
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

  if (isFetching) {
    return (
      <DashboardLayout title="Vendor Profile" user={user}>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Loader2 className="h-8 w-8 animate-spin text-[#a0b830]" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Vendor Profile" user={user}>
      <div className="max-w-4xl mx-auto py-6">
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
                        <img
                          src={previews.companyLogo}
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
                    <Label htmlFor="zipcode">ZIP Code</Label>
                    <Input
                      id="zipcode"
                      value={formData.zipcode}
                      onChange={handleInputChange}
                      placeholder="Enter ZIP code"
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
                  <div className="space-y-2">
                    <Label htmlFor="fb">Facebook Account</Label>
                    <Input
                      id="fb"
                      value={formData.fb}
                      onChange={handleInputChange}
                      placeholder="Enter facebook"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ln">LinkedIn Account</Label>
                    <Input
                      id="ln"
                      value={formData.ln}
                      onChange={handleInputChange}
                      placeholder="Enter Linkedin"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ln">Instagram Account</Label>
                    <Input
                      id="in"
                      value={formData.in}
                      onChange={handleInputChange}
                      placeholder="Enter Instagram"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yt">Youtube Account</Label>
                    <Input
                      id="yt"
                      value={formData.yt}
                      onChange={handleInputChange}
                      placeholder="Enter Youtube"
                    />
                  </div>
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
      </div>
      <ToastContainer />
    </DashboardLayout>
  );
};

export default Profile;