"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";
import { cn } from "@/lib/utils";
import PhotoGalleryModal from "./PhotoGalleryModal";

import { Trip } from "@/types";

interface TripGallerySectionProps {
  trip: Trip;
}

export default function TripGallerySection({ trip }: TripGallerySectionProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [errorImages, setErrorImages] = useState<Record<number, boolean>>({});

  const displayImages = [
    trip.heroImage,
    ...(trip.images || [])
  ].filter(Boolean).slice(0, 5);

  // Fallback images
  const fallbacks = [
    "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?q=80&w=2070",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070",
    "https://images.unsplash.com/photo-1605140885332-f4ad6071b03c?q=80&w=2070",
    "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?q=80&w=2070",
    "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070"
  ];

  const finalImages = [...displayImages];
  while (finalImages.length < 5) {
    finalImages.push(fallbacks[finalImages.length]);
  }

  const handleImageError = (index: number) => {
    setErrorImages(prev => ({ ...prev, [index]: true }));
  };

  const ImageItem = ({ idx, className, onClick }: { idx: number, className?: string, onClick: () => void }) => (
    <div 
      className={cn("relative cursor-pointer overflow-hidden group/item", className)}
      onClick={onClick}
    >
      <Image 
        src={errorImages[idx] ? fallbacks[idx] : (normalizeImageUrl(finalImages[idx]) || fallbacks[idx])} 
        alt="" 
        fill 
        priority={idx === 0}
        onError={() => handleImageError(idx)}
        className="object-cover transition-transform duration-700 group-hover/item:scale-110" 
      />
      <div className="absolute inset-0 bg-black/5 group-hover/item:bg-transparent transition-colors duration-500" />
      {idx === 4 && (
        <div className="absolute bottom-4 right-4 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsGalleryOpen(true); }}
            className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[9px] font-black uppercase tracking-tight shadow-xl hover:bg-white transition-all border border-zinc-100 active:scale-95"
          >
            <ImageIcon className="w-3.5 h-3.5 text-zinc-400" /> 
            <span className="text-zinc-600">See all</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="w-full mb-12">
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-3 aspect-[21/9] w-full">
           {/* Column 1: Vertical */}
           <ImageItem idx={0} className="row-span-2 rounded-[24px]" onClick={() => setIsGalleryOpen(true)} />
           
           {/* Column 2: Vertical */}
           <ImageItem idx={1} className="row-span-2 rounded-[24px]" onClick={() => setIsGalleryOpen(true)} />

           {/* Column 3: Stacked */}
           <div className="grid grid-rows-2 gap-3 row-span-2">
              <ImageItem idx={2} className="rounded-[24px]" onClick={() => setIsGalleryOpen(true)} />
              <ImageItem idx={3} className="rounded-[24px]" onClick={() => setIsGalleryOpen(true)} />
           </div>

           {/* Column 4: Vertical */}
           <ImageItem idx={4} className="row-span-2 rounded-[24px]" onClick={() => setIsGalleryOpen(true)} />
        </div>

        {/* Mobile View - Simple Scroll or Stack */}
        <div className="md:hidden relative aspect-square w-full rounded-[24px] overflow-hidden">
          <ImageItem idx={0} className="w-full h-full" onClick={() => setIsGalleryOpen(true)} />
          <div className="absolute bottom-4 right-4 z-10">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsGalleryOpen(true); }}
              className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-lg"
            >
              <ImageIcon className="w-4 h-4 text-primary-orange" /> 
              View {trip.images?.length || 0}+
            </button>
          </div>
        </div>
      </div>


      <PhotoGalleryModal 
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        tripTitle={trip.title}
        heroImage={trip.heroImage}
        images={trip.images}
        itinerary={trip.itinerary || []}
      />
    </>
  );
}
