import React from 'react';
import { WHY_CHOOSE_DATA } from '../data/companyData';
import { Navigation, Leaf, Flame, ShieldCheck, Clock, FileCheck, Sparkles, DollarSign, Zap, ThumbsUp } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Navigation: <Navigation className="w-6 h-6 text-sky-600" />,
  Leaf: <Leaf className="w-6 h-6 text-emerald-600" />,
  Flame: <Flame className="w-6 h-6 text-amber-600" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-sky-600" />,
  Clock: <Clock className="w-6 h-6 text-sky-600" />,
  FileCheck: <FileCheck className="w-6 h-6 text-blue-900" />,
};

export const WhyChooseUs: React.FC = () => {
  const extraReasons = [
    {
      title: 'Competitive Volume Rates',
      description: 'Up to 20% discount on recurring weekly and monthly fleet contracts.',
      icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
    },
    {
      title: 'Fast Response & Dispatch',
      description: 'Same-day emergency or short-notice wash calls available.',
      icon: <Zap className="w-6 h-6 text-amber-600" />,
    },
    {
      title: 'High Customer Satisfaction',
      description: 'Over 99.4% satisfied commercial fleet client feedback across Montreal.',
      icon: <ThumbsUp className="w-6 h-6 text-sky-600" />,
    },
  ];

  return (
    <section className="py-24 relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            The Aquaflotte Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 tracking-tight">
            Why Choose <span className="text-sky-500">Aquaflotte</span>?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal">
            We provide an end-to-end commercial fleet washing experience built for zero hassle, superior cleanliness, and complete peace of mind.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-7 hover:border-sky-500 transition-all duration-300 shadow-md space-y-4 group hover:-translate-y-1 relative text-slate-800"
            >
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 group-hover:bg-sky-50 transition-colors">
                  {iconMap[item.iconName]}
                </div>
                {item.stat && (
                  <div className="text-right">
                    <div className="text-2xl font-black text-blue-900">
                      {item.stat}
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">
                      {item.statLabel}
                    </div>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-black text-blue-900 group-hover:text-sky-600 transition-colors">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}

          {/* Extra Cards */}
          {extraReasons.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-7 hover:border-sky-500 transition-all duration-300 shadow-md space-y-4 group hover:-translate-y-1 text-slate-800"
            >
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 w-fit">
                {item.icon}
              </div>
              <h3 className="text-xl font-black text-blue-900 group-hover:text-sky-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
