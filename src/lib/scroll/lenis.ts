import Lenis from "lenis";

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function initLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }

  if (lenisInstance) return lenisInstance;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const lenis = new Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: isMobile ? 0.9 : 1.1,
  });

  lenis.on("scroll", () => {
    window.dispatchEvent(new Event("lenis-scroll"));
  });

  const raf = (time: number) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  lenisInstance = lenis;
  return lenis;
}

export function destroyLenis(): void {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (!lenisInstance) return;
  lenisInstance.destroy();
  lenisInstance = null;
}

export function scrollToTarget(
  target: string | HTMLElement | number,
  options?: { offset?: number; duration?: number }
): void {
  const offset = options?.offset ?? 100;
  const duration = options?.duration ?? 1.2;

  let top: number;
  if (typeof target === "number") {
    top = target;
  } else {
    const el =
      typeof target === "string"
        ? (document.querySelector(target) as HTMLElement | null)
        : target;
    if (!el) return;
    top = el.getBoundingClientRect().top + window.scrollY - offset;
  }

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(top, { duration, force: true });
    return;
  }

  window.scrollTo({ top, behavior: "smooth" });
}
