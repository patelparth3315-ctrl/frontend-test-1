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
    <section className="relative w-full py-6 md:py-12 bg-[#F3F4F6] overflow-hidden">
      <div className="max-w-[95vw] md:max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="relative aspect-[16/10] md:aspect-[21/9] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] bg-navy group">
          
          {/* Background Media Slider */}
          <div className="absolute inset-0 z-0">
            {hasVideo ? (
              <div className="absolute inset-0 pointer-events-none overflow-hidden scale-110">
                <iframe
                  className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover scale-150"
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
              style={{ opacity: (overlayOpacity || 40) / 100 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </div>

          {/* Content Over the Frame */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 md:p-20 text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className={`${fontSizeClass} font-semibold tracking-tighter mb-4 md:mb-8 leading-[0.85] drop-shadow-2xl`}
            >
              {headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-sm md:text-xl text-white/90 mb-8 md:mb-12 font-bold tracking-[0.2em] md:tracking-[0.4em] max-w-3xl mx-auto drop-shadow-lg uppercase"
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
                className="inline-flex items-center gap-3 px-8 py-4 md:px-14 md:py-6 bg-primary-orange text-white rounded-full font-black text-sm md:text-xl tracking-widest hover:bg-white hover:text-navy transition-all shadow-2xl hover:scale-105 group"
              >
                {ctaText}
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Slider Indicators (Visual Only for now) */}
          <div className="absolute bottom-8 right-12 z-20 flex gap-2">
            <div className="w-8 h-1 bg-white rounded-full opacity-100" />
            <div className="w-8 h-1 bg-white rounded-full opacity-30" />
            <div className="w-8 h-1 bg-white rounded-full opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
}
