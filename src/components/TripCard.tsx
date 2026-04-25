"use client";

import { Trip } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, Sparkles, ArrowUpRight } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";

interface TripCardProps {
  trip: Trip;
  index: number;
}

export default function TripCard({ trip, index }: TripCardProps) {
  const seatsLeft = Math.floor(Math.random() * 6) + 2; // Mock urgency

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-[32px] overflow-hidden border border-zinc-100 hover:border-primary-orange/20 transition-all shadow-sm hover:shadow-2xl"
    >
      <Link href={`/trips/${trip.slug}`} className="block relative aspect-[4/5] overflow-hidden">
        <Image
          src={normalizeImageUrl(trip.heroImage) || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070"}
          alt={trip.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 px-4 py-2 bg-white/90 backdrop-blur-md text-navy rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
            <Sparkles className="w-3 h-3 text-primary-orange" />
            Boutique Group
          </div>
          <div className="flex items-center gap-1.5 px-4 py-2 bg-primary-orange text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
            {seatsLeft} seats left
          </div>
        </div>

        {/* Hover Arrow */}
        <div className="absolute bottom-6 right-6 w-14 h-14 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-2xl">
          <ArrowUpRight className="w-6 h-6 text-navy" />
        </div>
      </Link>

      <div className="p-8">
        <div className="flex items-center gap-2 text-primary-orange text-[10px] font-black uppercase tracking-[0.2em] mb-4">
          <MapPin className="w-3.5 h-3.5" />
          {trip.location}
        </div>
        
        <h3 className="text-2xl font-bold text-navy mb-8 leading-[1.2] tracking-tight h-16 line-clamp-2">
          {trip.title}
        </h3>

        <div className="flex items-center justify-between pt-6 border-t border-zinc-50">
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-widest">
            <Clock className="w-4 h-4 text-primary-orange" />
            {trip.duration}
          </div>
          <div className="text-right">
            <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-1">Starts at</p>
            <p className="text-2xl font-black text-navy tracking-tighter">₹{trip.price.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
