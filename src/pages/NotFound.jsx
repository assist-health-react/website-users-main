import React from 'react';
import PropTypes from "prop-types";
import { motion } from 'framer-motion';
import { Button } from "../components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Home, Search, HelpCircle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  const helpfulLinks = [
    {
      icon: <Home className="w-5 h-5" />,
      text: "Return Home",
      path: "/"
    },
    {
      icon: <Search className="w-5 h-5" />,
      text: "Search Services",
      path: "/services"
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      text: "Get Help",
      path: "/contact"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-brand-blue mb-8">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Sorry, we couldn't find the page you're looking for. But don't worry, you can find plenty of other things on our homepage.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {helpfulLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                  onClick={() => navigate(link.path)}
                >
                  <span className="flex items-center justify-center">
                    {link.icon}
                    <span className="ml-2">{link.text}</span>
                  </span>
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
          >
            <p className="text-gray-600">
              Need immediate assistance?{' '}
              <button
                className="text-brand-blue hover:underline"
                onClick={() => navigate('/contact')}
              >
                Contact our support team
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound; 