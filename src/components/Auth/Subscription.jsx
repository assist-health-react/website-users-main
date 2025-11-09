import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTimes, FaPlus, FaCheck, FaSpinner } from 'react-icons/fa';
import { ProfileContext } from '../Profile/ProfileMenu';
import axios from "../../services/axios";

const Subscription = ({ isInAuthFlow = false, isFromUpdateProfile = false, hideBaseFees = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeProfile } = useContext(ProfileContext);
  const [loading, setLoading] = useState(false);
  const [fetchingPlans, setFetchingPlans] = useState(true);
  const [error, setError] = useState(null);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [costs, setCosts] = useState({
    one_time_registration_cost: 0,
    premium_membership_cost: 0
  });

  console.log('Subscription Props:', { isInAuthFlow, isFromUpdateProfile }); // Debug log

  const handleSkip = () => {
    navigate('/dashboard', { replace: true });
  };

  const handleContinue = () => {
    navigate('/dashboard', { replace: true });
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setFetchingPlans(true);
        setError(null);
        
        const response = await axios.get('/packages');
        
        // Expected shape:
        // { message: string, data: Package[], count: number }
        if (Array.isArray(response.data?.data)) {
          setPackages(response.data.data);
          // Base fees are not returned by this API; keep as initialized (0) unless provided elsewhere
          setCosts((prev) => ({ ...prev }));
        } else {
          throw new Error(response.data?.message || 'Failed to fetch subscription plans');
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
        setError(error.response?.data?.message || error.message || 'Failed to fetch subscription plans. Please try again later.');
      } finally {
        setFetchingPlans(false);
      }
    };

    fetchPackages();
  }, []);

  const handleAddPackage = () => {
    if (selectedPackage && !selectedPackages.find(pkg => pkg._id === selectedPackage._id)) {
      setSelectedPackages([...selectedPackages, selectedPackage]);
    }
    setSelectedPackage(null);
  };

  const handleRemovePackage = (packageId) => {
    setSelectedPackages(selectedPackages.filter(pkg => pkg._id !== packageId));
  };

  const handleProceed = async () => {
    console.log('Proceed button clicked');
    try {
      setLoading(true);
      console.log('Starting payment process');

      // Get user details from localStorage
      const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      if (!userProfile || !user) {
        throw new Error('User profile not found');
      }

      const paymentData = {
        name: userProfile.name || user.name,
        amount: calculateTotal(),
        userId: user.userId,
        platform: 'web'
      };

      // Log the exact payload for verification
      console.log('Exact payment payload:', JSON.stringify(paymentData, null, 2));

      // Make API call to initiate payment
      const response = await axios.post(
        'https://api.assisthealth.cloud/users/api/v1/payments/initiate-payment',
        paymentData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Payment initiation response:', response.data);
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error during payment initiation:', error);
      setError(error.response?.data?.message || error.message || 'Failed to initiate payment');
      navigate('/subscription/failure', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(price)) {
      return 'N/A';
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const formatDuration = (months, days) => {
    const parts = [];
    if (months > 0) {
      parts.push(`${months} month${months > 1 ? 's' : ''}`);
    }
    if (days > 0) {
      parts.push(`${days} day${days > 1 ? 's' : ''}`);
    }
    return parts.join(' and ');
  };

  const calculateTotal = () => {
    const packagesTotal = selectedPackages.reduce((sum, pkg) => sum + pkg.price, 0);
    const baseFees = hideBaseFees ? 0 : (costs.one_time_registration_cost + costs.premium_membership_cost);
    return packagesTotal + baseFees;
  };

  if (fetchingPlans) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#38B6FF]/5 to-[#38B6FF]/10 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="w-8 h-8 text-[#38B6FF] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading subscription plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#38B6FF]/5 to-[#38B6FF]/10 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#38B6FF] text-white px-4 py-2 rounded-lg hover:bg-[#2090d1]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Choose Your Package</h2>
          <p className="mt-2 text-gray-600">Select a package that suits your needs</p>
        </div>

        {/* Registration Costs */}
        {!hideBaseFees && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">One-Time Registration</h3>
              <p className="text-2xl font-bold text-[#38B6FF]">{formatPrice(costs.one_time_registration_cost)}</p>
              <p className="text-sm text-gray-500">Required for new members</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Membership</h3>
              <p className="text-2xl font-bold text-[#38B6FF]">{formatPrice(costs.premium_membership_cost)}</p>
              <p className="text-sm text-gray-500">Access to premium features</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className={`grid grid-cols-1 ${selectedPackage ? 'md:grid-cols-3' : ''}`}>
            {/* Package List */}
            <div className={`${selectedPackage ? 'md:col-span-1 border-r border-gray-200' : 'grid grid-cols-1 md:grid-cols-2 gap-4 p-6'}`}>
              {!selectedPackage ? (
                // Grid view of packages when none is selected
                packages.map((pkg) => (
                  <div
                    key={pkg._id}
                    onClick={() => setSelectedPackage(pkg)}
                    className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:border-[#38B6FF] transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{pkg.title}</h3>
                    <div className="text-sm text-gray-500 mb-4">
                      {formatDuration(pkg.durationInMonths, pkg.durationInDays)}
                    </div>
                    <div className="text-2xl font-bold text-[#38B6FF] mb-4">
                      {formatPrice(pkg.price)}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPackage(pkg);
                      }}
                      className="w-full bg-[#38B6FF] text-white py-2 px-4 rounded-lg hover:bg-[#2090d1] transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                ))
              ) : (
                // List view of packages when one is selected
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Available Packages</h3>
                    <button
                      onClick={() => setSelectedPackage(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {packages.map((pkg) => (
                      <div
                        key={pkg._id}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`p-4 rounded-lg cursor-pointer transition-colors ${
                          selectedPackage?._id === pkg._id
                            ? 'bg-[#38B6FF]/5 border border-[#38B6FF]'
                            : 'hover:bg-[#38B6FF]/5 border border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-gray-900">{pkg.title}</h4>
                            <div className="text-sm text-gray-500">
                              {formatDuration(pkg.durationInMonths, pkg.durationInDays)}
                            </div>
                          </div>
                          <div className="text-[#38B6FF] font-bold">
                            {formatPrice(pkg.price)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Package Details */}
            {selectedPackage && (
              <div className="md:col-span-2 p-6">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedPackage.title}</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl font-bold text-[#38B6FF]">
                      {formatPrice(selectedPackage.price)}
                    </div>
                    <div className="text-sm text-gray-500">
                      for {formatDuration(selectedPackage.durationInMonths, selectedPackage.durationInDays)}
                    </div>
                  </div>
                  
                  {/* Description Section */}
                  <div className="space-y-6">
                    {typeof selectedPackage.description === 'string' && 
                      selectedPackage.description.split('●').map((point, index) => {
                        if (!point.trim()) return null;
                        
                        // Check if this point starts with a category name (e.g., "Enhanced Core Services", "Premium Assistance Services")
                        if (point.includes('Services') && !point.includes(' - ')) {
                          return (
                            <div key={index} className="mt-6 first:mt-0">
                              <h4 className="text-lg font-semibold text-gray-900 mb-3">{point.trim()}</h4>
                            </div>
                          );
                        }
                        
                        // Regular points
                        return (
                          <div key={index} className="flex items-start gap-3 text-gray-600 pl-4">
                            <div className="min-w-[6px] h-[6px] mt-[8px] rounded-full bg-[#38B6FF]" />
                            <p className="text-sm leading-relaxed">{point.trim()}</p>
                          </div>
                        );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Features:</h4>
                  <ul className="space-y-2">
                    {selectedPackage.features?.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <FaCheck className="text-[#38B6FF] w-5 h-5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex gap-4">
                  <button
                    onClick={handleAddPackage}
                    className="flex-1 bg-[#38B6FF] text-white py-3 rounded-lg hover:bg-[#2090d1] transition-colors flex items-center justify-center gap-2"
                  >
                    <FaPlus className="w-4 h-4" />
                    Add to Selection
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selected Packages */}
        {selectedPackages.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Selected Packages</h3>
            <div className="space-y-4">
              {selectedPackages.map((pkg) => (
                <div key={pkg._id} className="flex items-center justify-between p-4 bg-[#38B6FF]/5 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{pkg.title}</h4>
                    <div className="text-sm text-gray-500">
                      {formatDuration(pkg.durationInMonths, pkg.durationInDays)}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-[#38B6FF] font-bold">{formatPrice(pkg.price)}</div>
                    <button
                      onClick={() => handleRemovePackage(pkg._id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total and Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Total Amount</h3>
              <p className="text-sm text-gray-500">{hideBaseFees ? 'Packages subtotal' : 'Including registration and membership fees'}</p>
            </div>
            <div className="text-3xl font-bold text-[#38B6FF]">
              {formatPrice(calculateTotal())}
            </div>
          </div>

          <div className="flex gap-4">
            {isInAuthFlow && (
              <button
                onClick={handleSkip}
                className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Skip for Now
              </button>
            )}
            <button
              onClick={handleProceed}
              disabled={loading}
              className="flex-1 bg-[#38B6FF] text-white py-3 rounded-lg hover:bg-[#2090d1] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                'Proceed to Payment'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription; 