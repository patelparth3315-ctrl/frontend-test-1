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
          className="group border border-blue-200 rounded-[20px] bg-gradient-to-r from-[#D6E4FF] to-[#ADC8FF] overflow-hidden transition-all duration-300 shadow-sm"
        >
          <button
            onClick={() => toggleDay(day.day)}
            className="w-full flex items-center p-3 text-left gap-4"
          >
            {/* Day Badge */}
            <div className="shrink-0 px-5 py-2 bg-[#4B5563] text-white rounded-[15px] text-[12px] font-bold text-center shadow-inner">
              Day {day.day}
            </div>

            {/* Title Section */}
            <div className="flex-1 min-w-0">
              <span className="text-sm font-bold text-navy leading-tight line-clamp-2">
                {day.title}
              </span>
            </div>

            {/* Stay & Meals Info - Right Side */}
            {(day.stay || day.meals) && (
              <div className="flex items-center gap-4 shrink-0 border-l border-navy/10 pl-4 py-1">
                <div className="flex flex-col gap-1.5 min-w-[120px]">
                  {day.meals && (
                    <div className="flex items-center gap-2 text-navy/60">
                      <Utensils className="w-3 h-3 shrink-0" />
                      <span className="text-[9px] font-bold uppercase tracking-tight leading-none">{day.meals}</span>
                    </div>
                  )}
                  {day.stay && (
                    <div className="flex items-center gap-2 text-navy">
                      <Hotel className="w-3 h-3 shrink-0 text-navy/60" />
                      <span className="text-[9px] font-black uppercase tracking-tight leading-none truncate max-w-[100px]">{day.stay}</span>
                    </div>
                  )}
                </div>
                <ChevronDown className={cn("w-4 h-4 text-navy/30 transition-transform duration-300", openDays.includes(day.day) && "rotate-180")} />
              </div>
            )}

            {!day.stay && !day.meals && (
              <ChevronDown className={cn("w-4 h-4 text-navy/30 ml-auto transition-transform duration-300", openDays.includes(day.day) && "rotate-180")} />
            )}
          </button>
          
          <div className={cn(
            "grid transition-all duration-500 ease-in-out",
            openDays.includes(day.day) ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}>
            <div className="overflow-hidden">
              <div className="px-4 pb-6 pt-2">
                <div className="p-6 bg-white/60 backdrop-blur-md rounded-[24px] border border-white shadow-lg">
                  {/* Bullet Points */}
                  <ul className="space-y-2.5 mb-8">
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
