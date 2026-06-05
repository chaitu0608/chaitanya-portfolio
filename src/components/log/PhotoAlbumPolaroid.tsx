import { useState, useCallback, type CSSProperties } from "react";
import { PhotoCard } from "./PhotoCard";
import { PolaroidSketches } from "./PolaroidSketches";
import { useInViewport } from "@/hooks/useInViewport";
import type { PortfolioPhoto } from "@/data/photos";
import { cn } from "@/lib/utils";

interface PhotoAlbumPolaroidProps {
  className?: string;
  variant?: "standalone" | "embedded";
  loadEnabled?: boolean;
  onStepChange?: (step: number, photo: PortfolioPhoto) => void;
}

/** Polaroid centered in a sketch “stage” with balanced annotation room */
export function PhotoAlbumPolaroid({
  className,
  variant = "standalone",
  loadEnabled = true,
  onStepChange,
}: PhotoAlbumPolaroidProps) {
  const embedded = variant === "embedded";
  const { ref, inView } = useInViewport({ rootMargin: "80px" });
  const [frameSize, setFrameSize] = useState<{ width: number; height: number } | null>(
    null,
  );

  const handleFrameChange = useCallback(
    (size: { width: number; height: number }) => {
      setFrameSize(size);
    },
    [],
  );

  const effectiveInView = inView && loadEnabled;

  return (
    <div
      ref={ref}
      className={cn(
        "relative z-30 mx-auto w-full overflow-visible",
        embedded ? "max-w-[28rem]" : "max-w-[32rem]",
        className,
      )}
      style={
        frameSize
          ? ({
              "--polaroid-w": `${frameSize.width}px`,
              "--polaroid-h": `${frameSize.height}px`,
            } as CSSProperties)
          : undefined
      }
    >
      <div
        className={cn(
          "relative mx-auto flex w-full flex-col items-center justify-center",
          embedded
            ? "min-h-0 px-2 pb-1 pt-4 sm:px-3 sm:pt-5"
            : "min-h-[22rem] px-3 pb-2 pt-8 sm:px-5 sm:pb-3 sm:pt-10 lg:px-6 lg:pt-9",
        )}
      >
        <div className="relative z-30 mx-auto w-fit max-w-full overflow-visible">
          <PolaroidSketches compact={embedded} />
          <PhotoCard
            className="relative z-10"
            variant="featured"
            inView={effectiveInView}
            onFrameSizeChange={handleFrameChange}
            onStepChange={onStepChange}
          />
        </div>
      </div>
    </div>
  );
}
