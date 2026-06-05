import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { PolaroidFrame } from "@/components/log/PolaroidFrame";
import {
  getPolaroidPhotoAtStep,
  nextPolaroidStep,
  type PortfolioPhoto,
} from "@/data/photos";
import { prefetchPolaroidPhoto } from "@/lib/polaroid-src";
import { cn } from "@/lib/utils";

interface PhotoCardProps {
  variant?: "featured" | "album";
  className?: string;
  inView?: boolean;
  onFrameSizeChange?: (size: { width: number; height: number }) => void;
  onStepChange?: (step: number, photo: PortfolioPhoto) => void;
}

const imageMotion = {
  reduced: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  full: {
    initial: { opacity: 0, x: 24, rotate: 3, scale: 0.96 },
    animate: { opacity: 1, x: 0, rotate: 0, scale: 1 },
    exit: { opacity: 0, x: -24, rotate: -3, scale: 0.96 },
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

function shuffleTilt(step: number): number {
  const tilts = [-1.5, -0.5, 0.75, 1.25, -1, 0.5];
  return tilts[step % tilts.length];
}

export function PhotoCard({
  variant = "featured",
  className,
  inView = false,
  onFrameSizeChange,
  onStepChange,
}: PhotoCardProps) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [loadedSteps, setLoadedSteps] = useState<Set<number>>(() => new Set());
  const [pressed, setPressed] = useState(false);

  const photo = useMemo(() => getPolaroidPhotoAtStep(step), [step]);

  useEffect(() => {
    onStepChange?.(step, photo);
  }, [step, photo, onStepChange]);

  useEffect(() => {
    if (!inView) return;
    setLoadedSteps((prev) => {
      if (prev.has(step)) return prev;
      const next = new Set(prev);
      next.add(step);
      return next;
    });
  }, [inView, step]);

  const shouldLoad = inView && loadedSteps.has(step);
  const priority = inView && step === 0;

  const prefetchNext = useCallback(() => {
    const nextStep = nextPolaroidStep(step);
    const nextPhoto = getPolaroidPhotoAtStep(nextStep);
    prefetchPolaroidPhoto(nextPhoto.src);
  }, [step]);

  const advance = useCallback(() => {
    const nextStep = nextPolaroidStep(step);
    setStep(nextStep);
    setLoadedSteps((prev) => {
      const next = new Set(prev);
      next.add(nextStep);
      return next;
    });
    setPressed(true);
    window.setTimeout(() => setPressed(false), 150);
  }, [step]);

  const imageAnim = reduced ? imageMotion.reduced : imageMotion.full;
  const isFeatured = variant === "featured";
  const tilt = useMemo(() => shuffleTilt(step), [step]);

  return (
    <div className={cn("flex flex-col", className)}>
      <motion.button
        type="button"
        onClick={advance}
        layout={isFeatured && !reduced}
        animate={{
          scale: pressed ? 0.98 : 1,
          rotate: isFeatured ? (pressed ? tilt - 0.5 : tilt) : 0,
        }}
        whileHover={isFeatured && !reduced ? { rotate: 0 } : undefined}
        transition={{ duration: 0.12 }}
        className={cn(
          "log-focus group text-left",
          isFeatured
            ? "polaroid polaroid-lg polaroid-dynamic mx-auto w-fit max-w-full shrink-0"
            : "overflow-hidden rounded-md border border-zinc-800 bg-zinc-950 shadow-sm hover:border-zinc-600",
        )}
        aria-label={`Next photo — currently ${photo.title}`}
      >
        {!isFeatured && (
          <div className="border-b border-zinc-800 bg-zinc-900/80 px-2 py-1">
            <span className="truncate font-mono text-[8px] text-zinc-500">
              ~/photos/{photo.id}.jpg
            </span>
          </div>
        )}

        {isFeatured ? (
          <PolaroidFrame
            src={photo.src}
            alt={photo.title}
            mediaKey={photo.id}
            type={photo.type}
            shouldLoad={shouldLoad}
            priority={priority}
            onFrameChange={onFrameSizeChange}
            onMediaLoaded={prefetchNext}
          />
        ) : (
          <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-zinc-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={photo.id}
                className="absolute inset-0"
                initial={imageAnim.initial}
                animate={imageAnim.animate}
                exit={imageAnim.exit}
                transition={imageAnim.transition}
              >
                {photo.type === "video" ? (
                  <video
                    src={photo.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={photo.title}
                    className="h-full w-full object-contain object-center"
                  />
                ) : (
                  <ImageWithFallback
                    src={photo.src}
                    alt={photo.title}
                    fallbackLabel={photo.title}
                    fallbackVariant="initials"
                    loading="lazy"
                    className="h-full w-full object-contain object-center"
                    containerClassName="flex h-full w-full items-center justify-center [&_span]:text-lg"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        <div
          className={cn(
            isFeatured ? "polaroid-chin mt-0 flex min-w-0 flex-col gap-1 px-1" : "border-t border-zinc-800 px-2 py-2",
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`caption-${photo.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0.15 : 0.25 }}
            >
              {isFeatured ? (
                <>
                  <p className="line-clamp-2 text-center font-sketch text-base leading-snug text-zinc-800 sm:text-lg">
                    {photo.description}
                  </p>
                  <p className="text-center font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500/80">
                    {photo.title}
                  </p>
                </>
              ) : (
                <>
                  <p className="truncate font-mono text-[10px] font-medium text-zinc-300">
                    {photo.title}
                  </p>
                  <p className="mt-0.5 truncate font-mono text-[9px] text-zinc-500">
                    {photo.description}
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.button>

      <p
        className={cn(
          "text-center font-mono text-zinc-600",
          isFeatured ? "mt-4 text-sm sm:text-base" : "mt-1.5 text-[8px]",
        )}
      >
        {isFeatured ? "click for next →" : "tap for next"}
      </p>
    </div>
  );
}
