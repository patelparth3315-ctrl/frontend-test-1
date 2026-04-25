"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";

const VIDEOS = [
  { 
    id: "j6hb-iOZalE", 
    title: "Spiti Valley - A Cinematic Journey", 
    channel: "YouthCamping Official" 
  },
  { 
    id: "8XJ9kU4WJTo", 
    title: "Winter Spiti in 4K", 
    channel: "Mountain Souls" 
  },
  { 
    id: "X2X5nC5yC6w", 
    title: "What to Carry for Spiti Expedition", 
    channel: "Gear Guide" 
  },
  { 
    id: "r7PzL7H8T8A", 
    title: "Culture and People of Spiti", 
    channel: "Himalayan Stories" 
  },
];

interface VideoSectionProps {
  videos?: { id: string; title: string }[];
}

export default function VideoSection({ videos }: VideoSectionProps) {
  const activeVideos = (videos && videos.length > 0) ? videos : VIDEOS;

  return (
    <section className="mb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-primary-orange mb-2">Videos</h2>
          <p className="text-zinc-500 font-medium">Exclusive footage from our expeditions</p>
        </div>

        <div className="relative group">
          <div className="flex gap-6 overflow-x-auto pb-10 scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent">
            {activeVideos.map((video, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-[320px] md:w-[400px] cursor-pointer group/video"
              >
                <div className="relative aspect-video rounded-[32px] overflow-hidden mb-4 shadow-xl border border-zinc-100">
                  <Image 
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/video:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover/video:bg-black/10 transition-colors" />
                  
                  {/* YouTube Style Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-12 bg-[#FF0000] rounded-xl flex items-center justify-center text-white transition-transform duration-300 group-hover/video:scale-110 shadow-2xl">
                       <Play className="w-6 h-6 fill-current" />
                    </div>
                  </div>

                  {/* Channel Info Overlay */}
                  <div className="absolute top-4 left-4 flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                        <Image src="/logo.png" alt="" width={16} height={16} className="opacity-80" />
                     </div>
                     <div>
                        <p className="text-[11px] font-bold text-white shadow-sm">{video.title}</p>
                     </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom Scroll Bar styling would normally be in CSS, but we use tailwind classes */}
          <div className="h-1 bg-zinc-100 rounded-full overflow-hidden">
             <div className="h-full bg-zinc-300 w-1/3 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
