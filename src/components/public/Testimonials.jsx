import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight, Quote, Phone, Mail } from 'lucide-react';

const Testimonials = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(containerRef);

  const testimonials = [
    {
      id: "dilip-kumar",
      quote: "My wife had been suffering from tenosynovitis(thumb condition) for the past few years. She had planned a trip to India for the summer holidays and thought it would be a good opportunity to seek medical advice for her thumb. We contacted AssistHealth, a healthcare membership service that we had taken for our parents who live in Bangalore. They promptly arranged an online video consultation with an orthopedic specialist. I also requested an additional doctor's consultation to obtain a surgical recommendation. AssistHealth assisted us in scheduling surgery appointments and regularly followed up with us to ensure that my wife was recovering well. I highly recommend AssistHealth to NRI families.",
      author: "Dilip Kumar",
      location: "U.S.A",
      rating: 5,
      avatar: "DK"
    },
    {
      id: "pavithra-k",
      quote: "The best choice I made for my family during illness. Assist health provides extreme care and support during hospital stay, recovery and help you find the best hospital/doctor/treatment near you when you need them.",
      author: "Pavithra.K",
      location: "Bangalore",
      rating: 5,
      avatar: "PK"
    },
    {
      id: "vimala-rajan",
      quote: "I appreciate AssistHealth for their exceptional and prompt support for my mother overnight. The continuous medical assistance provided over 15 days has been invaluable. Grateful for their dedication and care.",
      author: "Vimala Rajan",
      location: "Singapore",
      rating: 5,
      avatar: "VR"
    },
    {
      id: "sai-manohar",
      quote: "I highly recommend AssistHealth for their outstanding service in managing my mother's health condition. The team was empathetic, professional, and offered personalized care. They efficiently explained the treatment plans and were always available for follow-up and queries. The integration of technology for appointments and record-keeping added convenience. Truly commendable for their professional expertise and compassionate approach",
      author: "Sai Manohar",
      location: "Bangalore",
      rating: 5,
      avatar: "SM"
    },
    {
      id: "vikram-lekkala",
      quote: "I am grateful to AssistHealth for promptly providing me with the necessary medication. I secured a tele-consultation appointment with Dr. Girish within just 5 minutes of reaching out to my Health Navigator. I appreciate the swift response and look forward to consulting with Dr. Girish from the USA whenever I require a rapid consultation",
      author: "Vikram Lekkala",
      location: "U.S.A",
      rating: 5,
      avatar: "VL"
    }
  ];

  useEffect(() => {
    if (isInView) {
      const startAnimation = async () => {
        await controls.start({
          x: [0, -(testimonials.length * 320)],
          transition: {
            duration: 30,
            ease: "linear",
            repeat: Infinity
          }
        });
      };
      startAnimation();
    }
  }, [isInView, controls, testimonials.length]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from real people who have experienced the difference of having AssistHealth by their side
          </p>
        </motion.div>

        <div className="relative max-w-[960px] mx-auto overflow-hidden mb-20">
          <div 
            ref={containerRef}
            className="relative h-[320px]"
          >
            <motion.div
              animate={controls}
              className="flex gap-4 absolute left-0 top-0"
              style={{ width: 'fit-content' }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${index}`}
                  className="w-[300px] flex-shrink-0 bg-white p-6 rounded-xl shadow-lg relative"
                >
                  <Quote className="w-6 h-6 text-[#005c93]/20 absolute top-4 right-4" />
                  
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#005c93]/10 flex items-center justify-center text-[#005c93] font-semibold text-sm mr-3">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {testimonial.author}
                      </h3>
                      <p className="text-gray-600 text-xs">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  <div className="relative h-[160px] overflow-hidden">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {testimonial.quote}
                    </p>
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
                  </div>

                  <Button
                    variant="link"
                    className="text-[#005c93] hover:text-[#004c7a] p-0 text-xs mt-2"
                    onClick={() => navigate(`/testimonials/${testimonial.id}`)}
                  >
                    Read Full Story <ArrowRight className="w-3 h-3 ml-1 inline" />
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Add fade effect on sides */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[960px] mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Have Questions?
            </h2>
            <p className="text-xl text-gray-600">
              Let's talk. We'll guide you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="text-center md:text-left">
              <Button
                size="lg"
                className="bg-[#005c93] text-white hover:bg-[#004c7a] w-full md:w-auto"
                onClick={() => navigate('/contact')}
              >
                Request a Callback
              </Button>
            </div>

            <div className="flex items-center justify-center gap-3 text-gray-600">
              <Mail className="w-5 h-5 text-[#005c93]" />
              <a 
                href="mailto:support@assisthealth.in"
                className="hover:text-[#005c93] transition-colors"
              >
                support@assisthealth.in
              </a>
            </div>

            <div className="flex items-center justify-center md:justify-end gap-3 text-gray-600">
              <Phone className="w-5 h-5 text-[#005c93]" />
              <div>
                <a 
                  href="tel:+919611232569"
                  className="hover:text-[#005c93] transition-colors"
                >
                  +91 9611232569
                </a>
                <br />
                <a 
                  href="tel:+919611232519"
                  className="hover:text-[#005c93] transition-colors"
                >
                  +91 9611232519
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials; 