import React from 'react';
import { ShieldCheck, Leaf, Clock, Award, Sparkles, CheckCircle2, Truck, Droplets } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative bg-white overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Stack */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl group">
              <img
                src="/src/assets/images/mobile_wash_unit_1785777853344.jpg"
                alt="Aquaflotte Mobile Fleet Wash Unit in Montreal"
                className="w-full h-[420px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

              {/* Floating Highlight Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg flex items-center justify-between text-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-sky-100 text-sky-600">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-blue-900">Hot Water 200°F Pressure Power</div>
                    <div className="text-xs text-slate-500">Deep grease & salt removal</div>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800">
                  100% Eco
                </span>
              </div>
            </div>

            {/* Overlapping Badge */}
            <div className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xl max-w-xs text-slate-800">
              <div className="p-2.5 rounded-lg bg-amber-100 text-amber-700">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-blue-900">$5M Insurance Covered</div>
                <div className="text-[11px] text-slate-500">Compliant on all commercial sites</div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Values */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              About Aquaflotte Montreal
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 tracking-tight leading-tight">
              Montreal’s Trusted Partner in <br />
              <span className="text-sky-500">
                Mobile Fleet Cleanliness
              </span>
            </h2>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
              Founded in Montreal, Quebec, <strong>Aquaflotte</strong> was built on a single core principle: delivering uncompromising, reliable fleet washing directly to businesses without disrupting their operating schedules.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Whether you manage a logistics fleet of 50 semi-trucks, last-mile Sprinter vans, or heavy excavators on a construction site, our self-contained mobile power-washing rigs bring hot water, industrial pressure units, and biodegradable soaps straight to your lot.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-sky-500" />
                  Unmatched Reliability
                </div>
                <p className="text-xs text-slate-600">
                  We show up on time, rain or shine, day or night. Your schedule is our top priority.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  100% Eco-Friendly
                </div>
                <p className="text-xs text-slate-600">
                  Biodegradable, non-acidic detergents compliant with Quebec environmental regulations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-sky-500" />
                  Meticulous Detail
                </div>
                <p className="text-xs text-slate-600">
                  Chrome polishing, wheel degreasing, streak-free glass, and chassis salt neutralizer.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <Clock className="w-4 h-4 text-amber-600" />
                  Zero Fleet Downtime
                </div>
                <p className="text-xs text-slate-600">
                  Overnight & weekend washes mean your drivers hit the highway spotless every morning.
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <a
                href="#contact"
                className="py-3 px-6 rounded-full bg-blue-900 hover:bg-blue-800 text-white text-sm font-bold transition-all shadow-md"
              >
                Learn More About Our Crew
              </a>
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                className="text-sky-600 hover:text-sky-700 font-bold text-sm flex items-center gap-1"
              >
                Direct Line: {COMPANY_INFO.phone} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
