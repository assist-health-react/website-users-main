import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaCheckCircle, FaCrown, FaHistory, FaBox, FaPlus, FaSpinner } from 'react-icons/fa';
import axios from "../../services/axios";

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title, message, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : (
              'Confirm'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const SubscribedDetails = ({ member, fromUpdateProfile }) => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);

  const handleContinue = () => {
    navigate('/dashboard', { replace: true });
  };

  const handlePurchaseMore = () => {
    navigate('/dashboard/subscription', { state: { purchaseMore: true } });
  };

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          'https://api.assisthealth.cloud/users/api/v1/subscriptions',
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.status === "success") {
          setSubscriptionData(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch subscription data');
        }
      } catch (error) {
        console.error('Error fetching subscription data:', error);
        setError(error.response?.data?.message || error.message || 'Failed to fetch subscription data');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, []);

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="w-8 h-8 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading subscription details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!subscriptionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-yellow-50 text-yellow-700 p-4 rounded-lg">
            No subscription data available.
          </div>
        </div>
      </div>
    );
  }

  const membershipStatus = subscriptionData.membershipStatus;
  const premiumMembership = membershipStatus.premiumMembership;
  const packages = subscriptionData.packages || [];
  const history = subscriptionData.history || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Member Info Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">
            Subscription Details
          </h3>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePurchaseMore}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <FaPlus className="w-4 h-4" />
              Purchase more subscription
            </button>
            <span className="px-3 py-1 text-sm text-white bg-blue-500 rounded-full">
              Member ID: {subscriptionData.memberId}
            </span>
          </div>
        </div>

        {/* Active Packages */}
        {packages.length > 0 && (
          <div className="bg-white border rounded-lg shadow-sm mb-6">
            <div className="px-4 py-3 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaBox className="w-5 h-5 text-blue-500" />
                  <h4 className="text-base font-semibold text-gray-800">Active Packages</h4>
                </div>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {packages.length} package{packages.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {packages.map((pkg) => (
                  <div key={pkg.transactionId} 
                       className="bg-gray-50 rounded-lg p-4 space-y-3 border border-blue-100">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{pkg.packageName}</span>
                      <span className="text-sm text-gray-500">Code: {pkg.packageCode}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Start Date:</span>
                        <span className="ml-2 text-gray-900">{formatDate(pkg.startDate)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Expiry Date:</span>
                        <span className="ml-2 text-gray-900">{formatDate(pkg.expiryDate)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Amount Paid:</span>
                        <span className="ml-2 text-gray-900">{formatCurrency(pkg.finalAmountPaid)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Transaction ID:</span>
                        <span className="ml-2 text-gray-900">{pkg.transactionId}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Current Subscriptions Section */}
        <div className="bg-white border rounded-lg shadow-sm">
          <div className="px-4 py-3 border-b bg-gray-50">
            <h4 className="text-base font-semibold text-gray-800">Subscription Details</h4>
          </div>
          
          <div className="p-4 space-y-4">
            {/* Registration Status */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">Registration Status</span>
              </div>
              <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                {membershipStatus.isRegistered ? 'Registered' : 'Not Registered'}
              </span>
            </div>

            {/* Registration Date */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Registration Date</span>
              <span className="text-gray-600">
                {formatDate(membershipStatus.registrationDate)}
              </span>
            </div>

            {/* Premium Membership Status */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <FaCrown className={`w-5 h-5 ${premiumMembership.isActive ? 'text-yellow-500' : 'text-gray-400'}`} />
                <span className="font-medium">Premium Status</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-sm rounded-full ${
                  premiumMembership.isActive ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {premiumMembership.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            {/* Premium Details Section */}
            <div className="border border-yellow-200 rounded-lg bg-yellow-50 p-4 space-y-4">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="font-medium">Premium Start Date</span>
                <span className="text-gray-600">
                  {formatDate(premiumMembership.startDate)}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="font-medium">Premium Expiry Date</span>
                <span className="text-gray-600">
                  {formatDate(premiumMembership.expiryDate)}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="font-medium">Renewal Count</span>
                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                  {premiumMembership.renewalCount} time(s)
                </span>
              </div>
            </div>

            {/* Subscription History Section */}
            {history.length > 0 && (
              <div className="bg-white border rounded-lg shadow-sm">
                <div className="px-4 py-3 border-b bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaHistory className="w-5 h-5 text-gray-600" />
                    <h4 className="text-base font-semibold text-gray-800">Subscription History</h4>
                  </div>
                  <span className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">
                    {history.length} item{history.length > 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="p-4">
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                    {history.map((item) => (
                      <div key={item.transactionId} 
                           className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900">{item.title}</span>
                          <span className="text-sm text-gray-500">Code: {item.packageCode}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Start Date:</span>
                            <span className="ml-2 text-gray-900">{formatDate(item.startDate)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Expiry Date:</span>
                            <span className="ml-2 text-gray-900">{formatDate(item.expiryDate)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Amount Paid:</span>
                            <span className="ml-2 text-gray-900">{formatCurrency(item.finalAmountPaid)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Transaction ID:</span>
                            <span className="ml-2 text-gray-900">{item.transactionId}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Continue Button - Only show when coming from update profile */}
        {fromUpdateProfile && (
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-center">
                <button
                  onClick={handleContinue}
                  className="w-full sm:w-auto bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Continue to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default SubscribedDetails; 