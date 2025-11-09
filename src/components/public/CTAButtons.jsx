import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const CTAButtons = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-r from-brand-light to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Take Control of Your Healthcare Journey
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose the plan that best fits your needs and start experiencing hassle-free healthcare today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
              onClick={() => navigate('/plans')}
            >
              View Plans
            </Button>
            <Button
              size="lg"
              className="bg-brand-blue text-white hover:bg-brand-blue/90"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTAButtons; 