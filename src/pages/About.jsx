import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardCheck, UserCheck, Clock, 
  Calendar, Users, Bell, FileText, 
  Activity, Shield, Linkedin
} from 'lucide-react';
import TeamMemberModal from '../components/public/TeamMemberModal';

const About = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "Dr. VASU G R",
      role: "Founder & CEO",
      description: "Dr. Vasu G R brings over 22 years of distinguished experience in the medical field as an Orthopedic Surgeon with expertise in Alternative Therapy.",
      image: "https://assisthealth-media.s3.ap-south-1.amazonaws.com/website/dr.vasu+gr.png",
      linkedin: "http://www.linkedin.com/in/dr-vasu-g-ramakrishna-2a55a2264",
      fullBio: `Dr. Vasu G R is the Founder of AssistHealth and brings over 22 years of distinguished experience in the medical field. A highly respected Orthopedic Surgeon with expertise in Alternative Therapy, Dr. Vasu G R is known for his integrative and patient-centered approach that goes beyond conventional allopathic treatments. His philosophy embraces a holistic model of care, focusing on the complete well-being of each individual.

His academic journey is marked by impressive credentials, including MBBS, MS, and MCh degrees, with education spanning across India and Russia. In addition to his formal medical training, Dr. Vasu G R has undergone eight years of specialized education in Alternative Therapy, which has empowered him to offer a truly integrated and comprehensive care model.

The inspiration behind AssistHealth came from Dr. Vasu's firsthand experiences—both as a Orthopaedician and as a caregiver. Witnessing the gaps and struggles patients face during their treatment journeys, along with the emotional and logistical challenges he encountered while managing a close relative's terminal cancer, led him to reimagine how healthcare should be delivered.

With this vision, he founded AssistHealth: a platform where everyone has access to a dedicated healthcare team committed to delivering premium, personalized, and priority care—without compromising on affordability. Dr. Vasu's mission is to make healthcare more supportive, seamless, and accessible for all, empowering individuals to navigate their health journeys with confidence and care.`
    },
    {
      name: "Sairam Viswanathan",
      role: "COO",
      description: "With a unique blend of analytical thinking and people-centric approach, Sairam is a versatile operations leader dedicated to tackling healthcare challenges.",
      image: "https://assisthealth-media.s3.ap-south-1.amazonaws.com/website/Sairam+new+2.png",
      linkedin: "http://www.linkedin.com/in/sairam-viswanathan-a57839211",
      fullBio: `With a unique blend of analytical thinking, people-centric approach, and deep optimism, Sairam is a versatile operations leader dedicated to tackling healthcare challenges. At AssistHealth, he wears multiple hats – from defining strategic priorities and building teams to managing both online and offline business verticals.

His diverse background includes working as a cardiac perfusionist, and years of experience in business. This varied experience has shaped his holistic approach to operations and leadership.

When not transforming healthcare operations, Sairam can be found immersed in a good book or seeking adventure in nature's embrace. He holds an MBA from Manipal Institute of Management and specialized in Cardiac Perfusion Technology at Bharath University.`
    },
    {
      name: "Pannaga S",
      role: "Technical Coordinator",
      description: "Pannaga S is a versatile healthcare professional who brings specialized pharmaceutical knowledge to his multifaceted role at AssistHealth.",
      image: "https://assisthealth-media.s3.ap-south-1.amazonaws.com/website/pannaga.png",
      linkedin: "https://www.linkedin.com/in/pannaga-s-714ba127b",
      fullBio: `Pannaga S is a versatile healthcare professional who brings specialized pharmaceutical knowledge to his multifaceted role at AssistHealth. With an M.Pharm in Pharmacology from PES University, where he graduated at the top of his class, and a B.Pharm from Rajiv Gandhi University of Health Sciences, his strong academic foundation underpins his practical approach to healthcare delivery.

At AssistHealth, Pannaga excels across multiple domains – from healthcare navigation and product operations to member support and tech development. His pharmacology expertise gives him unique insight into members' health requirements, while his cross-functional experience enables him to implement comprehensive solutions to complex healthcare challenges.

With an innate talent for troubleshooting, Pannaga tackles intricate healthcare challenges with remarkable agility and precision. His analytical mindset allows him to swiftly identify core issues and implement effective solutions, making him an invaluable asset during critical situations at AssistHealth. Beyond his professional commitments, he channels his technical creativity into developing habit-tracking applications and enjoys exploring new destinations through travel – interests that reflect his innovative mindset and curiosity about the world.`
    },
    {
      name: "Jui Adhikari",
      role: "Healthcare Navigator",
      description: "Jui brings diverse healthcare expertise, combining clinical nursing knowledge with specialized medical coding skills.",
      image: "https://assisthealth-media.s3.ap-south-1.amazonaws.com/website/jui.png",
      linkedin: "https://www.linkedin.com/in/jui-adhikari-341303216",
      fullBio: `Jui brings diverse healthcare expertise to her role at AssistHealth, combining clinical nursing knowledge with specialized medical coding skills. A certified GNM nurse with an Advanced Certification in Medical Coding, she brings a comprehensive understanding of both clinical care and healthcare administration.

With progressive healthcare experience across multiple specialties including endocrinology and maternal care, Jui has developed a versatile clinical background. Throughout her career, she has gained valuable experience at respected healthcare institutions, building a strong foundation in both clinical practice and operational management.

At AssistHealth, Jui excels in multiple roles – serving as a healthcare navigator while also driving sales initiatives and lead conversion. She skillfully handles and coordinates the healthcare requirements of members with remarkable ease, ensuring their needs are met promptly and comprehensively.

Jui's technical proficiency includes expertise in diagnosis codes (ICD-10 and CPT), essential nursing procedures, medical equipment operation, and healthcare documentation. She complements these clinical abilities with strong administrative skills in MS Office applications and Tally.

Fluent in English, Hindi, and Bengali, Jui excels in building client relationships and performing effectively under pressure. Beyond her professional pursuits, she nurtures her creative side through participation in fashion shows, arts and crafts, and painting – reflecting her well-rounded personality and diverse talents.`
    }
  ];

  const navigationSteps = [
    {
      title: "Initial Review",
      description: "We assess your health history, needs, and goals.",
      icon: <ClipboardCheck className="w-6 h-6" />
    },
    {
      title: "Dedicated Navigator",
      description: "Your own healthcare expert for personalized support.",
      icon: <UserCheck className="w-6 h-6" />
    },
    {
      title: "24/7 Access",
      description: "Always available for urgent questions or concerns.",
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: "Priority Appointments",
      description: "We book the right providers and prep you for visits.",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      title: "Seamless Provider Coordination",
      description: "Keeps all doctors informed and aligned.",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Follow-Up Care",
      description: "Medication reminders, next steps, and treatment plans.",
      icon: <Bell className="w-6 h-6" />
    },
    {
      title: "Insurance & Billing Help",
      description: "Insurance assistance and billing support.",
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: "Proactive Tracking",
      description: "Monitors your health and adjusts care as needed.",
      icon: <Activity className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#005c93] to-[#004c7a] text-white py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8">
              AssistHealth: Your All-in-One Healthcare Solution
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              We are dedicated to ensuring you receive the finest medical care and support available
            </p>
            <p className="text-lg text-gray-100">
              At AssistHealth, we believe everyone deserves health care that's responsive, coordinated, and personalized. 
              Our team of healthcare professionals works tirelessly to remove barriers between you and the care you need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Healthcare Navigation Steps */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Healthcare Navigation Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive healthcare navigation process ensures you receive the best possible care at every step
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {navigationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 rounded-full bg-[#005c93]/10 text-[#005c93] flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to transforming healthcare delivery
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer group"
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <div className="aspect-[4/3] w-full">
                  <img
                    src={member.image}
                    alt={member.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target;
                        target.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-[#005c93] transition-colors">{member.name}</h3>
                <p className="text-[#005c93] font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed mb-4">{member.description}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center text-[#005c93] hover:text-[#004c7a] transition-colors"
                  >
                  <Linkedin className="w-5 h-5 mr-2" />
                  <span>LinkedIn Profile</span>
                  </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#005c93]/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Experience Better Healthcare?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join AssistHealth today and take the first step towards a healthier tomorrow
            </p>
            <button 
              onClick={() => navigate('/contact#contact-form')}
              className="bg-[#005c93] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#004c7a] transition-colors"
            >
              Get Started Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Team Member Modal */}
      {selectedMember && (
      <TeamMemberModal
          member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
      )}
    </div>
  );
};

export default About; 