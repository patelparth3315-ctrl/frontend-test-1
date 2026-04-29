"use client";

import { motion } from "framer-motion";
import { Quote, Camera } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";

interface TestimonialItem {
  author: string;
  quote: string;
  location: string;
  city?: string;
  instagramId?: string;
  image?: string;
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
      className="px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black uppercase tracking-tight text-center mb-20"
          >
            {title}
          </motion.h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[40px] shadow-xl shadow-charcoal/5 border border-charcoal/5 flex flex-col h-full relative"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-primary-orange/10" />
              
              <div className="flex-1">
                <p className="text-charcoal/80 font-medium italic leading-relaxed mb-8 relative z-10">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-charcoal/5">
                {item.image ? (
                  <img onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?q=80&w=2070"; }} 
                    src={normalizeImageUrl(item.image) || ""} 
                    alt={item.author} 
                    className="w-14 h-14 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-primary-orange/10 flex items-center justify-center text-primary-orange font-bold text-xl">
                    {item.author[0]}
                  </div>
                )}
                <div>
                  <h4 className="font-black uppercase tracking-tight text-sm">{item.author}</h4>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    {item.location} {item.city && `• ${item.city}`}
                  </p>
                  {item.instagramId && (
                    <div className="flex items-center gap-1 text-primary-orange mt-1">
                      <Camera className="w-3 h-3" />
                      <span className="text-[10px] font-bold">{item.instagramId}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {items.length === 0 && (
            <div className="col-span-full py-20 text-center border-4 border-dashed border-charcoal/10 rounded-[40px]">
              <p className="text-charcoal/30 font-black uppercase tracking-widest">No testimonials added yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
