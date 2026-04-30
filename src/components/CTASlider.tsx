"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { normalizeImageUrl } from "@/lib/api";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

interface Slide {
  title?: string;
  subtitle?: string;
  image: string;
  link?: string;
}

interface CTASliderProps {
  title?: string;
  items?: Slide[];
  autoPlay?: boolean;
  interval?: number;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0
  })
};

export default function CTASlider({
  items = [],
  autoPlay = true,
  interval = 5000
}: CTASliderProps) {
  const [[page, direction], setPage] = useState([0, 0]);

  const displayItems = items.length > 0 ? items : [
    {
      title: "Group Trips",
      subtitle: "Join solo or bring your buddy",
      image: "https://images.unsplash.com/photo-1539635278303-d4002c07dee3",
      link: "/trips"
    },
    {
      title: "Wild Spiti",
      subtitle: "For 18-35 Year Olds",
      image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3",
      link: "/trips/spiti-valley"
    }
  ];

  const index = Math.abs(page % displayItems.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    if (!autoPlay || displayItems.length <= 1) return;
    const timer = setInterval(() => {
      paginate(1);
    }, interval);
    return () => clearInterval(timer);
  }, [displayItems.length, autoPlay, interval, page]);

  const current = displayItems[index];

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative h-[500px] md:h-[650px] w-full rounded-[48px] overflow-hidden group shadow-2xl bg-zinc-900 border border-zinc-100">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0"
            >
              <Link href={current.link || "/trips"} className="block w-full h-full relative">
                <OptimizedImage 
                  src={normalizeImageUrl(current.image)} 
                  alt={current.title || "Cinematic View"} 
                  className="w-full h-full object-cover transition-transform duration-1000"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  {current.subtitle && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white/95 backdrop-blur-md px-10 py-4 rounded-full mb-12 shadow-2xl"
                    >
                      <span className="text-navy font-black text-sm md:text-base uppercase tracking-tight">{current.subtitle}</span>
                    </motion.div>
                  )}
                  
                  {current.title && (
                    <motion.h2 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-6xl md:text-[14rem] font-black text-white uppercase italic leading-[0.75] tracking-tighter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    >
                      {current.title.split(' ').map((word, i) => (
                        <span key={i}>
                          {word} {i === 0 && <br className="hidden md:block" />}
                        </span>
                      ))}
                    </motion.h2>
                  )}

                </div>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Pagination Dots */}
          {displayItems.length > 1 && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
              {displayItems.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setPage([i, i > index ? 1 : -1])}
                  className={`h-2 rounded-full transition-all duration-700 ${i === index ? 'w-16 bg-white shadow-xl' : 'w-4 bg-white/30'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
