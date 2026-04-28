"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

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
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const showSolidNavbar = true;


  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 py-4",
          showSolidNavbar ? "bg-white shadow-lg py-2" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="relative z-[60] h-12 flex items-center shrink-0 group">
            <Image 
              src={logoUrl || "/logo.png"} 
              alt="Youthcamping Logo" 
              width={140} 
              height={40} 
              className={cn(
                "h-8 md:h-12 w-auto transition-all max-w-[140px]",
                showSolidNavbar ? "" : "brightness-0 invert"
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
                  showSolidNavbar ? "text-navy hover:text-primary-orange" : "text-white hover:text-primary-orange"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/contact" className={cn("transition-colors text-sm font-bold uppercase tracking-widest", showSolidNavbar ? "text-navy hover:text-primary-orange" : "text-white hover:text-primary-orange")}>Contact</Link>
            <Link
              href="/login"
              className={cn(
                "px-8 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all",
                showSolidNavbar 
                ? "bg-navy text-white hover:bg-primary-orange shadow-lg" 
                : "bg-white text-navy hover:bg-primary-orange hover:text-white"
              )}
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden relative z-[60] p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={cn("w-6 h-6", showSolidNavbar ? "text-navy" : "text-white")} />
            ) : (
              <Menu className={cn("w-6 h-6", showSolidNavbar ? "text-navy" : "text-white")} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={cn(
        "fixed inset-0 bg-white z-50 transition-transform duration-500 md:hidden flex flex-col pt-32 px-8 gap-8",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl font-black text-navy uppercase tracking-tighter"
          >
            {link.name}
          </Link>
        ))}
        <Link 
          href="/contact" 
          onClick={() => setIsMenuOpen(false)}
          className="text-2xl font-black text-navy uppercase tracking-tighter"
        >
          Contact
        </Link>
        <Link
          href="/login"
          onClick={() => setIsMenuOpen(false)}
          className="mt-4 bg-navy text-white py-4 rounded-2xl text-center font-bold uppercase tracking-widest"
        >
          Login
        </Link>
      </div>
    </>
  );
}
