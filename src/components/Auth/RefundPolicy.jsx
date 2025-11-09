import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const RefundPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#38B6FF] hover:text-[#2090d1] transition-colors mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>

        {/* Content Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#38B6FF] to-[#2090d1] px-6 py-8 text-white">
            <h1 className="text-3xl font-bold">Refund Policy for AssistHealth</h1>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            <section className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-600">
                At AssistHealth, we prioritize transparency and clarity in all our policies. Please review our refund
                policy below:
              </p>
            </section>

            {/* Refund Policy Overview */}
            <section className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Refund Policy Overview</h2>
              <div className="bg-white rounded-lg p-4">
                <p className="text-gray-600">
                  <strong>Non-Refundable Registration Charges:</strong> The registration fee collected by AssistHealth is strictly
                  non-refundable. This fee is solely for the purpose of covering administrative and initial service setup
                  costs.
                </p>
              </div>
            </section>

            {/* Details of the Policy */}
            <section className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Details of the Policy</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">1. Nature of the Fee</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>The registration charges are used to facilitate the onboarding process, including the creation of
                        your account, initial consultations, and setup of personalized health plans or services.</li>
                    <li>These charges are mandatory to commence the services offered by AssistHealth and are not
                        subject to any form of refund once payment has been made.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">2. No Refunds</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Once the registration fee is paid, no refunds will be issued under any circumstances.</li>
                    <li>This policy applies to all users and is strictly enforced to maintain fairness and consistency.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">3. Service Commitment</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>By paying the registration fee, you are securing your spot and committing to the initial services
                        provided by AssistHealth.</li>
                    <li>Our team is dedicated to ensuring that the registration process is smooth and that you receive the
                        full benefit of the services covered by this fee.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">4. Exceptions</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>In extraordinary cases where an error is made by AssistHealth (e.g., duplicate charges), the matter
                        will be reviewed, and if found valid, a correction or refund may be processed.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Why is the Registration Fee Non-Refundable? */}
            <section className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why is the Registration Fee Non-Refundable?</h2>
              <p className="text-gray-600 mb-4">
                The non-refundable policy helps us allocate resources efficiently and ensure that we can deliver high-quality, 
                uninterrupted services to all clients. The registration fee covers various initial expenses, including but not 
                limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Administrative processing</li>
                <li>Initial consultations and assessments</li>
                <li>Setup of your personalized health service plan</li>
              </ul>
            </section>

            {/* Contact Information */}
            <section className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions or concerns regarding this refund policy, please do not hesitate to contact
                our customer support team:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-[#38B6FF] mb-2">Email</h4>
                  <p className="text-gray-600">support@assisthealth.in</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-[#38B6FF] mb-2">Phone</h4>
                  <p className="text-gray-600">+91 96112 32569</p>
                  <p className="text-gray-600">+91 96112 32519</p>
                </div>
              </div>
            </section>

            {/* Thank You Note */}
            <section className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-600 text-center font-medium">
                Thank you for choosing AssistHealth. We look forward to serving your health and wellness needs.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy; 
