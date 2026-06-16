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

  return (
    <div
      className={cn(
        "music-showcase fixed z-50",
        expanded
          ? "inset-x-3 bottom-safe w-auto sm:inset-x-auto sm:right-4 sm:w-[min(calc(100dvw-2rem),420px)]"
          : "bottom-safe right-3 w-auto sm:right-4",
      )}
    >
      <motion.button
        type="button"
        onClick={() => setExpanded(true)}
        onPointerEnter={warmEmbed}
        onFocus={warmEmbed}
        animate={
          expanded
            ? { opacity: 0, scale: 0.92, pointerEvents: "none" }
            : { opacity: 1, scale: 1, pointerEvents: "auto" }
        }
        transition={{ duration: reduced ? 0.1 : 0.16 }}
        className={cn(
          "log-focus inline-flex items-center gap-2.5 rounded-full border border-zinc-800 bg-[#0a0a0a]/95 px-4 py-2 font-mono text-xs text-zinc-300 shadow-lg backdrop-blur-md transition-colors hover:border-emerald-500/40 hover:text-emerald-300 sm:text-sm",
          expanded && "invisible absolute",
        )}
        aria-label="Open Apple Music player"
        aria-hidden={expanded}
        tabIndex={expanded ? -1 : 0}
      >
        <span className="log-pulse h-2 w-2 rounded-full bg-emerald-400" />
        <Music className="h-3.5 w-3.5 text-emerald-400" />
        ♪ chaitu101
      </motion.button>

      {/* Panel stays mounted so the iframe never reloads on collapse/reopen */}
      <motion.div
        initial={false}
        animate={
          expanded
            ? { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" }
            : { opacity: 0, y: 10, scale: 0.97, pointerEvents: "none" }
        }
        transition={{ duration: reduced ? 0.1 : 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "music-showcase-panel overflow-hidden rounded-xl border border-zinc-800 bg-[#0a0a0a]/95 shadow-2xl backdrop-blur-md",
          !expanded &&
            "pointer-events-none invisible absolute -left-[9999px] top-0 h-[185px] w-[420px] overflow-hidden opacity-0",
        )}
        role="region"
        aria-label="Apple Music playlist chaitu101"
        aria-hidden={!expanded}
      >
        <div className="flex items-center justify-between gap-2 border-b border-zinc-800 px-4 py-2.5">
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
              tabIndex={expanded ? 0 : -1}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="log-focus rounded p-1.5 text-zinc-500 transition-colors hover:text-zinc-200"
              aria-label="Collapse music player"
              tabIndex={expanded ? 0 : -1}
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="h-[175px] w-full bg-[#0a0a0a] sm:h-[185px]">
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
