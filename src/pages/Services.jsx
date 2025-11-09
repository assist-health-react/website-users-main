import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from "lucide-react";
import { servicesData } from '@/data/services';

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#005c93] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">AssistHealth Services</h1>
          <p className="text-xl max-w-3xl">
            Comprehensive healthcare solutions tailored to your needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                  onClick={() => handleServiceClick(service.id)}
                >
                  <div className="w-12 h-12 rounded-full bg-[#005c93]/10 text-[#005c93] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#005c93] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  <button
                    className="text-[#005c93] font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Learn more <ArrowRight size={16} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Better Healthcare?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join AssistHealth today and get access to premium healthcare services tailored to your needs.
          </p>
          <button 
            onClick={() => navigate('/contact#contact-form')}
            className="bg-[#005c93] text-white px-8 py-3 rounded-lg hover:bg-[#004c7a] transition-colors"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default Services; 