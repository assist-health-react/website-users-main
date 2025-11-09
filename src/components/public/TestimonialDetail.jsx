import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from 'react-router-dom';
import { Star, Quote } from 'lucide-react';

const TestimonialDetail = () => {
  const navigate = useNavigate();
  const { testimonialId } = useParams();

  // This would typically come from an API or database
  const testimonials = {
    'senior-care': {
      name: "Rajesh Kumar",
      age: 68,
      location: "Mumbai",
      title: "Exceptional Senior Care Support",
      rating: 5,
      content: `I cannot express enough gratitude for the exceptional care and support I've received from AssistHealth. As a senior citizen managing multiple health conditions, I was struggling to coordinate my various medical appointments and medications. Their team has been a blessing, handling everything from scheduling appointments to maintaining my medical records. The 24/7 support gives me and my family great peace of mind. They've made my healthcare journey so much easier and more manageable.`,
      image: "https://assisthealth-media.s3.ap-south-1.amazonaws.com/website/testimonial-1.jpg",
      date: "March 15, 2024",
      tags: ["Senior Care", "Medical Coordination", "24/7 Support"],
      highlights: [
        "Simplified appointment management",
        "Medication tracking assistance",
        "Round-the-clock support",
        "Comprehensive medical record keeping"
      ]
    },
    'family-care': {
      name: "Priya Sharma",
      age: 42,
      location: "Bangalore",
      title: "A Healthcare Partner for the Whole Family",
      rating: 5,
      content: `AssistHealth has transformed how our family manages healthcare. With three kids and elderly parents, coordinating medical care was becoming overwhelming. Their family health package has been a game-changer. From managing vaccinations for the kids to coordinating specialist appointments for my parents, they handle everything efficiently. The digital health records feature is particularly useful, giving us instant access to our family's medical history. Their proactive approach to preventive care has helped us stay ahead of health issues.`,
      image: "https://assisthealth-media.s3.ap-south-1.amazonaws.com/website/testimonial-2.jpg",
      date: "March 10, 2024",
      tags: ["Family Health", "Preventive Care", "Digital Records"],
      highlights: [
        "Family-wide healthcare coordination",
        "Vaccination management",
        "Digital health records",
        "Preventive care planning"
      ]
    }
  };

  const testimonial = testimonials[testimonialId];

  if (!testimonial) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Testimonial Not Found</h2>
          <Button onClick={() => navigate('/about')}>
            Back to About
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {testimonial.title}
            </h1>
            <div className="flex items-center justify-center mb-2">
              {[...Array(testimonial.rating)].map((_, index) => (
                <Star key={index} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <div className="text-gray-600">
              <span className="font-medium">{testimonial.name}</span>
              <span className="mx-2">•</span>
              <span>{testimonial.age} years</span>
              <span className="mx-2">•</span>
              <span>{testimonial.location}</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12 relative"
          >
            <Quote className="w-12 h-12 text-brand-blue/20 absolute -top-6 -left-6" />
            <p className="text-lg text-gray-600 leading-relaxed">
              {testimonial.content}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 p-6 rounded-xl"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Key Highlights
              </h2>
              <ul className="space-y-3">
                {testimonial.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <Star className="w-5 h-5 text-brand-blue mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-50 p-6 rounded-xl"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Services Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {testimonial.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-gray-600">
                <span className="text-sm">Shared on {testimonial.date}</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-gray-600 mb-6">
              Ready to experience our healthcare navigation services?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-brand-blue text-white hover:bg-brand-blue/90"
                onClick={() => navigate('/contact')}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                onClick={() => navigate('/about')}
              >
                View More Testimonials
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialDetail; 