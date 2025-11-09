import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ReturnPolicy = () => {
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
            <h1 className="text-3xl font-bold">Return and Delivery Policy</h1>
            <p className="mt-2 text-blue-100">Last Updated: 2025</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* 1. Policy Overview */}
            <section className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Policy Overview</h2>
              <p className="text-gray-600">
                This Return and Delivery Policy governs the delivery of digital medical assistance services and any associated digital 
                or physical materials provided by Assisthealth. As a medical assistance service provider, we primarily deliver digital 
                healthcare services rather than physical products.
              </p>
            </section>

            {/* 2. Service Delivery */}
            <section className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Service Delivery</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Digital Service Delivery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium text-[#38B6FF] mb-2">Membership Activation</h4>
                      <p className="text-gray-600">Immediate activation upon successful payment confirmation</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium text-[#38B6FF] mb-2">Account Access</h4>
                      <p className="text-gray-600">Login credentials sent via email within 15 minutes of purchase</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium text-[#38B6FF] mb-2">Service Availability</h4>
                      <p className="text-gray-600">24/7 access to platform features and resources</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium text-[#38B6FF] mb-2">Consultation Scheduling</h4>
                      <p className="text-gray-600">Available immediately after membership activation</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Delivery Timelines</h3>
                  <div className="bg-white rounded-lg p-4 space-y-3">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-600"><span className="font-medium">Instant Services:</span> Account activation, platform access, digital resources</p>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-600"><span className="font-medium">Scheduled Services:</span> Medical consultations as per appointment booking</p>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-600"><span className="font-medium">Report Delivery:</span> Digital health reports within 24-48 hours</p>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-600"><span className="font-medium">Prescription Coordination:</span> Within 2-4 hours during business hours</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">2.3 Delivery Methods</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium text-[#38B6FF] mb-2">Email Delivery</h4>
                      <p className="text-gray-600">Account details, reports, prescriptions, communications</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium text-[#38B6FF] mb-2">Platform Access</h4>
                      <p className="text-gray-600">Through secure member portal</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium text-[#38B6FF] mb-2">SMS Notifications</h4>
                      <p className="text-gray-600">Appointment reminders and urgent updates</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium text-[#38B6FF] mb-2">Mobile App</h4>
                      <p className="text-gray-600">iOS and Android app access included with membership</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Continue with other sections using similar styling */}
            {/* ... */}

            {/* 12. Contact Information */}
            <section className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Contact Information</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Customer Service</h3>
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
                    <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
                      <h4 className="font-medium text-[#38B6FF] mb-2">Hours</h4>
                      <p className="text-gray-600">Monday-Sunday, 8 AM - 10 PM IST</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Returns and Exchanges</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium text-[#38B6FF] mb-2">Email</h4>
                      <p className="text-gray-600">support@assisthealth.in</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium text-[#38B6FF] mb-2">Phone</h4>
                      <p className="text-gray-600">+91 96112 32569</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
                      <h4 className="font-medium text-[#38B6FF] mb-2">Hours</h4>
                      <p className="text-gray-600">Monday-Friday, 9 AM - 6 PM IST</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Shipping Address for Returns</h3>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-gray-600">
                      AssistHealth,<br />
                      Floor, #850, 3rd Floor,<br />
                      Sahakara Nagar Main Rd,<br />
                      Bengaluru, Karnataka 560092
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 15. Acknowledgment */}
            <section className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">15. Acknowledgment</h2>
              <p className="text-gray-600">
                By using our services, you acknowledge that you have read, understood, and agree to this Return and Delivery Policy. 
                This policy works in conjunction with our Terms and Conditions and Privacy Policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy; 