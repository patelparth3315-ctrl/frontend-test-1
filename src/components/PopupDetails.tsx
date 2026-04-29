"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";

interface Section {
  id: string;
  label: string;
  type: "list" | "simple" | "table" | "categorical";
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
    type: "categorical",
    content: [
      {
        category: "Mandatory Requirements",
        items: [
          { text: "Medical Certificate", link: "#", linkText: "(Click here for Download)" },
          { text: "Original ID Proof with 2 Xerox Copy" },
          { text: "Screenshot of Fees Receipt" }
        ]
      },
      {
        category: "Trekking Gears (Available on Rent/Sale)",
        items: [
          { text: "Trekking Shoes" },
          { text: "Micro Spikes & Gaiters" },
          { text: "Feather/Down Jacket (-10 Degree)" },
          { text: "Backpack with Raincover (60-70 litres)" },
          { text: "Rainwear (Poncho)" },
          { text: "Head Torch" },
          { text: "Thermal Inner Wear" },
          { text: "Snow Proof Hand Gloves" },
          { text: "Thick Woolen Socks" },
          { text: "Woolen Cap" }
        ]
      },
      {
        category: "Clothes",
        items: [
          { text: "Full Sleeve T-Shirts" },
          { text: "Normal Jacket/Fleece" },
          { text: "Trek Pants (Quick Dry would be Better)" },
          { text: "Face Mask/Buff" }
        ]
      },
      {
        category: "Personal Items",
        items: [
          { text: "Woolen Hand Gloves" },
          { text: "Sun Cap" },
          { text: "Sun Glass" },
          { text: "Sanitiser & Face Mask" },
          { text: "Slipper & Socks" },
          { text: "Plastic Bags (for wet clothes)" },
          { text: "Personal Sanitary Items" },
          { text: "2 Water Bottles & Snacks" },
          { text: "Lunch Box, Mug & Spoon" },
          { text: "Sunscreen (SPF 40+)" },
          { text: "Camera & Power Banks" },
          { text: "Personal Medication if any" }
        ]
      }
    ]
  }
];

interface PopupDetailsProps {
  startDate?: string | null;
  details?: {
    cancellation: { label: string; val: string }[];
    gears: { item: string; price: string }[];
    terms: string[];
    carry: any[];
    etiquette: { title: string; desc: string }[];
  };
}

export default function PopupDetails({ details, startDate }: PopupDetailsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const formatDate = (days: number) => {
    if (!startDate) return null;
    const d = new Date(startDate);
    d.setDate(d.getDate() - days);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  };

  // Merge dynamic data if available
  const activeSections = SECTIONS.map(sec => {
    let content = sec.content;
    if (details) {
      if (sec.id === "cancellation" && details.cancellation?.length > 0) content = details.cancellation;
      if (sec.id === "terms" && details.terms?.length > 0) content = details.terms;
      if (sec.id === "carry" && details.carry?.length > 0) content = details.carry;
    }

    // Dynamic date formatting for cancellation policy
    if (sec.id === "cancellation" && startDate) {
      content = content.map((item: any) => {
        let label = item.label;
        if (label.toLowerCase().includes("more than 40 days")) {
          label = `Before ${formatDate(41)}`;
        } else if (label.toLowerCase().includes("21 to 40 days")) {
          label = `${formatDate(40)} to ${formatDate(21)}`;
        } else if (label.toLowerCase().includes("11 to 20 days")) {
          label = `${formatDate(20)} to ${formatDate(11)}`;
        } else if (label.toLowerCase().includes("2 to 10 days")) {
          label = `${formatDate(10)} to ${formatDate(2)}`;
        } else if (label.toLowerCase().includes("48 hours")) {
          label = `After ${formatDate(2)}`;
        }
        return { ...item, label };
      });
    }

    return { ...sec, content };
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
           <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
              {/* Modal Header */}
              <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
                 <h2 className="text-xl font-medium text-zinc-800">{activeSection?.label}</h2>
                 <button 
                   onClick={() => setActiveId(null)}
                   className="p-1 hover:bg-zinc-100 rounded-full transition-colors"
                 >
                   <X className="w-5 h-5 text-zinc-400" />
                 </button>
              </div>
              
              {/* Modal Content */}
              <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                {activeSection?.type === "categorical" && (
                  <div className="space-y-8">
                    {activeSection.content.map((cat: any, idx: number) => (
                      <div key={idx} className="space-y-4">
                        <h3 className="text-lg font-medium text-zinc-500">{cat.category}</h3>
                        <div className="space-y-3 pl-2">
                          {cat.items.map((item: any, i: number) => (
                            <div key={i} className="flex items-start gap-4">
                              <span className="text-zinc-300 mt-0.5">—</span>
                              <p className="text-zinc-600 font-medium">
                                {item.text}{" "}
                                {item.link && (
                                  <a href={item.link} className="text-primary-orange hover:underline">
                                    {item.linkText}
                                  </a>
                                )}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

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
           </div>
        </div>
      )}
    </section>
  );
}
