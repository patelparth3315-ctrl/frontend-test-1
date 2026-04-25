"use client";

import { MessageCircle, Camera, Play, Link as LinkIcon, Send, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingSocialBar() {
  return (
    <div className="max-w-7xl mx-auto px-6 relative -mb-16 z-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-[24px] shadow-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-zinc-100"
      >
        {/* WhatsApp Left */}
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white animate-bounce shadow-lg shadow-emerald-500/20">
            <MessageCircle className="w-8 h-8 fill-current" />
          </div>
          <div>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Don&apos;t wait any longer, Contact us!</p>
            <p className="text-3xl md:text-4xl font-black text-navy tracking-tighter">99242 46267</p>
          </div>
        </div>

        {/* Social Right */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Be part of our Social Media Journey!</p>
          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 bg-pink-500 text-white rounded-[12px] flex items-center justify-center hover:scale-110 transition-all"><Camera className="w-6 h-6" /></a>
            <a href="#" className="w-12 h-12 bg-red-600 text-white rounded-[12px] flex items-center justify-center hover:scale-110 transition-all"><Play className="w-6 h-6" /></a>
            <a href="#" className="w-12 h-12 bg-blue-600 text-white rounded-[12px] flex items-center justify-center hover:scale-110 transition-all"><LinkIcon className="w-6 h-6" /></a>
            <a href="#" className="w-12 h-12 bg-zinc-950 text-white rounded-[12px] flex items-center justify-center hover:scale-110 transition-all"><Send className="w-6 h-6" /></a>
            <a href="#" className="w-12 h-12 bg-blue-800 text-white rounded-[12px] flex items-center justify-center hover:scale-110 transition-all"><Globe className="w-6 h-6" /></a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
