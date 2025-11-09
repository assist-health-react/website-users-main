import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import TeamMemberModal from "./TeamMemberModal";

const About = () => {
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState(null);

  const features = [
    {
      title: "Personalized Care",
      description: "Get a dedicated health manager who understands your needs and coordinates all aspects of your healthcare journey.",
      image: "https://assisthealth-media.s3.ap-south-1.amazonaws.com/website/personalized-care.jpg"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock assistance for medical emergencies, appointment scheduling, and healthcare queries.",
      image: "https://assisthealth-media.s3.ap-south-1.amazonaws.com/website/24-7-support.jpg"
    },
    {
      title: "Priority Access",
      description: "Skip the queues with priority appointments at top hospitals and clinics across India.",
      image: "https://assisthealth-media.s3.ap-south-1.amazonaws.com/website/priority-access.jpg"
    }
  ];

  const stats = [
    {
      number: "10,000+",
      label: "Happy Clients",
      description: "Trusted by thousands of families across India"
    },
    {
      number: "500+",
      label: "Healthcare Partners",
      description: "Network of top hospitals and specialists"
    },
    {
      number: "24/7",
      label: "Support Available",
      description: "Round-the-clock healthcare assistance"
    },
    {
      number: "98%",
      label: "Success Rate",
      description: "High client satisfaction and resolution"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center bg-brand-light rounded-full px-4 py-2 mb-6">
                <Check className="w-5 h-5 text-brand-blue mr-2" />
                <span className="text-sm font-medium text-brand-blue">NABH Certified Healthcare Partner</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Transforming Healthcare <br />
                <span className="text-brand-blue">Navigation in India</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                AssistHealth is India's first healthcare navigation platform, dedicated to making quality healthcare accessible, manageable, and stress-free for everyone.
              </p>

              <div className="flex flex-col space-y-4 mb-8">
                {[
                  "Dedicated Health Manager",
                  "Priority Hospital Access",
                  "Comprehensive Care Coordination",
                  "Digital Health Records Management"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-brand-light flex items-center justify-center mr-3">
                      <Check className="w-4 h-4 text-brand-blue" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="bg-brand-blue text-white hover:bg-brand-dark"
                onClick={() => navigate('/contact')}
              >
                Get Started
                <ArrowRight className="ml-2" />
              </Button>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                <img
                  src="https://assisthealth-media.s3.ap-south-1.amazonaws.com/website/about-hero.jpg"
                  alt="Healthcare Navigation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="https://assisthealth-media.s3.ap-south-1.amazonaws.com/website/nabh.png"
                    alt="NABH Certification"
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-600">Certified by</div>
                    <div className="text-lg font-bold text-brand-blue">NABH</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Highest standard of healthcare quality and patient safety
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose AssistHealth?
            </h2>
            <p className="text-xl text-gray-600">
              Experience healthcare like never before with our comprehensive navigation services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/90">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-brand-blue mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-2">
                  {stat.label}
                </div>
                <div className="text-gray-600">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 