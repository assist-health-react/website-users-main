import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const ContactCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-dark text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Better Healthcare?
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Get in touch with us today and discover how we can help you navigate your healthcare journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-brand-blue hover:bg-gray-100"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </Button>
            <Button
              size="lg"
              className="bg-brand-light text-brand-blue hover:bg-brand-light/90"
              onClick={() => navigate('/plans')}
            >
              View Plans
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA; 