import { useCallback, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FORTUNES } from "./fortunes";

function pickFortune(excludeQuote?: string) {
  const pool = excludeQuote
    ? FORTUNES.filter((f) => f.quote !== excludeQuote)
    : [...FORTUNES];
  if (pool.length === 0) return FORTUNES[0];
  return pool[Math.floor(Math.random() * pool.length)];
}

export function LogFooter() {
  const reduced = useReducedMotion();
  const [fortune, setFortune] = useState(() =>
    pickFortune(),
  );

  const reroll = useCallback(() => {
    setFortune((current) => pickFortune(current.quote));
  }, []);

  return (
    <footer className="border-t border-zinc-900 px-6 py-10 pb-6 font-mono text-sm md:pb-4">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={reroll}
          className="log-focus w-full rounded text-left"
          aria-label="Reroll fortune"
        >
          <p className="text-emerald-400 transition-colors hover:text-emerald-300">
            $ fortune
          </p>
          <blockquote className="mt-2 max-w-2xl pl-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={fortune.quote}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: reduced ? 0.15 : 0.25 }}
              >
                <p className="text-zinc-300">"{fortune.quote}"</p>
                <p className="mt-1 text-xs text-zinc-500">
                  — {fortune.author}
                </p>
              </motion.div>
            </AnimatePresence>
          </blockquote>
        </button>

        <p className="mt-3 hidden font-mono text-[10px] text-zinc-600 md:block">
          press{" "}
          <kbd className="rounded border border-zinc-800 bg-zinc-900/60 px-1 py-px text-zinc-500">
            ⌘K
          </kbd>{" "}
          to jump · use g+w g+n g+e
        </p>

        <div className="mt-8 log-divider" />

        <div className="mt-4 flex flex-col gap-2 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            made with <span aria-label="love">❤️</span> by chaitu{" "}
            <span className="text-zinc-700">//</span> {new Date().getFullYear()}
          </p>
          <p>
            built with{" "}
            <span className="text-zinc-400">React</span>
            <span className="text-zinc-700"> + </span>
            <span className="text-zinc-400">Vite</span>
            <span className="text-zinc-700"> + </span>
            <span className="text-zinc-400">Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
