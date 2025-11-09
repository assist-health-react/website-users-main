import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Activity } from 'lucide-react';

const useCountUp = (end, duration = 2000, delay = 0) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: false });
  const [isHovered, setIsHovered] = useState(false);
  const countRef = useRef(count);
  countRef.current = count;

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const percentage = Math.min(progress / duration, 1);
      
      if (inView || isHovered) {
        setCount(Math.floor(percentage * end));
      }

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    if (inView || isHovered) {
      setCount(0);
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(animate);
      }, delay);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration, delay, inView, isHovered]);

  return { count, ref: nodeRef, setIsHovered };
};

const Stats = () => {
  const members = useCountUp(4000, 2000);
  const services = useCountUp(10000, 2000, 200);

  return (
    <section className="py-16 bg-[#005c93] text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Members Stat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center p-8 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer"
            ref={members.ref}
            onMouseEnter={() => members.setIsHovered(true)}
            onMouseLeave={() => members.setIsHovered(false)}
          >
            <div className="mb-4 p-4 rounded-full bg-white/20">
              <Users size={40} className="text-white" />
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-2 flex items-center">
              {members.count.toLocaleString()}+
            </h3>
            <p className="text-xl text-gray-200">Happy Members</p>
            <p className="text-center mt-4 text-gray-300">
              Trusted by thousands of individuals for their healthcare journey
            </p>
          </motion.div>

          {/* Services Stat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center p-8 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer"
            ref={services.ref}
            onMouseEnter={() => services.setIsHovered(true)}
            onMouseLeave={() => services.setIsHovered(false)}
          >
            <div className="mb-4 p-4 rounded-full bg-white/20">
              <Activity size={40} className="text-white" />
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-2 flex items-center">
              {services.count.toLocaleString()}+
            </h3>
            <p className="text-xl text-gray-200">Services Delivered</p>
            <p className="text-center mt-4 text-gray-300">
              Successfully coordinated and delivered healthcare services
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Stats; 