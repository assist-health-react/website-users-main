import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-r from-[#005c93] to-[#004c7a] text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transform Your Healthcare Experience Today
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Join thousands of satisfied members who have already discovered the AssistHealth difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-[#005c93] hover:bg-gray-100"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/plans');
              }}
            >
              Explore Plans
            </Button>
            <Button
              size="lg"
              className="bg-white/10 text-white hover:bg-white/20"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/contact');
              }}
            >
              Get Started
            </Button>
          </div>
          <p className="mt-6 text-sm opacity-80">
            No long-term contracts. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection; 