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
//7.12.25
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const navigate = useNavigate();

  // --------------------------
  // FORM STATES
  // --------------------------
  const [form, setForm] = useState({
    uname: "",
    email: "",
    number: "",
    password: "",
    cpassword: "",
    plan: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordRules, setPasswordRules] = useState({
    letter: false,
    capital: false,
    number: false,
    special: false,
    length: false,
  });

  const [showPasswordInfo, setShowPasswordInfo] = useState(false);
  const [planInfo, setPlanInfo] = useState(null);
  const GST_RATE = 0; // Same as CI (GST disabled)

  // --------------------------
  // HANDLE FORM INPUT CHANGE
  // --------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // Validate mobile number
    if (name === "number") {
      if (!/^\d{0,10}$/.test(value)) return;
    }

    // Password strength validation
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  // --------------------------
  // PASSWORD STRENGTH CHECK
  // --------------------------
  const checkPasswordStrength = (password) => {
    setPasswordRules({
      letter: /[a-z]/.test(password),
      capital: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
      length: password.length >= 8,
    });
  };

  const isPasswordStrong = () =>
    Object.values(passwordRules).every((rule) => rule === true);

  // --------------------------
  // PLAN PRICE CALCULATION
  // --------------------------
  useEffect(() => {
    calculatePlan();
  }, [form.plan]);

  const calculatePlan = () => {
    let registration = 1000;
    let annual = 0;
    let packageAmount = 0;

    switch (form.plan) {
      case "premium":
        annual = 3000;
        break;

      case "seniorcare":
      case "cancer_care":
      case "mother_child_care":
      case "palliative_hospice_care":
      case "surgery_posthospital_care":
        annual = 3000;
        packageAmount = 12000;
        break;

      default:
        setPlanInfo(null);
        return;
    }

    let gst = (registration + annual + packageAmount) * GST_RATE;
    let total = registration + annual + packageAmount + gst;

    setPlanInfo({
      registration,
      annual,
      packageAmount,
      gst,
      total,
    });

    setForm((prev) => ({ ...prev, amount: total }));
  };

  // --------------------------
  // -- FORM SUBMIT
  // --------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = {};

    if (!form.uname.trim()) tempErrors.uname = "Name is required";
    if (!form.number || form.number.length !== 10)
      tempErrors.number = "Enter valid 10 digit mobile number";

    if (!form.password) tempErrors.password = "Password required";
    if (!isPasswordStrong())
      tempErrors.password = "Password does not meet all requirements";

    if (form.cpassword !== form.password)
      tempErrors.cpassword = "Passwords do not match";

    if (!form.plan) tempErrors.plan = "Please select membership plan";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    // -------------------------------
    //  Submit to API
    // -------------------------------
    console.log("Submitting:", form);

    // TODO:
    // axios.post("payment/initiate_payment", form)

    alert("Form Submitted (React Version)");
  };

  // --------------------------
  // JSX UI
  // --------------------------
  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-gray-100 py-10">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl">

        <h2 className="text-center text-3xl font-bold text-gray-700 mb-10">
          Create Your Account
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NAME */}
          <div>
            <input
              name="uname"
              placeholder="Enter Your Name"
              value={form.uname}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
            {errors.uname && (
              <p className="text-red-500 text-sm">{errors.uname}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              name="email"
              type="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* MOBILE */}
          <div>
            <input
              name="number"
              maxLength={10}
              placeholder="Enter Mobile Number"
              value={form.number}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
            {errors.number && (
              <p className="text-red-500 text-sm">{errors.number}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              onFocus={() => setShowPasswordInfo(true)}
              onBlur={() => setShowPasswordInfo(false)}
              className="w-full border p-3 rounded-lg"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            {/* PASSWORD RULES */}
            {showPasswordInfo && (
              <div className="mt-3 bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">Password must contain:</h4>
                <ul className="space-y-1 text-sm">
                  <li className={passwordRules.letter ? "text-green-600" : "text-red-600"}>
                    ✓ At least one letter
                  </li>
                  <li className={passwordRules.capital ? "text-green-600" : "text-red-600"}>
                    ✓ At least one capital letter
                  </li>
                  <li className={passwordRules.number ? "text-green-600" : "text-red-600"}>
                    ✓ At least one number
                  </li>
                  <li className={passwordRules.special ? "text-green-600" : "text-red-600"}>
                    ✓ At least one special character
                  </li>
                  <li className={passwordRules.length ? "text-green-600" : "text-red-600"}>
                    ✓ Minimum 8 characters
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <input
              name="cpassword"
              type="password"
              placeholder="Confirm Password"
              value={form.cpassword}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
            {errors.cpassword && (
              <p className="text-red-500 text-sm">{errors.cpassword}</p>
            )}
          </div>

          {/* PLAN DROPDOWN */}
          <div>
            <select
              name="plan"
              value={form.plan}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option value="">Select Membership</option>
              <option value="premium">Premium (Preventive Health & Wellness)</option>
              <option value="seniorcare">Senior Care</option>
              <option value="cancer_care">Cancer Care</option>
              <option value="mother_child_care">Mother & Child Care</option>
              <option value="palliative_hospice_care">Palliative & Hospice Care</option>
              <option value="surgery_posthospital_care">Surgery & Post-Hospital Care</option>
            </select>

            {errors.plan && (
              <p className="text-red-500 text-sm">{errors.plan}</p>
            )}
          </div>

          {/* PLAN DETAILS BOX */}
          {planInfo && (
            <div className="bg-gray-50 border p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Membership Details</h4>
              <ul className="text-sm space-y-1">
                <li>Registration: ₹{planInfo.registration}</li>
                <li>Annual: ₹{planInfo.annual}</li>
                {planInfo.packageAmount > 0 && (
                  <li>Package Amount: ₹{planInfo.packageAmount}</li>
                )}
                <li>GST: ₹{planInfo.gst.toFixed(2)}</li>
                <li className="font-bold mt-2">Total: ₹{planInfo.total}</li>
              </ul>
            </div>
          )}

          {/* TERMS */}
          <div className="flex gap-2">
            <input type="checkbox" className="w-4" required />
            <p className="text-sm">
              You accept our{" "}
              <Link to="/terms" className="text-blue-500">Terms</Link>,{" "}
              <Link to="/privacy" className="text-blue-500">Privacy Policy</Link>,{" "}
              <Link to="/refund" className="text-blue-500">Refund Policy</Link>.
            </p>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={!isPasswordStrong()}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
          >
            Buy Now
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 flex justify-between">
          <Link to="/" className="text-sm text-gray-600">← Back to Home</Link>
          <Link to="/login" className="text-sm text-blue-600">Already a Member?</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;

