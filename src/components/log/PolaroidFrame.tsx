import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PolaroidMedia } from "@/components/log/PolaroidMedia";
import {
  clampAspect,
  computePolaroidFrameSize,
} from "@/hooks/useMediaAspect";
import { getCachedAspect, setCachedAspect } from "@/lib/polaroid-src";
import { cn } from "@/lib/utils";

interface PolaroidFrameProps {
  src: string;
  alt: string;
  mediaKey: string | number;
  type?: "image" | "video";
  className?: string;
  shouldLoad?: boolean;
  priority?: boolean;
  onFrameChange?: (size: { width: number; height: number }) => void;
  onMediaLoaded?: () => void;
}

const DEFAULT_ASPECT = 0.8;

const imageMotion = {
  reduced: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  full: {
    initial: { opacity: 0, x: 16, rotate: 1.5, scale: 0.98 },
    animate: { opacity: 1, x: 0, rotate: 0, scale: 1 },
    exit: { opacity: 0, x: -16, rotate: -1.5, scale: 0.98 },
    transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

export function PolaroidFrame({
  src,
  alt,
  mediaKey,
  type = "image",
  className,
  shouldLoad = false,
  priority = false,
  onFrameChange,
  onMediaLoaded,
}: PolaroidFrameProps) {
  const reduced = useReducedMotion();
  const [aspect, setAspect] = useState<number>(
    () => getCachedAspect(src) ?? DEFAULT_ASPECT,
  );
  const [rootPx, setRootPx] = useState(16);
  const [viewportWidth, setViewportWidth] = useState(
    () => (typeof window !== "undefined" ? window.innerWidth : 1024),
  );
  const imageAnim = reduced ? imageMotion.reduced : imageMotion.full;

  useEffect(() => {
    const cached = getCachedAspect(src);
    if (cached) setAspect(cached);
    else if (!shouldLoad) setAspect(DEFAULT_ASPECT);
  }, [src, shouldLoad]);

  useEffect(() => {
    const update = () => {
      setRootPx(
        parseFloat(getComputedStyle(document.documentElement).fontSize) || 16,
      );
      setViewportWidth(window.innerWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const clamped = clampAspect(aspect);
  const frameOpts = useMemo(() => {
    if (viewportWidth < 400) {
      return { maxWidthRem: 15, maxHeightRem: 20, minWidthRem: 8.5 };
    }
    if (viewportWidth < 640) {
      return { maxWidthRem: 17, maxHeightRem: 22, minWidthRem: 9.5 };
    }
    if (viewportWidth < 1024) {
      return { maxWidthRem: 20, maxHeightRem: 26, minWidthRem: 11 };
    }
    return undefined;
  }, [viewportWidth]);
  const frame = useMemo(
    () => computePolaroidFrameSize(clamped, rootPx, frameOpts),
    [clamped, rootPx, frameOpts],
  );

  useEffect(() => {
    onFrameChange?.({ width: frame.width, height: frame.height });
  }, [frame, onFrameChange]);

  const handleMetrics = (width: number, height: number) => {
    if (width <= 0 || height <= 0) return;
    const next = width / height;
    setCachedAspect(src, next);
    setAspect(next);
  };

  return (
    <motion.div
      layout={!reduced}
      className={cn("polaroid-window relative mx-auto overflow-hidden", className)}
      style={
        {
          width: frame.width,
          height: frame.height,
          maxWidth: "100%",
          "--polaroid-w": `${frame.width}px`,
          "--polaroid-h": `${frame.height}px`,
        } as CSSProperties
      }
      transition={{ duration: reduced ? 0 : 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={mediaKey}
          className="absolute inset-0"
          initial={imageAnim.initial}
          animate={imageAnim.animate}
          exit={imageAnim.exit}
          transition={imageAnim.transition}
        >
          <PolaroidMedia
            src={src}
            alt={alt}
            type={type}
            fill
            shouldLoad={shouldLoad}
            priority={priority}
            objectFit={frame.clamped ? "cover" : "contain"}
            onMetrics={handleMetrics}
            onLoaded={onMediaLoaded}
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
