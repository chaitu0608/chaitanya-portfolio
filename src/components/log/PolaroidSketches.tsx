import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Hand-drawn arrows & labels — anchored to the polaroid card corners.
 * Parent must be `relative w-fit` around the polaroid (see PhotoAlbumPolaroid).
 */
export function PolaroidSketches({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const reduced = useReducedMotion();

  const float = reduced
    ? {}
    : {
        animate: { y: [0, -3, 0] },
        transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
      };

  return (
    <div
      className={cn(
        "pointer-events-none absolute z-40 select-none overflow-visible",
        compact
          ? "-bottom-6 -left-14 -right-28 -top-[4.5rem] sm:-bottom-8 sm:-left-16 sm:-right-32 sm:-top-20"
          : "-bottom-8 -left-16 -right-32 -top-20 sm:-bottom-10 sm:-left-20 sm:-right-36 sm:-top-24",
        className,
      )}
      aria-hidden
    >
      {/* Soft highlight ring — hugs the photo window */}
      <svg
        className="polaroid-sketch-ring absolute left-1/2 top-[28%] z-0 -translate-x-1/2 -translate-y-1/2 text-emerald-500/15"
        viewBox="0 0 120 140"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      >
        <ellipse
          cx="60"
          cy="70"
          rx="58"
          ry="68"
          className="sketch-stroke"
          transform="rotate(-6 60 70)"
        />
      </svg>

      {/* Top-left — "photo album" sits above the polaroid's left corner */}
      <motion.div
        {...float}
        className={cn(
          "absolute z-10 flex flex-col items-center justify-center text-center",
          compact
            ? "left-[10%] top-[1%] -translate-x-[108%] -translate-y-[148%]"
            : "left-[8%] top-0 -translate-x-[115%] -translate-y-[155%]",
        )}
      >
        <p
          className={cn(
            "font-sketch leading-tight text-emerald-400/95 -rotate-[7deg]",
            compact
              ? "text-[1.65rem] sm:text-[1.95rem]"
              : "text-[1.9rem] sm:text-[2.15rem] lg:text-[2.4rem]",
          )}
        >
          photo album
          <span className="text-amber-400/85"> ✦</span>
        </p>
        <svg
          viewBox="0 0 100 56"
          className="mx-auto mt-1 h-12 w-[6.75rem] text-emerald-400/70 sm:h-[3.25rem] sm:w-[7.25rem]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M6 8 C 22 6, 48 10, 68 22 S 92 38, 94 48"
            className="sketch-stroke"
          />
          <path d="M88 42 L94 48 L90 52" />
        </svg>
      </motion.div>

      {/* Top-right — "~ memories ~" */}
      <motion.div
        {...(reduced
          ? {}
          : {
              animate: { rotate: [-3, -1, -3] },
              transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            })}
        className={cn(
          "font-sketch absolute z-10 flex flex-col items-center justify-center text-center rotate-[4deg]",
          compact
            ? "right-[8%] top-[2%] translate-x-[108%] -translate-y-[120%] text-[1.2rem] sm:text-[1.4rem]"
            : "right-[7%] top-[1%] translate-x-[115%] -translate-y-[125%] text-[1.35rem] sm:text-[1.55rem] lg:text-[1.7rem]",
        )}
      >
        ~ memories ~
        <svg
          viewBox="0 0 88 6"
          className="mx-auto mt-0.5 h-2.5 w-[6.5rem] text-zinc-600/90 sm:w-[7rem]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        >
          <path d="M2 4 Q 28 1, 52 3 T 86 2" className="sketch-stroke" />
        </svg>
      </motion.div>

      {/* Right — "tap me!" mid-frame, arrow points into the photo */}
      <motion.div
        {...(reduced
          ? {}
          : {
              animate: { y: [0, 2, 0] },
              transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
            })}
        className={cn(
          "absolute z-50 flex flex-col items-center justify-center text-center max-[360px]:hidden",
          compact
            ? "right-0 top-[34%] translate-x-[185%]"
            : "right-0 top-[36%] translate-x-[195%]",
        )}
      >
        <p
          className={cn(
            "font-sketch leading-tight text-zinc-400/90 rotate-[5deg]",
            compact
              ? "text-[1.35rem] sm:text-[1.5rem]"
              : "text-[1.5rem] sm:text-[1.65rem] lg:text-[1.8rem]",
          )}
        >
          tap me!
        </p>
        <svg
          viewBox="0 0 72 40"
          className="mx-auto mt-1 h-10 w-[5.75rem] text-zinc-500/75 sm:h-11 sm:w-[6.5rem]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
        >
          <path
            d="M66 20 C 50 18, 32 16, 20 22 S 6 30, 4 24"
            className="sketch-stroke"
          />
          <path d="M8 22 L4 24 L6 30" />
        </svg>
      </motion.div>

      {/* Bottom-left star */}
      <div
        className={cn(
          "absolute z-10 flex items-center justify-center",
          compact
            ? "bottom-[30%] left-[6%] -translate-x-[105%]"
            : "bottom-[28%] left-[5%] -translate-x-[110%]",
        )}
      >
        <svg
          viewBox="0 0 48 48"
          className="h-14 w-14 text-amber-400/50 sm:h-16 sm:w-16 lg:h-[4.5rem] lg:w-[4.5rem]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.35"
        >
          <path
            d="M24 8 L25.5 17 L35 18.5 L27 24 L29 33 L24 27 L19 33 L21 24 L13 18.5 L22.5 17 Z"
            className="sketch-stroke"
          />
        </svg>
      </div>
    </div>
  );
}
