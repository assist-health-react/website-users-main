import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const WhoWeAre = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Who We Are
            </h2>
            <div className="text-xl font-semibold text-gray-800 mb-8">
              We're Not a Hospital. Not a Clinic. Not a Health App.
            </div>
            <p className="text-lg text-gray-600 mb-12">
              We're AssistHealth your trusted healthcare navigator and health management companion.
            </p>
            
            <div className="bg-gradient-to-br from-[#005c93]/10 to-[#005c93]/5 p-10 rounded-3xl mb-12 shadow-lg border border-[#005c93]/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Our mission is simple:
              </h3>
              <p className="text-2xl md:text-3xl text-[#005c93] font-bold leading-relaxed">
                To get our members the best available care every single time.
              </p>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              Whether it's choosing the right specialist, avoiding medical confusion, or arranging urgent support, 
              we are by your side with no ties to any one hospital or clinic. Only what's best for you.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre; 