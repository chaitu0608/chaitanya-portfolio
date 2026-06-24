import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ExternalLink, Music } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const PLAYLIST_EMBED =
  "https://embed.music.apple.com/in/playlist/chaitu101/pl.u-AkAm81pUx87R2zE";
const PLAYLIST_LINK =
  "https://music.apple.com/in/playlist/chaitu101/pl.u-AkAm81pUx87R2zE";

export function MusicPill() {
  const reduced = useReducedMotion();
  const { resolved } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [embedReady, setEmbedReady] = useState(false);

  const warmEmbed = useCallback(() => {
    setEmbedReady(true);
  }, []);

  // Start loading embed in the background shortly after page settles
  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(warmEmbed, { timeout: 800 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(warmEmbed, 600);
    return () => window.clearTimeout(timer);
  }, [warmEmbed]);

  const src = `${PLAYLIST_EMBED}?theme=${resolved === "light" ? "light" : "dark"}`;
  const isOpen = expanded || hovered;

  return (
    <div
      className={cn(
        "music-showcase fixed z-50 bottom-safe right-3 sm:right-4",
        isOpen
          ? "w-[min(calc(100dvw-1.5rem),420px)]"
          : "w-[min(calc(100dvw-1.5rem),240px)]",
      )}
      onMouseEnter={() => {
        warmEmbed();
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        initial={false}
        animate={
          isOpen
            ? { height: 250, opacity: 1, scale: 1 }
            : { height: 56, opacity: 1, scale: 1 }
        }
        transition={{ duration: reduced ? 0.1 : 0.22, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "music-showcase-panel overflow-hidden rounded-xl border border-zinc-800 bg-[#0a0a0a]/95 shadow-2xl backdrop-blur-md",
        )}
        role="region"
        aria-label="Apple Music playlist chaitu101"
      >
        <div className="flex h-14 items-center justify-between gap-2 border-b border-zinc-800 px-4">
          <span className="flex min-w-0 items-center gap-2 font-mono text-sm text-zinc-300">
            <Music className="h-4 w-4 shrink-0 text-emerald-400" />
            <span className="log-pulse h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
            <span className="truncate">chaitu101</span>
          </span>
          <div className="flex shrink-0 items-center gap-1">
            <a
              href={PLAYLIST_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="log-focus rounded p-1.5 text-zinc-500 transition-colors hover:text-emerald-400"
              aria-label="Open playlist in Apple Music"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="log-focus rounded p-1.5 text-zinc-500 transition-colors hover:text-zinc-200"
              aria-label={isOpen ? "Collapse music player" : "Expand music player"}
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="h-[194px] w-full bg-[#0a0a0a]">
          {embedReady && (
            <iframe
              title="Apple Music playlist chaitu101"
              src={src}
              className="h-full w-full border-0"
              allow="autoplay *; encrypted-media *"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
