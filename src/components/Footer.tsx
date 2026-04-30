"use client";

import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

interface FooterProps {
  logoUrl?: string;
  address?: string;
  phone?: string;
}

export default function Footer({ 
  logoUrl = "/logo.png",
  address = "Money Plant High Street, A 738, Jagatpur Rd, Gota, Ahmedabad, Gujarat 382470",
  phone = "+91 99242 46267"
}: FooterProps) {
  return (
    <footer className="bg-[#2C2C2C] text-white pt-32 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
          {/* Brand & Contact */}
          <div className="md:col-span-4">
            <Link href="/" className="block mb-10">
              <OptimizedImage 
                src={logoUrl || "/logo.png"} 
                alt="Youthcamping Logo" 
                width={280} 
                height={80} 
                className="h-20 w-auto brightness-0 invert" 
              />
            </Link>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                  <MapPin className="w-5 h-5 text-primary-orange" />
                </div>
                <p className="text-zinc-400 text-sm font-medium leading-relaxed">
                  {address}
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                  <Phone className="w-5 h-5 text-primary-orange" />
                </div>
                <p className="text-zinc-400 text-sm font-medium leading-relaxed">
                  {phone}
                </p>
              </div>
            </div>
          </div>

          {/* Explore Links */}
          <div className="md:col-span-3">
            <h4 className="text-xl font-bold mb-10 tracking-tight uppercase">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-zinc-400 hover:text-white transition-all font-medium">Home</Link></li>
              <li><Link href="/trips" className="text-zinc-400 hover:text-white transition-all font-medium">Tour Packages</Link></li>
              <li><Link href="/trips" className="text-zinc-400 hover:text-white transition-all font-medium">Group Trips</Link></li>
              <li><Link href="/about" className="text-zinc-400 hover:text-white transition-all font-medium">About Us</Link></li>
              <li><Link href="/contact" className="text-zinc-400 hover:text-white transition-all font-medium">Contact Us</Link></li>
              <li><Link href="/terms" className="text-zinc-400 hover:text-white transition-all font-medium">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="text-zinc-400 hover:text-white transition-all font-medium">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-5">
            <h4 className="text-xl font-bold mb-6 tracking-tight uppercase">Get Updates & more!</h4>
            <p className="text-zinc-400 text-sm font-medium mb-10">Subscribe to the free newsletter and stay up to date.</p>
            
            <form className="relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 focus:outline-none focus:border-primary-orange transition-all placeholder:text-zinc-600"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-2 bottom-2 bg-white text-black px-8 rounded-full font-bold text-sm hover:bg-primary-orange hover:text-white transition-all shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-center md:text-left">
          <p>© 2026 Youthcamping Private Limited</p>
          <div className="flex gap-8">
            <p>Made with ❤️ in India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
