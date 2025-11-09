import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, ArrowRight } from 'lucide-react';
import { servicesData } from '@/data/services';

const ServiceDetail = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [serviceId]);

  const service = servicesData.find(s => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate('/services')}
            className="flex items-center text-[#005c93] hover:text-[#004c7a] transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Services
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Service not found</h1>
            <p className="text-gray-600 mt-2">The requested service does not exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#005c93] text-white py-16">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate('/services')}
            className="flex items-center text-white/90 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </button>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{service.title}</h1>
            </div>
            <p className="text-lg text-white/90">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Service Types */}
            {service.details.types && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#005c93] mb-6">Service Types</h2>
                <div className="space-y-6">
                  {service.details.types.map((type, index) => (
                    <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {type.title}
                      </h3>
                      <p className="text-gray-600">
                        {type.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services */}
            {service.details.services && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#005c93] mb-6">Our Services</h2>
                <div className="space-y-6">
                  {service.details.services.map((item, index) => (
                    <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {service.details.benefits && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#005c93] mb-6">Key Benefits</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid gap-4">
                    {service.details.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="p-1 bg-[#005c93]/10 rounded-full mt-1">
                          <Check className="w-4 h-4 text-[#005c93]" />
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-[#005c93] mb-4">Ready to Get Started?</h2>
              <p className="text-gray-600 mb-6">
                Contact us today to learn more about our {service.title.toLowerCase()} and how we can help you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    navigate('/contact');
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#005c93] text-white rounded-lg hover:bg-[#004c7a] transition-colors group"
                >
                  Contact Us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    navigate('/plans');
                  }}
                  className="px-6 py-3 bg-white text-[#005c93] rounded-lg border-2 border-[#005c93] hover:bg-[#005c93] hover:text-white transition-colors"
                >
                  View Plans
                </button>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600">
                <p>Need immediate assistance?</p>
                <p>Call us at +91 96112 32569</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail; 