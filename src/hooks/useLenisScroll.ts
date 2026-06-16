import { useEffect } from "react";
import { destroyLenis, initLenis } from "@/lib/scroll/lenis";

/**
 * Boots Lenis after the loading gate — buttery wheel + anchor navigation.
 */
export function useLenisScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = initLenis();
    if (!lenis) return;

    // Recalculate once lazy sections paint in
    const resizeTimers = [
      window.setTimeout(() => lenis.resize(), 400),
      window.setTimeout(() => lenis.resize(), 1200),
    ];

    const onLoad = () => lenis.resize();
    window.addEventListener("load", onLoad);

    return () => {
      resizeTimers.forEach((id) => window.clearTimeout(id));
      window.removeEventListener("load", onLoad);
      destroyLenis();
    };
  }, [enabled]);
}
