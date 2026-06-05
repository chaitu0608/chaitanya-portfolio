import { useEffect, useState } from "react";

const DEFAULT_MIN = 0.65;
const DEFAULT_MAX = 1.45;

export function clampAspect(
  ratio: number | null,
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
): number {
  const base = ratio && Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
  return Math.min(max, Math.max(min, base));
}

/** Pixel frame size from aspect ratio within rem bounds */
export function computePolaroidFrameSize(
  aspect: number,
  rootFontSize: number,
  opts?: {
    maxWidthRem?: number;
    maxHeightRem?: number;
    minWidthRem?: number;
  },
): { width: number; height: number; clamped: boolean } {
  const maxW = (opts?.maxWidthRem ?? 26) * rootFontSize;
  const maxH = (opts?.maxHeightRem ?? 30) * rootFontSize;
  const minW = (opts?.minWidthRem ?? 14) * rootFontSize;

  let width = maxW;
  let height = width / aspect;

  if (height > maxH) {
    height = maxH;
    width = height * aspect;
  }

  if (width < minW) {
    width = minW;
    height = width / aspect;
    if (height > maxH) {
      height = maxH;
      width = height * aspect;
    }
  }

  const clamped =
    aspect <= DEFAULT_MIN + 0.001 ||
    aspect >= DEFAULT_MAX - 0.001 ||
    width >= maxW - 1 ||
    height >= maxH - 1;

  return { width, height, clamped };
}
