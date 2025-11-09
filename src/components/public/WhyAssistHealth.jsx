import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Shield,
  Users,
  Heart,
  CheckCircle,
  Headphones,
  Laptop,
  Award
} from 'lucide-react';

const WhyAssistHealth = () => {
  const navigate = useNavigate();

  const reasons = [
    {
      icon: <Clock className="w-12 h-12 text-[#005c93]" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your healthcare needs"
    },
    {
      icon: <Shield className="w-12 h-12 text-[#005c93]" />,
      title: "Trusted Network",
      description: "Access to verified healthcare providers and facilities"
    },
    {
      icon: <Users className="w-12 h-12 text-[#005c93]" />,
      title: "Family Coverage",
      description: "Comprehensive healthcare management for the whole family"
    },
    {
      icon: <Heart className="w-12 h-12 text-[#005c93]" />,
      title: "Personalized Care",
      description: "Tailored healthcare solutions for your specific needs"
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-[#005c93]" />,
      title: "Quality Assurance",
      description: "High standards of service and healthcare delivery"
    },
    {
      icon: <Headphones className="w-12 h-12 text-[#005c93]" />,
      title: "Expert Guidance",
      description: "Professional advice for informed healthcare decisions"
    },
    {
      icon: <Laptop className="w-12 h-12 text-[#005c93]" />,
      title: "Digital Access",
      description: "Easy-to-use platform for managing your healthcare"
    },
    {
      icon: <Award className="w-12 h-12 text-[#005c93]" />,
      title: "Proven Results",
      description: "Track record of successful healthcare management"
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
            Why Choose AssistHealth?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're revolutionizing healthcare navigation with our comprehensive, patient-centered approach
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-[#005c93]/10 rounded-lg">
                  {reason.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {reason.title}
              </h3>
              <p className="text-gray-600">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Experience the AssistHealth difference today
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-[#005c93] text-white hover:bg-[#004c7a]"
              onClick={() => navigate('/plans')}
            >
              Join Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#005c93] text-[#005c93] hover:bg-[#005c93] hover:text-white"
              onClick={() => navigate('/contact')}
            >
              Talk to Navigator
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyAssistHealth; 