"use client";

import { motion } from "framer-motion";
import { Quote, Camera } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

interface TestimonialItem {
  author: string;
  quote: string;
  location: string;
  city?: string;
  instagramId?: string;
  image?: string;
  reviewPhoto?: string;
  rating?: number;
}

interface TestimonialsProps {
  title?: string;
  items?: TestimonialItem[];
  backgroundColor?: string;
  padding?: string;
}

export default function Testimonials({
  title = "Traveler Stories",
  items = [],
  backgroundColor = "#f8f9fa",
  padding = "80px"
}: TestimonialsProps) {
  return (
    <section 
      style={{ backgroundColor, paddingTop: padding, paddingBottom: padding }}
      className="overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {title && (
          <div className="mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-black text-navy uppercase tracking-tighter"
            >
              {title}
            </motion.h2>
          </div>
        )}

        <div className="flex overflow-x-auto no-scrollbar gap-5 pb-8 snap-x">
          {items.map((item, index) => {
            const isExpanded = false;
            const shouldShowReadMore = item.quote && item.quote.length > 120;
            const displayedQuote = isExpanded ? item.quote : (item.quote || "").slice(0, 120) + (shouldShowReadMore ? " " : "");
            
            const coverPhoto = item.reviewPhoto || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070";
            const defaultAvatar = item.image ? normalizeImageUrl(item.image) : null;
            const initials = item.author ? item.author.charAt(0).toUpperCase() : "U";

            const getAvatarColor = (name: string) => {
              const colors = ["#E87A00", "#5C6BC0", "#4CAF50", "#E91E63", "#00BCD4"];
              const charCode = name ? name.charCodeAt(0) : 0;
              return colors[charCode % colors.length];
            };
            const avatarBg = getAvatarColor(item.author);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-none w-[260px] md:w-[280px] min-h-[400px] snap-start bg-white border border-zinc-100 rounded-[16px] shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden"
              >
                {/* Top Image */}
                <div className="relative w-full h-[160px] shrink-0 bg-zinc-100 overflow-hidden">
                  <OptimizedImage 
                    src={normalizeImageUrl(coverPhoto) || "https://images.unsplash.com/photo-1501785888041-af3ef285b470"} 
                    alt="Review cover" 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 flex flex-col flex-1">
                  {/* Rating */}
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-[14px] h-[14px] ${i < (item.rating || 5) ? "fill-[#F4B400] text-[#F4B400]" : "fill-zinc-200 text-zinc-200"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>

                  {/* Comment */}
                  <div className="mb-4 flex-1">
                    <p className="text-[#333333] text-[13px] leading-[1.5] line-clamp-4">
                      {displayedQuote}
                      {shouldShowReadMore && (
                        <span className="text-[#999999] text-[13px] cursor-pointer hover:text-navy transition-colors ml-1">
                          Read more...
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Profile Section */}
                  <div className="flex items-center gap-2 mt-auto pt-4">
                    <div 
                      className="w-9 h-9 rounded-full overflow-hidden shrink-0 flex items-center justify-center text-white font-medium text-[14px]"
                      style={{ backgroundColor: avatarBg }}
                    >
                      {defaultAvatar ? (
                        <OptimizedImage 
                          src={defaultAvatar} 
                          alt={item.author} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        initials
                      )}
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <h4 className="text-[13px] font-bold text-[#222222] leading-tight truncate">{item.author}</h4>
                      <span className="text-[11px] text-[#888888] mt-0.5 truncate">
                        {item.location} {item.city && `• ${item.city}`}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          {items.length === 0 && (
            <div className="w-full py-20 text-center border-4 border-dashed border-charcoal/10 rounded-[40px]">
              <p className="text-charcoal/30 font-black uppercase tracking-widest">No testimonials added yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
