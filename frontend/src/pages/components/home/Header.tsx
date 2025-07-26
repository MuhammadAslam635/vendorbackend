import { Menu, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import logo from "../../../../public/logo.png";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 

  

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
  };



  return (
    <header className="bg-white text-[#a0b830] shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-white flex items-center space-x-2">
            <Link
              to="/"
              className="text-2xl font-bold text-[#a0b830] flex items-center space-x-3 hover:opacity-90"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img src={`${logo}`} alt="VendorLocator Logo" className="h-8 w-8" />
              <h1>Core Aeration</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 items-center">
           
              <li>
                <Link to="/all-vendors" className="text-[#a0b830] hover:text-gray-950">
                  Find Vendors
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-[#a0b830] hover:text-gray-950">
                  For Vendors
                </Link>
              </li>
             
              <li>
                <Button variant="default" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              </li>
            </ul>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          <ul className="flex flex-col space-y-2 p-4 text-lg font-medium">
            <li>
              <Link
                to="/"
                className="block text-[#a0b830] hover:text-gray-950"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
            </li>
       
            <li>
              <Link
                to="/all-vendors"
                className="block text-[#a0b830] hover:text-gray-950"
                onClick={toggleMobileMenu}
              >
                Find Vendors
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="block text-[#a0b830] hover:text-gray-950"
                onClick={toggleMobileMenu}
              >
                For Vendors
              </Link>
            </li>

           

            <li>
              <Button variant="default" asChild className="w-full">
                <Link to="/login" onClick={toggleMobileMenu}>
                  Login
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
