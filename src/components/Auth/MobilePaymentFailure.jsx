import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const MobilePaymentFailure = () => {
  const handleDeepLink = () => {
    const deeplink = 'assisthealth://homePage';
    window.location.href = deeplink;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <div className="bg-red-600 text-white px-4 py-3 flex items-center justify-center">
        <span className="text-lg font-medium">Payment Status</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Failure Icon */}
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-8">
          <FaTimesCircle className="w-12 h-12 text-red-500" />
        </div>

        {/* Failure Message */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Payment Failed
        </h1>
        
        <p className="text-gray-600 text-center mb-8 max-w-xs">
          We couldn't process your payment. Don't worry, no charges have been made to your account.
        </p>

        {/* Common Issues Card */}
        <div className="w-full max-w-sm bg-gray-50 rounded-2xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Common Issues</h3>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-700">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              Insufficient funds
            </li>
            <li className="flex items-center text-gray-700">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              Network connectivity issues
            </li>
            <li className="flex items-center text-gray-700">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              Bank server timeout
            </li>
          </ul>
        </div>

        {/* Return to App Button */}
        <div className="w-full max-w-sm space-y-3">
          <button
            onClick={handleDeepLink}
            className="w-full bg-red-600 text-white py-4 rounded-xl text-lg font-medium hover:bg-red-700 transition-colors"
          >
            Return to App
          </button>
          <button
            onClick={() => window.location.href = 'mailto:support@assisthealth.cloud'}
            className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl text-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobilePaymentFailure; 