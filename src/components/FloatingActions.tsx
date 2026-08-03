import React, { useState, useEffect } from 'react';
import { Phone, Calculator, ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface FloatingActionsProps {
  onOpenQuoteModal: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenQuoteModal }) => {
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-3">
      {/* Floating Call Button */}
      <a
        href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
        className="px-4 py-3 rounded-full bg-white border border-slate-200 text-blue-900 font-bold text-xs shadow-md hover:bg-slate-50 transition-all flex items-center gap-2 group"
        aria-label="Call Aquaflotte"
      >
        <Phone className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">{COMPANY_INFO.phone}</span>
        <span className="sm:hidden">Call Now</span>
      </a>

      {/* Floating Quick Quote Button */}
      <button
        onClick={onOpenQuoteModal}
        className="px-4 py-3 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md hover:scale-105 transition-all flex items-center gap-2"
      >
        <Calculator className="w-4 h-4" />
        <span>Get Free Quote</span>
      </button>

      {/* Scroll-to-Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-blue-900 shadow-md hover:bg-slate-50 transition-all flex items-center justify-center"
          aria-label="Scroll to top of page"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
