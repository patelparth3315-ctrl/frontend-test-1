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
      
      {/* Join us from Section */}
      <section className="bg-white">
        <h2 className="text-2xl font-bold text-[#D84E2D] mb-6">Join us from</h2>
        <div className="flex flex-row overflow-x-auto no-scrollbar gap-5 pb-6">
          {(trip.variants || []).map((v, i) => (
            <div 
              key={i}
              onClick={() => {
                setSelectedVariant(i);
                onVariantSelect?.(i);
              }}
              className={cn(
                "min-w-[200px] bg-white rounded-[24px] overflow-hidden border-2 transition-all p-4 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] cursor-pointer",
                selectedVariant === i ? "border-[#D84E2D] scale-[1.02]" : "border-zinc-100"
              )}
            >
              <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden mb-4">
                <Image 
                  src={normalizeImageUrl(v.image) || "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6"} 
                  alt={v.location} 
                  fill 
                  className="object-cover" 
                />
              </div>
              <h3 className="font-bold text-navy text-xl mb-1">{v.location}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-zinc-500 font-bold text-sm">₹{v.discountedPrice?.toLocaleString()}/-</span>
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-bold">{v.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dates Section */}
      <section className="bg-white border-t border-zinc-200 pt-10">
        <h2 className="text-lg font-bold text-navy mb-6">Dates from {trip.variants[selectedVariant]?.location}</h2>
        
        {/* Month Tabs - Orange theme */}
        <div className="flex flex-row overflow-x-auto no-scrollbar gap-3 mb-8">
          {months.map((month) => (
            <button
              key={month}
              onClick={() => setActiveMonth(month)}
              className={cn(
                "px-6 py-2 rounded-lg font-bold text-sm transition-all",
                activeMonth === month ? "bg-[#D84E2D] text-white shadow-lg" : "bg-white border border-zinc-200 text-zinc-400"
              )}
            >
              {month}
            </button>
          ))}
        </div>

        {/* Circular Days - Specific style from image */}
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
                  selectedDate === ad.date 
                    ? "border-[#D84E2D] bg-white text-navy scale-110 shadow-md" 
                    : "border-zinc-200 text-zinc-400 bg-white"
                )}
              >
                {dateStr}
              </button>
            );
          })}
        </div>

        <button className="w-full py-4 bg-[#D84E2D] text-white rounded-[16px] font-black uppercase text-sm tracking-widest hover:brightness-110 transition-all shadow-xl shadow-orange-100">
           Book Now
        </button>
      </section>

    </div>
  );
}
