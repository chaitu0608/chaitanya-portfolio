"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const prefersReducedMotion = useReducedMotion();
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (prefersReducedMotion) return;
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ?? 1,
        delay: stagger(0.12),
      },
    );
  }, [animate, duration, filter, prefersReducedMotion, words]);

  return (
    <div className={cn("text-muted-foreground", className)}>
      <motion.div ref={scope} className="text-xl md:text-2xl font-light leading-relaxed tracking-wide">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={`${word}-${idx}`}
            className={cn(
              "inline",
              prefersReducedMotion ? "opacity-100" : "opacity-0",
            )}
            style={{
              filter: filter && !prefersReducedMotion ? "blur(10px)" : "none",
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};
