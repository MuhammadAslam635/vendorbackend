import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import RegisterForm from './form/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <RegisterForm />

      <Footer />
    </div>
  );
};

export default RegisterPage;