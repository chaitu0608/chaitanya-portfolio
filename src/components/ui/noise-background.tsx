"use client";

import React from "react";

export interface NoiseBackgroundProps {
  children: React.ReactNode;
  containerClassName?: string;
  gradientColors?: string[];
}

/**
 * Animated gradient border with noise texture - Aceternity-style.
 * Use as a wrapper around a button or card for a unique bordered look.
 */
export function NoiseBackground({
  children,
  containerClassName = "",
  gradientColors = [
    "rgb(32, 227, 178)",
    "rgb(100, 150, 255)",
    "rgb(246, 173, 85)",
  ],
}: NoiseBackgroundProps) {
  const gradientStops = gradientColors
    .map((c, i) => `${c} ${(i / (gradientColors.length - 1)) * 100}%`)
    .join(", ");

  return (
    <div
      className={`noise-border-wrapper relative w-fit rounded-full ${containerClassName}`}
      style={{
        padding: "6px",
        background: `linear-gradient(135deg, ${gradientStops})`,
        backgroundSize: "200% 200%",
      }}
    >
      {/* Noise texture overlay on the border */}
      <div
        className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />
      {children}
    </div>
  );
}
