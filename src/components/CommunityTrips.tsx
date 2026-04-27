"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, ChevronRight, ChevronLeft, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Trip } from "@/types";
import { normalizeImageUrl } from "@/lib/api";

interface CommunityTripsProps {
  trips: Trip[];
  title?: string;
  subtitle?: string;
  titleSize?: string;
  titleAlign?: 'left' | 'center' | 'right';
  titleColor?: string;
}

const months = ["APR '26", "MAY '26", "JUN '26", "JUL '26", "AUG '26", "SEP '26", "OCT '26"];

export default function CommunityTrips({ 
  trips, 
  title = "Upcoming Community Trips",
  subtitle,
  titleSize = "text-3xl md:text-4xl",
  titleAlign = "left",
  titleColor = "#1B2A4A"
}: CommunityTripsProps) {
  const [activeMonth, setActiveMonth] = useState("MAY '26");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className={`flex flex-col ${titleAlign === 'center' ? 'items-center text-center' : 'md:flex-row md:items-center justify-between'} gap-6 mb-12`}>
          <div>
            <h2 
              className={`font-semibold ${titleSize} tracking-tight`}
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
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full border-2 border-zinc-100 flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all shadow-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full border-2 border-zinc-100 flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all shadow-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            {titleAlign !== 'center' && (
              <Link href="/trips" className="flex items-center gap-2 text-navy font-bold hover:text-primary-orange transition-all group ml-4">
                View All
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white group-hover:bg-primary-orange shadow-lg transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Month Tabs */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar mb-10 pb-2">
          {months.map((m) => (
            <button
              key={m}
              onClick={() => setActiveMonth(m)}
              className={`px-8 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all border-2 ${
                activeMonth === m 
                ? "bg-navy text-white border-navy shadow-lg" 
                : "bg-transparent text-zinc-400 border-zinc-100 hover:border-navy/20"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Trip Slider */}
        <div 
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8"
        >
          <AnimatePresence mode="wait">
            {trips.map((trip, i) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex-none w-[85vw] md:w-[350px] snap-start"
              >
                <div className="group relative h-[450px] md:h-[500px] rounded-[24px] overflow-hidden shadow-2xl bg-zinc-100 border border-zinc-100">
                  <Image 
                    src={normalizeImageUrl(trip.heroImage) || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070"} 
                    alt={trip.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Top Badge */}
                  <div className="absolute top-5 right-5 z-10">
                    <div className="bg-white/90 backdrop-blur-md text-navy font-black text-xs px-4 py-2 rounded-full shadow-xl flex items-center gap-2 border border-white/20">
                      <TrendingUp className="w-3.5 h-3.5 text-primary-orange" />
                      ₹{trip.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Bottom Content with Cinematic Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
                    <h3 className="text-xl md:text-2xl font-black mb-6 leading-tight line-clamp-2 tracking-tighter uppercase italic">
                      {trip.title}
                    </h3>
                    
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-white/90">
                            <Clock className="w-4 h-4 text-primary-orange" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{trip.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/90">
                            <MapPin className="w-4 h-4 text-primary-orange" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{trip.location}</span>
                          </div>
                        </div>
                        <Link 
                          href={`/trips/${trip.slug}`}
                          className="w-14 h-14 bg-white text-navy rounded-2xl flex items-center justify-center hover:bg-primary-orange hover:text-white transition-all shadow-2xl group/btn"
                        >
                          <ChevronRight className="w-8 h-8 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
