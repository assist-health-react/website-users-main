// import { useState, useEffect, useRef } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { FaPhone, FaSpinner, FaArrowLeft } from 'react-icons/fa';
// import { loginWithPhone, verifyOTP } from "../../services/authService";
// import { getMemberProfile } from "../../services/profileService";

// const LoginRegister = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState('phone'); // 'phone' or 'otp'
//   const [formData, setFormData] = useState({
//     phone: '',
//     otp: ['', '', '', '', '', ''],
//   });
//   const [error, setError] = useState('');
//   const [timer, setTimer] = useState(0);
//   const otpRefs = useRef([]);
//   const [isLoading, setIsLoading] = useState(false); // New state for loading
 
//   // Initialize refs for OTP inputs
//   useEffect(() => {
//     otpRefs.current = otpRefs.current.slice(0, 6);
//   }, []);

//   useEffect(() => {
//     const mustAcceptTerms = localStorage.getItem('mustAcceptTerms') === 'true';
//     const accessToken = localStorage.getItem('accessToken');
//     const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
//     if (mustAcceptTerms || (accessToken && userProfile && userProfile.termsConditionsAccepted === false)) {
//       navigate('/terms-and-conditions', { state: { isFromOTPVerify: true, from: 'register' } });
//     }
//   }, [navigate]);

//   const handleInputChange = async (e) => {
//     const { name, value } = e.target;
//     if (name === 'phone' && value.length <= 10) {
//       if (/^\d*$/.test(value)) {
//         setFormData(prev => ({
//           ...prev,
//           [name]: value
//         }));
//         setError('');
//       }
//     }
//   };

//   const handleOTPChange = (index, value) => {
//     if (/^\d?$/.test(value)) {
//       const newOTP = [...formData.otp];
//       newOTP[index] = value;
//       setFormData(prev => ({
//         ...prev,
//         otp: newOTP
//       }));
//       setError('');

//       // Auto-focus next input
//       if (value && index < 5) {
//         otpRefs.current[index + 1].focus();
//       }
//     }
//   };

//   const handleOTPKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
//       // Focus previous input on backspace if current input is empty
//       otpRefs.current[index - 1].focus();
//     }
//   };

//   const handleOTPPaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData('text').slice(0, 6);
//     if (/^\d+$/.test(pastedData)) {
//       const newOTP = [...formData.otp];
//       pastedData.split('').forEach((digit, index) => {
//         if (index < 6) newOTP[index] = digit;
//       });
//       setFormData(prev => ({
//         ...prev,
//         otp: newOTP
//       }));
//       // Focus last input or next empty input
//       const lastIndex = Math.min(pastedData.length, 5);
//       otpRefs.current[lastIndex].focus();
//     }
//   };

//   const startTimer = () => {
//     setTimer(30);
//     const interval = setInterval(() => {
//       setTimer((currentTimer) => {
//         if (currentTimer <= 1) {
//           clearInterval(interval);
//           return 0;
//         }
//         return currentTimer - 1;
//       });
//     }, 1000);
//   };

//   const handleSendOTP = async (e) => {
//     e.preventDefault();
    
//     if (isLoading) return; // Prevent multiple submissions

//     try {
//       setIsLoading(true);
//       setError('');

//       // Validate phone number
//       if (!formData.phone || formData.phone.length !== 10) {
//         throw new Error('Please enter a valid 10-digit phone number');
//       }

//       // Send OTP with phone number
//       const phoneWithPrefix = `+91${formData.phone}`;
//       await loginWithPhone(phoneWithPrefix);

//       setStep('otp');
//       startTimer();
//       setError('');
//     } catch (err) {
//       console.error('Login error:', err);
//       setError(err.message || 'Failed to send OTP. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchAndHandleProfile = async (userData, tokens) => {
//     try {
//       const profileResponse = await getMemberProfile();
      
//       if (profileResponse.message === "Profile retrieved successfully" && profileResponse.data) {
//         // Store profile data with isStudent flag
//         const profileData = {
//           ...profileResponse.data,
//           isStudent: profileResponse.data.isStudent === true
//         };
//         localStorage.setItem('userProfile', JSON.stringify(profileData));
        
//         // Update user data with complete information
//         const updatedUserData = {
//           ...userData,
//           name: profileResponse.data.name || '',
//           email: profileResponse.data.email || '',
//           isStudent: profileResponse.data.isStudent === true
//         };
//         localStorage.setItem('user', JSON.stringify(updatedUserData));
//         localStorage.setItem('selectedMemberId', userData.id);
        
//         // Check terms acceptance and onboarded status
//         const termsAccepted = profileResponse.data.termsConditionsAccepted === true;
//         const isOnboarded = profileResponse.data.onBoarded === true;
//         const isStudent = profileResponse.data.isStudent === true;
        
//         // Navigation logic based on terms acceptance and onboarded status
//         if (!termsAccepted) {
//           navigate('/terms-and-conditions', {
//             state: {
//               isFirstLogin: true,
//               isStudent: isStudent,
//               isFromOTPVerify: true,
//               from: 'register'
//             }
//           });
//           localStorage.setItem('mustAcceptTerms', 'true');
//         } else if (!isOnboarded) {
//           navigate('/update-profile', {
//             state: { 
//               fromTerms: false,
//               isStudent: isStudent,
//               isFirstLogin: userData.isFirstLogin
//             }
//           });
//         } else {
//           navigate('/dashboard');
//         }
//       } else {
//         throw new Error('Invalid profile data received');
//       }
//     } catch (err) {
//       // If profile fetch fails, clear tokens and show error
//       localStorage.removeItem('accessToken');
//       localStorage.removeItem('refreshToken');
//       setError('Failed to fetch profile. Please try logging in again.');
//       return false;
//     }
//     return true;
//   };

//   const handleVerifyOTP = async (e) => {
//     e.preventDefault();
    
//     const otpValue = formData.otp.join('');
//     if (!otpValue || otpValue.length !== 6) {
//       setError('Please enter a valid 6-digit OTP');
//       return;
//     }

//     try {
//       const phoneWithPrefix = `+91${formData.phone}`;
//       const response = await verifyOTP(phoneWithPrefix, otpValue);

//       if (response.status === 'success') {
//         // Clear existing data
//         localStorage.clear();
        
//         // Store tokens first to ensure they're available for subsequent API calls
//         localStorage.setItem('accessToken', response.data.tokens.accessToken);
//         localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
        
//         // Store basic user data
//         const userData = {
//           id: response.data.user.id,
//           userId: response.data.user.userId,
//           memberId: response.data.user.id,
//           phoneNumber: response.data.user.phoneNumber,
//           userType: response.data.user.userType,
//           isFirstLogin: response.data.user.isFirstLogin
//         };
//         localStorage.setItem('user', JSON.stringify(userData));
//         localStorage.setItem('selectedMemberId', response.data.user.id);

//         try {
//           // Fetch member profile first
//           const profileResponse = await getMemberProfile();
          
//           if (profileResponse.message === "Profile retrieved successfully" && profileResponse.data) {
//             const profileData = {
//               ...profileResponse.data,
//               isStudent: profileResponse.data.isStudent === true
//             };
//             localStorage.setItem('userProfile', JSON.stringify(profileData));

//             // Member or student found in response, check terms acceptance
//             if (!profileData.termsConditionsAccepted) {
//               navigate('/terms-and-conditions', {
//                 state: { 
//                   isFirstLogin: false,
//                   isFromOTPVerify: true,
//                   from: 'register'
//                 }
//               });
//               localStorage.setItem('mustAcceptTerms', 'true');
//             } else if (!profileData.onBoarded) {
//               navigate('/update-profile', {
//                 state: { 
//                   fromTerms: false,
//                   isStudent: profileData.isStudent,
//                   isFirstLogin: false
//                 }
//               });
//             } else {
//               navigate('/dashboard');
//             }
//           } else {
//             // Member or student not found, check isFirstLogin and isNewUser
//             if (response.data.user.isFirstLogin || isNewUser) {
//               navigate('/terms-and-conditions', {
//                 state: { 
//                   isFirstLogin: true,
//                   isFromOTPVerify: true,
//                   from: 'register'
//                 }
//               });
//               localStorage.setItem('mustAcceptTerms', 'true');
//             } else {
//               // Something is wrong with the profile data
//               throw new Error('Invalid profile data received');
//             }
//           }
//         } catch (err) {
//           console.error('Profile fetch error:', err);
//           // If profile fetch fails but we have tokens, default to terms
//           navigate('/terms-and-conditions', {
//             state: { 
//               isFirstLogin: true,
//               isFromOTPVerify: true,
//               from: 'register'
//             }
//           });
//           localStorage.setItem('mustAcceptTerms', 'true');
//         }
//       } else {
//         throw new Error('OTP verification failed');
//       }
//     } catch (err) {
//       console.error('OTP verification error:', err);
//       setError(err.message || 'Failed to verify OTP. Please try again.');
//     }
//   };

//   const handleResendOTP = () => {
//     startTimer();
//     // Here you would typically make an API call to resend OTP
//     console.log('Resending OTP to', formData.phone);
//   };

//   const handleBackToWebsite = () => {
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#38B6FF]/5 to-[#38B6FF]/10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//       <div className="max-w-6xl w-full mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
//         <div className="flex items-center justify-between gap-8">
//           {/* Left side - Video */}
//           <div className="flex-1 hidden lg:flex items-center justify-center">
//             <video 
//               key={step} // Add key prop to force remount
//               autoPlay 
//               loop 
//               muted 
//               playsInline
//               className="w-full max-w-xl mx-auto rounded-lg shadow-lg"
//             >
//               <source 
//                 src={step === 'phone' ? "/assets/Computer login.mp4" : "/assets/Enter OTP.mp4"} 
//                 type="video/mp4" 
//               />
//               Your browser does not support the video tag.
//             </video>
//                   </div>

//           {/* Dividing Line */}
//           <div className="hidden lg:block w-px h-[600px] bg-[#38B6FF]/10"></div>

//           {/* Right side - Registration Form */}
//           <div className="w-full max-w-sm">
//             {/* Back Button */}
//             <div className="mb-6">
//               <button 
//                 onClick={handleBackToWebsite}
//                 className="inline-flex items-center text-[#38B6FF] hover:text-[#2090d1] transition-colors"
//               >
//                 <FaArrowLeft className="h-5 w-5 mr-2" />
//                 Back to Website
//               </button>
//                 </div>

//             {/* Header with Logo */}
//             <div className="flex flex-col items-center gap-3 mb-8">
//               <img 
//                 src="/assets/assist-health-logo.png" 
//                 alt="AssistHealth" 
//                 className="h-16 w-16 object-contain"
//               />
//               <div className="text-xl font-semibold">
//                 <span className="text-gray-800">Assist</span>
//                 <span className="text-[#38B6FF]">Health</span>
//                   </div>
//               <h2 className="text-2xl font-bold text-gray-800 mt-4">Create your account</h2>
//                 </div>

//             {/* Form */}
//             <form onSubmit={step === 'phone' ? handleSendOTP : handleVerifyOTP} className="space-y-6">
//               {step === 'phone' ? (
//                 <div className="space-y-6">
//                   {/* Phone Number Field */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Phone Number
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <FaPhone className="h-5 w-5 text-[#38B6FF]" />
//                         </div>
//                         <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none border-r pr-3 ml-2">
//                           <span className="text-gray-500">+91</span>
//                         </div>
//                     <input
//                           type="tel"
//                           name="phone"
//                           value={formData.phone}
//                           onChange={handleInputChange}
//                           className="block w-full pl-24 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
//                           placeholder="Enter your phone number"
//                         />
//                   </div>
//                   </div>
//                 </div>
//               ) : (
//                 /* OTP and User Selection Fields */
//                 <div className="space-y-6">
//                   {/* OTP Field */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Enter OTP
//                     </label>
//                     <div className="flex gap-2 justify-between items-center">
//                       {formData.otp.map((digit, index) => (
//                         <input
//                           key={index}
//                           ref={el => otpRefs.current[index] = el}
//                           type="text"
//                           inputMode="numeric"
//                           maxLength={1}
//                           value={digit}
//                           onChange={(e) => handleOTPChange(index, e.target.value)}
//                           onKeyDown={(e) => handleOTPKeyDown(index, e)}
//                           onPaste={handleOTPPaste}
//                           className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:border-transparent"
//                         />
//                       ))}
//                     </div>
//                     <div className="mt-2 flex justify-between items-center">
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setStep('phone');
//                           setFormData(prev => ({ 
//                             ...prev, 
//                             otp: ['', '', '', '', '', '']
//                           }));
//                         }}
//                         className="text-sm text-[#38B6FF] hover:text-[#2090d1]"
//                       >
//                         Change Phone Number
//                       </button>
//                       {timer > 0 ? (
//                         <span className="text-sm text-gray-500">
//                           Resend OTP in {timer}s
//                         </span>
//                       ) : (
//                         <button
//                           type="button"
//                           onClick={handleResendOTP}
//                           className="text-sm text-[#38B6FF] hover:text-[#2090d1]"
//                         >
//                           Resend OTP
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Error Message */}
//               {error && (
//                 <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
//                   {error}
//                 </div>
//               )}

//               {/* Submit Button */}
//                     <button
//                   type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-[#38B6FF] text-white py-3 px-4 rounded-lg hover:bg-[#2090d1] focus:outline-none focus:ring-2 focus:ring-[#38B6FF] focus:ring-offset-2 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? (
//                   <>
//                     <FaSpinner className="w-5 h-5 animate-spin" />
//                     <span>Please wait...</span>
//               </>
//             ) : (
//               <>
//                     <span>{step === 'phone' ? 'Send OTP' : 'Verify OTP'}</span>
//                     {!isLoading && step === 'phone' && (
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                       </svg>
//                     )}
//               </>
//             )}
//               </button>
//             </form>

//             {/* Footer Links */}
//             <div className="mt-8 pt-6 border-t border-gray-200">
//               <div className="grid grid-cols-2 gap-6">
//                 <div className="space-y-3">
//                   <Link 
//                     to="/privacy-policy" 
//                     className="block text-[#38B6FF] hover:text-[#2090d1] transition-colors"
//                   >
//                     Privacy Policy
//                   </Link>
//                   <Link 
//                     to="/refund-policy" 
//                     className="block text-[#38B6FF] hover:text-[#2090d1] transition-colors"
//                   >
//                     Refund and Cancellation
//                   </Link>
//                 </div>
//                 <div className="space-y-3 text-right">
//                   <Link 
//                     to="/terms-and-conditions" 
//                     className="block text-[#38B6FF] hover:text-[#2090d1] transition-colors"
//                   >
//                     Terms and Conditions
//                   </Link>
//                   <Link 
//                     to="/return-policy" 
//                     className="block text-[#38B6FF] hover:text-[#2090d1] transition-colors"
//                   >
//                     Return & Delivery
//                   </Link>
//                 </div>
//               </div>
//               <p className="mt-6 text-center text-gray-500 text-sm">
//                 © {new Date().getFullYear()} AssistHealth. All rights reserved.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginRegister; 
import React from 'react'

function LoginRegister() {
  return (
    <div>
      HI
    </div>
  )
}

export default LoginRegister
