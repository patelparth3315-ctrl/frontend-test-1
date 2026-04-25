"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Star, Home, Coffee, Maximize2, MapPin, X } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

interface AccommodationGallery {
  url: string;
  category: string;
}

interface Accommodation {
  name: string;
  location: string;
  nights: string;
  type: string;
  starRating: string;
  roomType: string;
  meals: string;
  image: string;
  gallery: AccommodationGallery[];
}

interface StaySectionProps {
  accommodations: Accommodation[];
}

export default function StaySection({ accommodations }: StaySectionProps) {
  const [selectedStay, setSelectedStay] = useState<Accommodation | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    if (!selectedStay) return ["All"];
    const cats = new Set(selectedStay.gallery?.map(img => img.category) || []);
    return ["All", ...Array.from(cats).filter(c => c !== "All")];
  }, [selectedStay]);

  const filteredImages = useMemo(() => {
    if (!selectedStay) return [];
    if (activeCategory === "All") return selectedStay.gallery || [];
    return selectedStay.gallery.filter(img => img.category === activeCategory);
  }, [selectedStay, activeCategory]);

  if (!accommodations || accommodations.length === 0) return null;

  return (
    <div className="py-20 space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-primary-orange">
           <Home className="w-5 h-5" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">Comfort & Rest</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-navy italic uppercase tracking-tighter">Your Stay</h2>
        <p className="text-zinc-500 font-medium max-w-2xl leading-relaxed">
          Experience premium hospitality with handpicked accommodations that blend luxury with the authentic spirit of the destination.
        </p>
      </div>

      <div className="space-y-6">
        {accommodations.map((stay, i) => (
          <div key={i} className="group relative bg-white border border-zinc-100 rounded-[40px] overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-2xl hover:border-primary-orange/20">
             {/* Left: Image */}
             <div className="relative w-full md:w-[400px] h-[300px] shrink-0 overflow-hidden">
                <Image 
                  src={normalizeImageUrl(stay.image) || "https://images.unsplash.com/photo-1566073771259-6a8506099945"} 
                  alt={stay.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <button 
                  onClick={() => {
                    setSelectedStay(stay);
                    setActiveCategory("All");
                  }}
                  className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 text-[8px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg active:scale-95"
                >
                   <Maximize2 className="w-3 h-3 text-primary-orange" />
                   View Gallery
                </button>
             </div>

             {/* Right: Content */}
             <div className="p-8 md:p-12 flex-1 space-y-6">
                <div className="space-y-3">
                   <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-full border border-zinc-100">
                      <MapPin className="w-3 h-3 text-primary-orange" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">{stay.nights}</span>
                   </div>
                   <h3 className="text-3xl font-black text-navy uppercase tracking-tight italic">{stay.name}</h3>
                   <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 bg-yellow-400/10 px-3 py-1 rounded-full">
                         <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                         <span className="text-[10px] font-bold text-yellow-700 uppercase">{stay.starRating}</span>
                      </div>
                      <span className="text-zinc-400 text-xs font-medium">• {stay.type}</span>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-zinc-50">
                   <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0">
                         <Home className="w-5 h-5 text-zinc-400" />
                      </div>
                      <div>
                         <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">Room Category</p>
                         <p className="text-sm font-bold text-navy">{stay.roomType}</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0">
                         <Coffee className="w-5 h-5 text-zinc-400" />
                      </div>
                      <div>
                         <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">Inclusions</p>
                         <p className="text-sm font-bold text-navy">{stay.meals}</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedStay && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <div className="absolute inset-0 bg-navy/95 backdrop-blur-xl" onClick={() => setSelectedStay(null)} />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-7xl h-full max-h-[90vh] bg-white rounded-[40px] overflow-hidden flex flex-col shadow-2xl shadow-black/50"
            >
              {/* Modal Header */}
              <div className="p-8 md:p-10 border-b border-zinc-100 flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl md:text-3xl font-black text-navy uppercase italic">{selectedStay.name}</h3>
                    <div className="bg-primary-orange/10 px-3 py-1 rounded-full border border-primary-orange/20">
                      <span className="text-[10px] font-black text-primary-orange uppercase">{selectedStay.starRating}</span>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-xs font-black uppercase tracking-widest">{selectedStay.roomType}</p>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                        activeCategory === cat 
                          ? "bg-primary-orange text-white shadow-lg shadow-primary-orange/20" 
                          : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setSelectedStay(null)}
                  className="absolute top-8 right-8 md:relative md:top-0 md:right-0 w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-destructive hover:text-white transition-all group"
                >
                  <X className="w-5 h-5 transition-transform group-hover:rotate-90" />
                </button>
              </div>

              {/* Modal Content - Scrollable Gallery */}
              <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar bg-zinc-50/50">
                {filteredImages.length > 0 ? (
                  <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {filteredImages.map((img, idx) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={`${img.url}-${idx}`}
                        className="relative rounded-[24px] overflow-hidden group shadow-lg"
                      >
                        <img 
                          src={normalizeImageUrl(img.url)} 
                          alt={`${selectedStay.name} - ${img.category}`} 
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                           <span className="text-[10px] font-black text-white uppercase tracking-widest bg-primary-orange px-3 py-1.5 rounded-full">
                              {img.category}
                           </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                    <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center">
                      <Maximize2 className="w-8 h-8 text-zinc-300" />
                    </div>
                    <p className="text-zinc-400 font-black uppercase text-xs tracking-widest">No photos in this category</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

