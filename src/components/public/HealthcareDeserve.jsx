import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Shield, Clock, Users, Heart } from 'lucide-react';

const HealthcareDeserve = () => {
  const navigate = useNavigate();

  const handleAuth = () => {
    navigate('/login');
  };

  const features = [
    {
      icon: <Shield className="w-12 h-12 text-brand-blue" />,
      title: "Quality Care",
      description: "Access to top-tier healthcare providers and facilities."
    },
    {
      icon: <Clock className="w-12 h-12 text-brand-blue" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your healthcare needs."
    },
    {
      icon: <Users className="w-12 h-12 text-brand-blue" />,
      title: "Personal Attention",
      description: "Dedicated healthcare navigator for personalized guidance."
    },
    {
      icon: <Heart className="w-12 h-12 text-brand-blue" />,
      title: "Holistic Approach",
      description: "Comprehensive care that addresses all your health concerns."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The Healthcare You Deserve
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience healthcare the way it should be - personalized, accessible, and stress-free.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="inline-block p-3 rounded-full bg-brand-light mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-brand-blue text-white hover:bg-brand-blue/90"
            onClick={handleAuth}
          >
            Get Started Today
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HealthcareDeserve; 