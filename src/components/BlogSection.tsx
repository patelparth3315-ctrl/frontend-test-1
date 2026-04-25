"use client";

import { motion } from "framer-motion";
import { ChevronRight, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { normalizeImageUrl } from "@/lib/api";

interface BlogItem {
  title: string;
  author: string;
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
  // If no blogs from API, show empty or placeholder (optional)
  const displayBlogs = blogs.length > 0 ? blogs : [];

  return (
    <section className="py-24 px-6 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col ${titleAlign === 'center' ? 'items-center text-center' : 'flex-row items-center justify-between'} mb-12`}>
          <div>
            <h2 
              className={`font-semibold ${titleSize} tracking-tight flex items-center gap-3`}
              style={{ color: titleColor, textAlign: titleAlign, justifyContent: titleAlign === 'center' ? 'center' : 'flex-start' }}
            >
              <BookOpen className="w-8 h-8 text-primary-orange" />
              {title}
            </h2>
            {subtitle && (
              <p className="text-zinc-500 font-bold mt-2 tracking-widest text-[10px]">
                {subtitle}
              </p>
            )}
          </div>
          {titleAlign !== 'center' && (
            <Link href="/blogs" className="flex items-center gap-2 text-navy font-bold hover:text-primary-orange transition-all">
              View All
              <ChevronRight className="w-5 h-5" />
            </Link>
          )}
        </div>

        <div className="flex gap-8 overflow-x-auto no-scrollbar pb-8 snap-x">
          {displayBlogs.map((art, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[300px] md:min-w-[350px] bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all group snap-start border border-zinc-100"
            >
              <Link href={`/blogs/${art.slug || '#'}`} className="block h-full cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src={normalizeImageUrl(art.image) || "https://images.unsplash.com/photo-1597037750734-450f6f406560?q=80&w=2070"} 
                    alt={art.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-navy mb-6 line-clamp-2 leading-snug h-14 tracking-tighter group-hover:text-primary-orange transition-colors">
                    {art.title}
                  </h3>
                  <div className="flex items-center justify-between pt-6 border-t border-zinc-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-orange/10 flex items-center justify-center font-black text-[10px] text-primary-orange border border-primary-orange/20">
                        {art.author ? art.author[0] : 'Y'}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-navy">{art.author}</p>
                        <p className="text-[10px] text-zinc-400 font-bold tracking-widest">{art.readTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          {displayBlogs.length === 0 && (
            <div className="w-full py-20 text-center border-4 border-dashed border-zinc-100 rounded-[40px]">
              <p className="text-zinc-300 font-black uppercase tracking-widest">No stories published yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
