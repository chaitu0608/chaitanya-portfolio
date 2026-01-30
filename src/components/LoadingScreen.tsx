import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* Chaitu portfolio boot sequence — unique copy, ~2s to finish lines */
const TERMINAL_LINES = [
  { type: "command", text: "chaitu --start", delay: 0 },
  { type: "success", text: "✓ Portfolio engine loaded", delay: 280 },
  { type: "info", text: "  → Initializing experience...", delay: 520 },
  { type: "success", text: "✓ Sections mounted", delay: 780 },
  { type: "command", text: "run --chaitu-portfolio", delay: 1000 },
  { type: "info", text: "  ➜  Chaitu portfolio running", delay: 1280 },
  { type: "success", text: "✓ Ready to explore", delay: 1560 },
  { type: "comment", text: "Welcome — Chaitanya Dhamdhere", delay: 1840 },
];

interface LoadingScreenProps {
  onComplete: () => void;
  minDuration?: number;
}

const CURSOR_BLINK_MS = 520;
const TYPING_CHAR_MS = 35;

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  minDuration = 4000,
}) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typingIndex, setTypingIndex] = useState<number>(0); // character index for current line
  const [cursorBlink, setCursorBlink] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const startTime = React.useRef(Date.now());

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    TERMINAL_LINES.forEach((line, index) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => Math.max(prev, index + 1));
        setTypingIndex(0);
      }, line.delay);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  // Type-out effect for the last visible line
  const lastLine = visibleLines > 0 ? TERMINAL_LINES[visibleLines - 1] : null;
  const lastLineText = lastLine?.text ?? "";
  useEffect(() => {
    if (visibleLines === 0 || typingIndex >= lastLineText.length) return;
    const t = setTimeout(() => {
      setTypingIndex((prev) => prev + 1);
    }, TYPING_CHAR_MS);
    return () => clearTimeout(t);
  }, [visibleLines, typingIndex, lastLineText.length]);

  useEffect(() => {
    const id = setInterval(() => setCursorBlink((b) => !b), CURSOR_BLINK_MS);
    return () => clearInterval(id);
  }, []);

  const finish = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  }, [onComplete]);

  useEffect(() => {
    const elapsed = () => Date.now() - startTime.current;
    const check = () => {
      if (visibleLines >= TERMINAL_LINES.length && elapsed() >= minDuration) {
        finish();
      }
    };
    const id = setInterval(check, 100);
    return () => clearInterval(id);
  }, [visibleLines, minDuration, finish]);

  const getLineStyle = (type: string) => {
    switch (type) {
      case "command":
        return "text-slate-200 font-medium";
      case "success":
        return "text-emerald-400";
      case "info":
        return "text-slate-500";
      case "comment":
        return "text-emerald-400";
      default:
        return "text-slate-500";
    }
  };

  const content = (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed top-0 left-0 right-0 bottom-0 z-[99999] flex h-screen w-screen items-center justify-center overflow-hidden bg-slate-950 p-4 box-border"
          style={{ isolation: "isolate" }}
          aria-hidden="false"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          {/* Subtle background - does not overlap content */}
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(32, 227, 178, 0.05) 0%, transparent 55%)",
            }}
          />

          {/* Centered card - no overlap with subtitle */}
          <div className="relative z-10 flex w-full max-w-2xl flex-col items-center justify-center gap-6 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full rounded-2xl border-2 border-emerald-500/40 bg-slate-900/95 shadow-2xl shadow-black/50 ring-1 ring-emerald-500/10 overflow-hidden relative"
            >
              {/* Subtle scanline overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03] rounded-2xl"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
                }}
              />
              {/* Terminal header */}
              <div className="relative z-[2] flex items-center gap-2 border-b border-slate-700/80 px-4 py-3 shrink-0 bg-slate-900/80">
                <div className="flex gap-1.5">
                  <motion.div
                    className="h-3 w-3 rounded-full bg-red-500"
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="h-3 w-3 rounded-full bg-amber-500"
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  />
                  <motion.div
                    className="h-3 w-3 rounded-full bg-emerald-500"
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  />
                </div>
                <span className="ml-3 font-mono text-xs text-slate-400 truncate">
                  chaitu-portfolio — running
                </span>
              </div>

              <CardContent className="p-0 relative z-[2]">
                <div className="min-h-[200px] max-h-[40vh] font-mono text-sm overflow-hidden flex flex-col shrink-0">
                  {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => {
                    const isLastLine = i === visibleLines - 1;
                    const showTyping = isLastLine && typingIndex < line.text.length;
                    const displayText = showTyping
                      ? line.text.slice(0, typingIndex)
                      : line.text;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.22,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className={cn(
                          "flex items-center gap-2 px-4 py-1.5 shrink-0",
                          getLineStyle(line.type)
                        )}
                      >
                        {line.type === "command" && (
                          <span className="text-emerald-400 select-none shrink-0">$</span>
                        )}
                        <span className="tabular-nums truncate">
                          {displayText}
                          {isLastLine && showTyping && (
                            <span
                              className={cn(
                                "inline-block h-4 w-0.5 bg-emerald-400 align-middle ml-0.5 transition-opacity duration-75",
                                cursorBlink ? "opacity-100" : "opacity-0"
                              )}
                            />
                          )}
                        </span>
                      </motion.div>
                    );
                  })}
                  {visibleLines < TERMINAL_LINES.length && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 px-4 py-1.5 text-slate-200 shrink-0"
                    >
                      <span className="text-emerald-400 select-none">$</span>
                      <span
                        className={cn(
                          "inline-block h-4 w-0.5 bg-emerald-400 align-middle transition-opacity duration-75",
                          cursorBlink ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </motion.div>
                  )}
                  {visibleLines > 0 &&
                    visibleLines === TERMINAL_LINES.length &&
                    typingIndex >= lastLineText.length && (
                      <div className="flex items-center gap-2 px-4 py-1.5 shrink-0">
                        <span className="text-emerald-400 select-none">$</span>
                        <span
                          className={cn(
                            "inline-block h-4 w-0.5 bg-emerald-400 align-middle transition-opacity duration-75",
                            cursorBlink ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </div>
                    )}
                </div>

                {/* Progress bar with glow */}
                <div className="border-t border-slate-700/80 px-4 py-3 shrink-0">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800/90">
                    <motion.div
                      className="h-full rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                      initial={{ width: "0%" }}
                      animate={{
                        width: `${Math.min(
                          100,
                          (visibleLines / TERMINAL_LINES.length) * 100
                        )}%`,
                      }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  </div>
                  <p className="mt-2 text-center font-mono text-xs text-slate-500">
                    {visibleLines >= TERMINAL_LINES.length
                      ? "Chaitu portfolio running — opening..."
                      : "Initializing Chaitu portfolio..."}
                  </p>
                </div>
              </CardContent>
            </motion.div>

            <p className="text-center font-display text-sm font-medium text-slate-500 shrink-0">
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
