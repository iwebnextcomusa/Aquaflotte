import React from 'react';
import { Phone, ArrowRight, ShieldCheck, Sparkles, Truck, CheckCircle2, Award, Users } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface HeroSectionProps {
  onOpenQuoteModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuoteModal }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-28 sm:pt-36 pb-20 overflow-hidden bg-blue-950">
      {/* Background Video Container with Gradient Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-105 filter brightness-90 contrast-105"
        >
          <source src="https://ovueqoxhkaiksaei.public.blob.vercel-storage.com/Aquaflotte_fleet_washing_company%E2%80%A6_202608040032.mp4" type="video/mp4" />
        </video>
        {/* Layered Gradient overlays for high contrast readability while keeping video visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/60 to-blue-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-transparent to-blue-950/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 text-center flex flex-col items-center">
          {/* Trust Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 backdrop-blur-md text-sky-300 text-xs sm:text-sm font-semibold shadow-md">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-400"></span>
            </span>
            <span className="uppercase tracking-wider font-bold">Montreal's #1 Mobile Fleet Wash</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Professional <br />
            <span className="text-sky-400">
              Fleet Washing
            </span>{' '}
            Services in Montreal
          </h1>

          {/* Subheadline */}
          <p className="text-slate-200 text-base sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            Keep your commercial fleet pristine with reliable, eco-friendly, and fully certified mobile power washing services. We come directly to your depot with hot-water power rigs.
          </p>

          {/* Value Bullet Points */}
          <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200 font-semibold max-w-xl mx-auto text-left">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>100% Mobile Wash On-Site</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Eco-Friendly Soap & Wash</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>$5,000,000 Insured & Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Overnight & Weekend Shifts</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2 w-full sm:w-auto">
            <button
              onClick={onOpenQuoteModal}
              className="py-4 px-8 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-base shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
              className="py-4 px-8 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-bold text-base transition-all flex items-center justify-center gap-3"
            >
              <Phone className="w-5 h-5 text-sky-400" />
              <span>Call Now (+1 514 212-0256)</span>
            </a>
          </div>

          {/* Social Proof Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 border-t border-blue-900/80 text-xs text-slate-300 w-full max-w-xl">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Fully Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>100% Satisfaction Guaranteed</span>
            </div>
          </div>
        </div>

        {/* Stats Grid Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-blue-900/80">
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-md text-slate-800">
            <div className="text-3xl sm:text-4xl font-black text-blue-900">
              1,500+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              Vehicles Washed
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-md text-slate-800">
            <div className="text-3xl sm:text-4xl font-black text-blue-900">
              100%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              Mobile On-Site Service
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-md text-slate-800">
            <div className="text-3xl sm:text-4xl font-black text-blue-900">
              $5,000,000
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              Liability Insured
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-md text-slate-800">
            <div className="text-3xl sm:text-4xl font-black text-blue-900">
              99.4%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              Customer Satisfaction
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
