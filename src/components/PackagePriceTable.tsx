"use client";

import { cn } from "@/lib/utils";
import { Trip } from "@/types";

interface PackagePriceTableProps {
  variants: Trip["variants"];
  travelOptions: Trip["travelOptions"];
  selectedVariant?: number;
  selectedTravel?: number;
}

export default function PackagePriceTable({ 
  variants = [], 
  travelOptions = [], 
  selectedVariant = 0, 
  selectedTravel = 0 
}: PackagePriceTableProps) {
  
  // If no variants, don't render or show empty state
  if (!variants || variants.length === 0) return null;

  return (
    <div className="bg-white border border-zinc-100 rounded-[40px] p-10 md:p-14 shadow-sm mb-24">
      <h2 className="text-2xl font-bold text-navy mb-10">Package Price Comparison</h2>
      
      <div className="overflow-x-auto no-scrollbar border border-zinc-200 rounded-[24px]">
        <table className="w-full text-center border-collapse min-w-[600px] table-fixed">
          <thead>
            <tr className="bg-blue-50/50 text-[10px] font-black uppercase tracking-widest text-navy border-b border-zinc-200">
              <th className="py-5 border-r border-zinc-200 w-[25%]">Package</th>
              <th className="py-5 border-r border-zinc-200 w-[30%]">Sub Package</th>
              <th className="py-5 border-r border-zinc-200 w-[20%]">Regular</th>
              <th className="py-5 w-[25%]">Price</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((v, vIdx) => {
              const isJalandhar = v.location.toLowerCase().includes("jalandhar");
              const options = isJalandhar 
                ? [{ label: "Direct Join (Road)", priceDelta: 0 }] 
                : (travelOptions.length > 0 ? travelOptions : [{ label: "Standard Trip", priceDelta: 0 }]);
              
              return options.map((opt, oIdx) => {
                const regPrice = (v.originalPrice || v.discountedPrice + 3000) + (opt.priceDelta || 0);
                const discPrice = (v.discountedPrice || 0) + (opt.priceDelta || 0);
                const off = regPrice - discPrice;
                const isSelected = selectedVariant === vIdx && selectedTravel === oIdx;

                return (
                  <tr key={`${vIdx}-${oIdx}`} className={cn(
                    "border-b border-zinc-100 last:border-0 hover:bg-zinc-50/50 transition-colors",
                    isSelected ? "bg-red-50/20" : ""
                  )}>
                    {oIdx === 0 && (
                      <td 
                        rowSpan={options.length} 
                        className="py-10 border-r border-zinc-200 font-bold text-navy align-middle"
                      >
                        <div className="text-lg mb-1">{v.location}</div>
                        <div className="text-[10px] text-zinc-400 uppercase tracking-widest">{v.duration}</div>
                      </td>
                    )}
                    <td className="py-10 border-r border-zinc-200 px-6 font-bold text-zinc-600 text-sm">
                      {opt.label || "Standard Trip"}
                    </td>
                    <td className="py-10 border-r border-zinc-200">
                      <div className="text-zinc-400 line-through font-bold text-lg leading-none mb-2">₹{regPrice.toLocaleString()}</div>
                      <div className="text-[10px] font-black text-red-400 uppercase tracking-widest">₹{off.toLocaleString()}/- OFF</div>
                    </td>
                    <td className={cn(
                      "py-10 relative",
                      isSelected ? "bg-red-50/30" : ""
                    )}>
                      <div className="text-navy font-black text-2xl leading-none mb-2">₹{discPrice.toLocaleString()}</div>
                      <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">per person</div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white text-[8px] font-black uppercase tracking-tighter rounded-full shadow-lg">Selected</div>
                      )}
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
      
      <p className="mt-8 text-[10px] font-bold text-zinc-400 italic">
        * All prices are per person and exclude 5% GST. Booking amount: ₹5,000/- per person.
      </p>
    </div>
  );
}
