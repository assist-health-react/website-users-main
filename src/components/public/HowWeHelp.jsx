import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Calendar, FileText, Phone, Clock, Users, Heart } from 'lucide-react';

const HowWeHelp = () => {
  const services = [
    {
      icon: <Calendar className="w-12 h-12 text-[#005c93]" />,
      title: "Appointment Scheduling",
      description: "We coordinate with healthcare providers to schedule your appointments at convenient times."
    },
    {
      icon: <FileText className="w-12 h-12 text-[#005c93]" />,
      title: "Documentation Management",
      description: "We handle all your medical records, insurance paperwork, and healthcare documentation."
    },
    {
      icon: <Phone className="w-12 h-12 text-[#005c93]" />,
      title: "24/7 Support",
      description: "Access to round-the-clock assistance for any healthcare-related queries or concerns."
    },
    {
      icon: <Clock className="w-12 h-12 text-[#005c93]" />,
      title: "Quick Response",
      description: "Rapid response times for all your healthcare needs and emergency situations."
    },
    {
      icon: <Users className="w-12 h-12 text-[#005c93]" />,
      title: "Provider Coordination",
      description: "We ensure seamless communication between all your healthcare providers."
    },
    {
      icon: <Heart className="w-12 h-12 text-[#005c93]" />,
      title: "Personalized Care",
      description: "Tailored healthcare navigation services based on your specific needs."
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
            How We Help
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive healthcare navigation services are designed to make your healthcare journey smooth and stress-free.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-[#005c93]/10 rounded-lg">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-600">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeHelp; 