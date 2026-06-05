import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Terminal } from "@/components/ui/terminal";
import {
  unlockTerminalAudio,
  preloadStartupChime,
  preloadKeyboardSprite,
  playStartupChime,
} from "@/lib/terminal-audio";
import { LOADER_COMMANDS, LOADER_OUTPUTS } from "@/lib/loader-terminal";
import { preloadPortfolio } from "@/lib/preload-portfolio";
import { hideBootShell, removeBootShell } from "@/lib/boot-shell";
import BootGate from "@/components/loader/BootGate";
const LOADER_WATCHDOG_MS = 12_000;
const TRANSITION_MS = 720;

type LoaderPhase = "gate" | "transition" | "terminal";

interface LoadingScreenProps {
  onComplete: () => void;
  onBootStart?: () => void;
  minDuration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  onBootStart,
  minDuration = 600,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<LoaderPhase>("gate");
  const [isExiting, setIsExiting] = useState(false);
  const [terminalDone, setTerminalDone] = useState(false);
  const [flash, setFlash] = useState(false);
  const startTime = useRef(Date.now());
  const finishCalled = useRef(false);
  const bootStarted = useRef(false);

  const finish = useCallback(() => {
    if (finishCalled.current) return;
    finishCalled.current = true;
    removeBootShell();
    setIsExiting(true);
    setTimeout(
      () => {
        onComplete();
      },
      prefersReducedMotion ? 0 : 350,
    );
  }, [onComplete, prefersReducedMotion]);

  useEffect(() => {
    hideBootShell();
    document.body.classList.add("boot-loading");
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      removeBootShell();
      onBootStart?.();
      const t = setTimeout(onComplete, 100);
      return () => clearTimeout(t);
    }
  }, [onComplete, onBootStart, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const watchdog = setTimeout(() => {
      if (import.meta.env.DEV && !finishCalled.current) {
        console.warn("[LoadingScreen] Watchdog: forcing loader complete");
      }
      finish();
    }, LOADER_WATCHDOG_MS);

    return () => clearTimeout(watchdog);
  }, [finish, prefersReducedMotion]);

  useEffect(() => {
    if (phase !== "transition") return;
    setFlash(true);
    const flashOff = setTimeout(() => setFlash(false), 180);
    const toTerminal = setTimeout(() => {
      startTime.current = Date.now();
      setPhase("terminal");
    }, TRANSITION_MS);
    return () => {
      clearTimeout(flashOff);
      clearTimeout(toTerminal);
    };
  }, [phase]);

  const handleBootStart = useCallback(() => {
    if (bootStarted.current) return;
    bootStarted.current = true;
    unlockTerminalAudio();
    void preloadKeyboardSprite();
    void preloadStartupChime();
    void preloadPortfolio();
    onBootStart?.();
    setPhase("transition");
  }, [onBootStart]);

  const handleTerminalDone = useCallback(() => {
    playStartupChime();
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
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0a0a0a] select-none"
          style={{ isolation: "isolate", pointerEvents: "all" }}
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          aria-busy={phase !== "gate"}
        >
          {flash && (
            <motion.div
              initial={{ opacity: 0.55 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 z-20 bg-white/25 pointer-events-none mix-blend-screen"
            />
          )}

          <div
            className={
              phase === "gate"
                ? "relative z-10 flex h-full w-full max-w-none flex-col items-center justify-center p-0"
                : "relative z-10 flex h-full w-full max-w-2xl flex-col items-center justify-center p-4 sm:p-6"
            }
          >
            <AnimatePresence mode="wait">
              {phase === "gate" && (
                <motion.div
                  key="gate"
                  className="h-full min-h-0 w-full"
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 1.15,
                    filter: "blur(14px)",
                  }}
                  transition={{ duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <BootGate onStartBoot={handleBootStart} />
                </motion.div>
              )}

              {(phase === "transition" || phase === "terminal") && (
                <motion.div
                  key="terminal"
                  layoutId="boot-core"
                  className="flex w-full flex-col items-center gap-4"
                  initial={{ opacity: 0, scale: 0.88, y: 28 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delayChildren: 0.08,
                    staggerChildren: 0.06,
                  }}
                >
                  {phase === "terminal" && (
                    <Terminal
                      windowTitle="~/boot.sh"
                      commands={LOADER_COMMANDS}
                      outputs={LOADER_OUTPUTS}
                      typingSpeed={12}
                      delayBetweenCommands={150}
                      initialDelay={60}
                      enableSound
                      startImmediately
                      onDone={handleTerminalDone}
                      contentClassName="h-64 bg-zinc-950/40 p-5 text-sm leading-relaxed sm:h-72 sm:text-[15px] md:h-80"
                      className="w-full max-w-2xl px-0"
                    />
                  )}

                  {phase === "transition" && (
                    <div
                      className="about-dossier w-full max-w-2xl overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/60"
                      aria-hidden
                    >
                      <div className="flex items-center gap-3 border-b border-zinc-800 bg-zinc-900/50 px-4 py-2.5 sm:px-5">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-red-500/75" />
                          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/75" />
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/75" />
                        </div>
                        <span className="font-mono text-xs text-zinc-500 sm:text-sm">
                          ~/boot.sh
                        </span>
                      </div>
                      <p className="px-5 py-12 text-center font-mono text-sm text-zinc-500">
                        <span className="text-emerald-400">$</span> initializing
                        terminal…
                      </p>
                    </div>
                  )}

                  {phase === "terminal" && (
                    <p className="font-mono text-sm text-zinc-500">
                      <span className="text-zinc-300">Chaitanya Dhamdhere</span>
                      <span className="text-zinc-600"> · </span>
                      <span className="text-zinc-500">// aka chaitu</span>
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
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
