import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  useEffect(() => {
    // First scroll to top
    window.scrollTo(0, 0);
    
    // Then check if we need to scroll to contact form
    setTimeout(() => {
      if (window.location.hash === '#contact-form') {
        const element = document.getElementById('contact-form');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 100);
  }, []);

  return (
    <div className="min-h-screen">
      <section id="contact-form" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-[#005c93] mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Have questions or need assistance? Reach out to our team for personalized support.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005c93]"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005c93]"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005c93]"
                    placeholder="Your Phone Number"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005c93]"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <Button className="bg-[#005c93] hover:bg-[#004c7a] w-full">
                  Send Message
                </Button>
              </form>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="p-3 rounded-full bg-[#005c93]/10 text-[#005c93] mr-4">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Address</h3>
                      <p className="text-gray-600">
                        AssistHealth,<br />
                        Floor, #850, 3rd Floor,<br />
                        Sahakara Nagar Main Rd,<br />
                        Bengaluru, Karnataka 560092
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-3 rounded-full bg-[#005c93]/10 text-[#005c93] mr-4">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Phone</h3>
                      <p className="text-gray-600">+91 96112 32569</p>
                      <p className="text-gray-600">+91 96112 32519</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-3 rounded-full bg-[#005c93]/10 text-[#005c93] mr-4">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <p className="text-gray-600">support@assisthealth.in</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-bold mb-4">Working Hours</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed (Emergency Support Available)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 