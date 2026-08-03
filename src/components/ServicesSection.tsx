import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/companyData';
import { ServiceItem } from '../types';
import { Truck, Container, HardHat, Wrench, Bus, Box, Zap, CalendarCheck, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onOpenQuoteModal: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Truck: <Truck className="w-6 h-6 text-sky-600" />,
  Container: <Container className="w-6 h-6 text-sky-600" />,
  HardHat: <HardHat className="w-6 h-6 text-sky-600" />,
  Wrench: <Wrench className="w-6 h-6 text-sky-600" />,
  Bus: <Bus className="w-6 h-6 text-sky-600" />,
  Box: <Box className="w-6 h-6 text-sky-600" />,
  Zap: <Zap className="w-6 h-6 text-sky-600" />,
  CalendarCheck: <CalendarCheck className="w-6 h-6 text-sky-600" />,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuoteModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const categories = ['all', 'Commercial', 'Heavy Duty', 'Industrial', 'Logistics', 'Contract'];

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-24 relative bg-slate-100 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Commercial Wash Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 tracking-tight">
            Our Professional <span className="text-sky-500">Fleet Cleaning</span> Services
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal">
            From semi-truck fleets in Saint-Laurent to heavy construction machinery in Laval, Aquaflotte delivers top-tier mobile power-washing tailored to your operational requirements.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold capitalize transition-all border ${
                activeCategory === cat
                  ? 'bg-sky-500 text-white border-sky-500 shadow-md'
                  : 'bg-white border-slate-200 text-slate-700 hover:text-blue-900 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'All Services (9)' : cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 hover:border-sky-500 transition-all duration-300 shadow-md flex flex-col justify-between group hover:-translate-y-1 relative text-slate-800"
            >
              {service.popular && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-md bg-sky-100 text-sky-700 text-[10px] font-extrabold uppercase tracking-wider">
                  Popular
                </div>
              )}

              <div className="space-y-4">
                {/* Image if available */}
                {service.image && (
                  <div className="h-44 rounded-xl overflow-hidden mb-4 border border-slate-200 relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-sky-100">
                    {iconMap[service.iconName] || <Truck className="w-6 h-6 text-sky-600" />}
                  </div>
                  <h3 className="text-xl font-black text-blue-900 group-hover:text-sky-600 transition-colors">
                    {service.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {service.shortDesc}
                </p>

                {/* Benefits List */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Key Advantages:
                  </div>
                  {service.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-bold text-slate-600 hover:text-blue-900 transition-colors flex items-center gap-1"
                >
                  View Full Details
                </button>
                <button
                  onClick={onOpenQuoteModal}
                  className="px-3.5 py-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>Book Wash</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Service Detail */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative space-y-6 text-slate-800">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-blue-900 font-bold"
              >
                ✕
              </button>

              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-sky-100">
                  {iconMap[selectedService.iconName] || <Truck className="w-6 h-6 text-sky-600" />}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-blue-900">{selectedService.title}</h3>
                  <span className="text-xs text-sky-600 font-bold uppercase">{selectedService.category} Service</span>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {selectedService.fullDesc}
              </p>

              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-blue-900 uppercase tracking-wider">Service Highlights:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedService(null);
                    onOpenQuoteModal();
                  }}
                  className="flex-1 py-3 px-4 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md"
                >
                  Request Quote for {selectedService.title}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
