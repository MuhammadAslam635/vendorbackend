import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Loading } from "../../Loading";

const PaymentSuccessHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [processing, setProcessing] = useState(true);
    
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const orderId = searchParams.get('order_id');
      
      if (orderId) {
        axios.post('${import.meta.env.VITE_BACKEND_URL}/transactions/payment-success', { orderId })
          .then(response => {
            navigate(response.data.redirectUrl || '/vendor/dashboard/subscriptions');
          })
          .catch(() => {
            toast.error('Could not verify payment');
            navigate('/vendor/dashboard/subscriptions');
          })
          .finally(() => {
            setProcessing(false);
          });
      } else {
        navigate('/vendor/dashboard/subscriptions');
      }
    }, []);
    
    return (
      <div className="flex items-center justify-center min-h-screen">
        {processing && <Loading />}
        <ToastContainer />
      </div>
    );
  };
  export default PaymentSuccessHandler;