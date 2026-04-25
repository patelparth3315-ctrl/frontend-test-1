"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";

interface CTABannerProps {
  title?: string;
  tagline?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundColor?: string;
  padding?: string;
}

export default function CTABanner({
  title = "Ready for your next adventure?",
  tagline = "It's time for",
  backgroundImage,
  ctaText = "Explore Now",
  ctaLink = "/trips",
  backgroundColor = "#D4541A",
  padding = "80px"
}: CTABannerProps) {
  return (
    <section 
      className="relative overflow-hidden"
      style={{ 
        backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
        paddingTop: padding,
        paddingBottom: padding
      }}
    >
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={normalizeImageUrl(backgroundImage)} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {tagline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/80 uppercase tracking-[0.3em] font-black text-[10px] md:text-xs mb-4"
          >
            {tagline}
          </motion.p>
        )}
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-7xl font-bold text-white mb-10 tracking-tight uppercase"
        >
          {title}
        </motion.h2>

        {ctaText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href={ctaLink}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-charcoal rounded-[12px] font-black text-xl hover:bg-white/90 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95"
            >
              {ctaText}
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
