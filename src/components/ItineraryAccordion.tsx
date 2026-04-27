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
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#D84E2D]">Schedule</h2>
        <button 
          onClick={toggleExpandAll}
          className="flex items-center gap-2 px-5 py-2 border border-[#D84E2D]/20 rounded-xl text-xs font-bold text-[#D84E2D] hover:bg-orange-50 transition-all shadow-sm"
        >
          {isAllExpanded ? "Collapse All" : "Expand All"}
        </button>
      </div>

      <div className="relative pl-8 space-y-12">
        {/* Vertical Line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-zinc-100" />

        {itinerary.map((day) => (
          <div key={day.day} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[30px] top-1.5 w-[14px] h-[14px] rounded-full bg-[#D84E2D] border-4 border-white shadow-sm z-10" />

            <div className="space-y-4">
              {/* Day Header */}
              <div className="flex items-center gap-2 text-[10px] md:text-xs font-black text-zinc-400 uppercase tracking-widest">
                <span className="text-zinc-800">DAY {day.day}</span>
                <span>•</span>
                {startDate ? (
                  <span>
                    {(() => {
                      const d = new Date(startDate);
                      d.setDate(d.getDate() + day.day - 1);
                      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase();
                    })()}
                  </span>
                ) : (
                  <span>PLAN</span>
                )}
              </div>

              {/* Activity Title */}
              <h3 className="text-xl md:text-2xl font-bold text-navy leading-tight">
                {day.title}
              </h3>

              {/* Compact Preview or Expanded Content */}
              <div className="space-y-4">
                <p className="text-sm md:text-base text-zinc-500 leading-relaxed max-w-2xl">
                  {day.activities?.[0] || "Discover the beauty and culture of this unique destination as we explore the local highlights and hidden gems."}
                </p>
                
                <div className={cn(
                  "grid transition-all duration-500 ease-in-out",
                  openDays.includes(day.day) ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}>
                  <div className="overflow-hidden">
                    <div className="pt-4 space-y-6">
                       {/* Activity List */}
                       <ul className="space-y-3">
                        {day.activities?.slice(1).map((act, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                            <Check className="w-4 h-4 text-[#D84E2D] mt-0.5 shrink-0" />
                            {act}
                          </li>
                        ))}
                      </ul>

                      {/* Photo Gallery */}
                      {(day.photos || day.gallery) && (
                        <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
                          {(day.photos || day.gallery || []).map((img, i) => (
                            <div key={i} className="relative w-48 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 shadow-md">
                              <Image 
                                src={normalizeImageUrl(img)} 
                                alt={`Day ${day.day} ${i}`} 
                                fill 
                                className="object-cover" 
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => toggleDay(day.day)}
                  className="flex items-center gap-1 text-sm font-bold text-[#D84E2D] hover:underline"
                >
                  {openDays.includes(day.day) ? "Show less" : "Know more"} 
                  <ChevronDown className={cn("w-4 h-4 transition-transform", openDays.includes(day.day) ? "rotate-180" : "-rotate-90")} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
