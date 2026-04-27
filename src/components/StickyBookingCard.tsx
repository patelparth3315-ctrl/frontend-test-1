"use client";

import { Check, MessageCircle } from "lucide-react";
import { useTripSelection } from "@/store/trip-selection";
import { Trip } from "@/types";

interface StickyBookingCardProps {
  trip: Trip;
}

export default function StickyBookingCard({ trip }: StickyBookingCardProps) {
  const { currentPrice } = useTripSelection();
  
  // Initial price if store is empty
  const displayPrice = currentPrice || trip.price;

  return (
    <>
      <div className="sticky top-32 space-y-6 hidden md:block">
        {/* Main Booking Card */}
        <div className="bg-white border border-zinc-100 rounded-[40px] overflow-hidden shadow-2xl shadow-zinc-200/50">
          {/* Savings Badge */}
          <div className="bg-[#E6F9F0] py-4 px-8 flex items-center justify-center gap-2 border-b border-zinc-50">
             <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
             </div>
             <span className="text-emerald-600 font-bold text-sm">Save ₹ 3,000</span>
          </div>

          <div className="p-10">
            <div className="flex justify-between items-start mb-8">
              <span className="text-zinc-500 font-bold text-sm">Starting from</span>
              <div className="text-right">
                <div className="text-4xl font-black text-navy mb-1 transition-all duration-300">₹ {displayPrice.toLocaleString()}</div>
                <div className="text-zinc-400 line-through font-bold text-sm decoration-2">₹ {(displayPrice + 3000).toLocaleString()}</div>
                <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-2">per person + taxes</div>
              </div>
            </div>

            <div className="h-px bg-zinc-100 mb-8" />

            <div className="text-center mb-8">
              <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-1">Current Package Configuration</p>
              <p className="text-navy font-bold">{trip.duration}</p>
            </div>

            <button className="w-full py-6 bg-[#F92C32] text-white rounded-[24px] font-black uppercase text-xs tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-red-100">
              Book My Spot
            </button>
          </div>
        </div>

        {/* Private Trips Card */}
        <div className="bg-white border border-zinc-100 rounded-[35px] p-8 shadow-xl shadow-zinc-100/50">
           <h3 className="text-xl font-black text-navy mb-1">Private Trips Available</h3>
           <p className="text-zinc-400 text-xs font-bold mb-6">for Group of 2+ Travellers</p>
           <button className="flex items-center gap-3 px-6 py-3 border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:bg-zinc-50 transition-all">
              <MessageCircle className="w-4 h-4" /> Request a Callback
           </button>
        </div>

        {/* WhatsApp Button */}
        <a href="https://wa.me/919924246267" className="flex items-center justify-center gap-3 w-full py-6 bg-white border border-zinc-100 rounded-[24px] shadow-lg hover:bg-zinc-50 transition-all">
           <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white fill-current" />
           </div>
           <span className="text-sm font-black text-navy uppercase tracking-widest">Whatsapp</span>
        </a>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-white border-t border-zinc-100 p-4 pb-safe flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-navy">₹ {displayPrice.toLocaleString()}</span>
            <span className="text-zinc-400 line-through text-[10px]">₹ {(displayPrice + 3000).toLocaleString()}</span>
          </div>
          <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Per Person + Taxes</p>
        </div>
        <button className="px-10 py-4 bg-[#F92C32] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl">
          Book Now
        </button>
      </div>
    </>
  );
}
