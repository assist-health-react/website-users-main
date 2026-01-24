import React, { useState,useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash,FaArrowLeft,FaSpinner,FaUser,FaPhone } from 'react-icons/fa';

import { login } from '../../services/authService';
//import { profileService } from '../../services/profileService';
import { getMemberProfile ,profileService} from "../../services/profileService";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState('phone');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (isLoading || !email || !password) return;
    
    setError('');
    setIsLoading(true);

    try {
      const response = await login(email, password);
       console.log(response)
      // The response is already processed by the interceptor to return response.data
      if (response.status === 'success') {
        // Check if password reset is required
        if (response.data.user.passwordResetRequired) {
          // Store the token temporarily for password reset
          localStorage.setItem('temp_token', response.data.tokens.accessToken);
          navigate('/forgot-password');
          return;
        }
        
        // Normal login flow
       // localStorage.setItem('token', response.data.tokens.accessToken);
       localStorage.setItem('accessToken', response.data.tokens.accessToken);
        localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
        // Decode token expiry 1.11.25
        const payload = JSON.parse(atob(response.data.tokens.accessToken.split('.')[1]));
        localStorage.setItem('tokenExpiry', payload.exp * 1000);
              // Decode token expiry 1.11.25
        localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Fetch profile information
        try {
          // const profileResponse = await profileService.getProfile();
          // if (profileResponse.status === 'success') {
          //   localStorage.setItem('userProfile', JSON.stringify(profileResponse.data));
          // }
          const profileResponse = await profileService.getProfile();

          if (profileResponse?.data) {
            localStorage.setItem(
              'userProfile',
              JSON.stringify(profileResponse.data)
            );
          }
        } catch (profileError) {
          console.error('Error fetching profile:', profileError);
        }
        
        // Call the onLogin callback and navigate
        onLogin();
        navigate('/dashboard');
      } else {
        throw new Error('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || err.error || 'Invalid email or password. Please try again.');
      // Clear any authentication data in case of error
     // localStorage.removeItem('token');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('temp_token');
      localStorage.removeItem('userProfile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    // Clear error when user starts typing
    if (error) setError('');
    
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };
  const handleBackToWebsite = () => {
    navigate('/');
  };
 return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white rounded-xl shadow-lg md:flex overflow-hidden"> {/* Changed 'flex' to 'md:flex' */}
        
        {/* Left side with image - Hidden on mobile */}
        <div className="w-full md:w-1/2 p-12 flex items-center justify-center bg-gray-50 hidden md:block"> 
          {/* <img 
            src="/assets/login_img.gif" 
            alt="Secure Login" 
            className="w-full h-auto max-w-lg object-contain transform scale-110"
          /> */}
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

        {/* Dividing line - Hidden on mobile */}
        <div className="hidden md:block w-px bg-gray-200"></div> 

        {/* Right side with form */}
        <div className="w-full md:w-1/2 p-12"> {/* Changed 'p-8' to 'p-12' for better mobile padding, changed 'w-1/2' to 'w-full md:w-1/2' */}
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
        {/* Logo and Title */}
        <div className="text-center">
          <div className="flex justify-center">
            <img 
              src="/assets/logo_new.png" 
              alt="AssistHealth" 
              className=" object-contain"
              style={{ width: 300  }} 
            />
          </div>
           <h2 className="text-center text-3xl font-bold text-gray-700 mb-10">
          Login
        </h2>
        </div>

        {/* Login Form */}
        <form 
          className="mt-8 space-y-6" 
          onSubmit={handleSubmit} 
          noValidate
        >
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/forgot-password');
                  }}
                  className="text-sm text-[#38B6FF] hover:text-blue-500"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#38B6FF] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
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
  );
};


export default Login; 