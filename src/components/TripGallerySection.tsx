"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";
import PhotoGalleryModal from "./PhotoGalleryModal";
import { Trip } from "@/types";

interface TripGallerySectionProps {
  trip: Trip;
}

export default function TripGallerySection({ trip }: TripGallerySectionProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const displayImages = [
    trip.heroImage,
    trip.images?.[0],
    trip.images?.[1],
    trip.images?.[2]
  ].filter(Boolean);

  return (
    <>
      <div className="w-full mb-12">
        <div className="grid grid-cols-2 gap-2 md:gap-4 aspect-video md:aspect-[21/9] w-full rounded-[24px] overflow-hidden group">
          {displayImages.map((img, i) => (
            <div 
              key={i} 
              className="relative w-full h-full cursor-pointer overflow-hidden group"
              onClick={() => setIsGalleryOpen(true)}
            >
              <Image 
                src={normalizeImageUrl(img) || "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6"} 
                alt="" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              
              {/* "See all" button on the last image */}
              {i === 3 && (
                <div className="absolute bottom-4 right-4 z-10">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsGalleryOpen(true); }}
                    className="bg-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold shadow-lg hover:bg-zinc-50 transition-all border border-zinc-100"
                  >
                    <ImageIcon className="w-4 h-4 text-zinc-600" /> 
                    See all
                  </button>
                </div>
              )}
            </div>
          ))}
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
