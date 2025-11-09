import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is a Healthcare Navigator?",
      answer: "A Healthcare Navigator is your dedicated healthcare professional who helps coordinate your medical care, schedule appointments, manage documentation, and ensure you receive the best possible healthcare experience. They act as your personal guide through the healthcare system."
    },
    {
      question: "How does AssistHealth work?",
      answer: "AssistHealth provides you with a dedicated Healthcare Navigator who becomes your single point of contact for all healthcare needs. They help schedule appointments, coordinate between different healthcare providers, manage medical records, handle insurance paperwork, and provide 24/7 support for any healthcare-related queries."
    },
    {
      question: "What services are included in the membership?",
      answer: "Our membership includes 24/7 access to your Healthcare Navigator, appointment scheduling and coordination, medical records management, insurance assistance, prescription management, hospital admission support, and emergency care coordination. The specific services vary by plan type."
    },
    {
      question: "Can I cancel my membership anytime?",
      answer: "Yes, you can cancel your membership at any time. We don't believe in long-term contracts. You can upgrade, downgrade, or cancel your plan whenever you need to, with no hidden fees or cancellation charges."
    },
    {
      question: "How quickly can I get support from my Navigator?",
      answer: "Our Healthcare Navigators are available 24/7. For urgent matters, you'll receive immediate assistance. For non-urgent queries, you can expect a response within 2-4 hours during business hours."
    },
    {
      question: "Do you provide emergency medical services?",
      answer: "While we don't provide direct emergency medical services, your Healthcare Navigator can help coordinate emergency care, contact emergency services on your behalf, inform your doctors, and ensure your medical information is readily available to emergency care providers."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about AssistHealth's services and membership benefits.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ; 