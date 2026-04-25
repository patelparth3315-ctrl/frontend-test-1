"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, ChevronRight, TrendingUp } from "lucide-react";
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

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
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
          {titleAlign !== 'center' && (
            <Link href="/trips" className="flex items-center gap-2 text-navy font-bold hover:text-primary-orange transition-all group">
              View All
              <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-white group-hover:bg-primary-orange">
                <ChevronRight className="w-5 h-5" />
              </div>
            </Link>
          )}
        </div>

        {/* Month Tabs */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar mb-12 pb-2">
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

        {/* Trip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="wait">
            {trips.slice(0, 4).map((trip, i) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-[500px] rounded-[12px] overflow-hidden shadow-xl"
              >
                <Image 
                  src={normalizeImageUrl(trip.heroImage) || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070"} 
                  alt={trip.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Top Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-yellow-400 text-navy font-black text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse">
                    <TrendingUp className="w-3 h-3" />
                    ₹{trip.price.toLocaleString()} Onwards
                  </div>
                </div>

                {/* Bottom Content with Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                  <h3 className="text-xl font-semibold mb-6 leading-tight line-clamp-3 tracking-tight">
                    {trip.title}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white/80">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold uppercase tracking-widest">{trip.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-white/80">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold uppercase tracking-widest">{trip.location}</span>
                      </div>
                      <Link 
                        href={`/trips/${trip.slug}`}
                        className="w-10 h-10 bg-white text-navy rounded-full flex items-center justify-center hover:bg-primary-orange hover:text-white transition-all shadow-xl"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </Link>
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
