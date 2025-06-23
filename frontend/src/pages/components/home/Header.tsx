import { Menu, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import logo from "../../../../public/logo.png";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false); // For mobile dropdown toggle

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsPagesDropdownOpen(false); // Reset the dropdown when toggling menu
  };

  const togglePagesDropdown = () => {
    setIsPagesDropdownOpen(!isPagesDropdownOpen);
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
              {/* <li>
                <Link to="/" className="text-[#a0b830] hover:text-gray-950">
                  VendorLocator
                </Link>
              </li> */}
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
              {/* <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Home Pages</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem asChild>
                      <Link to="/core-aeration">Core Aeration</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/core-aeration-caution">Core Aeration Caution</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/core-aeration-tips">Core Aeration Tips</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/" onClick={() => scrollToSection("faq")}>FAQ</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li> */}
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
              <button
                onClick={() => {
                  scrollToSection("about");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left text-[#a0b830] hover:text-gray-950"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  scrollToSection("faq");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left text-[#a0b830] hover:text-gray-950"
              >
                FAQ
              </button>
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

            {/* Mobile Dropdown for Pages */}
            <li>
              <button
                onClick={togglePagesDropdown}
                className="flex justify-between items-center w-full text-[#a0b830] hover:text-gray-950 focus:outline-none"
              >
                Pages
                <svg
                  className={`w-4 h-4 ml-2 transform transition-transform ${
                    isPagesDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {isPagesDropdownOpen && (
                <ul className="mt-2 pl-4 border-l border-gray-300 space-y-1">
                  <li>
                    <Link
                      to="/core-aeration"
                      className="block text-[#a0b830] hover:text-gray-950"
                      onClick={toggleMobileMenu}
                    >
                      Core Aeration
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/core-aeration-caution"
                      className="block text-[#a0b830] hover:text-gray-950"
                      onClick={toggleMobileMenu}
                    >
                      Core Aeration Caution
                    </Link>
                    </li>
                  <li>
                    <Link
                      to="/core-aeration-tips"
                      className="block text-[#a0b830] hover:text-gray-950"
                      onClick={toggleMobileMenu}
                    >
                      Core Aeration Tips
                    </Link>
                  </li>
                </ul>
              )}
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
