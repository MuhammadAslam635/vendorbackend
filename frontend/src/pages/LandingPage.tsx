import Header from './components/home/Header';
import Footer from './components/home/Footer';
import BusinessCard from './components/home/BusinessCard';
import { useAuth } from '../useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import FAQ from './components/home/FAQ';

const LandingPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      switch (user.utype) {
        case 'ADMIN':
          navigate('/admin/dashboard');
          break;
        case 'VENDOR':
          navigate('/vendor/dashboard');
          break;
        default:
          navigate('/login');
      }
    } else {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <FAQ />
      <BusinessCard />
     <Footer />
    </div>
  );
};

export default LandingPage;