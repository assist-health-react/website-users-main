import React from "react";
import { motion } from 'framer-motion';
import { ShoppingBag, Package, Shield, Heart, Star, Stethoscope, Thermometer, Pill } from "lucide-react";

const Shop = () => {
  const productCategories = [
    {
      icon: Thermometer,
      title: "Health Monitoring",
      description: "Digital thermometers, BP monitors, and glucose meters"
    },
    {
      icon: Shield,
      title: "Personal Protection",
      description: "High-quality masks, sanitizers, and protective gear"
    },
    {
      icon: Heart,
      title: "Wellness Products",
      description: "Vitamins, supplements, and wellness essentials"
    },
    {
      icon: Pill,
      title: "Medical Supplies",
      description: "First aid kits, bandages, and medical equipment"
    }
  ];

  const features = [
    {
      icon: Star,
      title: "Premium Quality",
      description: "All products verified by healthcare professionals"
    },
    {
      icon: Shield,
      title: "Authentic Products",
      description: "Direct sourcing from authorized manufacturers"
    },
    {
      icon: Package,
      title: "Secure Delivery",
      description: "Safe packaging and reliable shipping"
    },
    {
      icon: Stethoscope,
      title: "Expert Support",
      description: "Guidance on product selection and usage"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#005c93] mb-4">
              Healthcare Products
            </h1>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
              Quality healthcare products curated by medical professionals.
            </p>
          </motion.div>

          {/* Coming Soon Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <div className="bg-gradient-to-r from-[#005c93] to-[#004c7a] rounded-xl p-12 text-white shadow-xl">
              <div className="flex justify-center mb-8">
                <div className="bg-white/10 p-6 rounded-full">
                  <ShoppingBag className="w-16 h-16" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Store is Coming Soon!
              </h2>
              <p className="text-xl mb-6 opacity-90">
                We're carefully selecting premium healthcare products for your well-being.
              </p>
              <div className="flex items-center justify-center gap-2 text-lg">
                <Package className="w-6 h-6" />
                <span>Premium Healthcare Products Coming Your Way</span>
              </div>
              <div className="mt-8 text-sm opacity-80">
                Our team is curating a selection of high-quality healthcare products, medical supplies, and wellness essentials to support your health journey.
              </div>
            </div>
          </motion.div>

          {/* Product Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-center text-[#005c93] mb-8">
              Product Categories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {productCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-[#005c93]/10 rounded-full">
                      <category.icon className="w-8 h-8 text-[#005c93]" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-[#005c93] mb-2 text-center">
                    {category.title}
                  </h4>
                  <p className="text-gray-600 text-center text-sm">
                    {category.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Store Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-center text-[#005c93] mb-8">
              Why Shop With Us
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-[#005c93]/10"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-2 bg-[#005c93]/10 rounded-full">
                      <feature.icon className="w-6 h-6 text-[#005c93]" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-[#005c93] mb-2 text-center">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-center text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Shop; 