import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "../ui/button";
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Navigate to the users frontend login page
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome to AssistHealth
          </h2>
          <p className="mt-2 text-gray-600">
            Your trusted healthcare navigation partner
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
                <Button
            onClick={handleLoginClick}
                  className="w-full bg-brand-blue text-white hover:bg-brand-blue/90"
                  size="lg"
                >
            Login
                </Button>

          <Button
            onClick={handleLoginClick}
            className="w-full bg-white text-brand-blue border-2 border-brand-blue hover:bg-brand-light"
            size="lg"
          >
            Register
          </Button>

          <div className="text-center text-sm text-gray-600">
            <p>
              By continuing, you agree to our{' '}
                    <button
                      type="button"
                      className="font-medium text-brand-blue hover:text-brand-blue/80"
                      onClick={() => navigate('/terms')}
                    >
                      Terms of Service
                    </button>
                    {' '}and{' '}
                    <button
                      type="button"
                      className="font-medium text-brand-blue hover:text-brand-blue/80"
                      onClick={() => navigate('/privacy')}
                    >
                      Privacy Policy
                    </button>
          </p>
        </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginRegister; 