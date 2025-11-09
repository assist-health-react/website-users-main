import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Check, Clock, Heart, Baby, Users, Building2, Stethoscope, Bed } from 'lucide-react';

const Plans = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('membership');

  const handleGetPremiumMembership = () => {
    const accessToken = localStorage.getItem('accessToken');
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    
    if (accessToken && userProfile) {
      window.location.href = 'https://www.assisthealth.in/dashboard/subscription';
    } else {
      navigate('/login');
    }
  };

  const premiumMembershipFeatures = {
    coreServices: [
      "Personal Healthcare Navigator - 24/7 assistance at no additional cost",
      "Unique Assist Health Member ID",
      "Priority Care - Unlimited priority access at all associated healthcare providers",
      "Annual Health Checkup - Comprehensive 66-parameter assessment (free)",
      "Online Medical Consultation - One free consultation with AH general physician including follow-up",
      "Healthcare Records Management - Maintained by dedicated navigators"
    ],
    healthcareAccess: [
      "Unlimited Access to Online Consultations (starting at ₹500*)",
      "Doctor home visits (starting at ₹1,000*)",
      "Nursing Services (starting at ₹200*)",
      "Home Caregiver Services (starting at ₹800*)",
      "Care Companions (starting at ₹1,000*)",
      "Access to verified top healthcare Providers"
    ],
    assistanceServices: [
      "Free appointment booking and follow-ups",
      "Diagnostic & Medication Support with reminders",
      "Healthcare Provider Mapping",
      "Insurance Assistance",
      "Emergency Support with SOS assistance",
      "Family Care Updates"
    ]
  };

  const specializedPackages = [
    {
      id: 'senior',
      name: 'Senior Care',
      duration: '12 months',
      price: '16,000',
      icon: Users,
      description: 'Complete senior support with doctor/nurse visits, wellness care, and 5–30% discounts on services',
      features: [
        "Premium Membership Benefits",
        "Comprehensive Health Checkup (₹2,999 value)",
        "Doctor Home Visits",
        "4 Online Specialist Consultations",
        "4 Professional Nursing Visits",
        "Wellness Expert Session",
        "Hospital Companion Service",
        "Nutritional Guidance"
      ]
    },
    {
      id: 'hospital',
      name: 'Hospital and Post-Hospital Care',
      duration: '1.5 months',
      price: '16,000',
      icon: Building2,
      description: 'Seamless recovery with home care, physiotherapy, and wellness support + up to 30% off on essential services',
      features: [
        "Premium Membership Benefits",
        "Health Checkup (₹2,999 value)",
        "Doctor Home Visit",
        "4 Online Specialist Consultations",
        "4 Professional Nursing Visits",
        "Wellness Consultation",
        "Physiotherapy Session",
        "12 months follow-up support"
      ]
    },
    {
      id: 'surgery',
      name: 'Surgery Care',
      duration: '1.5 months',
      price: '16,000',
      icon: Bed,
      description: 'Recover faster with post-surgery home visits, diet/physio support, and exclusive discounts up to 30%',
      features: [
        "Premium Membership Benefits",
        "Post-Surgical Tests (₹3,000 savings)",
        "Doctor Home Visit",
        "4 Online Specialist Consultations",
        "4 Professional Nursing Visits",
        "Wellness Consultation",
        "Physiotherapy Session",
        "12 months follow-up support"
      ]
    },
    {
      id: 'maternity',
      name: 'Maternity Care',
      duration: '9 months',
      price: '16,000',
      icon: Heart,
      description: 'Full prenatal care with tests, OBG and wellness consults, home support, and attractive service discounts',
      features: [
        "Premium Membership Benefits",
        "PCOS Test (₹3,799 value)",
        "Doctor Home Visit",
        "4 Online Specialist Consultations",
        "4 Professional Nursing Visits",
        "Wellness Consultation",
        "Nutritional Guidance",
        "OB-GYN Consultation"
      ]
    },
    {
      id: 'mother-child',
      name: 'Mother and Child Care',
      duration: '12 months',
      price: '16,000',
      icon: Baby,
      description: 'Support for mother and baby with health checks, pediatric consults, reminders, + up to 30% savings on services',
      features: [
        "Premium Membership Benefits",
        "Health Checkup (₹3,000 value)",
        "Doctor Home Visit",
        "4 Online Specialist Consultations",
        "4 Professional Nursing Visits",
        "Wellness Consultation",
        "Nutritional Guidance",
        "Pediatric Consultation"
      ]
    }
  ];

  return (
    <section className="py-16 bg-ah-lightest/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#005c93] mb-4">
            Healthcare Plans & Packages
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our carefully designed healthcare packages or get a custom plan tailored to your specific needs.
          </p>
        </motion.div>

        {/* Package Type Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 shadow-md inline-flex">
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'membership'
                  ? 'bg-[#005c93] text-white'
                  : 'text-gray-600 hover:text-[#005c93]'
              }`}
              onClick={() => setSelectedTab('membership')}
            >
              Premium Membership
            </button>
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'specialized'
                  ? 'bg-[#005c93] text-white'
                  : 'text-gray-600 hover:text-[#005c93]'
              }`}
              onClick={() => setSelectedTab('specialized')}
            >
              Specialized Packages
            </button>
          </div>
        </div>

        {/* Premium Membership Section */}
        {selectedTab === 'membership' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden mb-16"
          >
            <div className="p-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
                <div>
                  <div className="inline-block bg-[#005c93]/10 text-[#005c93] text-sm font-medium px-3 py-1 rounded-full mb-4">
                    Premium Membership
                  </div>
                  <h3 className="text-3xl font-bold text-[#005c93]">₹4,000</h3>
                  <p className="text-gray-600 mt-2">Registration (₹1,000) + Premium Package (₹3,000)</p>
                  <p className="text-sm text-gray-600 mt-1">Yearly renewal at ₹3,000</p>
                </div>
                <Button
                  className="mt-4 lg:mt-0 bg-[#005c93] text-white hover:bg-[#004c7a] transition-colors"
                  onClick={handleGetPremiumMembership}
                >
                  Get Premium Membership
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold text-[#005c93] mb-4">Core Services</h4>
                  <ul className="space-y-3">
                    {premiumMembershipFeatures.coreServices.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <Check className="h-5 w-5 text-[#005c93] mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#005c93] mb-4">Healthcare Access</h4>
                  <ul className="space-y-3">
                    {premiumMembershipFeatures.healthcareAccess.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <Check className="h-5 w-5 text-[#005c93] mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#005c93] mb-4">Assistance Services</h4>
                  <ul className="space-y-3">
                    {premiumMembershipFeatures.assistanceServices.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <Check className="h-5 w-5 text-[#005c93] mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Specialized Packages Section */}
        {selectedTab === 'specialized' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specializedPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#005c93]/10 flex items-center justify-center mr-4">
                      <pkg.icon className="h-6 w-6 text-[#005c93]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#005c93]">{pkg.name}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-[#005c93] mb-1">₹{pkg.price}</div>
                    <p className="text-sm text-gray-600">{pkg.description}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm text-gray-600">
                        <Check className="h-5 w-5 text-[#005c93] mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full bg-[#005c93] text-white hover:bg-[#004c7a] transition-colors"
                    onClick={() => navigate('/contact')}
                  >
                    Choose Package
                  </Button>
                </div>
              </motion.div>
            ))}

            {/* Custom Package Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-[#005c93] to-[#004c7a] rounded-xl shadow-lg overflow-hidden text-white"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">Custom Package</h3>
                <p className="mb-6">
                  Need a personalized healthcare package? We create custom plans for specific conditions like:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    <span>Diabetes Care</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    <span>Heart Health</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    <span>Thyroid Management</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    <span>PCOS Support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    <span>And more...</span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-white text-[#005c93] hover:bg-[#005c93]/10 transition-colors"
                  onClick={() => navigate('/contact')}
                >
                  Request Custom Package
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-[#005c93] mb-4">
            Need Help Choosing?
          </h3>
          <p className="text-gray-600 mb-6">
            Our healthcare experts are here to help you select the perfect plan for your needs.
          </p>
          <Button
            variant="outline"
            className="border-[#005c93] text-[#005c93] hover:bg-[#005c93] hover:text-white"
            onClick={() => navigate('/contact')}
          >
            Request a Callback
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Plans; 