import React, { useState } from 'react';
import { GALLERY_DATA } from '../data/companyData';
import { GalleryItem } from '../types';
import { Sparkles, Maximize2, MoveHorizontal, MapPin } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'trucks' | 'heavy-equipment' | 'mobile-unit' | 'before-after'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Before / After Slider Position State (0 to 100%)
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const filteredGallery = activeTab === 'all'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(item => item.category === activeTab);

  const handleTouchOrMouseMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  return (
    <section id="gallery" className="py-24 relative bg-slate-100 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Our Proven Results
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 tracking-tight">
            Fleet Washing <span className="text-sky-500">Project Gallery</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal">
            Explore photos of our mobile fleet washing, heavy equipment degreasing, and before-and-after transformations across Montreal yards.
          </p>
        </div>

        {/* Interactive Before & After Showcase Banner */}
        <div className="mb-16 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-xl font-black text-blue-900 flex items-center gap-2">
                <MoveHorizontal className="w-5 h-5 text-sky-600" />
                Interactive Before & After Comparison
              </h3>
              <p className="text-xs text-slate-500 font-medium">Drag the slider horizontally to see the dirty vs sparkling clean result</p>
            </div>
            <span className="px-3 py-1 rounded-md bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold">
              Quebec Salt & Mud Removal
            </span>
          </div>

          {/* Slider Container */}
          <div
            className="relative h-[320px] sm:h-[420px] w-full rounded-xl overflow-hidden cursor-ew-resize select-none border border-slate-200 shadow-inner"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={(e) => {
              if (isDragging) {
                handleTouchOrMouseMove(e.clientX, e.currentTarget.getBoundingClientRect());
              }
            }}
            onTouchMove={(e) => {
              handleTouchOrMouseMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
            }}
            onClick={(e) => {
              handleTouchOrMouseMove(e.clientX, e.currentTarget.getBoundingClientRect());
            }}
          >
            {/* Dirty Image (Background - Before) */}
            <img
              src="/src/assets/images/heavy_machinery_wash_1785777839482.jpg"
              alt="Before - Dirty Heavy Machinery"
              className="absolute inset-0 w-full h-full object-cover filter contrast-125 saturate-50 brightness-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold shadow-md">
              BEFORE (Dirty Mud & Salt)
            </div>

            {/* Clean Image (Clipped - After) */}
            <div
              className="absolute inset-y-0 right-0 overflow-hidden"
              style={{ width: `${100 - sliderPos}%` }}
            >
              <img
                src="/src/assets/images/clean_semi_truck_fleet_1785777884394.jpg"
                alt="After - Spotless Fleet Vehicle"
                className="absolute inset-y-0 right-0 max-w-none h-full object-cover"
                style={{ width: '100%', minWidth: '100%' }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-md bg-sky-500 text-white text-xs font-bold shadow-md">
                AFTER (Aquaflotte Wash)
              </div>
            </div>

            {/* Divider Line */}
            <div
              className="absolute inset-y-0 w-1 bg-sky-500 shadow-md z-20"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xs shadow-xl border-2 border-white">
                <MoveHorizontal className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'trucks', label: 'Semi-Trucks & Box Fleet' },
            { id: 'heavy-equipment', label: 'Heavy Machinery' },
            { id: 'mobile-unit', label: 'Mobile Wash Rigs' },
            { id: 'before-after', label: 'Before & After' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all border ${
                activeTab === tab.id
                  ? 'bg-blue-900 text-white border-blue-900 shadow-md'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-md group cursor-pointer hover:border-sky-500 transition-all duration-300 relative"
            >
              <div className="h-64 relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <div className="absolute top-3 right-3 p-2 rounded-lg bg-white/90 text-blue-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <Maximize2 className="w-4 h-4 text-sky-600" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">
                    {item.category.replace('-', ' ')}
                  </span>
                  <h4 className="text-base font-bold text-white leading-tight">{item.title}</h4>
                  {item.location && (
                    <div className="flex items-center gap-1 text-xs text-slate-300">
                      <MapPin className="w-3 h-3 text-sky-400" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-3xl w-full shadow-2xl relative space-y-4 text-slate-800">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
              >
                ✕
              </button>

              <div className="rounded-xl overflow-hidden border border-slate-200 h-[380px]">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h3 className="text-xl font-black text-blue-900">{selectedItem.title}</h3>
                <p className="text-xs text-slate-600 font-medium mt-1">{selectedItem.description}</p>
                {selectedItem.location && (
                  <div className="flex items-center gap-1 text-xs text-sky-600 mt-2 font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Location: {selectedItem.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
