import { Mail} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  
    return (
        <footer className="bg-gray-950 text-white py-12 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">VendorLocator</h2>
                        <p className="text-gray-400">Connecting local businesses with local customers</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-400 hover:text-white transition">Home</a></li>
                            <li><a href="#faq"  className="text-gray-400 hover:text-white transition">FAQ</a></li>
                            <li><a href="/search-vendors" className="text-gray-400 hover:text-white transition">Find Vendors</a></li>
                            <li><a href="/register" className="text-gray-400 hover:text-white transition">For Vendors</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <p className="flex items-center text-gray-400 mb-2">
                            <Mail className="h-4 w-4 mr-2" />
                            Meekoslink@gmail.com
                        </p>
                        <ul className="space-y-2">
                            <li><Link to="/promos" className="text-gray-400 hover:text-white transition">Get Promos</Link></li>
                            <li><Link to="/terms" className="text-gray-400 hover:text-white transition">Terms</Link></li>
                            <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
                            <li><Link to="/conduct-code" className="text-gray-400 hover:text-white transition">Code Of Conduct</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center">
                    <p className="text-gray-400">&copy; 2025 Meekos Links LLC. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer;