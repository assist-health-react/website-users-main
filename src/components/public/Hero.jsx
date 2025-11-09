import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Phone, Calendar, Clock, Shield } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const accessToken = localStorage.getItem('accessToken');
    const mustAcceptTerms = localStorage.getItem('mustAcceptTerms') === 'true';
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    if (mustAcceptTerms || (accessToken && userProfile && userProfile.termsConditionsAccepted === false)) {
      navigate('/terms-and-conditions', { state: { isFromOTPVerify: true, from: 'login' } });
      return;
    }
    
    if (accessToken && userProfile) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleRegister = () => {
    const accessToken = localStorage.getItem('accessToken');
    const mustAcceptTerms = localStorage.getItem('mustAcceptTerms') === 'true';
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    if (mustAcceptTerms || (accessToken && userProfile && userProfile.termsConditionsAccepted === false)) {
      navigate('/terms-and-conditions', { state: { isFromOTPVerify: true, from: 'register' } });
    } else {
      navigate('/register');
    }
  };

  return (
    <section className="relative min-h-screen bg-[#0077cc] pt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/doctor-bg.jpg')`,
          backgroundPosition: 'center 20%'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0077cc]/70 to-[#004c99]/70" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <div className="inline-flex items-center bg-white/10 rounded-full px-4 py-2 mb-6">
              <img 
                src="/assets/assist-health-logo.png"
                alt="AssistHealth Logo"
                className="h-6 w-auto mr-2"
              />
              <span className="text-sm font-medium">Trusted Healthcare Partner</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Personal<br />
              <span className="text-[#003366]">Health Secretary</span><br />
              <span className="text-2xl md:text-3xl lg:text-4xl font-medium text-white/90">Guiding You to the Best Care, Always.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-4 max-w-2xl leading-relaxed">
              From illness to wellness—get premium, personalised, and priority care through India's only healthcare navigation platform.
            </p>

            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed italic">
              We manage your entire healthcare journey so you don't have to.
            </p>

            {/* Login/Register Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="xl"
                className="bg-white text-[#0066cc] hover:bg-white/90 hover:shadow-lg text-lg px-8 py-6 h-auto rounded-xl font-semibold"
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button
                size="xl"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0066cc] transition-colors duration-200 text-lg px-8 py-6 h-auto rounded-xl font-semibold"
                onClick={handleRegister}
              >
                Register Now
              </Button>
            </div>

            {/* Feature Icons */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              {[
                { icon: Phone, text: "24/7 Support Available" },
                { icon: Calendar, text: "Easy Appointment Booking" },
                { icon: Clock, text: "Quick Response Time" },
                { icon: Shield, text: "Secure & Confidential" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-medium text-white">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 border-t border-white/20 pt-8">
              {[
                { number: "10,000+", label: "Happy Clients", sublabel: "Across India" },
                { number: "500+", label: "Healthcare Partners", sublabel: "Top Hospitals" },
                { number: "98%", label: "Success Rate", sublabel: "Client Satisfaction" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white font-medium mb-1">{stat.label}</div>
                  <div className="text-white/60 text-sm">{stat.sublabel}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="/assets/backgrounds/healthcare-navigation-hero.jpg"
                alt="Healthcare Navigation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0066cc]/30 to-transparent" />
            </div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#0066cc]/10 rounded-full flex items-center justify-center">
                  <img
                    src="/assets/assist-health-logo-bg.png"
                    alt="Trust Badge"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Trusted by</div>
                  <div className="text-xl font-bold text-[#0066cc]">10,000+ Families</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0066cc]/10 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-[#0066cc]" />
                </div>
                <span className="text-sm font-medium">Available 24/7</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero; 