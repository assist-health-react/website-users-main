import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getMemberProfile, updateProfile } from "@/services/profileService";

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if navigating from OTP verification or first login
  const isFromOTPVerify = location.state?.isFromOTPVerify;
  const isFirstLogin = location.state?.isFirstLogin;
  const isStudent = location.state?.isStudent;

  // Show accept section if coming from OTP verify or it's first login
  const showAcceptSection = isFromOTPVerify || isFirstLogin;

  const handleBack = () => {
    // If coming from OTP verification (registration or login), go back to the respective page
    if (isFromOTPVerify && location.state?.from === 'register') {
      navigate('/register');
      return;
    }
    if (isFromOTPVerify && location.state?.from === 'login') {
      navigate('/login');
      return;
    }
    // Otherwise use browser back navigation
    navigate(-1);
  };

  const handleContinue = async () => {
    if (!termsAccepted) {
      setError('Please accept the terms and conditions to continue');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      // Update terms acceptance status
      const updateResponse = await updateProfile({
        termsConditionsAccepted: true
      });

      if (!updateResponse?.success) {
        throw new Error('Failed to update terms acceptance');
      }
      
      // Get current profile data to check onboarding status
      const profileResponse = await getMemberProfile();
      
      if (!profileResponse?.data) {
        throw new Error('Failed to fetch member profile');
      }

      const isOnboarded = profileResponse.data.onBoarded === true;
      
      // Update local storage with latest profile data
      localStorage.setItem('userProfile', JSON.stringify({
        ...JSON.parse(localStorage.getItem('userProfile') || '{}'),
        termsConditionsAccepted: true,
        onBoarded: isOnboarded
      }));
      // Clear enforcement flag once terms are accepted
      localStorage.removeItem('mustAcceptTerms');

      // Determine navigation based on onboarding status
      if (!isOnboarded) {
        // Immediately navigate to update profile if not onboarded
        navigate('/update-profile', {
          state: { 
            fromTerms: true,
            isStudent: isStudent,
            isFirstLogin: isFirstLogin
          },
          replace: true
        });
      } else {
        // Immediately navigate to dashboard if already onboarded
        navigate('/dashboard', {
          replace: true
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center text-[#38B6FF] hover:text-[#2090d1] transition-colors mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>

        {/* Content Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#38B6FF] to-[#2090d1] px-6 py-8 text-white">
            <h1 className="text-3xl font-bold">ASSISTHEALTH'S TERMS AND CONDITIONS</h1>
            <p className="mt-2 text-blue-100">Last Updated: 27th August 2024</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8 prose max-w-none">
            <p className="font-bold">Welcome to AssistHealth!</p>
            <p>
              This Membership Agreement outlines the terms and conditions for utilizing our services. 
              By accessing and utilizing AssistHealth's services, you agree to abide by these terms. 
              Kindly review them carefully.
            </p>

            <section>
              <h3 className="text-xl font-bold">1. Acceptance of Agreement:</h3>
              <p>
                By using AssistHealth's services, you acknowledge that you have read, understood, and accepted this Membership Agreement. 
                If any part of these terms is disagreeable, please refrain from using our services.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold">2. Membership Enrollment:</h3>
              <p>
                To become an AssistHealth member, you must provide accurate and complete information during the registration process. 
                Additionally, you must agree to our Privacy Policy, which explicates how we collect, use, and safeguard your personal data. 
                The collection and management of health information by the Healthcare Navigator is governed by the Privacy Policy, and members must review and agree to it.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold">3. Appropriate Service Utilization:</h3>
              <p>
                You commit to using AssistHealth's services for lawful purposes and in accordance with relevant laws and regulations. 
                Solely, you are accountable for the accuracy of information you provide to us, and you agree not to furnish false or misleading data. 
                Our services are aimed at delivering personalized healthcare support. You agree to supply precise and comprehensive health-related information when seeking assistance.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold">4. Privacy and Confidentiality:</h3>
              <p>
                You acknowledge that personal and health-related information you disclose to us will be treated in accordance with our Privacy Policy. 
                While we take precautions to protect your data, you understand that electronic communications and data transmission may not be entirely secure. 
                Your use of our services entails inherent risk.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold">5. Membership Fees:</h3>
              <p>
                The membership fees for AssistHealth's services are specified on our website. Upon becoming a member, you agree to pay the prescribed fees 
                corresponding to your chosen subscription plan. Fee amounts are subject to alteration, and any changes will be communicated to you before they come into effect.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold">6. Membership Termination and Refunds:</h3>
              <p>
                You may terminate your membership at any time, but no refunds will be issued.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold">7. Limited Responsibility:</h3>
              <p>
                AssistHealth is a healthcare support service that furnishes guidance based on the information you provide. However, we do not offer medical diagnosis 
                or treatment recommendations. We assist you in accessing the best available healthcare based on our resources. Our team, to the best of our capabilities, 
                advises you on the most suitable healthcare options. We have collaborated with healthcare providers whom we have screened and thoughtfully included in our network. 
                We recommend these services based on your healthcare needs. Any consequences resulting from using these services are not our liability. You have the option to 
                choose your own providers, and we can guide you in this selection. AssistHealth shall not be held accountable for indirect, incidental, special, consequential, 
                or punitive damages arising from using our services.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold">8. Changes to Terms and Services:</h3>
              <p>
                We may update this Membership Agreement periodically. Your continued use of our services following such updates signifies your acceptance of the revised terms. 
                We retain the right to modify or terminate our services at any time without prior notice.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold">9. Governing Law and Dispute Resolution:</h3>
              <p>
                This Membership Agreement is governed by Indian laws. Any disputes will be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka, India.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold">10. Contact Us:</h3>
              <p>
                If you have inquiries or concerns about this Membership Agreement or your utilization of AssistHealth's services, please contact us at infoassisthealth@gmail.com.
              </p>
            </section>

            <div className="mt-8 text-center">
              <p className="font-bold">Thank you for choosing AssistHealth for your healthcare support needs.</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              </div>
            )}

            {/* Terms Acceptance Section - Show if from OTP verify or first login */}
            {showAcceptSection && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        id="accept-terms"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <label htmlFor="accept-terms" className="ml-3 text-sm text-gray-700">
                      I have read and agree to the Terms and Conditions
                    </label>
                  </div>
                  <button
                    onClick={handleContinue}
                    disabled={!termsAccepted || isLoading}
                    className={`w-full flex justify-center items-center px-6 py-3 rounded-lg text-white transition-colors ${
                      termsAccepted && !isLoading
                        ? 'bg-[#38B6FF] hover:bg-[#2090d1]'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Continue'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions; 