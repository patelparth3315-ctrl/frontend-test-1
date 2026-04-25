"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";

interface Destination {
  name: string;
  img: string;
}

interface DestinationsProps {
  title?: string;
  subtitle?: string;
  titleSize?: string;
  titleAlign?: 'left' | 'center' | 'right';
  titleColor?: string;
  destinations?: Destination[];
}

const defaultDestinations = [
  { name: "MALDIVES", img: "https://youthcamping.in/wp-content/uploads/2024/05/maldives.jpg" },
  { name: "SINGAPORE", img: "https://youthcamping.in/wp-content/uploads/2024/05/singapore.jpg" },
  { name: "THAILAND", img: "https://youthcamping.in/wp-content/uploads/2024/05/thailand.jpg" },
  { name: "MALAYSIA", img: "https://youthcamping.in/wp-content/uploads/2024/05/malaysia.jpg" },
  { name: "BALI", img: "https://youthcamping.in/wp-content/uploads/2024/05/bali.jpg" },
];

export default function Destinations({ 
  title = "International Destinations",
  subtitle,
  titleSize = "text-2xl md:text-3xl",
  titleAlign = "left",
  titleColor = "#1B2A4A",
  destinations = [] 
}: DestinationsProps) {
  const items = destinations.length > 0 ? destinations : defaultDestinations;

  return (
    <section className="py-24 px-6 md:px-10 bg-[#EEEEEE] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className={`flex flex-col ${titleAlign === 'center' ? 'items-center text-center' : 'md:flex-row md:items-center justify-between'} mb-12`}>
          <div>
            <h2 
              className={`font-semibold ${titleSize} tracking-tighter`}
              style={{ color: titleColor, textAlign: titleAlign }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-zinc-500 font-bold mt-2 tracking-widest text-[10px]">
                {subtitle}
              </p>
            )}
          </div>
          {titleAlign !== 'center' && (
            <div className="hidden md:flex gap-3">
              <button className="w-12 h-12 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-navy hover:text-white transition-all bg-white shadow-sm">
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>
              <button className="w-12 h-12 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-navy hover:text-white transition-all bg-white shadow-sm">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-10 snap-x">
          {items.map((dest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative min-w-[240px] md:min-w-[260px] flex-1 aspect-[3/4] rounded-[32px] overflow-hidden group snap-start shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] cursor-pointer bg-white"
            >
              <img 
                src={normalizeImageUrl(dest.img)} 
                alt={dest.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tighter drop-shadow-2xl text-center">
                  {dest.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
