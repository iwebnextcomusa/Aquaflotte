import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Fleet Washing Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [successResult, setSuccessResult] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || (!formState.email && !formState.phone)) {
      setErrorMsg('Please enter your name and phone or email.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessResult(data.message);
        setFormState({ name: '', email: '', phone: '', subject: 'Fleet Washing Inquiry', message: '' });
      } else {
        setErrorMsg(data.error || 'Unable to send message.');
      }
    } catch (err: any) {
      console.error('Contact Form Error:', err);
      setErrorMsg('Network error. Please call +1 (514) 212-0256 directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-100 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 tracking-tight">
            Contact <span className="text-sky-500">Aquaflotte</span> Montreal
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal">
            Ready to schedule mobile fleet washing or have questions? Contact our team anytime for fast dispatch and custom commercial quotes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info & Map Placeholder */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 text-slate-800">
              <h3 className="text-2xl font-black text-blue-900 border-b border-slate-200 pb-4">
                Company Contact Info
              </h3>

              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="p-3 rounded-lg bg-sky-100 text-sky-600 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-bold uppercase">Direct Phone Line</div>
                    <a
                      href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                      className="text-lg font-black text-blue-900 hover:text-sky-600 transition-colors"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                    <div className="text-[11px] text-emerald-600 font-bold">Click to Call Directly</div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="p-3 rounded-lg bg-sky-100 text-sky-600 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs text-slate-500 font-bold uppercase">Official Email</div>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-sm font-bold text-blue-900 hover:text-sky-600 transition-colors break-all"
                    >
                      {COMPANY_INFO.email}
                    </a>
                    <div className="text-[11px] text-slate-500 font-medium">Quotes & Commercial Inquiries</div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="p-3 rounded-lg bg-sky-100 text-sky-600 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-bold uppercase">Service Location</div>
                    <div className="text-sm font-bold text-blue-900">{COMPANY_INFO.location}</div>
                    <div className="text-[11px] text-slate-500 font-medium">100% Mobile Fleet Service On-Site</div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="p-3 rounded-lg bg-sky-100 text-sky-600 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-bold uppercase">Operating Hours</div>
                    <div className="text-sm font-bold text-blue-900">{COMPANY_INFO.hours}</div>
                    <div className="text-[11px] text-sky-600 font-semibold">Night & Weekend Shifts Available</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                  className="py-3 px-4 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs text-center shadow-md flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="py-3 px-4 rounded-full bg-white hover:bg-slate-100 text-blue-900 font-bold text-xs text-center border border-slate-300 flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-4 h-4 text-sky-600" />
                  Email Us
                </a>
              </div>
            </div>

            {/* Google Maps Placeholder */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl p-4 space-y-2 text-slate-800">
              <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                <span>📍 Montreal Service Coverage Zone</span>
                <span className="text-emerald-600">All Boroughs Covered</span>
              </div>
              <div className="relative h-48 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center">
                <div className="relative z-10 text-center space-y-2 p-4">
                  <div className="p-3 rounded-full bg-sky-100 text-sky-600 w-fit mx-auto border border-sky-200 animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold text-blue-900">Greater Montreal Area</div>
                  <p className="text-[11px] text-slate-600 max-w-xs font-medium">
                    Island of Montreal, Laval, Longueuil, Brossard, Saint-Laurent, Anjou, Dorval, South & North Shore
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xl space-y-6 text-slate-800">
            <div>
              <h3 className="text-2xl font-black text-blue-900">Send Us a Direct Message</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                Fill in your details and fleet requirements. Our Montreal account supervisor will respond promptly.
              </p>
            </div>

            {successResult ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-3 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-black text-blue-900">Message Sent Successfully!</h4>
                <p className="text-xs font-medium">{successResult}</p>
                <button
                  onClick={() => setSuccessResult(null)}
                  className="py-2.5 px-5 rounded-full bg-emerald-600 text-white font-bold text-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Abdourahmane Zit"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-sky-500 focus:outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (514) 212-0256"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-sky-500 focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      placeholder="abdourahmanezit1@gmail.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-sky-500 focus:outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700">Subject</label>
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-sky-500 focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Message / Fleet Details *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your fleet size, vehicle types, preferred wash location, and frequency..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-sky-500 focus:outline-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
