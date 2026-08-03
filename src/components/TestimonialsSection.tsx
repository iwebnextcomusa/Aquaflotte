import React from 'react';
import { TESTIMONIALS_DATA } from '../data/companyData';
import { Star, ShieldCheck, Sparkles, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 relative bg-slate-100 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Verified Client Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 tracking-tight">
            Trusted by Montreal’s Leading <span className="text-sky-500">Fleet Operators</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal">
            Read how logistics managers, construction directors, and transit operators rely on Aquaflotte for pristine mobile washing.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-8 relative shadow-md space-y-6 flex flex-col justify-between group hover:border-sky-500 transition-all duration-300 text-slate-800"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-sky-200 group-hover:text-sky-400 transition-colors" />
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic font-normal">
                  "{item.review}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-blue-900 flex items-center gap-1.5">
                    {item.name}
                    <ShieldCheck className="w-4 h-4 text-emerald-600 inline" />
                  </h4>
                  <div className="text-xs text-sky-600 font-bold">{item.role}</div>
                  <div className="text-xs text-slate-500 font-medium">{item.company}</div>
                </div>

                {item.fleetSize && (
                  <span className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
                    {item.fleetSize}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
