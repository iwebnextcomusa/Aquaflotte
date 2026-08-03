import React, { useState } from 'react';
import { X, Calculator, CheckCircle2, Truck, Sparkles, Send, ShieldCheck, AlertCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { QuoteFormState } from '../types';

interface QuoteCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteCalculatorModal: React.FC<QuoteCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<QuoteFormState>({
    name: '',
    company: '',
    email: '',
    phone: '',
    fleetTypes: ['Semi-Trucks & Tractors'],
    quantity: 10,
    location: 'Montreal, QC',
    frequency: 'weekly',
    notes: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [submittedResult, setSubmittedResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const vehicleOptions = [
    { label: 'Semi-Trucks & Tractors', basePrice: 85 },
    { label: 'Box Trucks & Straight Trucks', basePrice: 55 },
    { label: 'Vans & Pickup Trucks', basePrice: 35 },
    { label: 'Heavy Machinery / Excavators', basePrice: 95 },
    { label: 'Buses & Passenger Coaches', basePrice: 65 },
    { label: 'Trailers & Reefers', basePrice: 45 },
  ];

  // Calculate live instant estimate preview
  const primaryVehicle = vehicleOptions.find(v => formData.fleetTypes.includes(v.label)) || vehicleOptions[0];
  let discountRate = 1.0;
  if (formData.frequency === 'weekly') discountRate = 0.80; // 20% off
  else if (formData.frequency === 'biweekly') discountRate = 0.88; // 12% off
  else if (formData.frequency === 'monthly') discountRate = 0.92; // 8% off

  const perVehicle = Math.round(primaryVehicle.basePrice * discountRate);
  const totalEstimated = Math.round(formData.quantity * perVehicle);

  const toggleVehicleType = (label: string) => {
    setFormData(prev => {
      const exists = prev.fleetTypes.includes(label);
      if (exists && prev.fleetTypes.length > 1) {
        return { ...prev, fleetTypes: prev.fleetTypes.filter(t => t !== label) };
      } else {
        return { ...prev, fleetTypes: [...prev.fleetTypes.filter(t => t !== label), label] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setErrorMsg('Please provide your name and phone number so we can contact you.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedResult(data);
      } else {
        setErrorMsg(data.error || 'Failed to submit quote request. Please try calling us.');
      }
    } catch (err: any) {
      console.error('Quote Submission Error:', err);
      setErrorMsg('Network error. Please call +1 (514) 212-0256 directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="quote-calculator" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative my-8 space-y-6 text-slate-800">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedResult ? (
          <>
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-sky-100 text-sky-600">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-blue-900">Instant Fleet Wash Estimator</h3>
                <p className="text-xs text-slate-500 font-medium">Get a fast, transparent quote for your Montreal fleet</p>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Vehicle Type Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Vehicle / Equipment Types:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {vehicleOptions.map((opt) => {
                    const isSelected = formData.fleetTypes.includes(opt.label);
                    return (
                      <button
                        type="button"
                        key={opt.label}
                        onClick={() => toggleVehicleType(opt.label)}
                        className={`p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-sky-50 border-sky-500 text-sky-900 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-sky-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fleet Quantity Slider */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Fleet Quantity:
                  </label>
                  <span className="text-base font-black text-sky-600">{formData.quantity} Vehicles</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="100"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  className="w-full accent-sky-500 bg-slate-200 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                  <span>2 Units</span>
                  <span>25 Units</span>
                  <span>50 Units</span>
                  <span>100+ Units</span>
                </div>
              </div>

              {/* Washing Frequency */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Service Frequency:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'weekly', label: 'Weekly', discount: '20% OFF' },
                    { id: 'biweekly', label: 'Bi-Weekly', discount: '12% OFF' },
                    { id: 'monthly', label: 'Monthly', discount: '8% OFF' },
                    { id: 'one-time', label: 'One-Time', discount: 'Standard' },
                  ].map((freq) => (
                    <button
                      type="button"
                      key={freq.id}
                      onClick={() => setFormData({ ...formData, frequency: freq.id as any })}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        formData.frequency === freq.id
                          ? 'bg-blue-900 border-blue-900 text-white font-bold shadow-md'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-xs">{freq.label}</div>
                      <div className="text-[10px] opacity-80 mt-0.5">{freq.discount}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Instant Estimate Banner */}
              <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-sky-700 uppercase font-bold">Estimated Cost Breakdown</div>
                  <div className="text-2xl font-black text-blue-900 mt-0.5">
                    ${totalEstimated} <span className="text-xs text-slate-500 font-normal">/ wash cycle</span>
                  </div>
                  <div className="text-[11px] text-slate-600 font-medium">
                    (~${perVehicle}/vehicle with {formData.frequency} volume discount)
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    Mobile On-Site
                  </span>
                </div>
              </div>

              {/* User Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-700">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marc Tremblay"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full mt-1 px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-sky-500 focus:outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Company / Fleet Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Nord-Sud Transport"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full mt-1 px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-sky-500 focus:outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (514) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full mt-1 px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-sky-500 focus:outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    placeholder="fleet@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full mt-1 px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-sky-500 focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Location in Greater Montreal & Specific Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Yard located in Saint-Laurent, preference for Sunday night washing."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-sky-500 focus:outline-none font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Calculating & Submitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Confirm & Lock In This Quote</span>
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-blue-900">Quote Request Confirmed!</h3>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700 max-w-md mx-auto text-left font-medium">
              <div><strong>Confirmation ID:</strong> <span className="text-sky-600 font-bold">{submittedResult.confirmationId}</span></div>
              <div><strong>Estimated Quote:</strong> ${submittedResult.estimatedTotal} / cycle (~${submittedResult.perVehicleEstimate}/vehicle)</div>
              <div><strong>Vehicles:</strong> {submittedResult.details.quantity} units</div>
              <div><strong>Frequency:</strong> {submittedResult.details.frequency}</div>
            </div>

            <p className="text-xs text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
              {submittedResult.message}
            </p>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="py-3 px-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
              >
                Close Window
              </button>
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                className="py-3 px-6 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-2"
              >
                Call +1 (514) 212-0256
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
