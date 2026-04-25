"use client";

import { motion } from "framer-motion";
import { Star, ChevronRight, Camera, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Review } from "@/types";
import { normalizeImageUrl } from "@/lib/api";

interface ReviewsSectionProps {
  reviews: Review[];
  title?: string;
  subtitle?: string;
  titleSize?: string;
  titleAlign?: 'left' | 'center' | 'right';
  titleColor?: string;
}

export default function ReviewsSection({ 
  reviews,
  title = "Trusted by Travelers",
  subtitle,
  titleSize = "text-3xl",
  titleAlign = "left",
  titleColor = "#1B2A4A"
}: ReviewsSectionProps) {
  // Helper to extract handle from URL
  const getHandle = (url?: string) => {
    if (!url) return "";
    return "@" + url.replace("https://instagram.com/", "").replace("/", "");
  };

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col ${titleAlign === 'center' ? 'items-center text-center' : 'flex-row items-center justify-between'} mb-12`}>
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
            <Link href="/reviews" className="flex items-center gap-2 text-navy font-bold hover:text-primary-orange transition-all">
              View All
              <ChevronRight className="w-5 h-5" />
            </Link>
          )}
        </div>

        <div className="flex gap-8 overflow-x-auto no-scrollbar pb-8 snap-x">
          {reviews.map((rev, i) => (
            <motion.div
              key={rev._id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[320px] md:min-w-[360px] bg-white rounded-[24px] overflow-hidden shadow-sm border border-zinc-100 snap-start group hover:shadow-xl transition-all"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image 
                  src={normalizeImageUrl(rev.userImage) || "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2070"} 
                  alt={rev.userName} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-navy mb-1">{rev.userName}</h3>
                    {rev.city && (
                      <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-bold tracking-widest">
                        <MapPin className="w-3 h-3 text-primary-orange" />
                        {rev.city}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < rev.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-200"}`} />
                    ))}
                  </div>
                </div>

                <p className="text-zinc-600 text-sm font-medium leading-relaxed mb-8 italic">
                  &quot;{rev.comment}&quot;
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-zinc-50">
                  <span className="text-[10px] text-zinc-400 font-bold tracking-widest">{rev.tripName}</span>
                  
                  {rev.instagram && (
                    <a 
                      href={rev.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-navy hover:text-primary-orange transition-all group/insta"
                    >
                      <div className="w-8 h-8 bg-zinc-50 rounded-full flex items-center justify-center group-hover/insta:bg-primary-orange group-hover/insta:text-white transition-all">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <span className="text-xs font-bold">{getHandle(rev.instagram)}</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
