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
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-navy">Itinerary</h2>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-2 border border-zinc-200 rounded-lg text-sm font-bold text-zinc-500 hover:bg-zinc-50 transition-all">
            <Check className="w-4 h-4" /> Get PDF
          </button>
          <button 
            onClick={toggleExpandAll}
            className={cn(
              "flex items-center gap-2 px-6 py-2 border rounded-lg text-sm font-bold transition-all",
              isAllExpanded ? "bg-navy text-white border-navy" : "border-zinc-200 text-zinc-500 hover:bg-zinc-50"
            )}
          >
            <MapPin className="w-4 h-4" /> {isAllExpanded ? "Collapse All" : "Expand All"}
          </button>
        </div>
      </div>

      <div className="space-y-3">
      {itinerary.map((day) => (
        <div 
          key={day.day} 
          className="group border border-blue-100 rounded-[20px] bg-gradient-to-r from-blue-50/50 to-indigo-50/50 overflow-hidden hover:shadow-md transition-all duration-300"
        >
          <button
            onClick={() => toggleDay(day.day)}
            className="w-full flex flex-col md:flex-row items-center p-4 md:p-3 text-left gap-4 md:gap-6"
          >
            {/* Day Badge */}
            <div className="w-24 shrink-0 px-4 py-3.5 bg-zinc-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest text-center shadow-lg group-hover:bg-zinc-800 transition-colors self-center">
              Day {day.day}
            </div>

            {/* Title Section */}
            <div className="flex-1 min-w-0 self-center">
              {startDate && (
                <p className="text-[10px] font-bold text-zinc-400 mb-0.5">
                  {(() => {
                    const d = new Date(startDate);
                    d.setDate(d.getDate() + day.day - 1);
                    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                  })()}
                </p>
              )}
              <span className="text-sm md:text-base font-bold text-navy leading-tight line-clamp-1 opacity-90 group-hover:opacity-100 transition-opacity">
                {day.title}
              </span>
            </div>

            {/* Stay & Meals Info */}
            <div className="flex items-center gap-6 shrink-0 ml-auto">
              {/* Vertical Divider - only show if there's info to display */}
              {(day.stay || day.meals) && (
                <div className="hidden md:block w-[2px] h-10 bg-zinc-200/60 rounded-full" />
              )}
              
              <div className="flex items-center gap-6">
                {(day.stay || day.meals) && (
                  <div className="space-y-1.5 min-w-[140px]">
                    {day.meals && (
                      <div className="flex items-center gap-2.5 text-zinc-400">
                        <Utensils className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-[10px] font-black uppercase tracking-wider">{day.meals}</span>
                      </div>
                    )}
                    {day.stay && (
                      <div className="flex items-center gap-2.5 text-navy">
                        <Hotel className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span className="text-[10px] font-black uppercase tracking-wider truncate max-w-[120px]">{day.stay}</span>
                      </div>
                    )}
                  </div>
                )}
                <ChevronDown className={cn("w-5 h-5 text-zinc-300 transition-transform duration-300", openDays.includes(day.day) && "rotate-180")} />
              </div>
            </div>

            {!day.stay && !day.meals && (
               <ChevronDown className={cn("w-5 h-5 text-zinc-300 ml-auto transition-transform duration-300", openDays.includes(day.day) && "rotate-180")} />
            )}
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
                    {day.activities.map((act, i) => (
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
                                alt={day.activities[i] || "Sightseeing"} 
                                fill 
                                className="object-cover" 
                              />
                            </div>
                            <p className="text-[10px] font-black text-navy uppercase tracking-widest px-1">
                              {day.activities[i] || "Explore"}
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
