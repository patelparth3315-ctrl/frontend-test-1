"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { normalizeImageUrl } from "@/lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
}

interface PhotoSliderProps {
  slides?: Slide[];
  autoPlay?: boolean;
  interval?: number;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0
  })
};

export default function PhotoSlider({
  slides = [],
  autoPlay = true,
  interval = 5000
}: PhotoSliderProps) {
  const [[page, direction], setPage] = useState([0, 0]);

  const index = Math.abs(page % slides.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    const timer = setInterval(() => {
      paginate(1);
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, autoPlay, interval, page]);

  if (!slides || slides.length === 0) return null;

  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative h-[450px] md:h-[600px] w-full rounded-[16px] overflow-hidden group shadow-xl bg-zinc-900">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0"
            >
              <img onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?q=80&w=2070"; }} 
                src={normalizeImageUrl(slides[index].image)} 
                alt="Cinematic View" 
                className="w-full h-full object-cover"
              />
              {/* Optional Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          {slides.length > 1 && (
            <>
              <button 
                onClick={() => paginate(-1)}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40 z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => paginate(1)}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40 z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              {/* Pagination Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setPage([i, i > index ? 1 : -1])}
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-white shadow-lg' : 'w-2 bg-white/40'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
