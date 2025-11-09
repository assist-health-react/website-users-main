import { 
  Stethoscope, UserCheck, 
  Home, Activity, 
  Ambulance, FileText, 
  BookOpen, Phone,
  Navigation, ArrowRight,
  HelpCircle
} from 'lucide-react';

export const servicesData = [
  {
    id: "doctor-consultations",
    title: "Doctor Consultations",
    description: "Access our extensive network of specialists and primary care physicians with priority scheduling. Our team matches you with the right healthcare provider based on your specific needs, ensuring you receive expert care without lengthy wait times.",
    icon: Stethoscope,
    details: {
      types: [
        {
          title: "Online Consultation",
          description: "Connect instantly via call/video with doctors, get e-prescriptions, follow-ups, and specialist care."
        },
        {
          title: "Hospital/Clinic Visit",
          description: "Book physician/specialist appointments, check timings, find nearby centers and get priority care."
        },
        {
          title: "Doctor at Home Service",
          description: "Book a qualified doctor for at-home consultations—no traffic, no waiting. Perfect for routine checkups, elderly care, post-recovery visits, and family medicine."
        }
      ],
      benefits: [
        "Priority Appointments: Avoid long wait times with faster scheduling",
        "Access to Verified Specialists: Get matched with the right doctor for your condition",
        "Multiple Consultation Modes: Choose between online consultation, in-clinic visit, or doctor at home",
        "Continuity of Care: Smooth follow-ups and coordination with diagnostics and pharmacy",
        "Patient-Centric Support: We handle the logistics so you can focus on recovery"
      ]
    }
  },
  {
    id: "healthcare-navigation",
    title: "Healthcare Navigation",
    description: "Your personal healthcare guide through complex medical systems. Our navigators coordinate your entire care journey, from finding the right specialists to ensuring smooth transitions between providers, making healthcare understandable and accessible.",
    icon: Navigation,
    details: {
      benefits: [
        "Streamlined Care Journey: Avoid confusion and delays with coordinated transitions",
        "Access to Right Specialists: Get matched with verified specialists based on your needs",
        "Reduced Stress: No more chasing appointments, paperwork, or miscommunication",
        "Informed Decisions: Understand your diagnosis and treatment options",
        "Patient Empowerment: Feel confident and in control of your healthcare choices"
      ]
    }
  },
  {
    id: "post-hospital-care",
    title: "Post Hospital Care",
    description: "Comprehensive support during the critical recovery period after hospitalization. We coordinate follow-up appointments, medication management, home care services, and rehabilitation to ensure optimal recovery and prevent readmissions.",
    icon: Stethoscope,
    details: {
      services: [
        {
          title: "Nursing Services",
          description: "Our skilled nurses provide in-home care, including wound dressing, medication administration, vital monitoring, and more."
        },
        {
          title: "Home Care Services",
          description: "Personalized care at home to support daily activities, including assistance with mobility, personal hygiene, and meal preparation."
        },
        {
          title: "Rehabilitation Services",
          description: "We offer in-home physiotherapy and rehabilitation services to restore strength, mobility, and function."
        }
      ]
    }
  },
  {
    id: "hospital-companion",
    title: "AH Hospital Companion",
    description: "A dedicated professional by your side during hospital stays, ensuring you understand treatment plans, communicating with medical staff, monitoring care quality, and keeping family members informed about your progress.",
    icon: UserCheck,
    details: {
      types: [
        {
          title: "Hospital Companion – With Vehicle",
          description: "End-to-end support including transportation, from home pickup to hospital guidance and return."
        },
        {
          title: "Hospital Companion – Without Vehicle",
          description: "In-hospital companion for complete care support, assisting with procedures and communication."
        }
      ]
    }
  },
  {
    id: "diagnostics",
    title: "Diagnostics",
    description: "Streamlined coordination of all diagnostic needs, from routine bloodwork to complex imaging. We schedule tests at quality facilities, ensure proper preparation, expedite results, and facilitate interpretation of findings.",
    icon: Activity,
    details: {
      types: [
        {
          title: "Pathological Diagnostics",
          description: "Coordination of lab tests through certified laboratories with home sample collection where available."
        },
        {
          title: "Radiological Diagnostics",
          description: "Access to high-quality imaging services including X-rays, ultrasounds, CT scans, and MRIs."
        }
      ]
    }
  },
  {
    id: "ambulance",
    title: "Ambulance",
    description: "Immediate access to emergency transportation when needed most. Our network of reliable ambulance services ensures rapid response with properly equipped vehicles and trained personnel for any medical situation.",
    icon: Ambulance,
    details: {
      benefits: [
        "Timely emergency response",
        "Trained personnel for critical care",
        "Peace of mind in medical emergencies",
        "Nationwide ambulance access"
      ]
    }
  },
  {
    id: "health-records",
    title: "Organize Health Records",
    description: "Comprehensive management of your medical information in one secure, accessible location. We collect, digitize, and organize records from all providers, creating a complete health history that improves care coordination and decision-making.",
    icon: FileText,
    details: {
      benefits: [
        "Reduces repeated tests and confusion",
        "Enables quick decisions by doctors",
        "Simplifies second opinions",
        "Creates a complete health timeline"
      ]
    }
  },
  {
    id: "health-education",
    title: "Health Education and Support",
    description: "Evidence-based resources tailored to your specific health conditions. Our specialists provide personalized guidance to help you understand your health status and make informed decisions about treatment options.",
    icon: BookOpen,
    details: {
      benefits: [
        "Empowers patients to manage their health",
        "Reduces anxiety about diagnosis and treatment",
        "Promotes healthier lifestyle changes",
        "Increases treatment compliance"
      ]
    }
  },
  {
    id: "helpline",
    title: "24/7 Helpline",
    description: "Round-the-clock access to healthcare professionals for any medical concern. Our team provides immediate guidance, triage, and coordination of appropriate care whenever you need assistance.",
    icon: Phone,
    details: {
      benefits: [
        "Immediate help in case of emergencies or confusion",
        "Access to qualified professionals anytime",
        "Reduces unnecessary ER visits",
        "Round-the-clock peace of mind"
      ]
    }
  }
]; 