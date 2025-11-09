import React from 'react';
import Hero from "../components/public/Hero";
import Services from "../components/public/Services";
import HowWeHelp from "../components/public/HowWeHelp";
import Benefits from "../components/public/Benefits";
import Stats from "../components/public/Stats";
import WhoWeAre from "../components/public/WhoWeAre";
import WhyAssistHealth from "../components/public/WhyAssistHealth";
import Testimonials from "../components/public/Testimonials";
import FAQ from "../components/public/FAQ";

const Index = () => {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Services />
      <HowWeHelp />
      <Benefits />
      <Stats />
      <WhyAssistHealth />
      <Testimonials />
      <FAQ />
    </>
  );
};

export default Index; 