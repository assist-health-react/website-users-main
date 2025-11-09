import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const PlansMembership = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const accessToken = localStorage.getItem('accessToken');
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    
    if (accessToken && userProfile) {
      window.location.href = 'https://www.assisthealth.in/dashboard/subscription';
    } else {
      navigate('/login');
    }
  };

  const handleContactSales = () => {
    window.scrollTo(0, 0);
    navigate('/contact');
  };

  const plans = [
    {
      name: "Basic",
      price: "999",
      description: "Essential healthcare navigation for individuals",
      features: [
        "24/7 Healthcare Navigator Access",
        "Basic Appointment Scheduling",
        "Medical Records Management",
        "Emergency Support",
        "Basic Insurance Assistance"
      ]
    },
    {
      name: "Premium",
      price: "1999",
      description: "Enhanced healthcare support for families",
      features: [
        "All Basic Features",
        "Priority Appointment Booking",
        "Advanced Insurance Support",
        "Medication Management",
        "Hospital Admission Assistance",
        "Specialist Referral Network",
        "Quarterly Health Reviews"
      ],
      highlighted: true
    },
    {
      name: "Elite",
      price: "3999",
      description: "Premium healthcare navigation services",
      features: [
        "All Premium Features",
        "Dedicated Senior Navigator",
        "International Healthcare Access",
        "Concierge Medical Services",
        "Annual Health Planning",
        "Family Health Coordination",
        "Wellness Program Access"
      ]
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
            Membership Plans
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose a plan that fits your needs and let us handle your healthcare journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg p-8 ${
                plan.highlighted ? 'ring-2 ring-brand-blue' : ''
              }`}
            >
              {plan.highlighted && (
                <div className="bg-brand-blue text-white text-center py-2 px-4 rounded-full text-sm font-medium absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {plan.description}
                </p>
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-brand-blue mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.highlighted
                    ? 'bg-brand-blue text-white hover:bg-brand-blue/90'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Need a custom plan for your organization?
          </p>
          <Button
            variant="outline"
            onClick={handleContactSales}
            className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
          >
            Contact Sales
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PlansMembership; 