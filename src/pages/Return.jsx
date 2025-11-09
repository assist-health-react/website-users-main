import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Return = () => {
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
            Return and Delivery Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-3xl"
          >
            Learn about our service delivery methods and return policies.
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
              <p className="text-sm mb-8">Last Updated: 2025</p>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">1. Policy Overview</h2>
              <p className="mb-8">This Return and Delivery Policy governs the delivery of digital medical assistance services and any associated digital or physical materials provided by Assisthealth. As a medical assistance service provider, we primarily deliver digital healthcare services rather than physical products.</p>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">2. Service Delivery</h2>
              <h3 className="text-xl font-semibold mb-4">2.1 Digital Service Delivery</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Membership Activation: Immediate activation upon successful payment confirmation</li>
                <li>Account Access: Login credentials sent via email within 15 minutes of purchase</li>
                <li>Service Availability: 24/7 access to platform features and resources</li>
                <li>Consultation Scheduling: Available immediately after membership activation</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">2.2 Delivery Timelines</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Instant Services: Account activation, platform access, digital resources</li>
                <li>Scheduled Services: Medical consultations as per appointment booking</li>
                <li>Report Delivery: Digital health reports within 24-48 hours</li>
                <li>Prescription Coordination: Within 2-4 hours during business hours</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">2.3 Delivery Methods</h3>
              <ul className="list-disc pl-6 mb-8">
                <li>Email Delivery: Account details, reports, prescriptions, communications</li>
                <li>Platform Access: Through secure member portal</li>
                <li>SMS Notifications: Appointment reminders and urgent updates</li>
                <li>Mobile App: iOS and Android app access included with membership</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">3. Physical Item Delivery (If Applicable)</h2>
              <h3 className="text-xl font-semibold mb-4">3.1 Health Monitoring Devices</h3>
              <p className="mb-4">If your membership includes physical health monitoring devices:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Delivery Time: 5-7 business days within India</li>
                <li>Shipping Partners: Blue Dart, DTDC, India Post</li>
                <li>Tracking: Provided via email and SMS</li>
                <li>Delivery Confirmation: Required signature on delivery</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">3.2 Prescription Medications (Coordination Service)</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Pharmacy Coordination: We coordinate with local pharmacies</li>
                <li>Delivery Arrangement: Through partner pharmacy networks</li>
                <li>Timeline: Same day to 24 hours depending on location</li>
                <li>Prescription Requirement: Valid prescription mandatory</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">3.3 Medical Supplies</h3>
              <p className="mb-4">For any medical supplies included in premium packages:</p>
              <ul className="list-disc pl-6 mb-8">
                <li>Standard Delivery: 3-5 business days</li>
                <li>Express Delivery: 1-2 business days (additional charges may apply)</li>
                <li>Rural Areas: 7-10 business days</li>
                <li>Delivery Charges: Included in membership for orders above ₹500</li>
              </ul>

              {/* Continue with sections 4-15 */}

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

export default Return; 