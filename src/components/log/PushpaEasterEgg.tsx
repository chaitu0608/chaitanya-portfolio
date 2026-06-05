import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const PUSHPA_IMAGE =
  "https://res.cloudinary.com/dlejfav7z/image/upload/f_auto,q_auto,w_900,c_limit/v1780515254/pushpak_nttapn.jpg";
const PUSHPA_AUDIO = "/pushpa.m4a";
export const PUSHPA_PATH = "/jhukega-nahi-sala";
export const PUSHPA_FUNNY_URL = `${PUSHPA_PATH}/pushpa-rising?swag=se-swagat-nahi-karunga`;

interface PushpaEasterEggProps {
  open: boolean;
  onClose: () => void;
}

export function PushpaEasterEgg({ open, onClose }: PushpaEasterEggProps) {
  const reduced = useReducedMotion();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!open) {
      audioRef.current?.pause();
      audioRef.current = null;
      return;
    }

    const audio = new Audio(PUSHPA_AUDIO);
    audio.volume = 0.85;
    audioRef.current = audio;
    audio.play().catch(() => {});

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="pushpa-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Pushpa easter egg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.15 : 0.25 }}
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={
              reduced
                ? { duration: 0.15 }
                : { type: "spring", stiffness: 280, damping: 22 }
            }
            className="relative w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 overflow-hidden rounded-md border border-zinc-700 bg-zinc-900/90 font-mono text-[10px] text-zinc-500 sm:text-xs">
              <div className="flex items-center gap-1.5 border-b border-zinc-800 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <p className="truncate px-3 py-2 text-zinc-400">
                <span className="text-emerald-400/90">https://</span>
                cdhamdhere.xyz
                <span className="text-amber-400/90">{PUSHPA_FUNNY_URL}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="log-focus absolute -right-1 -top-1 z-10 rounded-full border border-zinc-700 bg-zinc-900 p-1.5 text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-100 sm:-right-2 sm:-top-2"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <motion.div
              animate={
                reduced
                  ? undefined
                  : { rotate: [-2, 2, -1.5, 1.5, -2] }
              }
              transition={
                reduced
                  ? undefined
                  : { duration: 0.5, ease: "easeOut" }
              }
              className={cn(
                "polaroid polaroid-lg mx-auto w-full max-w-[min(92vw,22rem)] sm:max-w-[min(88vw,26rem)]",
              )}
            >
              <div className="polaroid-window overflow-hidden">
                <img
                  src={PUSHPA_IMAGE}
                  alt="Pushpa — Jhukega Nahi Sala"
                  className="block h-auto w-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="polaroid-chin flex flex-col items-center justify-center gap-1">
                <p className="text-center font-sketch text-2xl leading-tight text-zinc-800 sm:text-3xl">
                  Jhukega Nahi Sala
                </p>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500/80">
                  pushpa · allu arjun mode
                </p>
              </div>
            </motion.div>

            <p className="mt-4 text-center font-mono text-[10px] text-zinc-600">
              esc to close · typed &quot;bhais&quot; to unlock
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
