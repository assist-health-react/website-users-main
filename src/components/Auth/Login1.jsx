import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaPhone, FaLock, FaUser, FaSpinner, FaArrowLeft } from 'react-icons/fa';
import { loginWithPhone, verifyOTP } from "../../services/authService";
import { getMemberProfile } from "../../services/profileService";
import axios from "../../services/axios";

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [loginMethod, setLoginMethod] = useState('memberId'); // 'phone' or 'memberId'
  const [formData, setFormData] = useState({
    phone: '',
    memberId: '',
    otp: ['', '', '', '', '', ''],
    selectedUser: null,
    memberPhoneNumber: '', // Store phone number from member ID login response
    memberName: '' // Store member name from member ID login response
  });
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);
  const [members, setMembers] = useState([]);
  const [isNewUser, setIsNewUser] = useState(false);
  const otpRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  useEffect(() => {
    const mustAcceptTerms = localStorage.getItem('mustAcceptTerms') === 'true';
    const accessToken = localStorage.getItem('accessToken');
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    if (mustAcceptTerms || (accessToken && userProfile && userProfile.termsConditionsAccepted === false)) {
      navigate('/terms-and-conditions', { state: { isFromOTPVerify: true, from: 'login' } });
    }
  }, [navigate]);

  // Initialize refs for OTP inputs
  useEffect(() => {
    otpRefs.current = otpRefs.current.slice(0, 6);
  }, []);

  // Dummy credentials
  const DUMMY_PHONE = '1234567890';
  const DUMMY_OTP = '123456';
  const DUMMY_USER = {
    id: 'dummy123',
    userId: 'dummy123',
    phoneNumber: '+911234567890',
    userType: 'Patient',
    isFirstLogin: false,
    name: 'Dummy User',
    email: 'dummy@example.com',
    isStudent: false,
    termsConditionsAccepted: true,
    onBoarded: true
  };

  // Dummy validation
  const VALID_PHONE = '9876543210';
  const VALID_OTP = '123456';

  // Dummy users data - replace with API call in production
  const USERS_BY_PHONE = {
    '9876543210': [
      { id: 1, name: 'John Doe', role: 'Patient' },
      { id: 2, name: 'John Doe Jr.', role: 'Dependent' }
    ],
    '1234567890': [
      { id: 3, name: 'Jane Smith', role: 'Patient' }
    ]
  };

  useEffect(() => {
    // Auto-select user if there's only one associated with the phone number
    if (step === 'otp' && USERS_BY_PHONE[formData.phone]?.length === 1) {
      setFormData(prev => ({
        ...prev,
        selectedUser: USERS_BY_PHONE[formData.phone][0]
      }));
    }
  }, [step, formData.phone]);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    if (name === 'phone' && value.length <= 10) {
      if (/^\d*$/.test(value)) {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
        setError('');
      }
    } else if (name === 'memberId') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      setError('');
    } else if (name === 'selectedUser') {
      const selectedMember = members.find(
        member => member.memberId === value
      );
      setFormData(prev => ({
        ...prev,
        selectedUser: selectedMember
      }));
    }
  };

  const handleOTPChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOTP = [...formData.otp];
      newOTP[index] = value;
      setFormData(prev => ({
        ...prev,
        otp: newOTP
      }));
      setError('');

      // Auto-focus next input
      if (value && index < 5) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      // Focus previous input on backspace if current input is empty
      otpRefs.current[index - 1].focus();
    }
  };

  const handleOTPPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOTP = [...formData.otp];
      pastedData.split('').forEach((digit, index) => {
        if (index < 6) newOTP[index] = digit;
      });
      setFormData(prev => ({
        ...prev,
        otp: newOTP
      }));
      // Focus last input or next empty input
      const lastIndex = Math.min(pastedData.length, 5);
      otpRefs.current[lastIndex].focus();
    }
  };

  const startTimer = () => {
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((currentTimer) => {
        if (currentTimer <= 1) {
          clearInterval(interval);
          return 0;
        }
        return currentTimer - 1;
      });
    }, 1000);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (isLoading) return; // Prevent multiple submissions

    try {
      setIsLoading(true);
      setError('');

      let response;
      
      if (loginMethod === 'memberId') {
        // Validate Member ID
        if (!formData.memberId) {
          throw new Error('Please enter your Member ID');
        }
        
        // Send OTP with Member ID
        response = await loginWithPhone(formData.memberId);
        
        // Handle Member ID login response
        setIsNewUser(response.isNewUser);
        setMembers([]); // Clear members as not needed for member ID login
        
        // Store member details from response
        setFormData(prev => ({
          ...prev,
          memberPhoneNumber: response.phoneNumber || '',
          memberName: response.name || '',
          memberId: response.memberId || formData.memberId
        }));
        
      } else {
        // Validate phone number
        if (!formData.phone || formData.phone.length !== 10) {
          throw new Error('Please enter a valid 10-digit phone number');
        }

        // Send OTP with phone number
        const phoneWithPrefix = `+91${formData.phone}`;
        response = await loginWithPhone(phoneWithPrefix);
        
        // Handle phone login response
        if (response.isNewUser) {
          setIsNewUser(true);
          setMembers([]);
        } else if (response.members) {
          setIsNewUser(false);
          setMembers(response.members);
          
          // Auto-select if single member
          if (response.members.length === 1) {
            setFormData(prev => ({
              ...prev,
              selectedUser: response.members[0]
            }));
          }
        }
      }

      setStep('otp');
      startTimer();
      setError('');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAndHandleProfile = async (userData, tokens) => {
    try {
      const profileResponse = await getMemberProfile();
      
      if (profileResponse.message === "Profile retrieved successfully" && profileResponse.data) {
        // Store profile data with isStudent flag
        const profileData = {
          ...profileResponse.data,
          isStudent: profileResponse.data.isStudent === true
        };
        localStorage.setItem('userProfile', JSON.stringify(profileData));
        
        // Update user data with complete information
        const updatedUserData = {
          ...userData,
          name: profileResponse.data.name || '',
          email: profileResponse.data.email || '',
          isStudent: profileResponse.data.isStudent === true
        };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        localStorage.setItem('selectedMemberId', userData.id);
        
        // Check terms acceptance and onboarded status
        const termsAccepted = profileResponse.data.termsConditionsAccepted === true;
        const isOnboarded = profileResponse.data.onBoarded === true;
        const isStudent = profileResponse.data.isStudent === true;
        
        // Navigation logic based on terms acceptance and onboarded status
        if (!termsAccepted) {
          localStorage.setItem('mustAcceptTerms', 'true');
          navigate('/terms-and-conditions', {
            state: {
              isFirstLogin: false,
              isFromOTPVerify: true,
              from: 'login'
            }
          });
        } else if (!isOnboarded) {
          navigate('/update-profile', {
            state: { 
              fromTerms: false,
              isStudent: isStudent,
              isFirstLogin: userData.isFirstLogin
            }
          });
        } else {
          navigate('/dashboard');
        }
      } else {
        throw new Error('Invalid profile data received');
      }
    } catch (err) {
      // If profile fetch fails, clear tokens and show error
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setError('Failed to fetch profile. Please try logging in again.');
      return false;
    }
    return true;
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    const otpValue = formData.otp.join('');
    if (!otpValue || otpValue.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    // For phone login, validate member selection if there are members
    if (loginMethod === 'phone' && !isNewUser && members.length > 0) {
      const hasValidMembers = members.some(m => m.isMember);
      if (hasValidMembers && !formData.selectedUser) {
        setError('Please select an account to continue');
        return;
      }
    }

    try {
      let response;
      
      if (loginMethod === 'memberId') {
        response = await verifyOTP(formData.memberId, otpValue, null, formData.memberPhoneNumber);
      } else {
        const phoneWithPrefix = `+91${formData.phone}`;
        response = await verifyOTP(phoneWithPrefix, otpValue, formData.selectedUser?.memberId);
      }

      if (response.status === 'success') {
        // Clear existing data
        localStorage.clear();
        
        // Store tokens first to ensure they're available for subsequent API calls
        localStorage.setItem('accessToken', response.data.tokens.accessToken);
        localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
        
        // Store basic user data
        const userData = {
          id: response.data.user.id,
          userId: response.data.user.userId,
          memberId: response.data.user.id,
          phoneNumber: response.data.user.phoneNumber,
          userType: response.data.user.userType,
          isFirstLogin: response.data.user.isFirstLogin
        };
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('selectedMemberId', response.data.user.id);

        try {
          // Fetch member profile first
          const profileResponse = await getMemberProfile();
          
          if (profileResponse.message === "Profile retrieved successfully" && profileResponse.data) {
            const profileData = {
              ...profileResponse.data,
              isStudent: profileResponse.data.isStudent === true
            };
            localStorage.setItem('userProfile', JSON.stringify(profileData));

            // Member or student found in response, check terms acceptance
            if (!profileData.termsConditionsAccepted) {
              localStorage.setItem('mustAcceptTerms', 'true');
              navigate('/terms-and-conditions', {
                state: { 
                  isFirstLogin: false,
                  isFromOTPVerify: true,
                  from: 'login'
                }
              });
            } else if (!profileData.onBoarded) {
              navigate('/update-profile', {
                state: { 
                  fromTerms: false,
                  isStudent: profileData.isStudent,
                  isFirstLogin: false
                }
              });
            } else {
              navigate('/dashboard');
            }
          } else {
            // Member or student not found, check isFirstLogin and isNewUser
            if (response.data.user.isFirstLogin || isNewUser) {
              localStorage.setItem('mustAcceptTerms', 'true');
              navigate('/terms-and-conditions', {
                state: { 
                  isFirstLogin: true,
                  isFromOTPVerify: true,
                  from: 'login'
                }
              });
            } else {
              // Something is wrong with the profile data
              throw new Error('Invalid profile data received');
            }
          }
        } catch (err) {
          console.error('Profile fetch error:', err);
          // On any profile fetch failure after successful OTP, route to terms
          localStorage.setItem('mustAcceptTerms', 'true');
          navigate('/terms-and-conditions', {
            state: { 
              isFirstLogin: true,
              isFromOTPVerify: true,
              from: 'login'
            }
          });
        }
      } else {
        throw new Error('OTP verification failed');
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      setError(err.message || 'Failed to verify OTP. Please try again.');
    }
  };

  const handleResendOTP = () => {
    startTimer();
    // Here you would typically make an API call to resend OTP
    console.log('Resending OTP to', formData.phone);
  };

  const handleBackToWebsite = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#38B6FF]/5 to-[#38B6FF]/10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl w-full mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between gap-8">
          {/* Left side - Video */}
          <div className="flex-1 hidden lg:flex items-center justify-center">
            <video 
              key={step} // Add key prop to force remount
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full max-w-xl mx-auto rounded-lg shadow-lg"
            >
              <source 
                src={step === 'phone' ? "/assets/Computer login.mp4" : "/assets/Enter OTP.mp4"} 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Dividing Line */}
          <div className="hidden lg:block w-px h-[600px] bg-[#38B6FF]/10"></div>

          {/* Right side - Login Form */}
          <div className="w-full max-w-sm">
            {/* Back Button */}
            <div className="mb-6">
              <button 
                onClick={handleBackToWebsite}
                className="inline-flex items-center text-[#38B6FF] hover:text-[#2090d1] transition-colors"
              >
                <FaArrowLeft className="h-5 w-5 mr-2" />
                Back to Website
              </button>
            </div>

            {/* Header with Logo */}
            <div className="flex flex-col items-center gap-3 mb-8">
              <img 
                src="/assets/assist-health-logo.png" 
                alt="AssistHealth" 
                className="h-16 w-16 object-contain"
              />
              <div className="text-xl font-semibold">
                <span className="text-gray-800">Assist</span>
                <span className="text-[#38B6FF]">Health</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mt-4">Welcome!</h2>
              {/* Show member details for member ID login */}
              {loginMethod === 'memberId' && step === 'otp' && formData.memberName && (
                <div className="mt-2 text-center">
                  <p className="text-lg font-medium text-gray-900">{formData.memberName}</p>
                  <p className="text-sm text-gray-500">Member ID: {formData.memberId}</p>
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={step === 'phone' ? handleSendOTP : handleVerifyOTP} className="space-y-6">
              {step === 'phone' ? (
                <div className="space-y-6">
                  {/* Login Method Toggle */}
                  <div className="flex items-center gap-3 p-1 bg-gray-100 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setLoginMethod('memberId')}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        loginMethod === 'memberId'
                          ? 'bg-white text-[#38B6FF] shadow-sm'
                          : 'text-gray-500 hover:text-[#38B6FF]'
                      }`}
                    >
                      Existing Member ID
                    </button>
                    <div className="text-gray-400 font-medium text-sm">OR</div>
                    <button
                      type="button"
                      onClick={() => setLoginMethod('phone')}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        loginMethod === 'phone'
                          ? 'bg-white text-[#38B6FF] shadow-sm'
                          : 'text-gray-500 hover:text-[#38B6FF]'
                      }`}
                    >
                      Phone Number
                    </button>
                  </div>

                  {loginMethod === 'phone' ? (
                    /* Phone Number Field */
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPhone className="h-5 w-5 text-[#38B6FF]" />
                        </div>
                        <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none border-r pr-3 ml-2">
                          <span className="text-gray-500">+91</span>
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="block w-full pl-24 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  ) : (
                    /* Member ID Field */
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Existing Member ID
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 py-4 px-0 pt-0 flex items-center justify-center pointer-events-none">
                          <FaUser className="h-5 w-5 text-[#38B6FF]" />
                        </div>
                        <input
                          type="text"
                          name="memberId"
                          value={formData.memberId}
                          onChange={handleInputChange}
                          className="block w-full pl-12 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
                          placeholder="e.g., AAA000"
                        />
                        <div className="mt-1 text-xs text-gray-500">
                          Enter your member ID Like AAA000
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* OTP and User Selection Fields */
                <div className="space-y-6">
                  {/* User Selection Section - Only show for phone login */}
                  {loginMethod === 'phone' && !isNewUser && members.length > 0 && (
                    <>
                      {members.length === 1 ? (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-center">
                            <FaUser className="h-5 w-5 text-blue-500" />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{members[0].name}</p>
                              {members[0].memberId && (
                                <p className="text-sm text-gray-500">Member ID: {members[0].memberId}</p>
                              )}
                              {!members[0].isMember && (
                                <p className="text-sm text-[#38B6FF] mt-1">Not a member yet</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <label htmlFor="selectedUser" className="block text-sm font-medium text-gray-700">
                            Select Account
                          </label>
                          <select
                            id="selectedUser"
                            name="selectedUser"
                            value={formData.selectedUser?.memberId || ''}
                            onChange={handleInputChange}
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
                          >
                            <option value="">Select your account</option>
                            {members.map((member) => (
                              <option 
                                key={member.memberId || member.name} 
                                value={member.memberId || ''}
                                disabled={members.length === 1}
                              >
                                {member.name} {member.memberId ? `(${member.memberId})` : '- Not a member'}
                              </option>
                            ))}
                          </select>
                          {members.length === 1 && (
                            <p className="text-xs text-gray-500 mt-1">
                              Single account detected - auto-selected
                            </p>
                          )}
                        </div>
                      )}
                    </>
                  )}
                  {/* OTP Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter OTP
                    </label>
                    <div className="flex gap-2 justify-between items-center">
                      {formData.otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={el => otpRefs.current[index] = el}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOTPChange(index, e.target.value)}
                          onKeyDown={(e) => handleOTPKeyDown(index, e)}
                          onPaste={handleOTPPaste}
                          className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
                        />
                      ))}
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => {
                          setStep('phone');
                          setFormData(prev => ({ 
                            ...prev, 
                            selectedUser: null,
                            otp: ['', '', '', '', '', '']
                          }));
                        }}
                        className="text-sm text-[#38B6FF] hover:text-[#2090d1]"
                      >
                        {loginMethod === 'phone' ? 'Change Phone Number' : 'Change Member ID'}
                      </button>
                      {timer > 0 ? (
                        <span className="text-sm text-gray-500">
                          Resend OTP in {timer}s
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendOTP}
                          className="text-sm text-[#38B6FF] hover:text-[#2090d1]"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#38B6FF] text-white py-3 px-4 rounded-lg hover:bg-[#2090d1] focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:ring-offset-2 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="w-5 h-5 animate-spin" />
                    <span>Please wait...</span>
                  </>
                ) : (
                  <>
                    <span>{step === 'phone' ? 'Continue' : 'Verify OTP'}</span>
                    {!isLoading && step === 'phone' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </>
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Link 
                    to="/privacy-policy" 
                    className="block text-[#38B6FF] hover:text-[#2090d1] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link 
                    to="/refund-policy" 
                    className="block text-[#38B6FF] hover:text-[#2090d1] transition-colors"
                  >
                    Refund and Cancellation
                  </Link>
                </div>
                <div className="space-y-3 text-right">
                  <Link 
                    to="/terms-and-conditions" 
                    className="block text-[#38B6FF] hover:text-[#2090d1] transition-colors"
                  >
                    Terms and Conditions
                  </Link>
                  <Link 
                    to="/return-policy" 
                    className="block text-[#38B6FF] hover:text-[#2090d1] transition-colors"
                  >
                    Return & Delivery
                  </Link>
                </div>
              </div>
              <p className="mt-6 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} AssistHealth. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 