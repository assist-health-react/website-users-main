import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const MobilePaymentSuccess = () => {
  const handleDeepLink = () => {
    const deeplink = 'assisthealth://homePage';
    window.location.href = deeplink;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <div className="bg-purple-600 text-white px-4 py-3 flex items-center justify-center">
        <span className="text-lg font-medium">Payment Status</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-bounce">
          <FaCheckCircle className="w-12 h-12 text-green-500" />
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-gray-600 text-center mb-8 max-w-xs">
          Thank you for subscribing to our premium services. Your subscription has been activated successfully.
        </p>

        {/* Details Card */}
        <div className="w-full max-w-sm bg-gray-50 rounded-2xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">What's Next?</h3>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Access to premium features
            </li>
            <li className="flex items-center text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Exclusive content and services
            </li>
            <li className="flex items-center text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Priority support
            </li>
          </ul>
        </div>

        {/* Return to App Button */}
        <button
          onClick={handleDeepLink}
          className="w-full max-w-sm bg-purple-600 text-white py-4 rounded-xl text-lg font-medium hover:bg-purple-700 transition-colors"
        >
          Return to App
        </button>
      </div>
    </div>
  );
};

export default MobilePaymentSuccess; 