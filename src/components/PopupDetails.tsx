"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";

interface Section {
  id: string;
  label: string;
  type: "list" | "simple" | "table";
  content: any[];
  note?: string;
}

const SECTIONS: Section[] = [
  { 
    id: "cancellation", 
    label: "Cancellation Policy", 
    type: "list",
    content: [
      { label: "Before more than 40 days of Departure", val: "10% deduction" },
      { label: "Before 21 to 40 days of Departure", val: "25% deduction" },
      { label: "Before 11 to 20 days of Departure", val: "40% deduction" },
      { label: "Before 2 to 10 days of Departure", val: "60% deduction" },
      { label: "In the last 48 hours of Departure", val: "90% deduction" }
    ],
    note: "Cancellation would be granted by the Senior Registration Manager on receiving cancellation requests through the website."
  },
  { 
    id: "inclusions", 
    label: "Inclusion & Exclusion", 
    type: "simple",
    content: ["Check the detailed section on the main page for a full breakdown of what's covered and what's not."]
  },
  { 
    id: "terms", 
    label: "Terms & Conditions", 
    type: "simple",
    content: [
      "The itinerary is subject to change due to weather or unforeseen conditions.",
      "All travellers must carry a valid ID proof.",
      "The decision of the trip captain will be final in case of any disputes.",
      "YouthCamping is not responsible for any personal loss or damage."
    ]
  },
  { 
    id: "carry", 
    label: "Things to Carry", 
    type: "list",
    content: [
      { label: "Clothing", val: "Heavy woolens, Thermals, 4-5 pairs of socks" },
      { label: "Footwear", val: "Sturdy trekking shoes, Slippers" },
      { label: "Personal", val: "Sunscreen, Lip balm, Sunglasses, Cap" },
      { label: "Essentials", val: "Power bank, Personal medicines, ID Proof" }
    ]
  }
];

interface PopupDetailsProps {
  details?: {
    cancellation: { label: string; val: string }[];
    gears: { item: string; price: string }[];
    terms: string[];
    carry: { label: string; val: string }[];
    etiquette: { title: string; desc: string }[];
  };
}

export default function PopupDetails({ details }: PopupDetailsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  
  // Merge dynamic data if available
  const activeSections = SECTIONS.map(sec => {
    if (!details) return sec;
    if (sec.id === "cancellation" && details.cancellation?.length > 0) return { ...sec, content: details.cancellation };
    if (sec.id === "terms" && details.terms?.length > 0) return { ...sec, content: details.terms };
    if (sec.id === "carry" && details.carry?.length > 0) return { ...sec, content: details.carry };
    return sec;
  });

  const activeSection = activeSections.find(s => s.id === activeId);

  return (
    <section className="mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-12 px-6">
        {activeSections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveId(sec.id)}
            className="flex items-center justify-between py-6 border-b border-zinc-100 hover:bg-zinc-50/50 transition-all group"
          >
            <span className="font-bold text-zinc-500 group-hover:text-navy transition-colors">{sec.label}</span>
            <ArrowRight className="w-5 h-5 text-zinc-300 group-hover:text-primary-orange transition-all transform group-hover:translate-x-1" />
          </button>
        ))}
      </div>

      {activeId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-navy/40 backdrop-blur-sm transition-all duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
              {/* Modal Header */}
              <div className="p-8 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                 <h2 className="text-xl font-black text-navy uppercase tracking-tight">{activeSection?.label}</h2>
                 <button 
                   onClick={() => setActiveId(null)}
                   title="Close"
                   className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                 >
                   <X className="w-5 h-5 text-zinc-400" />
                 </button>
              </div>
              
              {/* Modal Content */}
              <div className="p-10 max-h-[70vh] overflow-y-auto">
                {activeSection?.type === "table" && (
                  <div className="space-y-8">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-100">
                          <th className="text-left py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Items</th>
                          <th className="text-right py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Rent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeSection.content.map((row: any, i: number) => (
                          <tr key={i} className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/50 transition-colors">
                            <td className="py-4 font-bold text-zinc-600 text-sm">{row.item}</td>
                            <td className="py-4 text-right font-black text-navy">{row.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {activeSection.note && <p className="text-[10px] text-zinc-400 italic font-medium">{activeSection.note}</p>}
                  </div>
                )}

                {activeSection?.type === "list" && (
                  <div className="space-y-6">
                    {activeSection.content.map((item: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-zinc-50/50 rounded-2xl border border-zinc-100">
                        <span className="text-sm font-bold text-zinc-500">{item.label}</span>
                        <span className="text-sm font-black text-navy">{item.val}</span>
                      </div>
                    ))}
                    {activeSection.note && <p className="text-sm text-zinc-500 font-medium leading-relaxed">{activeSection.note}</p>}
                  </div>
                )}

                {activeSection?.type === "simple" && (
                  <div className="space-y-4">
                    {activeSection.content.map((item: any, i: number) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-orange shrink-0" />
                        <p className="text-zinc-600 font-medium leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-8 border-t border-zinc-100 flex justify-center bg-zinc-50/50">
                 <button 
                   onClick={() => setActiveId(null)}
                   className="px-10 py-3 bg-navy text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary-orange transition-all"
                 >
                   Got it
                 </button>
              </div>
           </div>
        </div>
      )}
    </section>
  );
}
