import Lenis from "lenis";

/** Fixed nav clearance — keep in sync with `.log-section { scroll-margin-top }` */
export const SCROLL_OFFSET = 80;

/** Silky deceleration for section jumps */
export const SCROLL_EASING = (t: number) => 1 - Math.pow(1 - t, 4);

export const SCROLL_DURATION = 1.35;

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function initLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }

  if (lenisInstance) return lenisInstance;

  const coarse = window.matchMedia("(pointer: coarse)").matches;

  const lenis = new Lenis({
    autoRaf: true,
    lerp: coarse ? 0.11 : 0.085,
    duration: SCROLL_DURATION,
    easing: SCROLL_EASING,
    smoothWheel: true,
    wheelMultiplier: coarse ? 0.85 : 0.9,
    touchMultiplier: 1,
    syncTouch: coarse,
    syncTouchLerp: 0.09,
    autoResize: true,
    anchors: {
      offset: -SCROLL_OFFSET,
      duration: SCROLL_DURATION,
      easing: SCROLL_EASING,
    },
    prevent: (node) =>
      Boolean(
        node.closest(
          "[data-lenis-prevent], [data-lenis-prevent-wheel], .no-visible-scrollbar, [cmdk-list], [role='dialog']",
        ),
      ),
  });

  lenis.on("scroll", () => {
    window.dispatchEvent(new Event("lenis-scroll"));
  });

  lenisInstance = lenis;
  return lenis;
}

export function destroyLenis(): void {
  if (!lenisInstance) return;
  lenisInstance.destroy();
  lenisInstance = null;
}

export function scrollToTarget(
  target: string | HTMLElement | number,
  options?: { offset?: number; duration?: number },
): void {
  const offset = options?.offset ?? SCROLL_OFFSET;
  const duration = options?.duration ?? SCROLL_DURATION;

  const lenis = getLenis();

  if (typeof target === "number") {
    if (lenis) {
      lenis.scrollTo(target, {
        duration,
        easing: SCROLL_EASING,
        force: true,
      });
      return;
    }
    window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }

  const el =
    typeof target === "string"
      ? (document.querySelector(target) as HTMLElement | null)
      : target;

  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, {
      offset: -offset,
      duration,
      easing: SCROLL_EASING,
      force: true,
    });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}
