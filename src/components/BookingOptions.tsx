"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Trip } from "@/types";
import { normalizeImageUrl } from "@/lib/api";
import { useTripSelection } from "@/store/trip-selection";

interface BookingOptionsProps {
  trip: Trip;
  onDateSelect?: (date: string | null) => void;
  onVariantSelect?: (index: number) => void;
  onTravelSelect?: (index: number) => void;
  onPriceChange?: (price: number) => void;
}

export default function BookingOptions({ trip, onDateSelect, onVariantSelect, onTravelSelect, onPriceChange }: BookingOptionsProps) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedTravel, setSelectedTravel] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const { setCurrentPrice } = useTripSelection();
  
  // Calculate total price and notify parent/store
  useEffect(() => {
    const isJalandhar = trip.variants[selectedVariant]?.location.toLowerCase().includes("jalandhar");
    const basePrice = trip.variants[selectedVariant]?.discountedPrice || trip.price;
    const travelDelta = isJalandhar ? 0 : (trip.travelOptions[selectedTravel]?.priceDelta || 0);
    const roomDelta = trip.roomOptions[selectedRoom]?.priceDelta || 0;
    const total = basePrice + travelDelta + roomDelta;
    onPriceChange?.(total);
    setCurrentPrice(total);
  }, [selectedVariant, selectedTravel, selectedRoom, trip, onPriceChange, setCurrentPrice]);

  const [activeMonth, setActiveMonth] = useState("June");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Group dates by month
  const groupedDates: Record<string, any[]> = {};
  trip.availableDates.forEach(ad => {
    const d = new Date(ad.date);
    const month = d.toLocaleString('default', { month: 'long' });
    if (!groupedDates[month]) groupedDates[month] = [];
    groupedDates[month].push(ad);
  });

  const months = Object.keys(groupedDates);

  return (
    <div className="space-y-4 md:space-y-12">
      
      
      {/* Compact Mobile Selection Area */}
      <section className="md:p-10 p-5 bg-white border border-zinc-100 rounded-[32px] md:rounded-[40px] shadow-sm">
        <h2 className="text-sm md:text-xl font-bold text-navy mb-4 md:mb-8">Configure your Trip</h2>
        
        <div className="space-y-6">
          {/* Featured Image of Selected Starting Point */}
          <div className="relative aspect-video w-full rounded-[24px] overflow-hidden shadow-lg mb-8">
            <Image 
              src={normalizeImageUrl(trip.variants[selectedVariant]?.image) || "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6"} 
              alt={trip.variants[selectedVariant]?.location || "Starting Point"} 
              fill 
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-6">
              <p className="text-white font-bold text-xl leading-none mb-1">{trip.variants[selectedVariant]?.location}</p>
              <p className="text-white/70 text-[10px] font-black uppercase tracking-widest">{trip.variants[selectedVariant]?.duration}</p>
            </div>
          </div>

          {/* Choose Starting Location - Compact Pills on Mobile */}
          <div>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Starting From</p>
            <div className="flex flex-row overflow-x-auto no-scrollbar gap-2 md:gap-8 pb-1">
              {(trip.variants || []).map((v, i) => (
                <button 
                  key={i}
                  onClick={() => {
                    setSelectedVariant(i);
                    onVariantSelect?.(i);
                  }}
                  className={cn(
                    "px-4 py-2 rounded-full border-2 text-[11px] font-bold transition-all shrink-0 whitespace-nowrap",
                    selectedVariant === i ? "border-red-500 bg-red-50 text-red-500" : "border-zinc-100 text-zinc-500 bg-zinc-50"
                  )}
                >
                  {v.location} <span className="ml-1 opacity-60">₹{v.discountedPrice?.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Travelling Options - Compact Pills */}
          {!trip.variants[selectedVariant]?.location.toLowerCase().includes("jalandhar") && trip.travelOptions && trip.travelOptions.length > 0 && (
            <div>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Travel Mode</p>
              <div className="flex flex-row overflow-x-auto no-scrollbar gap-2 pb-1">
                {trip.travelOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedTravel(i)}
                    className={cn(
                      "px-4 py-2 rounded-full border-2 text-[11px] font-bold transition-all shrink-0 whitespace-nowrap",
                      selectedTravel === i ? "border-red-500 bg-red-50 text-red-500" : "border-zinc-100 text-zinc-500 bg-zinc-50"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Room Sharing - Compact Pills */}
          <div>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Room Sharing</p>
            <div className="flex flex-row overflow-x-auto no-scrollbar gap-2 pb-1">
              {(trip.roomOptions || []).map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedRoom(i)}
                  className={cn(
                    "px-4 py-2 rounded-full border-2 text-[11px] font-bold transition-all shrink-0 whitespace-nowrap",
                    selectedRoom === i ? "border-red-500 bg-red-50 text-red-500" : "border-zinc-100 text-zinc-500 bg-zinc-50"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Departure Dates */}
      <section className="md:p-10 p-5 bg-zinc-50 border border-zinc-100 rounded-[32px] md:rounded-[40px] shadow-sm">
        <h2 className="text-sm md:text-xl font-bold text-navy mb-4 md:mb-8">Departure Dates</h2>
        
        {/* Month Tabs - Smaller for Mobile */}
        <div className="flex flex-row overflow-x-auto no-scrollbar gap-2 mb-6 pb-1">
          {months.map((month) => (
            <button
              key={month}
              onClick={() => setActiveMonth(month)}
              className={cn(
                "px-4 py-2 rounded-full border-2 text-[11px] font-bold transition-all shrink-0 whitespace-nowrap",
                activeMonth === month ? "border-red-500 bg-red-50 text-red-500" : "border-zinc-200 text-zinc-400 bg-white"
              )}
            >
              {month}
            </button>
          ))}
        </div>

        {/* Circular Days - Compact for Mobile */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(groupedDates[activeMonth] || []).map((ad, i) => {
            const dateStr = new Date(ad.date).getDate().toString();
            return (
              <button
                key={i}
                onClick={() => {
                  setSelectedDate(ad.date);
                  onDateSelect?.(ad.date);
                }}
                className={cn(
                  "w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all",
                  selectedDate === ad.date ? "border-red-500 bg-white text-red-500 shadow-md" : "border-zinc-200 text-zinc-400 bg-white"
                )}
              >
                {dateStr}
              </button>
            );
          })}
        </div>

        <button className="w-full md:w-auto px-10 py-4 bg-red-600 text-white rounded-[20px] font-black uppercase text-xs tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-100">
           Book Now
        </button>
      </section>

    </div>
  );
}
