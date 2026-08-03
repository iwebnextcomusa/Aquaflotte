import React, { useState } from 'react';
import { FAQ_DATA } from '../data/companyData';
import { ChevronDown, Search, HelpCircle, Sparkles } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>(FAQ_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <section id="faq" className="py-24 relative bg-white border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Clear Answers
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 tracking-tight">
            Frequently Asked <span className="text-sky-500">Questions</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal">
            Have questions about our mobile setup, water standards, or scheduling? Find instant answers below.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. mobile, heavy machinery, eco)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:border-sky-500 focus:outline-none transition-colors shadow-sm font-medium"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'general', label: 'General & Service Area' },
            { id: 'services', label: 'Washing & Equipment' },
            { id: 'pricing', label: 'Pricing & Contracts' },
            { id: 'eco', label: 'Eco Standards' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                activeCategory === cat.id
                  ? 'bg-blue-900 border-blue-900 text-white shadow-md'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? '' : faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-black text-blue-900 hover:text-sky-600 transition-colors"
                  >
                    <span className="text-base sm:text-lg flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-sky-600 shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-sky-600 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed border-t border-slate-200 animate-in fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 text-slate-500 text-sm font-medium">
              No matching questions found. Call us at <strong className="text-blue-900">+1 (514) 212-0256</strong> for immediate help!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
