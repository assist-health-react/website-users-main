import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/plans', label: 'Our Plans' },
    { path: '/services', label: 'Services' },
    { path: '/blog', label: 'Blog' },
    { path: '/shop', label: 'Shop' },
    { path: '/contact', label: 'Contact' }
  ];

  const handleLogin = () => {
    const accessToken = localStorage.getItem('accessToken');
    const mustAcceptTerms = localStorage.getItem('mustAcceptTerms') === 'true';
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    if (mustAcceptTerms || (accessToken && userProfile && userProfile.termsConditionsAccepted === false)) {
      navigate('/terms-and-conditions', { state: { isFromOTPVerify: true, from: 'login' } });
      setIsMobileMenuOpen(false);
      return;
    }
    
    if (accessToken && userProfile) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
    setIsMobileMenuOpen(false);
  };

  const handleRegister = () => {
    const accessToken = localStorage.getItem('accessToken');
    const mustAcceptTerms = localStorage.getItem('mustAcceptTerms') === 'true';
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    if (mustAcceptTerms || (accessToken && userProfile && userProfile.termsConditionsAccepted === false)) {
      navigate('/terms-and-conditions', { state: { isFromOTPVerify: true, from: 'register' } });
    } else {
      navigate('/register');
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center py-2">
            <img 
              src="/assets/logos/AH-logo.png"
              alt="AssistHealth Logo"
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-ah-primary'
                    : 'text-ah-gray hover:text-ah-light'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Login/Register Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleLogin}
              className=" bg-[#0066cc] border-2 border-[#0066cc] text-white hover:bg-white hover:text-[#0066cc] transition-colors duration-200 text-lg px-4 py-3 h-auto rounded-xl font-semibold"
             // className=" text-sm font-medium text-ah-gray hover:text-ah-primary transition-colors duration-200"
            >
              Login
            </button>
            {/* <button
              onClick={handleRegister}
              className="bg-ah-primary text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-ah-light transition-colors duration-200"
            >
              Register
            </button> */}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-ah-gray hover:text-ah-primary focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(item.path)
                  ? 'text-ah-primary bg-ah-lightest'
                  : 'text-ah-gray hover:text-ah-primary hover:bg-ah-lightest'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 pb-3 border-t border-ah-lightest">
            <button
              onClick={handleLogin}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-ah-gray hover:text-ah-primary hover:bg-ah-lightest"
            >
              Login
            </button>
            {/* <button
              onClick={handleRegister}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-ah-primary text-white hover:bg-ah-light"
            >
              Register
            </button> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 