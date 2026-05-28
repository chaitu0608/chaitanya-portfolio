import React, { useCallback, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Penflow } from "penflow/react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { KeyboardDemo } from "@/components/loader/keyboard-demo";
import { EnterSignaturePointer } from "@/components/loader/enter-signature-pointer";

const SIGNATURE_FONT = "/fonts/GreatVibes-Regular.ttf";

interface BootGateProps {
  onStartBoot: () => void;
}

const BootGate: React.FC<BootGateProps> = ({ onStartBoot }) => {
  const started = useRef(false);
  const keyboardStageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleEnter = useCallback(() => {
    if (started.current) return;
    started.current = true;
    onStartBoot();
  }, [onStartBoot]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.repeat) {
        e.preventDefault();
        handleEnter();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleEnter]);

  return (
    <div
      className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-neutral-950"
      aria-label="Press Enter to start"
    >
      <BackgroundBeams className="absolute inset-0 h-full w-full opacity-40" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/20 via-transparent to-neutral-950" />

      <div className="relative z-10 flex h-full min-h-0 w-full flex-col">
        <motion.header
          className="shrink-0 px-6 pb-2 pt-8 text-center sm:pt-10"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="mx-auto flex min-h-[2.5rem] w-full max-w-xs items-center justify-center sm:max-w-sm">
            <Penflow
              text="press enter"
              fontUrl={SIGNATURE_FONT}
              color="#fafafa"
              size={42}
              speed={1.1}
              seed="boot-title"
              autoReplay
              animate={!prefersReducedMotion}
              className="w-full"
            />
          </div>
          <p className="mx-auto mt-2 max-w-sm text-sm text-neutral-500">
            Tap the <span className="text-neutral-300">return</span> key on the
            keyboard
          </p>
        </motion.header>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-x-auto overflow-y-auto px-2 sm:px-4">
          <div
            ref={keyboardStageRef}
            className="relative inline-flex max-w-full items-center justify-center"
          >
            <EnterSignaturePointer containerRef={keyboardStageRef} />
            <KeyboardDemo
              enableSound
              alwaysListen
              showIdleHint={false}
              onEnter={handleEnter}
            />
          </div>
        </div>

        <p className="shrink-0 pb-6 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-neutral-600 sm:text-xs">
          Chaitu&apos;s Macbook
        </p>
      </div>
    </div>
  );
};

export default BootGate;
