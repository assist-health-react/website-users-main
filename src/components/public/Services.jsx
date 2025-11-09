import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { servicesData } from '@/data/services';

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceId) => {
    window.scrollTo(0, 0);
    navigate(`/services/${serviceId}`);
  };

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
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive healthcare navigation services designed to make your healthcare journey smooth and stress-free.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100"
                onClick={() => handleServiceClick(service.id)}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-[#005c93]/10 rounded-lg">
                    <Icon className="w-6 h-6 text-[#005c93]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 ml-4 group-hover:text-[#005c93] transition-colors">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {service.description}
                </p>
                <Button
                  variant="link"
                  className="text-[#005c93] hover:text-[#004c7a] p-0 flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleServiceClick(service.id);
                  }}
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Need help choosing the right service for your needs?
          </p>
          <Button
            size="lg"
            className="bg-[#005c93] text-white hover:bg-[#004c7a]"
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/contact');
            }}
          >
            Contact Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services; 