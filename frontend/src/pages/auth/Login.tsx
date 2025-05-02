import Footer from '../components/home/Footer';
import Header from '../components/home/Header';
import LoginForm from './form/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <LoginForm />

      <Footer />
    </div>
  );
};

export default LoginPage;