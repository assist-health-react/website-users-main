import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';

const SubscriptionFailure = () => {
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
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaTimesCircle className="w-8 h-8 text-red-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Failed
          </h2>
          
          <p className="text-gray-600 mb-4">
            We're sorry, but we couldn't process your payment. Please try again or contact support if the problem persists.
          </p>

          <div className="bg-red-50 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">Common Issues:</h3>
            <ul className="text-left text-gray-600 space-y-2">
              <li>• Insufficient funds</li>
              <li>• Invalid card details</li>
              <li>• Network connectivity issues</li>
            </ul>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#38B6FF]/10 text-[#38B6FF] text-xl font-bold mb-2">
              {countdown}
            </div>
            <p className="text-sm text-gray-500">
              Redirecting back to subscription page in {countdown} seconds...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionFailure; 