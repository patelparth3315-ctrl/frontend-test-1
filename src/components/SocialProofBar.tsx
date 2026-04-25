"use client";

import { 
  Users, 
  ShieldCheck, 
  Calendar, 
  Trophy, 
  LucideIcon,
  CheckCircle2,
  Heart,
  Globe,
  Star,
  Zap,
  Map,
  Camera
} from "lucide-react";
import { motion } from "framer-motion";

const ICON_MAP: Record<string, any> = {
  Users: Users,
  users: Users,
  ShieldCheck: ShieldCheck,
  shield: ShieldCheck,
  Calendar: Calendar,
  calendar: Calendar,
  Trophy: Trophy,
  trophy: Trophy,
  CheckCircle2: CheckCircle2,
  check: CheckCircle2,
  Heart: Heart,
  heart: Heart,
  Globe: Globe,
  globe: Globe,
  Star: Star,
  star: Star,
  Zap: Zap,
  zap: Zap,
  Map: Map,
  map: Map,
  Camera: Camera,
  camera: Camera
};

interface Stat {
  icon?: string;
  label?: string;
  text?: string;
}

interface SocialProofBarProps {
  stats?: Stat[];
  backgroundColor?: string;
  padding?: string;
}

const defaultStats = [
  { icon: "Users", label: "10,000+ Travelers" },
  { icon: "Trophy", label: "Trusted Since 2019" },
  { icon: "ShieldCheck", label: "Gujarat Tourism Registered" },
  { icon: "Calendar", label: "Weekly Departures" },
];

export default function SocialProofBar({ 
  stats, 
  backgroundColor = "#1B2A4A", 
  padding = "24px" 
}: SocialProofBarProps) {
  const displayStats = (stats && stats.length > 0) ? stats : defaultStats;

  return (
    <div 
      style={{ 
        backgroundColor: backgroundColor,
        paddingTop: padding,
        paddingBottom: padding
      }}
      className="overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {displayStats.map((stat: any, i: number) => {
            const Icon = ICON_MAP[stat.icon] || Users;
            const textContent = stat.text || stat.label || "";
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
                style={{ color: (backgroundColor === '#ffffff' || backgroundColor === 'transparent') ? '#1B2A4A' : 'rgba(255,255,255,0.9)' }}
              >
                <Icon className="w-5 h-5 text-primary-orange shrink-0" />
                <span className="text-sm md:text-base font-black tracking-tight uppercase">
                  {textContent}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
