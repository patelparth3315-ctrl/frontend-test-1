"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface NavLink {
  name: string;
  href: string;
}

interface NavbarProps {
  logoUrl?: string;
  navLinks?: NavLink[];
}

const defaultNavLinks = [
  { name: "Home", href: "/" },
  { name: "Trips", href: "/trips" },
];

export default function Navbar({ 
  logoUrl = "/logo.png",
  navLinks = defaultNavLinks
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-white shadow-lg py-2" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="relative z-10 h-12 flex items-center shrink-0">
          <Image 
            src={logoUrl || "/logo.png"} 
            alt="Youthcamping Logo" 
            width={350} 
            height={120} 
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 h-20 md:h-28 w-auto transition-all max-w-none pointer-events-none",
              isScrolled ? "" : "brightness-0 invert"
            )}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="relative z-20 hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-bold uppercase tracking-widest transition-colors",
                isScrolled ? "text-navy hover:text-primary-orange" : "text-white hover:text-primary-orange"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/contact" className={cn("transition-colors", isScrolled ? "text-navy hover:text-primary-orange" : "text-white hover:text-primary-orange")}>Contact</Link>
          <Link
            href="/blogs"
            className={cn(
              "px-8 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all",
              isScrolled 
              ? "bg-navy text-white hover:bg-primary-orange shadow-lg" 
              : "bg-white text-navy hover:bg-primary-orange hover:text-white"
            )}
          >
            Watch & Read
          </Link>
        </div>
      </div>
    </nav>
  );
}
