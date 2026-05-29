import React, { useCallback, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { playTerminalKeyClick } from "@/lib/terminal-audio";

interface MobileBootCTAProps {
  onTap: () => void;
}

/**
 * Touch-friendly replacement for the full MacBook keyboard on coarse-pointer
 * devices (phones / small tablets). Renders a large Return-styled tap target
 * that triggers the same boot pipeline as pressing Enter on desktop.
 *
 * The button mirrors the Aceternity Enter-key glow so the visual language of
 * the boot gate stays consistent across form factors.
 */
export const MobileBootCTA: React.FC<MobileBootCTAProps> = ({ onTap }) => {
  const prefersReducedMotion = useReducedMotion();
  const fired = useRef(false);

  const handle = useCallback(() => {
    if (fired.current) return;
    fired.current = true;
    playTerminalKeyClick("\n");
    onTap();
  }, [onTap]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-6">
      <motion.div
        className="relative"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -inset-3 rounded-3xl"
          initial={{ opacity: 0.4 }}
          animate={
            prefersReducedMotion
              ? { opacity: 0.6 }
              : {
                  opacity: [0.4, 0.95, 0.4],
                  boxShadow: [
                    "0 0 12px 2px rgba(251,191,36,0.35)",
                    "0 0 36px 10px rgba(251,191,36,0.85)",
                    "0 0 12px 2px rgba(251,191,36,0.35)",
                  ],
                }
          }
          transition={{
            duration: 1.6,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
        <button
          type="button"
          onPointerDown={handle}
          aria-label="Tap return to boot the portfolio"
          style={{ touchAction: "manipulation" }}
          className="relative flex h-24 w-64 select-none items-center justify-center gap-3 rounded-2xl bg-amber-50 font-mono text-2xl font-semibold text-amber-700 ring-2 ring-amber-400 ring-inset shadow-[0_8px_30px_-8px_rgba(251,191,36,0.55)] transition-transform duration-75 active:scale-95"
        >
          <span>return</span>
          <span aria-hidden className="text-3xl leading-none">↵</span>
        </button>
      </motion.div>

      <motion.p
        className="max-w-xs text-center text-sm text-neutral-500"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Tap the <span className="text-amber-300">return</span> key to boot
      </motion.p>
    </div>
  );
};

export default MobileBootCTA;
