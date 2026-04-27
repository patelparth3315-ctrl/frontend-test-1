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
      <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.1)] overflow-hidden pb-[env(safe-area-inset-bottom)]">
        {/* Savings Bar */}
        <div className="bg-[#dcfce7] px-6 py-2.5 flex items-center gap-2 relative">
          <div className="w-4 h-4 rounded-full bg-[#22c55e] flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-white stroke-[3px]" />
          </div>
          <span className="text-[#15803d] font-bold text-[11px] tracking-tight">Save ₹ 3,000</span>
          
          {/* Wavy bottom edge - simplified as a subtle overlap for now */}
          <div className="absolute bottom-[-4px] left-0 right-0 h-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDQwIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgOEM1LjMzMzMzIDggNi42NjY2NyAwIDEzLjMzMzMgMEMyMCAwIDIxLjMzMzMgOCAyNi42NjY3IDhDMzIuMDAwMSA4IDMzLjMzMzQgMCA0MCAwVjhaIiBmaWxsPSIjZGNmY2U3Ii8+PC9zdmc+')] bg-repeat-x bg-[length:20px_4px]"></div>
        </div>

        <div className="px-6 py-5 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-navy leading-none">₹ {displayPrice.toLocaleString()}</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-zinc-400 line-through text-xs font-bold">₹ {(displayPrice + 3000).toLocaleString()}</span>
              <span className="text-zinc-400 text-[10px] font-medium uppercase tracking-wider">per person</span>
            </div>
          </div>
          <button className="bg-[#ee2a24] text-white px-8 py-4 rounded-xl font-bold text-sm tracking-tight active:scale-95 transition-all shadow-lg shadow-red-500/20">
            Book Now
          </button>
        </div>
      </div>
    </>
  );
}
