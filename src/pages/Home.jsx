import React, { useState } from 'react';
import SiteNavbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import LoanProcess from '../components/LoanProcess';
import BankingPartners from '../components/BankingPartners';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import EligibilityModal from '../components/EligibilityModal';
import CallbackModal from '../components/Callbackmodal';

export default function Home(){
  const [showEligibility, setShowEligibility] = useState(false);
  const [showCallback, setShowCallback] = useState(false);

  return (
    <>
      <SiteNavbar />
      <HeroSection
        onCheckEligibility={() => setShowEligibility(true)}
        onRequestCallback={() => setShowCallback(true)}
      />
      <AboutSection />
      <ServicesSection />
      <LoanProcess />
      <BankingPartners />
      <FAQSection />
      <Footer />

      <EligibilityModal show={showEligibility} onHide={() => setShowEligibility(false)} />
      <CallbackModal show={showCallback} onHide={() => setShowCallback(false)} />
    </>
  );
}
