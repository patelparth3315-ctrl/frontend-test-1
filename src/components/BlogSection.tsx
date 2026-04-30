"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { normalizeImageUrl } from "@/lib/api";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

interface BlogItem {
  title: string;
  author: string;
  authorImage?: string;
  readTime: string;
  image: string;
  status: string;
  slug?: string;
}

interface BlogSectionProps {
  blogs?: BlogItem[];
  title?: string;
  subtitle?: string;
  titleSize?: string;
  titleAlign?: 'left' | 'center' | 'right';
  titleColor?: string;
}

export default function BlogSection({ 
  blogs = [],
  title = "Watch & Read",
  subtitle,
  titleSize = "text-3xl",
  titleAlign = "left",
  titleColor = "#1B2A4A"
}: BlogSectionProps) {
  const displayBlogs = blogs.length > 0 ? blogs : [];

  const scrollRight = () => {
    const el = document.getElementById('blog-slider-container');
    if (el) el.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-zinc-50/50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative">
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
        </div>

        <div className="relative group">
          <div 
            id="blog-slider-container"
            className="flex gap-6 overflow-x-auto no-scrollbar pb-8 snap-x scroll-smooth"
          >
            {displayBlogs.map((art, i) => (
              <BlogCard key={art.slug || i} art={art} i={i} />
            ))}
            {displayBlogs.length === 0 && (
              <div className="w-full py-12 text-center border-2 border-dashed border-zinc-200 rounded-[32px]">
                <p className="text-zinc-400 font-bold text-sm">No stories published yet.</p>
              </div>
            )}
          </div>

          {/* Floating Next Button */}
          {displayBlogs.length > 0 && (
            <button 
              onClick={scrollRight}
              className="absolute -right-4 top-[40%] -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center text-navy hover:scale-110 transition-all z-10 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function BlogCard({ art, i }: { art: BlogItem, i: number }) {
  const initials = art.author ? art.author.charAt(0).toUpperCase() : "Y";
  const getAvatarColor = (name: string) => {
    const colors = ["#E87A00", "#5C6BC0", "#4CAF50", "#E91E63", "#00BCD4"];
    const charCode = name ? name.charCodeAt(0) : 0;
    return colors[charCode % colors.length];
  };
  const avatarBg = getAvatarColor(art.author);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.1 }}
      viewport={{ once: true }}
      className="flex-none snap-start bg-white border border-zinc-100 rounded-[32px] shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden"
      style={{ width: '280px', height: '280px', minWidth: '280px', minHeight: '280px' }}
    >
      <Link href={`/blogs/${art.slug || '#'}`} className="flex flex-col h-full w-full">
        {/* Top Image Area - Locked to 160px height */}
        <div 
          className="relative w-full bg-zinc-100 overflow-hidden group"
          style={{ height: '160px', minHeight: '160px' }}
        >
          <OptimizedImage 
            src={normalizeImageUrl(art.image) || "https://images.unsplash.com/photo-1597037750734-450f6f406560"} 
            alt={art.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          />
          {/* Magazine Icon Overlay */}
          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md p-1.5 rounded-lg">
             <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 6H2v14a2 2 0 002 2h14v-2H4V6zm16-4H8a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
             </svg>
          </div>
        </div>

        {/* Content Area - Locked to 120px height */}
        <div 
          className="p-4 flex flex-col"
          style={{ height: '120px' }}
        >
          <div className="flex gap-3 items-start">
             {/* Author Photo */}
             <div 
              className="w-10 h-10 rounded-full overflow-hidden shrink-0 flex items-center justify-center text-white font-bold text-[12px] shadow-sm mt-0.5"
              style={{ backgroundColor: avatarBg }}
            >
              {art.authorImage ? (
                <OptimizedImage 
                  src={normalizeImageUrl(art.authorImage)} 
                  alt={art.author} 
                  className="w-full h-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            <div className="flex-1 min-w-0 flex flex-col min-h-[85px]">
              {/* Title */}
              <h3 className="text-[13px] font-bold text-[#222222] leading-[1.4] mb-1 line-clamp-2">
                {art.title}
              </h3>
              
              {/* Meta row - Bottom aligned via mt-auto */}
              <div className="mt-auto flex items-center justify-between gap-2 border-t border-zinc-50 pt-2">
                <span className="text-[11px] text-[#888888] font-medium truncate">by {art.author}</span>
                <span className="text-[11px] text-[#888888] shrink-0 font-medium">{art.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
