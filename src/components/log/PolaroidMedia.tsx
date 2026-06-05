import { useEffect, useRef, useState } from "react";
import { InitialsFallback } from "@/components/ui/image-with-fallback";
import { polaroidSrc } from "@/lib/polaroid-src";
import { cn } from "@/lib/utils";

interface PolaroidMediaProps {
  src: string;
  alt: string;
  type?: "image" | "video";
  fill?: boolean;
  shouldLoad?: boolean;
  priority?: boolean;
  objectFit?: "contain" | "cover";
  onMetrics?: (width: number, height: number) => void;
  onLoaded?: () => void;
}

function reportMetrics(
  el: HTMLImageElement | HTMLVideoElement,
  onMetrics?: (width: number, height: number) => void,
) {
  if (!onMetrics) return;
  if (el instanceof HTMLVideoElement) {
    if (el.videoWidth > 0 && el.videoHeight > 0) {
      onMetrics(el.videoWidth, el.videoHeight);
    }
    return;
  }
  if (el.naturalWidth > 0 && el.naturalHeight > 0) {
    onMetrics(el.naturalWidth, el.naturalHeight);
  }
}

export function PolaroidMedia({
  src,
  alt,
  type = "image",
  fill = false,
  shouldLoad = false,
  priority = false,
  objectFit = "contain",
  onMetrics,
  onLoaded,
}: PolaroidMediaProps) {
  const deliverySrc = polaroidSrc(src);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setReady(false);
    setFailed(false);
  }, [deliverySrc, type, shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;
    const el = type === "video" ? videoRef.current : imgRef.current;
    if (!el) return;
    if (el instanceof HTMLImageElement && el.complete && el.naturalWidth > 0) {
      reportMetrics(el, onMetrics);
      setReady(true);
      onLoaded?.();
    }
  }, [shouldLoad, deliverySrc, type, onMetrics, onLoaded]);

  if (!shouldLoad) {
    return (
      <div
        className={cn(
          "polaroid-window__skeleton",
          fill ? "h-full w-full" : "min-h-[12rem] w-full",
        )}
        aria-hidden
      />
    );
  }

  if (failed || !deliverySrc || deliverySrc.startsWith("PASTE_")) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-[#1a1a1a]",
          fill ? "h-full w-full" : "min-h-[12rem] w-full",
        )}
      >
        <InitialsFallback label={alt} className="h-full w-full [&_span]:text-2xl" />
      </div>
    );
  }

  const mediaClass = cn(
    fill ? "h-full w-full" : "max-h-full max-w-full",
    objectFit === "cover" ? "object-cover" : "object-contain",
    "object-center transition-opacity duration-300",
    ready ? "opacity-100" : "opacity-0",
  );

  const handleReady = (el: HTMLImageElement | HTMLVideoElement) => {
    reportMetrics(el, onMetrics);
    setReady(true);
    onLoaded?.();
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#1a1a1a]">
      {!ready && (
        <div className="polaroid-window__skeleton absolute inset-0" aria-hidden />
      )}
      {type === "video" ? (
        <video
          ref={videoRef}
          src={deliverySrc}
          autoPlay
          loop
          muted
          playsInline
          preload={priority ? "auto" : "none"}
          aria-label={alt}
          className={mediaClass}
          onLoadedData={(e) => handleReady(e.currentTarget)}
          onError={() => setFailed(true)}
        />
      ) : (
        <img
          ref={imgRef}
          src={deliverySrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className={mediaClass}
          onLoad={(e) => handleReady(e.currentTarget)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
