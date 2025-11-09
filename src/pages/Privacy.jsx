import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
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
            Privacy Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-3xl"
          >
            Your privacy is important to us. Learn how we collect, use, and protect your information.
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
              <p className="text-sm mb-8">Last Updated: 27th AUGUST 2024</p>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">Welcome to AssistHealth!</h2>
              <p className="mb-8">
                At AssistHealth, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website and use our services. By accessing and using our website, you agree to the terms outlined in this Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">1. Information We Collect</h2>
              <p className="mb-4">We may collect various types of information when you interact with our website or use our services. The information we collect may include:</p>
              <ul className="list-disc pl-6 mb-8">
                <li><strong>Personal Information</strong>: This includes your name, email address, phone number, and other identifying information you provide when you sign up for our services or contact us through our website.</li>
                <li><strong>Health Information</strong>: As a healthcare support service, we may collect certain health-related information to better understand your needs and provide you with personalized assistance. We will only collect health information with your explicit consent and in accordance with applicable laws.</li>
                <li><strong>Usage Data</strong>: We may gather non-personal information about how you interact with our website, such as your IP address, browser type, pages visited, and time spent on each page. This data helps us improve our website's performance and enhance user experience.</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">2. Consent to Access and Manage Health Information</h2>
              <p className="mb-4"><strong>By becoming a member of AssistHealth, you consent to the following:</strong></p>
              <ul className="list-disc pl-6 mb-8">
                <li><strong>Access to Health Information</strong>: You authorize your Healthcare Navigator to collect, access, and review your health records, medical history, test results, and any other relevant health information from hospitals, clinics, diagnostic centers, and healthcare providers involved in your care.</li>
                <li><strong>Purpose of Information Collection</strong>: The information collected will be used solely for the purpose of managing your healthcare, coordinating treatment, and ensuring continuity of care.</li>
                <li><strong>Confidentiality and Security</strong>: All health information collected by your Healthcare Navigator will be treated with the utmost confidentiality and will be securely stored in accordance with applicable data protection laws.</li>
                <li><strong>Sharing of Information</strong>: Your health information may be shared with healthcare providers and specialists involved in your care as necessary to coordinate your treatment.</li>
                <li><strong>Revocation of Consent</strong>: You have the right to revoke this consent at any time.</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 mb-8">
                <li>To provide personalized healthcare support and services to you and our other members.</li>
                <li>To improve our website, services, and customer support based on your feedback and usage patterns.</li>
                <li>To send you relevant updates, newsletters, and marketing communications, with your consent.</li>
                <li>To comply with legal obligations and enforce our terms of service.</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">4. How We Protect Your Information</h2>
              <p className="mb-8">
                We employ strict security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Our website is secured with encryption protocols (HTTPS) to ensure the safety of data transmission.
              </p>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">5. Sharing of Information</h2>
              <p className="mb-8">
                We may share your information with third-party service providers and partners who assist us in delivering our services. These third parties are bound by confidentiality agreements and are only allowed to use your information for the specific purposes authorized by us. We will not sell, trade, or rent your personal information to any third party without your explicit consent.
              </p>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">6. Cookies and Tracking Technologies</h2>
              <p className="mb-8">
                AssistHealth may use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small files stored on your device that help us recognize your preferences and track your activity on our site. You can adjust your browser settings to manage or block cookies if you prefer.
              </p>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">7. Your Choices</h2>
              <p className="mb-8">
                You have the right to access, update, or delete your personal information at any time. You can also choose to opt out of receiving marketing communications from us by following the instructions provided in our emails.
              </p>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">8. Children's Privacy</h2>
              <p className="mb-8">
                Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children without parental consent. If you believe that we have inadvertently collected information from a child, please contact us, and we will take appropriate steps to remove the data.
              </p>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">9. Data Security</h2>
              <p className="mb-8">
                We implement appropriate security measures to safeguard your information from unauthorized access, alteration, disclosure, or destruction. However, no method of data transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">10. Changes to this Privacy Policy</h2>
              <p className="mb-8">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will post the updated version on our website, and the revised date will indicate the latest version.
              </p>

              <h2 className="text-2xl font-bold text-[#005c93] mb-6">11. Contact Us</h2>
              <p className="mb-8">
                If you have any questions, concerns, or requests regarding our Privacy Policy or the use of your personal information, please contact us at infoassistheal@gmail.com. We will respond to your inquiries promptly.
              </p>

              <div className="border-t border-gray-200 pt-8 mt-8">
                <p className="italic text-gray-600 mb-4">
                  Thank you for entrusting AssistHealth with your healthcare support needs. Your privacy and security are of utmost importance to us.
                </p>
                <p className="text-gray-600">
                  By using AssistHealth's website and services, you acknowledge that you have read and understood this Privacy Policy and consent to the collection, use, and disclosure of your information as described herein.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Privacy; 