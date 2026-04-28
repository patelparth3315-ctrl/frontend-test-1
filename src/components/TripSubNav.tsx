"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TripSubNavProps {
  sections: { id: string; label: string }[];
}

export default function TripSubNav({ sections }: TripSubNavProps) {
  const [activeSection, setActiveSection] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Sticky Observer
    const handleScroll = () => {
      const navOffset = 400; // Trigger after hero section
      setIsSticky(window.scrollY > navOffset);
    };

    // 2. Active Section Observer (IntersectionObserver is better for sync)
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Detect when section is in the top portion of screen
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [sections]);

  // 3. Horizontal Scroll Sync: Center the active tab in the nav bar
  useEffect(() => {
    if (activeSection && scrollContainerRef.current) {
      const activeBtn = scrollContainerRef.current.querySelector(`[data-section="${activeSection}"]`);
      if (activeBtn) {
        const container = scrollContainerRef.current;
        const btnLeft = (activeBtn as HTMLElement).offsetLeft;
        const btnWidth = (activeBtn as HTMLElement).offsetWidth;
        const containerWidth = container.offsetWidth;
        
        container.scrollTo({
          left: btnLeft - (containerWidth / 2) + (btnWidth / 2),
          behavior: "smooth"
        });
      }
    }
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset = Navbar (64) + SubNav (52) + Buffer (10) = ~126px
      const offset = 126;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div 
      ref={navRef}
      className={cn(
        "w-full bg-white border-b border-zinc-100 z-40 transition-all duration-300",
        isSticky ? "fixed top-[64px] left-0 right-0 shadow-lg translate-y-0" : "relative mt-8 opacity-100"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div 
          ref={scrollContainerRef}
          className="flex items-center gap-6 md:gap-10 overflow-x-auto no-scrollbar py-4"
        >
          {sections.map((section) => (
            <button
              key={section.id}
              data-section={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "group relative text-[11px] font-black uppercase tracking-widest whitespace-nowrap py-1 transition-all",
                activeSection === section.id 
                  ? "text-primary-orange scale-105" 
                  : "text-zinc-400 hover:text-navy"
              )}
            >
              {section.label}
              {/* Animated Underline */}
              <span className={cn(
                "absolute -bottom-1 left-0 w-full h-[3px] bg-primary-orange rounded-full transition-all duration-300 transform origin-center",
                activeSection === section.id ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-50 group-hover:opacity-50"
              )} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
