import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const Packages = () => {
  const navigate = useNavigate();

  const packages = [
    {
      name: "Basic Care",
      price: "999",
      description: "Essential healthcare navigation services for individuals",
      features: [
        "24/7 Healthcare Navigator Access",
        "Appointment Scheduling",
        "Medical Records Management",
        "Basic Insurance Assistance",
        "Emergency Support",
      ],
      recommended: false
    },
    {
      name: "Premium Care",
      price: "1999",
      description: "Comprehensive healthcare support for families",
      features: [
        "All Basic Care Features",
        "Priority Appointment Booking",
        "Advanced Insurance Support",
        "Medication Management",
        "Hospital Admission Assistance",
        "Specialist Referral Network",
        "Quarterly Health Reviews"
      ],
      recommended: true
    },
    {
      name: "Elite Care",
      price: "3999",
      description: "VIP healthcare navigation for premium care",
      features: [
        "All Premium Care Features",
        "Dedicated Senior Navigator",
        "International Healthcare Access",
        "Concierge Medical Services",
        "Annual Health Planning",
        "Family Health Coordination",
        "Wellness Program Access"
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
            Choose Your Care Package
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the package that best fits your healthcare needs and let us take care of the rest.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                pkg.recommended ? 'ring-2 ring-brand-blue' : ''
              }`}
            >
              {pkg.recommended && (
                <div className="bg-brand-blue text-white text-center py-2 text-sm font-medium">
                  Recommended
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {pkg.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {pkg.description}
                </p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-gray-900">₹{pkg.price}</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600">
                      <Check className="h-5 w-5 text-brand-blue mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-brand-blue text-white hover:bg-brand-blue/90"
                  onClick={() => navigate('/contact')}
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages; 