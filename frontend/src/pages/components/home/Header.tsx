import { Menu } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import logo from "../../../../public/logo.png";

const Header = () =>{
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};
    return(
        <header className="bg-white text-[#a0b830] shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-white flex items-center space-x-2">
            <Link to="/" className="text-2xl font-bold text-[#a0b830] flex items-center space-x-3 hover:opacity-90">
              <img 
                src={`${logo}`} 
                alt="VendorLocator Logo" 
                className="h-8 w-8"
              />
              <h1>VendorLocator</h1>
            </Link>
            </div>
            <nav className="hidden md:block">
              <ul className="flex space-x-6 items-center">
                <li><Link to="/" className="text-[#a0b830] hover:text-gray-950">Home</Link></li>
                <li>
                    <button 
                        onClick={() => scrollToSection('about')} 
                        className="text-[#a0b830] hover:text-gray-950"
                    >
                        About
                    </button>
                </li>
                <li>
                    <button 
                        onClick={() => scrollToSection('faq')} 
                        className="text-[#a0b830] hover:text-gray-950"
                    >
                        FAQ
                    </button>
                </li>
                <li><Link to="/all-vendors" className="text-[#a0b830] hover:text-gray-950">Find Vendors</Link></li>
                <li><Link to="/register" className="text-[#a0b830] hover:text-gray-950">For Vendors</Link></li>
                <li>
                  <Button variant="default" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                </li>
              </ul>
            </nav>
            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>
    )
}
export default Header;