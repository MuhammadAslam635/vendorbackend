import { ReactNode } from 'react';
import Header from '../../pages/components/home/Header';
import Footer from '../../pages/components/home/Footer';

interface PublicLayoutProps {
  children: ReactNode;
  className?: string;
}

const PublicLayout = ({ children, className = '' }: PublicLayoutProps) => {
  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 ${className}`}>
      <Header />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
