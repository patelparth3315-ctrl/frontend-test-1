"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { useState } from "react";
import { normalizeImageUrl } from "@/lib/api";

interface RealityVideo {
  title: string;
  sub: string;
  img: string;
  url?: string;
}

interface RealitySectionProps {
  title?: string;
  subtitle?: string;
  titleSize?: string;
  titleAlign?: 'left' | 'center' | 'right';
  titleColor?: string;
  subtitleSize?: string;
  videos?: RealityVideo[];
}

const defaultVideos = [
  { title: "Solo Girl Review", sub: "(with Youthcamping)", img: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=2070", url: "https://www.youtube.com/embed/j6hb-iOZalE" },
  { title: "Leh Ladakh", sub: "(Explore with us)", img: "https://images.unsplash.com/photo-1581793745862-99f579601e1b?q=80&w=2070", url: "https://www.youtube.com/embed/j6hb-iOZalE" },
  { title: "Travellers Experiences", sub: "(Real stories)", img: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=2070", url: "https://www.youtube.com/embed/j6hb-iOZalE" },
  { title: "Chopta - Chandrashila", sub: "(High peaks)", img: "https://images.unsplash.com/photo-1589133041042-45e03a958b45?q=80&w=2070", url: "https://www.youtube.com/embed/j6hb-iOZalE" },
];

export default function RealitySection({ 
  title = "The Reality Of A Trip",
  subtitle = "Watch the reality behind our trips, and real reviews by our users.",
  titleSize = "text-3xl md:text-5xl",
  titleAlign = "left",
  titleColor = "#1B2A4A",
  subtitleSize = "text-[10px]",
  videos 
}: RealitySectionProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const displayVideos = (videos && videos.length > 0) ? videos : defaultVideos;
  
  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 
          className={`font-semibold ${titleSize} mb-4 tracking-tight`}
          style={{ textAlign: titleAlign, color: titleColor }}
        >
          {title}
        </h2>
        <p 
          className={`text-zinc-500 font-bold mb-12 tracking-widest ${subtitleSize}`}
          style={{ textAlign: titleAlign }}
        >
          {subtitle}
        </p>
        
        <div className="flex gap-6 overflow-x-auto pb-12 snap-x no-scrollbar">
          {displayVideos.map((vid, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              onClick={() => vid.url && setActiveVideo(vid.url)}
              className="relative min-w-[300px] md:min-w-[450px] aspect-video rounded-[32px] overflow-hidden group snap-start cursor-pointer shadow-2xl border-4 border-white ring-1 ring-charcoal/5"
            >
              <img onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?q=80&w=2070"; }} 
                src={normalizeImageUrl(vid.img) || "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=2070"} 
                alt={vid.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all flex flex-col items-center justify-center text-center p-6">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white mb-6 shadow-2xl shadow-red-600/40"
                >
                  <Play className="w-10 h-10 fill-white" />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-1 drop-shadow-2xl tracking-tighter">
                  {vid.title}
                </h3>
                <p className="text-white/80 text-[10px] font-black tracking-[0.3em] drop-shadow-lg">
                  {vid.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-20"
          >
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-10 h-10" />
            </button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-6xl aspect-video bg-black rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(212,84,26,0.3)] border-4 border-white/10"
            >
              {activeVideo.includes('youtube.com') || activeVideo.includes('youtu.be') ? (
                <iframe
                  className="w-full h-full"
                  src={`${activeVideo.replace('watch?v=', 'embed/')}?autoplay=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video src={normalizeImageUrl(activeVideo)} controls autoPlay className="w-full h-full" />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
