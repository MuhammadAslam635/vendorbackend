import PublicLayout from '../components/layout/PublicLayout';
import BusinessCard from './components/home/BusinessCard';
import { useAuth } from '../useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import FAQ from './components/home/FAQ';

const LandingPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Only redirect if user is authenticated and this is their first visit
  // Allow users to stay on public pages if they want to
  useEffect(() => {
    // Check if user has explicitly chosen to stay on public pages
    const stayOnPublic = sessionStorage.getItem('stayOnPublic');
    
    if (isAuthenticated && user && !stayOnPublic) {
      switch (user.utype) {
        case 'SUPERADMIN':
        case 'ADMIN':
        case 'SUBADMIN':
          navigate('/admin/dashboard');
          break;
        case 'VENDOR':
          navigate('/vendor/dashboard');
          break;
        default:
          // Don't redirect, just stay on landing page
          break;
      }
    }
  }, [isAuthenticated, user, navigate]);
  
  return (
    <PublicLayout>
      <FAQ />
      <BusinessCard />
    </PublicLayout>
  );
};

export default LandingPage;