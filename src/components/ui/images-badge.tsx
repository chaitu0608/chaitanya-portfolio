"use client";

import React from "react";
import { motion } from "framer-motion";

export interface ImagesBadgeProps {
  text: string;
  images: string[];
  onClick?: () => void;
  className?: string;
}

/**
 * Aceternity-style ImagesBadge: pill with stacked image thumbnails + text.
 * Matches the hero/header badge pattern from Aceternity UI.
 */
export function ImagesBadge({ text, images, onClick, className = "" }: ImagesBadgeProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        inline-flex items-center gap-3 rounded-full
        bg-neutral-900/90 dark:bg-neutral-950/90
        border border-white/10 dark:border-white/15
        px-4 py-2.5
        shadow-lg shadow-black/20
        hover:border-accent/40 hover:shadow-accent/10
        transition-all duration-200 cursor-pointer
        focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background
        ${className}
      `}
      aria-label={`Open ${text}`}
    >
      {/* Aceternity-style stacked circular thumbnails (icon) */}
      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
        {images.length > 0 ? (
          images.slice(0, 3).map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="absolute rounded-full overflow-hidden border-2 border-neutral-900 dark:border-neutral-950 bg-neutral-800 ring-1 ring-white/10"
              style={{
                width: 24,
                height: 24,
                left: i * 12,
                top: 4 - i * 1,
                zIndex: 3 - i,
              }}
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const el = e.currentTarget;
                  el.style.display = "none";
                }}
              />
            </div>
          ))
        ) : (
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80"
            aria-hidden
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}
      </div>
      <span className="text-sm font-medium text-white/95 dark:text-white whitespace-nowrap">
        {text}
      </span>
    </motion.button>
  );
}
