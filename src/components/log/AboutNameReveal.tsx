import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const FULL_NAME = personalInfo.name;
const CHAR_MS = 38;
const PROMPT = "$ whoami";

interface AboutNameRevealProps {
  className?: string;
  onComplete?: () => void;
}

export function AboutNameReveal({ className, onComplete }: AboutNameRevealProps) {
  const reduced = useReducedMotion();
  const [promptLen, setPromptLen] = useState(reduced ? PROMPT.length : 0);
  const [nameLen, setNameLen] = useState(reduced ? FULL_NAME.length : 0);
  const [phase, setPhase] = useState<"prompt" | "name" | "done">(
    reduced ? "done" : "prompt",
  );
  const completedRef = useRef(false);

  useEffect(() => {
    if (phase === "done" && !completedRef.current) {
      completedRef.current = true;
      onComplete?.();
    }
  }, [phase, onComplete]);

  useEffect(() => {
    if (reduced) return;

    if (phase === "prompt") {
      if (promptLen >= PROMPT.length) {
        const id = window.setTimeout(() => setPhase("name"), 280);
        return () => window.clearTimeout(id);
      }
      const id = window.setTimeout(() => setPromptLen((n) => n + 1), 28);
      return () => window.clearTimeout(id);
    }

    if (phase === "name") {
      if (nameLen >= FULL_NAME.length) {
        const id = window.setTimeout(() => setPhase("done"), 400);
        return () => window.clearTimeout(id);
      }
      const id = window.setTimeout(() => setNameLen((n) => n + 1), CHAR_MS);
      return () => window.clearTimeout(id);
    }
  }, [phase, promptLen, nameLen, reduced]);

  const showNameCursor = phase === "name" && nameLen < FULL_NAME.length;
  const showPromptCursor = phase === "prompt" && promptLen < PROMPT.length;
  const visibleName = FULL_NAME.slice(0, nameLen);
  const [firstName] = FULL_NAME.split(" ");

  return (
    <div className={cn("about-name-block", className)}>
      <p className="about-name-prompt font-mono text-xs text-zinc-500 sm:text-sm">
        <span className="text-emerald-400/90">{PROMPT.slice(0, promptLen)}</span>
        {showPromptCursor && <span className="about-name-cursor" aria-hidden />}
      </p>

      <h1 className="about-name-title font-mono text-[1.65rem] font-semibold leading-tight tracking-tight sm:text-3xl sm:tracking-tighter md:text-4xl lg:text-5xl">
        <span
          className={cn(
            "about-name-display relative inline-flex flex-wrap items-baseline gap-x-[0.55em] sm:gap-x-[0.65em]",
            phase === "done" && "about-name-display--settled",
          )}
        >
          {phase === "done" || nameLen > firstName.length ? (
            <>
              <span className="about-name-first">{firstName}</span>
              {nameLen > firstName.length && (
                <span className="about-name-last">
                  {visibleName.slice(firstName.length).trimStart()}
                </span>
              )}
            </>
          ) : (
            <span className="about-name-first">{visibleName}</span>
          )}
          {showNameCursor && (
            <span className="about-name-cursor about-name-cursor--lg" aria-hidden />
          )}
          {phase === "done" && (
            <motion.span
              className="about-name-scanline"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.12 }}
              aria-hidden
            />
          )}
        </span>
      </h1>

      <motion.p
        className="font-mono text-xs text-zinc-500"
        initial={reduced ? false : { opacity: 0, y: 4 }}
        animate={{
          opacity: phase === "done" ? 1 : 0.35,
          y: phase === "done" ? 0 : 4,
        }}
        transition={{ duration: 0.35 }}
      >
        // aka {personalInfo.nickname}
      </motion.p>
    </div>
  );
}
