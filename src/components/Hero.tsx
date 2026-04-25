"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";

interface HeroProps {
  headline?: string;
  subheadline?: string;
  videoUrl?: string;
  backgroundImage?: string;
  overlayOpacity?: number;
  fontSize?: 'small' | 'medium' | 'large' | 'xlarge' | 'cinematic';
  ctaText?: string;
  ctaLink?: string;
}

const FONT_SIZES = {
  small: "text-3xl md:text-5xl",
  medium: "text-4xl md:text-6xl",
  large: "text-5xl md:text-8xl",
  xlarge: "text-6xl md:text-[10rem]",
  cinematic: "text-5xl md:text-[12rem]"
};

export default function Hero({ 
  headline = "Every great story starts with someone who decided to go.",
  subheadline = "10,000+ travelers. Trusted since 2019. Government registered.",
  videoUrl,
  backgroundImage,
  overlayOpacity = 50,
  fontSize = 'large',
  ctaText = "Explore Trips",
  ctaLink = "/trips"
}: HeroProps) {
  const hasVideo = videoUrl && videoUrl.trim() !== "" && videoUrl.includes("http");
  const normalizedBg = normalizeImageUrl(backgroundImage);
  const fontSizeClass = FONT_SIZES[fontSize] || FONT_SIZES.large;

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-navy">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {hasVideo ? (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <iframe
              className="absolute top-1/2 left-1/2 w-[115%] h-[115%] -translate-x-1/2 -translate-y-1/2 object-cover"
              src={`${videoUrl.replace('watch?v=', 'embed/')}?autoplay=1&mute=1&loop=1&playlist=${videoUrl.split('v=')[1] || videoUrl.split('/').pop()}&controls=0&showinfo=0&rel=0&modestbranding=1`}
              title="Hero Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          </div>
        ) : normalizedBg ? (
          <img 
            src={normalizedBg} 
            className="w-full h-full object-cover" 
            alt="Hero Background"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-navy via-charcoal to-navy" />
        )}
        
        {/* Dynamic Overlay */}
        <div 
          className="absolute inset-0 bg-navy transition-opacity duration-700" 
          style={{ opacity: (overlayOpacity || 50) / 100 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[90vw] mx-auto px-6 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`${fontSizeClass} font-semibold tracking-tighter mb-8 leading-[0.85] drop-shadow-2xl`}
        >
          {headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg md:text-xl text-white/80 mb-12 font-bold tracking-[0.3em] max-w-3xl mx-auto drop-shadow-lg"
        >
          {subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link
            href={ctaLink}
            className="inline-flex items-center gap-4 px-14 py-6 bg-primary-orange text-white rounded-full font-black text-xl tracking-widest hover:bg-white hover:text-navy transition-all shadow-2xl hover:scale-105 active:scale-95 group"
          >
            {ctaText}
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
