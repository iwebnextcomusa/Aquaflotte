import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { IndustriesSection } from './components/IndustriesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { GallerySection } from './components/GallerySection';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { QuoteCalculatorModal } from './components/QuoteCalculatorModal';
import { ChatbotWidget } from './components/ChatbotWidget';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);

  const handleOpenQuoteModal = () => setIsQuoteModalOpen(true);
  const handleCloseQuoteModal = () => setIsQuoteModalOpen(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-sky-500 selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Main Content Sections */}
      <main id="main-content">
        <HeroSection onOpenQuoteModal={handleOpenQuoteModal} />
        <AboutSection />
        <ServicesSection onOpenQuoteModal={handleOpenQuoteModal} />
        <IndustriesSection />
        <WhyChooseUs />
        <GallerySection />
        <ProcessSection onOpenQuoteModal={handleOpenQuoteModal} />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>

      {/* Interactive Quote Modal Drawer */}
      <QuoteCalculatorModal isOpen={isQuoteModalOpen} onClose={handleCloseQuoteModal} />

      {/* Floating AI Chatbot Widget */}
      <ChatbotWidget />

      {/* Floating Call & Quote Quick Bar */}
      <FloatingActions onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
