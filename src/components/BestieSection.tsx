"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

interface Reason {
  title: string;
  desc: string;
  image?: string;
}

interface BestieSectionProps {
  title?: string;
  subtitle?: string;
  titleSize?: string;
  titleAlign?: 'left' | 'center' | 'right';
  titleColor?: string;
  reasons?: Reason[];
  backgroundColor?: string;
  padding?: string;
}

const defaultReasons = [
  {
    title: "Solo is safe.",
    desc: "Girlies, you're safe AF. No need to wait on fam or besties—just pack and go! Explore stress-free with 100% freedom!",
    image: "https://youthcamping.in/wp-content/uploads/2024/05/solo-safe.png"
  },
  {
    title: "We're the greenest flag.",
    desc: "We ensure safety with verified stays, reliable transport, and trained guides for a secure, comfy, and hassle-free trip.",
    image: "https://youthcamping.in/wp-content/uploads/2024/05/green-flag.png"
  },
  {
    title: "Our Group Captains are fire.",
    desc: "Our awesome trip captains are part-guide, part-friend and full time vibe curators.",
    image: "https://youthcamping.in/wp-content/uploads/2024/05/group-captains.png"
  },
  {
    title: "No kebab main haddi.",
    desc: "No middlemen, no hidden fees. Enjoy direct bookings, lower costs, and personalized support for a seamless and affordable trip.",
    image: "https://youthcamping.in/wp-content/uploads/2024/05/no-middleman.png"
  },
  {
    title: "Vibe check comes first.",
    desc: "We customize your trips based on age groups, so you're not stuck vibing to someone else's playlist without permission.",
    image: "https://youthcamping.in/wp-content/uploads/2024/05/vibe-check.png"
  }
];

export default function BestieSection({ 
  title = "Reasons To Make Us Your Travel Bestie",
  subtitle,
  titleSize = "text-2xl md:text-4xl",
  titleAlign = "center",
  titleColor = "#1B2A4A",
  reasons = [],
  backgroundColor = "#C4DAD2",
  padding = "80px"
}: BestieSectionProps) {
  const displayReasons = (reasons && reasons.length > 0) ? reasons : defaultReasons;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section 
      style={{ backgroundColor, paddingTop: padding, paddingBottom: padding }}
      className="relative px-6 overflow-hidden"
    >
      {/* Seamless Scalloped Border Top */}
      <div className="absolute top-0 left-0 w-full h-12 -translate-y-[1px]">
        <svg viewBox="0 0 1440 48" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M0 0H1440V48C1420 48 1410 32 1390 32C1370 32 1360 48 1340 48C1320 48 1310 32 1290 32C1270 32 1260 48 1240 48C1220 48 1210 32 1190 32C1170 32 1160 48 1140 48C1120 48 1110 32 1090 32C1070 32 1060 48 1040 48C1020 48 1010 32 990 32C970 32 960 48 940 48C920 48 910 32 890 32C870 32 860 48 840 48C820 48 810 32 790 32C770 32 760 48 740 48C720 48 710 32 690 32C670 32 660 48 640 48C620 48 610 32 590 32C570 32 560 48 540 48C520 48 510 32 490 32C470 32 460 48 440 48C420 48 410 32 390 32C370 32 360 48 340 48C320 48 310 32 290 32C270 32 260 48 240 48C220 48 210 32 190 32C170 32 160 48 140 48C120 48 110 32 90 32C70 32 60 48 40 48C20 48 10 32 0 32V0Z" fill="white"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 md:mb-20">
          <div className={titleAlign === 'center' ? 'w-full text-center' : 'w-auto'}>
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`font-semibold ${titleSize} tracking-tighter uppercase italic leading-[0.9]`}
              style={{ color: titleColor }}
            >
              {title}
            </motion.h2>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-zinc-500 font-bold mt-4 tracking-widest text-[10px] uppercase"
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-navy hover:bg-white transition-all shadow-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-navy hover:bg-white transition-all shadow-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Reason Slider */}
        <div 
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-10"
        >
          {displayReasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex-none w-[85vw] md:w-[420px] snap-start"
            >
              <div className="bg-white/95 backdrop-blur-sm p-8 md:p-10 rounded-[40px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] flex flex-col md:flex-row items-center gap-6 md:gap-10 h-full border border-white/50 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 group">
                <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {reason.image ? (
                    <OptimizedImage 
                      src={normalizeImageUrl(reason.image) || "https://youthcamping.in/wp-content/uploads/2024/05/solo-safe.png"} 
                      alt={reason.title} 
                      className="w-full h-full object-contain" 
                    />
                  ) : (
                    <div className="w-20 h-20 bg-primary-orange/10 rounded-full flex items-center justify-center text-primary-orange">
                      <span className="font-black text-2xl">{i+1}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-black text-navy mb-3 leading-tight tracking-tight uppercase italic">{reason.title}</h3>
                  <p className="text-zinc-500 text-[13px] font-bold leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                    {reason.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Seamless Scalloped Border Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-12 translate-y-[1px]">
        <svg viewBox="0 0 1440 48" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full rotate-180">
          <path d="M0 0H1440V48C1420 48 1410 32 1390 32C1370 32 1360 48 1340 48C1320 48 1310 32 1290 32C1270 32 1260 48 1240 48C1220 48 1210 32 1190 32C1170 32 1160 48 1140 48C1120 48 1110 32 1090 32C1070 32 1060 48 1040 48C1020 48 1010 32 990 32C970 32 960 48 940 48C920 48 910 32 890 32C870 32 860 48 840 48C820 48 810 32 790 32C770 32 760 48 740 48C720 48 710 32 690 32C670 32 660 48 640 48C620 48 610 32 590 32C570 32 560 48 540 48C520 48 510 32 490 32C470 32 460 48 440 48C420 48 410 32 390 32C370 32 360 48 340 48C320 48 310 32 290 32C270 32 260 48 240 48C220 48 210 32 190 32C170 32 160 48 140 48C120 48 110 32 90 32C70 32 60 48 40 48C20 48 10 32 0 32V0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
