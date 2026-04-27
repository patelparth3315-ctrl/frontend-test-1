"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TripSubNavProps {
  sections: { id: string; label: string }[];
}

export default function TripSubNav({ sections }: TripSubNavProps) {
  const [activeSection, setActiveSection] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Sticky detection
      const navOffset = 300; // Roughly after hero
      setIsSticky(window.scrollY > navOffset);

      // Active section detection
      const scrollPosition = window.scrollY + 150;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Navbar + Subnav height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div 
      className={cn(
        "w-full bg-white border-b border-zinc-100 z-40 transition-all duration-300",
        isSticky ? "fixed top-[72px] left-0 right-0 shadow-sm" : "relative mt-8"
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "text-[10px] font-black uppercase tracking-widest whitespace-nowrap pb-1 border-b-2 transition-all",
                activeSection === section.id 
                  ? "text-primary-orange border-primary-orange" 
                  : "text-zinc-400 border-transparent hover:text-navy"
              )}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
