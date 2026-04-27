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
    <div className="space-y-12">
      
      {/* Choose Starting Location */}
      <section className="p-10 bg-white border border-zinc-100 rounded-[40px] shadow-sm">
        <h2 className="text-xl font-bold text-navy mb-8">Choose Starting Location</h2>
        <div className="flex flex-row overflow-x-auto no-scrollbar gap-6 md:gap-8 pb-4">
          {(trip.variants || []).map((v, i) => (
            <div 
              key={i}
              onClick={() => {
                setSelectedVariant(i);
                onVariantSelect?.(i);
              }}
              className="w-40 md:w-48 shrink-0 cursor-pointer group"
            >
              <div className={cn(
                "relative aspect-square rounded-[24px] md:rounded-[32px] overflow-hidden mb-4 border-2 transition-all p-1",
                selectedVariant === i ? "border-red-500 shadow-xl" : "border-transparent"
              )}>
                <div className="relative w-full h-full rounded-[20px] md:rounded-[24px] overflow-hidden">
                  <Image 
                    src={normalizeImageUrl(v.image) || "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6"} 
                    alt={v.location} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded-md text-[8px] font-black text-white uppercase tracking-widest">
                    {v.duration}
                  </div>
                </div>
              </div>
              <p className="font-bold text-navy mb-1 text-sm md:text-base">{v.location}</p>
              <div className="flex flex-col">
                 <span className="text-zinc-400 text-[10px] line-through leading-none mb-1">₹{v.originalPrice?.toLocaleString()}</span>
                 <span className="text-navy font-bold text-base md:text-lg leading-none">₹{v.discountedPrice?.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="h-[1px] bg-zinc-100 my-12" />

        {/* Travelling Options - Hide for Jalandhar */}
        {!trip.variants[selectedVariant]?.location.toLowerCase().includes("jalandhar") && trip.travelOptions && trip.travelOptions.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-navy mb-6">Travelling Options</h2>
            <div className="flex flex-row overflow-x-auto no-scrollbar gap-4 pb-4">
              {trip.travelOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTravel(i)}
                  className={cn(
                    "px-6 py-3 rounded-xl border-2 font-bold text-xs transition-all relative shrink-0 whitespace-nowrap",
                    selectedTravel === i 
                      ? "border-red-500 bg-red-50 text-red-500" 
                      : "border-zinc-800 text-zinc-800 hover:border-zinc-300"
                  )}
                >
                  {opt.label} {opt.priceDelta > 0 && `(+₹${opt.priceDelta.toLocaleString()})`}
                  {selectedTravel === i && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
                      <Check className="w-2 h-2" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Room Sharing */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-navy mb-6">Room Sharing</h2>
          <div className="flex flex-row overflow-x-auto no-scrollbar gap-4 pb-4">
            {(trip.roomOptions || []).map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelectedRoom(i)}
                className={cn(
                  "px-6 py-3 rounded-xl border-2 font-bold text-xs transition-all relative shrink-0 whitespace-nowrap",
                  selectedRoom === i ? "border-red-500 bg-red-50 text-red-500" : "border-zinc-800 text-zinc-800"
                )}
              >
                {opt.label}
                {selectedRoom === i && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
                    <Check className="w-2 h-2" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Departure Dates */}
      <section className="p-10 bg-zinc-50 border border-zinc-100 rounded-[40px] shadow-sm">
        <h2 className="text-xl font-bold text-navy mb-8">Departure Dates</h2>
        
        {/* Month Tabs */}
        <div className="flex flex-row overflow-x-auto no-scrollbar gap-4 mb-8 pb-4">
          {months.map((month) => (
            <button
              key={month}
              onClick={() => setActiveMonth(month)}
              className={cn(
                "px-6 py-3 rounded-xl border-2 font-bold text-xs transition-all relative shrink-0 whitespace-nowrap",
                activeMonth === month ? "border-red-500 bg-red-50 text-red-500" : "border-zinc-200 text-zinc-400 bg-white"
              )}
            >
              {month}
              {activeMonth === month && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
                  <Check className="w-2 h-2" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Circular Days */}
        <div className="flex flex-wrap gap-4 mb-10">
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
                  "w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all",
                  selectedDate === ad.date ? "border-red-500 bg-white text-red-500 shadow-md" : "border-zinc-200 text-zinc-400 bg-white hover:border-zinc-300"
                )}
              >
                {dateStr}
              </button>
            );
          })}
        </div>

        <button className="px-10 py-4 bg-red-600 text-white rounded-[20px] font-black uppercase text-xs tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-100">
           Book Now
        </button>
      </section>

    </div>
  );
}
