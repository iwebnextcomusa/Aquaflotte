import React from 'react';
import { PROCESS_STEPS } from '../data/companyData';
import { PhoneCall, Calculator, Calendar, Sparkles, ChevronRight } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  PhoneCall: <PhoneCall className="w-6 h-6 text-sky-600" />,
  Calculator: <Calculator className="w-6 h-6 text-sky-600" />,
  Calendar: <Calendar className="w-6 h-6 text-sky-600" />,
  Sparkles: <Sparkles className="w-6 h-6 text-sky-600" />,
};

interface ProcessSectionProps {
  onOpenQuoteModal: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenQuoteModal }) => {
  return (
    <section className="py-24 relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Simple & Efficient
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 tracking-tight">
            How Our Mobile Wash <span className="text-sky-500">Process Works</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal">
            Four easy steps to get your fleet washed professionally in Montreal without interrupting your operations.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="bg-white border border-slate-200 rounded-2xl p-7 relative shadow-md space-y-4 flex flex-col justify-between group hover:border-sky-500 transition-all duration-300 hover:-translate-y-1 text-slate-800"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sky-600">
                    {iconMap[step.icon]}
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-sky-500/30 transition-colors">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-xl font-black text-blue-900 group-hover:text-sky-600 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              {idx < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 text-slate-300">
                  <ChevronRight className="w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to action bar */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenQuoteModal}
            className="inline-flex items-center gap-2 py-4 px-8 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-base shadow-md transition-all"
          >
            <span>Start Step 1: Request Your Free Quote Now</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
