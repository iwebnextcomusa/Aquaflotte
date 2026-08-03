import React, { useState } from 'react';
import { Truck, Sparkles, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const Footer: React.FC = () => {
  const [showPrivacy, setShowPrivacy] = useState<boolean>(false);
  const [showTerms, setShowTerms] = useState<boolean>(false);

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 text-xs pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          {/* Company Branding Column */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#hero" className="flex items-center gap-3">
              <img
                src="https://ovueqoxhkaiksaei.public.blob.vercel-storage.com/Create_logo_for_Aquaflotte_2K_202608040038.jpeg"
                alt="Aquaflotte Fleet Washing Montreal Logo"
                className="h-12 w-auto object-contain rounded-lg shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="text-xl font-black text-white tracking-tight">
                  AQUA<span className="text-sky-400">FLOTTE</span>
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">
                  Mobile Fleet Washing Montreal
                </div>
              </div>
            </a>

            <p className="text-slate-400 leading-relaxed max-w-sm font-normal">
              Keep your commercial fleet, semi-trucks, and heavy machinery spotless with Montreal’s leading eco-friendly mobile hot-water pressure washing service.
            </p>

            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Fully Insured $5,000,000 Liability</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-sky-400 border border-slate-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-sky-400 border border-slate-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-sky-400 border border-slate-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#hero" className="hover:text-sky-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-sky-400 transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Services</a></li>
              <li><a href="#industries" className="hover:text-sky-400 transition-colors">Industries Served</a></li>
              <li><a href="#gallery" className="hover:text-sky-400 transition-colors">Project Gallery</a></li>
              <li><a href="#testimonials" className="hover:text-sky-400 transition-colors">Testimonials</a></li>
              <li><a href="#faq" className="hover:text-sky-400 transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-sky-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">Washing Services</h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Mobile Fleet Washing</a></li>
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Semi-Truck & Trailer Washing</a></li>
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Heavy Machinery Degreasing</a></li>
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Construction Equipment Cleaning</a></li>
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Bus & Coach Pressure Washing</a></li>
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Reefer Trailer Washouts</a></li>
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Recurring Wash Contracts</a></li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">Contact Info</h4>
            <div className="space-y-2.5 font-medium">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`} className="font-bold text-white hover:text-sky-400">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-sky-400 break-all">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{COMPANY_INFO.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-[11px] text-slate-400 font-medium">
          <div>
            © {new Date().getFullYear()} Aquaflotte Fleet Washing Inc. All rights reserved.
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setShowPrivacy(true)}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setShowTerms(true)}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
          </div>

          {/* Explicitly Requested iWebNext Developer Credit */}
          <div className="text-slate-300 font-medium">
            Developed by <a href="https://iwebnext.com" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline font-bold">iWebNext</a>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-lg w-full text-left space-y-4 shadow-2xl relative text-slate-800">
            <button onClick={() => setShowPrivacy(false)} className="absolute top-4 right-4 text-slate-500 font-bold hover:text-slate-800">✕</button>
            <h3 className="text-lg font-black text-blue-900">Aquaflotte Privacy Policy</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Aquaflotte respects your privacy. We collect customer names, phone numbers, and email addresses strictly for fleet wash inquiries, scheduling, and billing purposes. We never sell or share your personal information with third parties.
            </p>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-lg w-full text-left space-y-4 shadow-2xl relative text-slate-800">
            <button onClick={() => setShowTerms(false)} className="absolute top-4 right-4 text-slate-500 font-bold hover:text-slate-800">✕</button>
            <h3 className="text-lg font-black text-blue-900">Aquaflotte Terms of Service</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              All fleet washing services performed by Aquaflotte on customer premises are backed by $5,000,000 commercial liability coverage. On-site access and water containment agreements are confirmed prior to dispatch.
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};
