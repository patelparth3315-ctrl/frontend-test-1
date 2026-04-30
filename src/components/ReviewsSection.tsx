"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Review } from "@/types";
import { normalizeImageUrl } from "@/lib/api";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

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
  return (
    <section className="py-16 bg-zinc-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex flex-col ${titleAlign === 'center' ? 'items-center text-center' : 'flex-row items-center justify-between'} mb-12`}>
          <div>
            <h2 
              className={`font-black text-navy uppercase tracking-tighter ${titleSize}`}
              style={{ textAlign: titleAlign }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-zinc-500 font-bold mt-2 tracking-widest text-[10px] uppercase">
                {subtitle}
              </p>
            )}
          </div>
          {titleAlign !== 'center' && (
            <Link href="/reviews" className="flex items-center gap-2 text-navy font-bold hover:text-primary-orange transition-all uppercase text-sm tracking-tight">
              View All
              <ChevronRight className="w-5 h-5" />
            </Link>
          )}
        </div>

        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8 snap-x">
          {reviews.map((rev, i) => (
            <ReviewCard key={rev._id || rev.id || i} rev={rev} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ rev, i }: { rev: Review, i: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowReadMore = rev.comment && rev.comment.length > 120;
  const displayedComment = isExpanded ? rev.comment : (rev.comment || "").slice(0, 120);

  const coverPhoto = rev.photos && rev.photos.length > 0 
    ? rev.photos[0] 
    : "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070";

  const profileImage = rev.userImage ? normalizeImageUrl(rev.userImage) : null;
  const initials = rev.userName ? rev.userName.charAt(0).toUpperCase() : "U";

  const getAvatarColor = (name: string) => {
    const colors = ["#E87A00", "#5C6BC0", "#4CAF50", "#E91E63", "#00BCD4"];
    const charCode = name ? name.charCodeAt(0) : 0;
    return colors[charCode % colors.length];
  };
  const avatarBg = getAvatarColor(rev.userName);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.1 }}
      viewport={{ once: true }}
      className="flex-none w-[260px] md:w-[280px] snap-start bg-white border border-zinc-100 rounded-[20px] shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden"
    >
      {/* Top Image */}
      <div className="relative w-full h-[160px] shrink-0 bg-zinc-100 overflow-hidden">
        <OptimizedImage 
          src={normalizeImageUrl(coverPhoto) || "https://images.unsplash.com/photo-1501785888041-af3ef285b470"} 
          alt="Review cover" 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        {/* Rating */}
        <div className="flex gap-0.5 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-[12px] h-[12px] ${i < (rev.rating || 5) ? "fill-[#F4B400] text-[#F4B400]" : "fill-zinc-200 text-zinc-200"}`} 
            />
          ))}
        </div>

        {/* Comment */}
        <div className="flex-1">
          <p className="text-[#222222] text-[13px] font-medium leading-[1.5] line-clamp-3">
            {displayedComment}
          </p>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-zinc-50">
          <div 
            className="w-9 h-9 rounded-full overflow-hidden shrink-0 flex items-center justify-center text-white font-bold text-[13px]"
            style={{ backgroundColor: avatarBg }}
          >
            {profileImage ? (
              <OptimizedImage 
                src={profileImage} 
                alt={rev.userName} 
                className="w-full h-full object-cover"
              />
            ) : (
              initials
            )}
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <h4 className="text-[12px] font-bold text-[#111111] leading-tight truncate">{rev.userName}</h4>
            <span className="text-[10px] text-[#999999] mt-0.5 truncate font-bold uppercase tracking-wider">
              {rev.tripName || "Adventure Trip"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
