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
  ].filter(Boolean).slice(0, 4);

  // Fallback images - High-quality Manali/Himalayan themed
  const fallbacks = [
    "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?q=80&w=2070", // Solang Balloons
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070", // Snow Peaks
    "https://images.unsplash.com/photo-1605140885332-f4ad6071b03c?q=80&w=2070", // Jogini Falls
    "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?q=80&w=2070"  // Mall Road
  ];

  const finalImages = [...displayImages];
  while (finalImages.length < 4) {
    finalImages.push(fallbacks[finalImages.length]);
  }

  const handleImageError = (index: number) => {
    setErrorImages(prev => ({ ...prev, [index]: true }));
  };

  return (
    <>
      <div className="w-full mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 md:gap-4 aspect-square md:aspect-[21/9] w-full rounded-[24px] md:rounded-[40px] overflow-hidden group shadow-2xl bg-zinc-50">
          {/* Main Large Image */}
          <div 
            className="relative md:col-span-2 md:row-span-2 cursor-pointer overflow-hidden group/item"
            onClick={() => setIsGalleryOpen(true)}
          >
            <Image 
              src={errorImages[0] ? fallbacks[0] : (normalizeImageUrl(finalImages[0]) || fallbacks[0])} 
              alt={trip.title} 
              fill 
              priority
              onError={() => handleImageError(0)}
              className="object-cover transition-transform duration-1000 group-hover/item:scale-110" 
            />
            <div className="absolute inset-0 bg-black/10 group-hover/item:bg-transparent transition-colors duration-500" />
          </div>

          {/* Right Smaller Images */}
          {finalImages.slice(1, 4).map((img, i) => {
            const idx = i + 1;
            return (
              <div 
                key={i} 
                className={cn(
                  "relative cursor-pointer overflow-hidden group/item hidden md:block",
                  i === 0 ? "md:col-span-1" : i === 1 ? "md:col-span-1" : "md:col-span-2"
                )}
                onClick={() => setIsGalleryOpen(true)}
              >
                <Image 
                  src={errorImages[idx] ? fallbacks[idx] : (normalizeImageUrl(img) || fallbacks[idx])} 
                  alt="" 
                  fill 
                  onError={() => handleImageError(idx)}
                  className="object-cover transition-transform duration-700 group-hover/item:scale-110" 
                />
                <div className="absolute inset-0 bg-black/5 group-hover/item:bg-transparent transition-colors duration-500" />
                
                {/* "See all" button on the last desktop image */}
                {i === 2 && (
                  <div className="absolute bottom-4 right-4 z-10">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setIsGalleryOpen(true); }}
                      className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-white transition-all border border-white/20 active:scale-95"
                    >
                      <ImageIcon className="w-4 h-4 text-primary-orange" /> 
                      Explore All
                    </button>
                  </div>
                )}
              </div>
            );
          })}


          {/* Mobile "See all" floating button */}
          <div className="absolute bottom-4 right-4 md:hidden z-10">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsGalleryOpen(true); }}
              className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-lg"
            >
              <ImageIcon className="w-4 h-4 text-primary-orange" /> 
              {trip.images?.length || 0}+ Photos
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
