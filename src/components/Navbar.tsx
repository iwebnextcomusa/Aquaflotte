import React, { useState, useEffect } from 'react';
import { Phone, Mail, Clock, Menu, X, ShieldCheck, Sparkles, Truck, ChevronRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface NavbarProps {
  onOpenQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Industries', href: '#industries' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-blue-950 border-b border-blue-900 text-xs text-slate-200 py-2 px-4 sm:px-6 lg:px-8 hidden md:block backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 text-sky-300 hover:text-white font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="flex items-center gap-2 hover:text-white transition-colors text-slate-300"
            >
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>{COMPANY_INFO.email}</span>
            </a>
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>{COMPANY_INFO.hours}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-semibold text-[11px]">
              <ShieldCheck className="w-3 h-3" />
              $5M Insured On-Site
            </span>
            <span className="text-slate-300">Montreal & Surrounding Areas</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm py-3'
            : 'bg-white/90 backdrop-blur-md py-4 border-b border-slate-200/80 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Concept */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-900 to-sky-500 p-0.5 shadow-md group-hover:shadow-lg transition-all">
              <div className="w-full h-full bg-blue-900 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <Truck className="w-5 h-5 text-white relative z-10 group-hover:scale-110 transition-transform" />
                <Sparkles className="w-3 h-3 text-sky-300 absolute top-1 right-1" />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-0.5 text-blue-900">
                AQUA<span className="text-sky-500">FLOTTE</span>
              </div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider hidden sm:block">
                Fleet Washing Montreal
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold text-slate-600 hover:text-blue-900 hover:bg-slate-100 transition-all uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
              className="px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-blue-900 border border-slate-200 text-xs font-bold transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-sky-500" />
              <span>Call Now</span>
            </a>
            <button
              onClick={onOpenQuoteModal}
              className="px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 group"
            >
              <span>Get Free Quote</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
              className="p-2 rounded-xl bg-sky-100 text-sky-700 sm:hidden"
              aria-label="Call Aquaflotte"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-blue-900 border border-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/98 border-b border-slate-200 px-4 py-6 mt-2 space-y-3 backdrop-blur-2xl shadow-xl animate-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200/60 transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-3 px-4 rounded-full bg-sky-500 text-white font-bold text-center text-sm shadow-md"
              >
                Get a Free Quote
              </button>
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                className="w-full py-3 px-4 rounded-full bg-slate-100 text-blue-900 border border-slate-200 font-bold text-center text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-sky-500" />
                Call +1 (514) 212-0256
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
