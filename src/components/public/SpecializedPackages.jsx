import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const SpecializedPackages = () => {
  const navigate = useNavigate();

  const packages = [
    {
      title: "Senior Care Package",
      description: "Comprehensive healthcare navigation for seniors",
      price: "₹2999",
      period: "per month",
      features: [
        "24/7 emergency support",
        "Regular health check-ups",
        "Medication management",
        "Doctor appointment scheduling",
        "Hospital admission assistance",
        "Home healthcare coordination",
        "Medical records management",
        "Insurance claim assistance"
      ],
      recommended: true
    },
    {
      title: "Family Health Package",
      description: "Complete healthcare solutions for your family",
      price: "₹4999",
      period: "per month",
      features: [
        "Coverage for up to 4 family members",
        "Preventive care planning",
        "Pediatric care coordination",
        "Specialist referrals",
        "Emergency medical support",
        "Annual health assessments",
        "Vaccination tracking",
        "Digital health records"
      ],
      recommended: false
    },
    {
      title: "Corporate Wellness Package",
      description: "Employee healthcare management solutions",
      price: "Custom",
      period: "per employee",
      features: [
        "Employee health assessments",
        "Mental health support",
        "Wellness programs",
        "Health education sessions",
        "24/7 medical helpline",
        "Corporate health events",
        "Health insurance coordination",
        "Regular health reports"
      ],
      recommended: false
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
            Specialized Healthcare Packages
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully curated packages designed for specific healthcare needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-lg p-8 relative ${
                pkg.recommended ? 'border-2 border-brand-blue' : ''
              }`}
            >
              {pkg.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-brand-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                    Recommended
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {pkg.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {pkg.description}
                </p>
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">
                    {pkg.price}
                  </span>
                  <span className="text-gray-600 ml-2">
                    {pkg.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-6 w-6 text-brand-blue mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center">
                <Button
                  size="lg"
                  className={`w-full ${
                    pkg.recommended
                      ? 'bg-brand-blue text-white hover:bg-brand-blue/90'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  onClick={() => navigate('/contact')}
                >
                  Get Started
                </Button>
              </div>
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
            Need a customized package for your specific needs?
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
            onClick={() => navigate('/contact')}
          >
            Contact Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecializedPackages; 