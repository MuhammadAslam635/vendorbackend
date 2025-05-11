import { useEffect, useState } from "react";
import { useAuth } from "../../useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Loader2, Search } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { DashboardLayout } from "./DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Link } from "react-router-dom";

interface VendorProfiles {
  id: number;
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
  webUrl: string;
  createdAt: string;
}

const Profile = () => {
  const { user } = useAuth();
  const [isFetching, setIsFetching] = useState(true);
  const [profiles, setProfiles] = useState<VendorProfiles[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy] = useState("createdAt");
  const [sortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/vendor/profiles`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProfiles(response.data);
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
      toast.error("Failed to load profile data");
    } finally {
      setIsFetching(false);
    }
  };

  // Filter and sort profiles
  const filteredProfiles = profiles.filter((profile) =>
    Object.values(profile).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    const aValue = a[sortBy as keyof VendorProfiles];
    const bValue = b[sortBy as keyof VendorProfiles];
    if (sortOrder === "asc") {
      return String(aValue).localeCompare(String(bValue));
    }
    return String(bValue).localeCompare(String(aValue));
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProfiles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProfiles.length / itemsPerPage);

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
      <div className="max-w-7xl mx-auto py-6">
        <div className="flex justify-end mb-4">
          <Button className="text-white bg-[#a0b830] hover:bg-[#a0b830]/90">
            <Link to="/vendor/create/profile" >Create Profile</Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Vendor Profiles</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Search and Filter Controls */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search profiles..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => setItemsPerPage(Number(value))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Rows per page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 per page</SelectItem>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="20">20 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Profiles Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead>Social Media</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell>{profile.company}</TableCell>
                      <TableCell>
                        {`${profile.city}, ${profile.state}, ${profile.country}`}
                      </TableCell>
                      <TableCell>
                        <a
                          href={profile.webUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {profile.webUrl}
                        </a>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {profile.fb && (
                            <a
                              href={profile.fb}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600"
                            >
                              FB
                            </a>
                          )}
                          {profile.ln && (
                            <a
                              href={profile.ln}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600"
                            >
                              LN
                            </a>
                          )}
                        </div>
                      </TableCell>
                          <TableCell>
                            {new Date(profile.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button className="text-white bg-[#a0b830] hover:bg-[#a0b830]/90">
                              <Link to={`/vendor/profiles/${profile.id}/edit`}>Edit</Link>
                            </Button>
                          </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                Showing {indexOfFirstItem + 1} to{" "}
                {Math.min(indexOfLastItem, sortedProfiles.length)} of{" "}
                {sortedProfiles.length} entries
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <ToastContainer />
    </DashboardLayout>
  );
};

export default Profile;