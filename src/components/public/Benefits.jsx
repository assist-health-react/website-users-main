import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Shield, Clock, Users, Heart } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: <Shield className="w-12 h-12 text-[#005c93]" />,
      title: "Trusted Healthcare",
      description: "Access to verified healthcare providers and facilities."
    },
    {
      icon: <Clock className="w-12 h-12 text-[#005c93]" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your healthcare needs."
    },
    {
      icon: <Users className="w-12 h-12 text-[#005c93]" />,
      title: "Personal Navigator",
      description: "Dedicated healthcare navigator for personalized guidance."
    },
    {
      icon: <Heart className="w-12 h-12 text-[#005c93]" />,
      title: "Quality Care",
      description: "Premium healthcare services at affordable prices."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Core Benefits
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what makes our healthcare navigation service unique and valuable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits; 