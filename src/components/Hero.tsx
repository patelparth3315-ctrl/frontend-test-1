"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

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
    <section className="relative w-full pt-20 md:pt-24 pb-4 md:pb-12 bg-[#F3F4F6] overflow-hidden">
      <div className="max-w-full md:max-w-[1400px] mx-auto px-0 md:px-6">
        <div className="relative aspect-video md:aspect-[21/9] rounded-none md:rounded-[48px] overflow-hidden shadow-none md:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.3)] bg-navy group">
          
          {/* Background Media Slider */}
          <div className="absolute inset-0 z-0">
            {hasVideo ? (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <iframe
                  className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover scale-[1.05] md:scale-150"
                  src={`${videoUrl.replace('watch?v=', 'embed/')}?autoplay=1&mute=1&loop=1&playlist=${videoUrl.split('v=')[1] || videoUrl.split('/').pop()}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                  title="Hero Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                />
              </div>
            ) : normalizedBg ? (
              <OptimizedImage 
                src={normalizedBg} 
                className="w-full h-full object-cover" 
                alt="Hero Background"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-navy via-charcoal to-navy" />
            )}
            
            {/* Dynamic Overlay */}
            <div 
              className="absolute inset-0 bg-navy/40 transition-opacity duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          </div>

          {/* Content Over the Frame */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 md:p-20 text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-8xl font-bold tracking-tighter mb-4 md:mb-8 leading-[0.9] drop-shadow-2xl"
            >
              {headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-[10px] md:text-xl text-white/90 mb-8 md:mb-12 font-bold tracking-[0.2em] md:tracking-[0.4em] max-w-xs md:max-w-3xl mx-auto drop-shadow-lg uppercase"
            >
              {subheadline}
            </motion.p>

          </div>
        </div>
      </div>
    </section>
  );
}
