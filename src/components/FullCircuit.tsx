"use client";

import { Plane, Car, Train } from "lucide-react";
import { cn } from "@/lib/utils";

interface FullCircuitProps {
  route?: { label: string; icon: "plane" | "car" | "train" }[];
}

export default function FullCircuit({ route }: FullCircuitProps) {
  if (!route || route.length === 0) return null;

  return (
    <section className="mb-24 p-12 border border-zinc-100 rounded-[40px] bg-white shadow-sm overflow-hidden">
      <h2 className="text-xl font-bold text-navy mb-16">Travelling</h2>
      
      <div className="relative flex items-start justify-between px-4">
        {/* Dashed Line Background */}
        <div className="absolute top-6 left-12 right-12 h-[2px] border-t-2 border-dashed border-zinc-200 z-0" />
        
        {route.map((step, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center text-center max-w-[140px] group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
              {step.icon === "plane" && (
                <Plane className="w-8 h-8 text-navy -rotate-45" />
              )}
              {step.icon === "car" && (
                <Car className="w-8 h-8 text-navy" />
              )}
              {step.icon === "train" && (
                <Train className="w-8 h-8 text-navy" />
              )}
            </div>
            <p className="text-xs font-bold text-navy leading-tight max-w-[120px]">
              {step.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
