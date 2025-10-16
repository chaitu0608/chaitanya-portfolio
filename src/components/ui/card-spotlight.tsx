import React from "react";
import { cn } from "@/lib/utils";

interface CardSpotlightProps {
  children: React.ReactNode;
  className?: string;
}

export const CardSpotlight: React.FC<CardSpotlightProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-card/30 via-card/20 to-card/10 backdrop-blur-xl p-6 shadow-2xl transition-all duration-500 hover:shadow-accent/25",
        className
      )}
    >
      {/* Spotlight effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated spotlight beam */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute -inset-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent blur-xl animate-pulse" />
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-accent/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transitionDelay: '0.1s' }} />
    </div>
  );
};

export default CardSpotlight;
