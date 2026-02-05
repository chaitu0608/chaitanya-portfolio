import React, { useEffect, useRef, useCallback } from "react";

const QUOTE = "malkin bai:jhukega nai sala";
const IMAGE_SRC = "/pushpak.jpeg";
const AUDIO_SRC = "/pushpa.m4a";

interface BhaisEasterEggProps {
  onClose: () => void;
}

/**
 * Easter egg modal: shows quote, image, plays audio.
 * Lazy-loaded only when triggered; assets load on mount (no impact on initial load).
 */
const BhaisEasterEgg = ({ onClose }: BhaisEasterEggProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audioRef.current = audio;
    audio.play().catch(() => {});
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-label="Easter egg"
    >
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-sm rounded-2xl border border-amber-500/30 bg-gradient-to-b from-stone-900/95 to-stone-950/95 p-5 shadow-2xl shadow-amber-900/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Film strip top */}
        <div className="absolute -top-1 left-4 right-4 flex h-2 gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-full w-3 rounded-sm bg-amber-600/40" />
          ))}
        </div>
        <p className="mb-3 text-center font-mono text-sm font-medium uppercase tracking-wider text-amber-400/90">
          {QUOTE}
        </p>
        <div className="relative overflow-hidden rounded-xl border border-amber-500/20 bg-stone-900">
          <img
            src={IMAGE_SRC}
            alt=""
            className="h-56 w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-lg border border-amber-500/30 bg-amber-500/10 py-2 text-sm font-medium text-amber-200 transition hover:bg-amber-500/20"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BhaisEasterEgg;
