import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const SubscriptionSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    // Auto-redirect after 4 seconds
    const redirectTimer = setTimeout(() => {
      navigate('/dashboard', { replace: true });
    }, 4000);

    // Cleanup timers on unmount
    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="w-16 h-16 bg-[#38B6FF]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="w-8 h-8 text-[#38B6FF]" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h2>
          
          <p className="text-gray-600 mb-4">
            Thank you for subscribing to our premium services. Your subscription has been activated successfully.
          </p>

          <div className="bg-[#38B6FF]/5 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">What's Next?</h3>
            <ul className="text-left text-gray-600 space-y-2">
              <li>• Access to premium features</li>
              <li>• Exclusive content and services</li>
              <li>• Priority support</li>
            </ul>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#38B6FF]/10 text-[#38B6FF] text-xl font-bold mb-2">
              {countdown}
            </div>
            <p className="text-sm text-gray-500">
              Redirecting to subscription details in {countdown} seconds...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess; 