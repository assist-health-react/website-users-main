import React from "react";
import { motion } from 'framer-motion';
import { Clock, Newspaper, Bell, BookOpen, Stethoscope, Brain } from "lucide-react";

const Blog = () => {
  const upcomingTopics = [
    {
      icon: Stethoscope,
      title: "Healthcare Navigation",
      description: "Expert guides on managing your healthcare journey effectively"
    },
    {
      icon: Brain,
      title: "Wellness Insights",
      description: "Tips and strategies for maintaining optimal health"
    },
    {
      icon: BookOpen,
      title: "Medical Knowledge",
      description: "Understanding common health conditions and treatments"
    },
    {
      icon: Bell,
      title: "Health Updates",
      description: "Latest developments in healthcare and medical research"
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
            <h1 className="text-4xl md:text-5xl font-bold text-[#005c93] mb-4">Our Blog</h1>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
              Stay updated with the latest healthcare insights, tips, and news.
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
                  <Newspaper className="w-16 h-16" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Exciting Content Coming Soon!
              </h2>
              <p className="text-xl mb-6 opacity-90">
                We're crafting valuable healthcare insights and articles just for you.
              </p>
              <div className="flex items-center justify-center gap-2 text-lg">
                <Clock className="w-6 h-6" />
                <span>Stay tuned for our upcoming blog posts</span>
              </div>
              <div className="mt-8 text-sm opacity-80">
                Our team of healthcare experts is preparing comprehensive articles on wellness, medical insights, and healthcare navigation.
              </div>
            </div>
          </motion.div>

          {/* Upcoming Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-center text-[#005c93] mb-8">
              What to Expect
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {upcomingTopics.map((topic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-[#005c93]/10 rounded-full">
                      <topic.icon className="w-8 h-8 text-[#005c93]" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-[#005c93] mb-2 text-center">
                    {topic.title}
                  </h4>
                  <p className="text-gray-600 text-center text-sm">
                    {topic.description}
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

export default Blog; 