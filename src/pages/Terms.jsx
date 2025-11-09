import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#005c93] text-white py-20">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Terms and Conditions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-3xl"
          >
            Please read these terms carefully before using our services.
          </motion.p>
        </div>
      </section>

      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#005c93] hover:text-[#004c7a] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
      </div>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-lg max-w-none"
          >
            <div className="text-gray-600">
              <p className="text-sm mb-8">Last Updated: 27th August 2024</p>

              <div className="mb-8">
                <p className="font-semibold text-lg">
                  Welcome to AssistHealth! This Membership Agreement outlines the terms and conditions 
                  for utilizing our services. By accessing and utilizing AssistHealth's services, you agree to 
                  abide by these terms. Kindly review them carefully.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">1. Acceptance of Agreement</h2>
              <p className="mb-8">
                By using AssistHealth's services, you acknowledge that you have read, understood, and 
                accepted this Membership Agreement. If any part of these terms is disagreeable, please 
                refrain from using our services.
              </p>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">2. Membership Enrollment</h2>
              <p className="mb-8">
                To become an AssistHealth member, you must provide accurate and complete information 
                during the registration process. Additionally, you must agree to our Privacy Policy, which 
                explicates how we collect, use, and safeguard your personal data. The collection and 
                management of health information by the Healthcare Navigator is governed by the Privacy 
                Policy, and members must review and agree to it.
              </p>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">3. Appropriate Service Utilization</h2>
              <p className="mb-8">
                You commit to using AssistHealth's services for lawful purposes and in accordance with 
                relevant laws and regulations. Solely, you are accountable for the accuracy of information 
                you provide to us, and you agree not to furnish false or misleading data. Our services are 
                aimed at delivering personalized healthcare support. You agree to supply precise and 
                comprehensive health-related information when seeking assistance.
              </p>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">4. Privacy and Confidentiality</h2>
              <p className="mb-8">
                You acknowledge that personal and health-related information you disclose to us will be 
                treated in accordance with our Privacy Policy. While we take precautions to protect your 
                data, you understand that electronic communications and data transmission may not be 
                entirely secure. Your use of our services entails inherent risk.
              </p>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">5. Membership Fees</h2>
              <p className="mb-8">
                The membership fees for AssistHealth's services are specified on our website. Upon 
                becoming a member, you agree to pay the prescribed fees corresponding to your chosen 
                subscription plan. Fee amounts are subject to alteration, and any changes will be 
                communicated to you before they come into effect.
              </p>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">6. Membership Termination and Refunds</h2>
              <p className="mb-8">
                You may terminate your membership at any time, but no refunds will be issued.
              </p>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">7. Limited Responsibility</h2>
              <p className="mb-8">
                AssistHealth is a healthcare support service that furnishes guidance based on the 
                information you provide. However, we do not offer medical diagnosis or treatment.
              </p>

              <div className="border-t border-gray-200 pt-8 mt-8">
                <p className="italic text-gray-600">
                  By using AssistHealth's services, you acknowledge that you have read, understood, and agreed to these terms and conditions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Terms; 