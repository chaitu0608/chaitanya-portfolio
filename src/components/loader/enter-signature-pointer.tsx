import React, { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Penflow } from "penflow/react";

const SIGNATURE_FONT = "/fonts/GreatVibes-Regular.ttf";

type Anchor = {
  labelLeft: number;
  labelTop: number;
  labelW: number;
  enterX: number;
  enterY: number;
  placeLeft: boolean;
};

interface EnterSignaturePointerProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export function EnterSignaturePointer({
  containerRef,
}: EnterSignaturePointerProps) {
  const prefersReducedMotion = useReducedMotion();
  const [anchor, setAnchor] = useState<Anchor | null>(null);

  const update = useCallback(() => {
    const root = containerRef.current;
    const enter = root?.querySelector<HTMLElement>('[data-key="Enter"]');
    if (!root || !enter) return;

    const rootRect = root.getBoundingClientRect();
    const enterRect = enter.getBoundingClientRect();
    const enterX =
      enterRect.left - rootRect.left + enterRect.width / 2;
    const enterY =
      enterRect.top - rootRect.top + enterRect.height / 2;

    const labelW = 220;
    const labelH = 64;
    const gap = 28;
    // Always place the signature to the right of the Enter key with the
    // arrow curving back toward it.
    const placeLeft = false;

    let labelLeft: number;
    let labelTop: number;

    if (placeLeft) {
      labelLeft = enterRect.left - rootRect.left - labelW - gap;
      labelTop = enterRect.top - rootRect.top + enterRect.height / 2 - labelH / 2;
    } else {
      labelLeft = enterRect.right - rootRect.left + gap;
      labelTop = enterRect.top - rootRect.top + enterRect.height / 2 - labelH / 2;
    }

    labelTop = Math.max(8, Math.min(labelTop, rootRect.height - labelH - 8));
    // Allow the label to overflow to the right of the keyboard (the overlay
    // is overflow-visible), but never let it drift off the left edge.
    labelLeft = Math.max(8, labelLeft);

    setAnchor({
      labelLeft,
      labelTop,
      labelW,
      enterX,
      enterY,
      placeLeft,
    });
  }, [containerRef]);

  useEffect(() => {
    update();
    const raf = requestAnimationFrame(update);
    const delayed = window.setTimeout(update, 450);

    const observer = new ResizeObserver(update);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(delayed);
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [update, containerRef]);

  if (!anchor) return null;

  const ARROW_COLOR = "#fbbf24";

  // Big sweeping curve: starts under the signature (right) and arcs up and
  // over before diving into the Enter key from the upper-right.
  const startX = anchor.labelLeft + 16;
  const startY = anchor.labelTop + 34;
  // Land the tip just on the right edge of the key so the head sits on it.
  const tipX = anchor.enterX + 14;
  const tipY = anchor.enterY - 2;
  const midX = (startX + tipX) / 2 + 24;
  const midY = Math.min(startY, tipY) - 58;
  const arrowPath = `M ${startX} ${startY} Q ${midX} ${midY} ${tipX} ${tipY}`;

  const drawTransition = {
    duration: 1.1,
    ease: "easeInOut" as const,
    delay: 0.3,
  };

  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 overflow-visible"
      aria-hidden
    >
      <svg className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <marker
            id="enter-arrowhead"
            markerWidth="22"
            markerHeight="22"
            refX="13"
            refY="7"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path
              d="M2,2 L14,7 L2,12"
              fill="none"
              stroke={ARROW_COLOR}
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
          <filter id="enter-arrow-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* The whole arrow gently nudges toward the key to pull attention. */}
        <motion.g
          filter="url(#enter-arrow-glow)"
          initial={prefersReducedMotion ? false : { x: 0, y: 0 }}
          animate={
            prefersReducedMotion
              ? undefined
              : { x: [0, -6, 0], y: [0, 3, 0] }
          }
          transition={{
            duration: 1.4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            delay: 1.5,
          }}
        >
          {/* Soft underlay stroke for extra visibility / depth. */}
          <path
            d={arrowPath}
            fill="none"
            stroke={ARROW_COLOR}
            strokeWidth="7"
            strokeLinecap="round"
            opacity={0.18}
          />
          <motion.path
            d={arrowPath}
            fill="none"
            stroke={ARROW_COLOR}
            strokeWidth="3.6"
            strokeLinecap="round"
            markerEnd="url(#enter-arrowhead)"
            initial={
              prefersReducedMotion
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            animate={{ pathLength: 1, opacity: 1 }}
            transition={drawTransition}
          />
        </motion.g>
      </svg>

      <motion.div
        className="absolute w-56 sm:w-64"
        style={{ left: anchor.labelLeft, top: anchor.labelTop }}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <Penflow
          text="press enter"
          fontUrl={SIGNATURE_FONT}
          color={ARROW_COLOR}
          size={54}
          speed={1.15}
          seed="enter-pointer"
          autoReplay
          animate={!prefersReducedMotion}
        />
      </motion.div>
    </div>
  );
}
