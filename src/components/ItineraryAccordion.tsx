"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, MapPin, Utensils, BedDouble, Hotel, Home, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ItineraryDay } from "@/types";
import { normalizeImageUrl } from "@/lib/api";

interface ItineraryAccordionProps {
  itinerary: ItineraryDay[];
  startDate?: string | null;
}

export default function ItineraryAccordion({ itinerary, startDate }: ItineraryAccordionProps) {
  const [openDays, setOpenDays] = useState<number[]>([1]);
  const [isAllExpanded, setIsAllExpanded] = useState(false);

  const toggleDay = (day: number) => {
    setOpenDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const toggleExpandAll = () => {
    if (isAllExpanded) {
      setOpenDays([1]);
    } else {
      setOpenDays(itinerary.map(d => d.day));
    }
    setIsAllExpanded(!isAllExpanded);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-navy">Itinerary</h2>
        <button 
          onClick={toggleExpandAll}
          className="flex items-center gap-2 px-5 py-2 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-500 hover:bg-zinc-50 transition-all shadow-sm"
        >
          <div className="flex flex-col -space-y-1">
             <ChevronDown className={cn("w-3 h-3 transition-transform", isAllExpanded ? "rotate-180" : "")} />
             <ChevronDown className={cn("w-3 h-3 transition-transform", isAllExpanded ? "" : "rotate-180")} />
          </div>
          {isAllExpanded ? "Collapse All" : "Expand All"}
        </button>
      </div>

      <div className="space-y-4">
      {itinerary.map((day) => (
        <div 
          key={day.day} 
          className="group border border-zinc-100 rounded-[24px] bg-[#F3F4F6] overflow-hidden transition-all duration-300"
        >
          <button
            onClick={() => toggleDay(day.day)}
            className="w-full flex items-center p-4 text-left gap-4"
          >
            {/* Day Badge */}
            <div className="shrink-0 px-4 py-1.5 bg-[#4B5563] text-white rounded-full text-[11px] font-bold text-center">
              Day {day.day}
            </div>

            {/* Title Section */}
            <div className="flex-1 min-w-0">
              <span className="text-sm font-bold text-navy leading-tight line-clamp-1">
                {day.title}
              </span>
            </div>

            <ChevronDown className={cn("w-5 h-5 text-zinc-400 transition-transform duration-300", openDays.includes(day.day) && "rotate-180")} />
          </button>
          
          <div className={cn(
            "grid transition-all duration-500 ease-in-out",
            openDays.includes(day.day) ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}>
            <div className="overflow-hidden">
              <div className="px-8 pb-8 pt-2">
                <div className="p-8 bg-white/80 backdrop-blur-md rounded-[32px] border border-white shadow-xl">
                  {/* Bullet Points */}
                  <ul className="space-y-3 mb-10">
                    {day.activities?.map((act, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-medium text-zinc-600 leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 shrink-0" />
                        {act}
                      </li>
                    ))}
                  </ul>

                  {/* Sightseeing Places Gallery */}
                  {day.photos && day.photos.length > 0 && (
                    <div className="space-y-6">
                      <h4 className="text-sm font-black text-navy uppercase tracking-widest flex items-center gap-2">
                        Sightseeing Places
                      </h4>
                      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                        {day.photos.map((photo, i) => (
                          <div key={i} className="w-48 shrink-0 group/photo">
                            <div className="relative aspect-square rounded-[24px] overflow-hidden mb-3 border-4 border-white shadow-lg transition-transform group-hover/photo:scale-105">
                              <Image 
                                src={normalizeImageUrl(photo) || ""} 
                                alt={day.activities?.[i] || "Sightseeing"} 
                                fill 
                                className="object-cover" 
                              />
                            </div>
                            <p className="text-[10px] font-black text-navy uppercase tracking-widest px-1">
                              {day.activities?.[i] || "Explore"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
