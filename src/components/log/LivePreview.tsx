import { useState, useRef, useEffect, useCallback } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const IFRAME_W = 1280;
const IFRAME_H = 800;

export type PreviewSize = "hero" | "large" | "medium" | "compact";

interface LivePreviewProps {
  liveUrl?: string;
  thumbnail?: string;
  title: string;
  /** Opens when there is no liveUrl (e.g. GitHub repo) */
  fallbackUrl?: string;
  size?: PreviewSize;
  /** Flush top edge when embedded in a card */
  flush?: boolean;
  /** Grow viewport to fill remaining card height */
  fill?: boolean;
  className?: string;
}

const SIZE_STYLES: Record<
  PreviewSize,
  { maxW: string; viewport: string; chrome: string; dots: string; label: string }
> = {
  hero: {
    maxW: "max-w-full sm:max-w-[360px]",
    viewport: "aspect-[16/10] w-full",
    chrome: "h-5 px-1.5 text-[8px]",
    dots: "h-1.5 w-1.5",
    label: "text-[7px]",
  },
  large: {
    maxW: "max-w-full sm:max-w-[340px]",
    viewport: "aspect-[16/10] w-full",
    chrome: "h-5 px-1.5 text-[8px]",
    dots: "h-1.5 w-1.5",
    label: "text-[7px]",
  },
  medium: {
    maxW: "max-w-full sm:max-w-[300px]",
    viewport: "aspect-[16/10] w-full",
    chrome: "h-5 px-2 text-[10px]",
    dots: "h-1.5 w-1.5",
    label: "text-[10px]",
  },
  compact: {
    maxW: "max-w-full sm:max-w-[220px]",
    viewport: "aspect-[16/10] w-full",
    chrome: "h-5 px-2 text-[10px]",
    dots: "h-1.5 w-1.5",
    label: "text-[10px]",
  },
};

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function LivePreview({
  liveUrl,
  thumbnail,
  title,
  fallbackUrl,
  size = "medium",
  flush = false,
  fill = false,
  className,
}: LivePreviewProps) {
  const [showIframe, setShowIframe] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const [scale, setScale] = useState(0.2);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const canHoverRef = useRef(false);
  const hasLive = Boolean(liveUrl);
  const openUrl = liveUrl ?? fallbackUrl;
  const isClickable = Boolean(openUrl);
  const styles = SIZE_STYLES[size];

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    canHoverRef.current = mq.matches;
    const onChange = () => {
      canHoverRef.current = mq.matches;
      if (!mq.matches) {
        setShowIframe(false);
        setIframeReady(false);
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / IFRAME_W);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!showIframe) setIframeReady(false);
  }, [showIframe]);

  const onEnter = useCallback(() => {
    if (!hasLive || !canHoverRef.current) return;
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    hoverTimer.current = setTimeout(() => setShowIframe(true), 300);
  }, [hasLive]);

  const onLeave = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    leaveTimer.current = setTimeout(() => {
      setShowIframe(false);
      setIframeReady(false);
    }, 350);
  }, []);

  const openPreview = useCallback(() => {
    if (openUrl) window.open(openUrl, "_blank", "noopener,noreferrer");
  }, [openUrl]);

  const hostname = liveUrl
    ? getHostname(liveUrl)
    : fallbackUrl
      ? getHostname(fallbackUrl)
      : "";

  return (
    <div
      className={cn(
        "group/preview w-full",
        fill && "flex min-h-0 flex-1 flex-col",
        className,
      )}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable ? 0 : undefined}
        aria-label={
          isClickable
            ? hasLive
              ? `Open live site: ${title}`
              : `Open project: ${title}`
            : undefined
        }
        onClick={isClickable ? openPreview : undefined}
        onKeyDown={(e) => {
          if (isClickable && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            openPreview();
          }
        }}
        className={cn(
          "w-full overflow-hidden bg-zinc-950 transition-all duration-200",
          styles.maxW,
          fill && "flex min-h-0 flex-1 flex-col",
          flush
            ? "rounded-none border-0 shadow-none"
            : "rounded-lg border border-zinc-800/80 shadow-sm",
          isClickable &&
            !flush &&
            "cursor-pointer hover:border-emerald-500/30 hover:shadow-[0_0_24px_rgba(74,222,128,0.1)]",
          isClickable && flush && "cursor-pointer",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-900/90 font-mono leading-none text-zinc-500",
            styles.chrome,
          )}
        >
          <span className="flex shrink-0 gap-1" aria-hidden>
            <span className={cn("rounded-full bg-red-500/70", styles.dots)} />
            <span className={cn("rounded-full bg-amber-500/70", styles.dots)} />
            <span className={cn("rounded-full bg-emerald-500/70", styles.dots)} />
          </span>
          <span className="min-w-0 flex-1 truncate">
            {hostname || "local"}
          </span>
          {hasLive && (
            <span className={cn("shrink-0 uppercase tracking-wide text-zinc-600", styles.label)}>
              live
            </span>
          )}
        </div>

        <div
          ref={viewportRef}
          className={cn(
            "relative w-full overflow-hidden bg-zinc-900/60",
            fill ? "min-h-[180px] flex-1" : styles.viewport,
          )}
        >
          <div
            className={cn(
              "absolute inset-0 flex items-start justify-center transition-opacity duration-300",
              showIframe && iframeReady ? "opacity-0" : "opacity-100",
            )}
          >
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={`${title} preview`}
                className="h-full w-full object-contain object-top"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-950 px-3">
                <span className="text-center font-mono text-xs leading-tight text-zinc-600">
                  {title}
                </span>
              </div>
            )}

            {!hasLive && (
              <span className="pointer-events-none absolute bottom-2 left-2 right-2 text-center font-mono text-[9px] text-zinc-400 opacity-0 transition-opacity group-hover/preview:opacity-100 [@media(hover:none)]:hidden">
                {fallbackUrl ? "click to open repo" : "no demo"}
              </span>
            )}

            {!hasLive && !fallbackUrl && (
              <span className="absolute bottom-2 right-2 rounded border border-zinc-700/80 bg-black/90 px-1.5 py-0.5 font-mono text-[9px] text-zinc-500">
                no demo
              </span>
            )}

            {hasLive && !showIframe && (
              <span className="pointer-events-none absolute bottom-2 left-2 right-2 text-center font-mono text-[9px] text-zinc-400 opacity-0 transition-opacity group-hover/preview:opacity-100 [@media(hover:none)]:hidden">
                hover to preview
              </span>
            )}
          </div>

          {hasLive && showIframe && (
            <>
              {!iframeReady && (
                <div className="absolute inset-0 animate-pulse bg-zinc-900" />
              )}
              <iframe
                src={liveUrl}
                title={`Live preview: ${title}`}
                className={cn(
                  "pointer-events-none absolute left-0 top-0 border-0 transition-opacity duration-300",
                  iframeReady ? "opacity-100" : "opacity-0",
                )}
                style={{
                  width: IFRAME_W,
                  height: IFRAME_H,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
                loading="lazy"
                referrerPolicy="no-referrer"
                sandbox="allow-scripts"
                onLoad={() => setIframeReady(true)}
              />
            </>
          )}

          {(hasLive || fallbackUrl) && (
            <button
              type="button"
              className="absolute inset-0 flex items-center justify-center gap-1 bg-black/75 font-mono text-xs text-emerald-400/90 opacity-0 transition-opacity [@media(hover:none)]:opacity-100 sm:hidden"
              onClick={(e) => {
                e.stopPropagation();
                openPreview();
              }}
              aria-label={
                hasLive ? `Open live site: ${title}` : `Open project: ${title}`
              }
            >
              <ExternalLink className="h-3 w-3" aria-hidden />
              {hasLive ? "open live" : "open repo"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
