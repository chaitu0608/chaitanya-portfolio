import React from "react";
import { cn } from "@/lib/utils";

interface SectionMarqueeProps {
  text: string;
  className?: string;
  repeat?: number;
}

const SectionMarquee: React.FC<SectionMarqueeProps> = ({
  text,
  className,
  repeat = 10,
}) => (
  <div
    className={cn(
      "relative overflow-hidden border-y border-accent/10 py-4",
      className
    )}
  >
    <div className="section-marquee-track bento-marquee-track">
      {Array.from({ length: repeat }).map((_, i) => (
        <span
          key={i}
          className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gradient whitespace-nowrap px-6 sm:px-8"
        >
          {text}
        </span>
      ))}
    </div>
  </div>
);

export default SectionMarquee;
