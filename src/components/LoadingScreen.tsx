import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Terminal,
  preloadTerminalAudio,
  unlockTerminalAudio,
} from "@/components/ui/terminal";
import { LOADER_COMMANDS, LOADER_OUTPUTS } from "@/lib/loader-terminal";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  onComplete: () => void;
  minDuration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  minDuration = 500,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isExiting, setIsExiting] = useState(false);
  const [terminalDone, setTerminalDone] = useState(false);
  const startTime = useRef(Date.now());
  const finishCalled = useRef(false);

  const finish = useCallback(() => {
    if (finishCalled.current) return;
    finishCalled.current = true;
    void unlockTerminalAudio();
    setIsExiting(true);
    setTimeout(
      () => {
        onComplete();
      },
      prefersReducedMotion ? 0 : 300,
    );
  }, [onComplete, prefersReducedMotion]);

  useEffect(() => {
    void preloadTerminalAudio();

    const unlock = () => void unlockTerminalAudio();
    window.addEventListener("pointerdown", unlock, { once: true, capture: true });
    window.addEventListener("keydown", unlock, { once: true, capture: true });
    window.addEventListener("touchstart", unlock, { once: true, capture: true });

    return () => {
      window.removeEventListener("pointerdown", unlock, true);
      window.removeEventListener("keydown", unlock, true);
      window.removeEventListener("touchstart", unlock, true);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      const t = setTimeout(onComplete, 100);
      return () => clearTimeout(t);
    }
  }, [onComplete, prefersReducedMotion]);

  const handleTerminalDone = useCallback(() => {
    setTerminalDone(true);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !terminalDone) return;
    const elapsed = () => Date.now() - startTime.current;
    if (elapsed() >= minDuration) {
      finish();
      return;
    }
    const remaining = minDuration - elapsed();
    const t = setTimeout(finish, remaining);
    return () => clearTimeout(t);
  }, [terminalDone, minDuration, finish, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  const content = (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950 p-4 sm:p-6 cursor-pointer"
          style={{ isolation: "isolate" }}
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          onPointerDown={() => void unlockTerminalAudio()}
          onClick={finish}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              finish();
            }
          }}
          tabIndex={0}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(32, 227, 178, 0.06) 0%, transparent 55%)",
            }}
          />

          <div
            className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-4"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <Terminal
              username="Chaitu's Macbook"
              commands={LOADER_COMMANDS}
              outputs={LOADER_OUTPUTS}
              typingSpeed={38}
              delayBetweenCommands={550}
              initialDelay={200}
              enableSound
              startImmediately
              onDone={handleTerminalDone}
              contentClassName="h-64 sm:h-72 md:h-80 p-5 text-sm sm:text-[15px] leading-relaxed"
              className={cn(
                "w-full max-w-2xl px-0",
                "[&>div]:rounded-2xl [&>div]:border-2 [&>div]:border-emerald-500/35",
                "[&>div]:shadow-2xl [&>div]:shadow-black/50 [&>div]:ring-1 [&>div]:ring-emerald-500/15",
                "[&>div>div:first-child]:px-4 [&>div>div:first-child]:py-3",
                "[&>div>div:first-child_span]:text-sm",
              )}
            />

            <p className="font-mono text-xs text-slate-500 pointer-events-none">
              Click anywhere to skip
            </p>
            <p className="font-display text-sm font-medium text-slate-500 pointer-events-none">
              Chaitu · Chaitanya Dhamdhere
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return typeof document !== "undefined"
    ? createPortal(content, document.body)
    : content;
};

export default LoadingScreen;
