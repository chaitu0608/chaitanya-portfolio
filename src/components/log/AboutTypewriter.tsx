import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { aboutLines } from "@/data/portfolio";
import { AboutLineContent } from "./about-lines";
import { cn } from "@/lib/utils";

const FULL_TEXT = aboutLines.join("\n");
const CHAR_MS = 20;
const LINE_PAUSE_MS = 140;
const PUNCT_PAUSE_MS = 80;

interface AboutTypewriterProps {
  className?: string;
  variant?: "standalone" | "embedded";
  enabled?: boolean;
  onDoneChange?: (done: boolean) => void;
}

function charDelay(char: string, nextChar: string | undefined): number {
  if (char === "\n") return CHAR_MS + LINE_PAUSE_MS;
  if (/[.!?—]/.test(char) && nextChar !== undefined) {
    return CHAR_MS + PUNCT_PAUSE_MS;
  }
  if (char === " ") return CHAR_MS * 0.55;
  return CHAR_MS;
}

export function AboutTypewriter({
  className,
  variant = "standalone",
  enabled = true,
  onDoneChange,
}: AboutTypewriterProps) {
  const reduced = useReducedMotion();
  const [charIndex, setCharIndex] = useState(reduced ? FULL_TEXT.length : 0);
  const done = charIndex >= FULL_TEXT.length;
  const embedded = variant === "embedded";

  const displayed = useMemo(
    () => FULL_TEXT.slice(0, charIndex),
    [charIndex],
  );

  const visibleLines = useMemo(
    () => displayed.split("\n"),
    [displayed],
  );

  const activeLineIndex = Math.max(0, visibleLines.length - 1);

  useEffect(() => {
    onDoneChange?.(done);
  }, [done, onDoneChange]);

  useEffect(() => {
    if (reduced) return;
    if (!enabled) return;
    if (done) return;

    const next = FULL_TEXT[charIndex];
    const after = FULL_TEXT[charIndex + 1];
    const delay = charDelay(next, after);

    const id = window.setTimeout(() => {
      setCharIndex((i) => i + 1);
    }, delay);

    return () => window.clearTimeout(id);
  }, [charIndex, done, reduced, enabled]);

  const body = (
    <div className="about-terminal-body relative min-h-0 flex-1">
      <div className="about-terminal-scanline pointer-events-none absolute inset-0 z-[1]" aria-hidden />
      <div className="about-terminal-glow pointer-events-none absolute inset-0 z-[1]" aria-hidden />

      <div className="about-editor relative z-[2] font-mono text-xs sm:text-sm" aria-live="polite">
        {visibleLines.map((line, i) => (
          <div
            key={i}
            className={cn(
              "about-editor-row",
              i === activeLineIndex && !done && "about-editor-row--active",
            )}
          >
            <span
              className={cn(
                "about-gutter-num",
                i === activeLineIndex && !done && "about-gutter-num--active",
                line.startsWith("## ") && "about-gutter-num--section",
              )}
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="about-editor-cell">
              <AboutLineContent line={line} />
              {i === activeLineIndex && !done && (
                <span className="about-cursor" aria-hidden />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div className={cn("flex h-full min-h-0 flex-col", className)}>{body}</div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/40 px-4 py-2.5 sm:px-5">
        <span className="font-mono text-xs text-zinc-500 sm:text-sm">
          ~/about.txt
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">
          {done ? "done" : "typing"}
        </span>
      </div>
      {body}
    </div>
  );
}
