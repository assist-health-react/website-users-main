import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Refund = () => {
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
              Refund Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-3xl"
          >
            At AssistHealth, we prioritize transparency and clarity in all our policies.
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
              <h2 className="text-2xl font-bold text-[#005c93] mb-6">Refund Policy Overview</h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <p className="font-semibold mb-4">Non-Refundable Registration Charges:</p>
                <p>The registration fee collected by AssistHealth is strictly non-refundable. This fee is solely for the purpose of covering administrative and initial service setup costs.</p>
              </div>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">Details of the Policy</h2>
              
              <h3 className="text-xl font-semibold text-[#005c93] mb-4">1. Nature of the Fee</h3>
              <ul className="list-disc pl-6 mb-8">
                <li>The registration charges are used to facilitate the onboarding process, including the creation of your account, initial consultations, and setup of personalized health plans or services.</li>
                <li>These charges are mandatory to commence the services offered by AssistHealth and are not subject to any form of refund once payment has been made.</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#005c93] mb-4">2. No Refunds</h3>
              <ul className="list-disc pl-6 mb-8">
                <li>Once the registration fee is paid, no refunds will be issued under any circumstances.</li>
                <li>This policy applies to all users and is strictly enforced to maintain fairness and consistency.</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#005c93] mb-4">3. Service Commitment</h3>
              <ul className="list-disc pl-6 mb-8">
                <li>By paying the registration fee, you are securing your spot and committing to the initial services provided by AssistHealth.</li>
                <li>Our team is dedicated to ensuring that the registration process is smooth and that you receive the full benefit of the services covered by this fee.</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#005c93] mb-4">4. Exceptions</h3>
              <ul className="list-disc pl-6 mb-8">
                <li>In extraordinary cases where an error is made by AssistHealth (e.g., duplicate charges), the matter will be reviewed, and if found valid, a correction or refund may be processed.</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">Why is the Registration Fee Non-Refundable?</h2>
              <p className="mb-4">The non-refundable policy helps us allocate resources efficiently and ensure that we can deliver high-quality, uninterrupted services to all clients. The registration fee covers various initial expenses, including but not limited to:</p>
              <ul className="list-disc pl-6 mb-8">
                <li>Administrative processing</li>
                <li>Initial consultations and assessments</li>
                <li>Setup of your personalized health service plan</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">Contact Information</h2>
              <p className="mb-4">If you have any questions or concerns regarding this refund policy, please do not hesitate to contact our customer support team:</p>
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <p><strong>Email:</strong> support@assisthealth.in</p>
                <p><strong>Phone:</strong> +91 96112 32569, +91 96112 32519</p>
                <p><strong>Address:</strong><br />
                AssistHealth,<br />
                Floor, #850, 3rd Floor,<br />
                Sahakara Nagar Main Rd,<br />
                Bengaluru, Karnataka 560092</p>
              </div>

              <div className="border-t border-gray-200 pt-8 mt-8">
                <p className="italic text-gray-600">
                  Thank you for choosing AssistHealth. We look forward to serving your health and wellness needs.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Refund; 