import { useState, useEffect } from "react";
import Footer from "./components/home/Footer";
import Header from "./components/home/Header";
import Vendors from "./components/home/Vendors";
import axios from "axios";

const AllVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch vendors on component mount
  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/zipcode/all/profile`);
        setVendors(response.data);
      } catch (error) {
        console.error("Failed to fetch vendors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Loading vendors...</p>
        </div>
      ) : (
        <Vendors vendors={vendors} />
      )}
      <Footer />
    </div>
  );
};

export default AllVendors;