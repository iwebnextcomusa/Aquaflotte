import React, { useState } from 'react';
import { INDUSTRIES_DATA } from '../data/companyData';
import { Truck, Package, HardHat, Landmark, Car, Factory, Check, Sparkles } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Truck: <Truck className="w-5 h-5 text-sky-600" />,
  Package: <Package className="w-5 h-5 text-sky-600" />,
  HardHat: <HardHat className="w-5 h-5 text-sky-600" />,
  Landmark: <Landmark className="w-5 h-5 text-sky-600" />,
  Car: <Car className="w-5 h-5 text-sky-600" />,
  Factory: <Factory className="w-5 h-5 text-sky-600" />,
};

export const IndustriesSection: React.FC = () => {
  const [activeIndustry, setActiveIndustry] = useState(INDUSTRIES_DATA[0]);

  return (
    <section id="industries" className="py-24 relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Specialized Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 tracking-tight">
            Industries We <span className="text-sky-500">Proudly Serve</span> in Montreal
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal">
            Every commercial industry has unique vehicle cleaning challenges and compliance rules. We customize our mobile washing operations to meet your sector’s needs.
          </p>
        </div>

        {/* Industry Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {INDUSTRIES_DATA.map((ind) => {
            const isActive = activeIndustry.id === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveIndustry(ind)}
                className={`p-4 rounded-xl border text-left transition-all duration-300 flex flex-col items-center sm:items-start gap-2 ${
                  isActive
                    ? 'bg-blue-900 border-blue-900 text-white shadow-md'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className={`p-2.5 rounded-lg ${isActive ? 'bg-sky-500 text-white' : 'bg-slate-200 text-slate-700'}`}>
                  {iconMap[ind.iconName] || <Truck className="w-5 h-5" />}
                </div>
                <span className="text-xs font-bold text-center sm:text-left leading-tight">
                  {ind.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Showcase Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xl text-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-sky-100">
                  {iconMap[activeIndustry.iconName]}
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-blue-900">
                    {activeIndustry.name}
                  </h3>
                  <span className="text-xs text-sky-600 font-bold uppercase">Tailored Fleet Maintenance</span>
                </div>
              </div>

              <p className="text-slate-600 text-base leading-relaxed font-normal">
                {activeIndustry.description}
              </p>

              {/* Handled Vehicles */}
              <div className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Vehicles & Machinery Cleaned for This Industry:
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeIndustry.vehiclesHandled.map((vh, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-sky-700"
                    >
                      <Check className="w-3.5 h-3.5 text-sky-500" />
                      {vh}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md"
                >
                  Schedule Industry Fleet Service
                </a>
              </div>
            </div>

            {/* Image Feature */}
            <div className="lg:col-span-5 h-64 sm:h-80 rounded-xl overflow-hidden border border-slate-200 relative shadow-md">
              <img
                src={activeIndustry.image || '/src/assets/images/clean_semi_truck_fleet_1785777884394.jpg'}
                alt={activeIndustry.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-xs text-slate-700 font-medium">
                <span>📍 Active On-Site Fleet Washing across Montreal & Surrounding Areas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
