import * as React from "react";

/**
 * Tracks whether the primary pointing device is coarse (touchscreen, stylus,
 * etc.). Used by the boot gate to swap the full MacBook keyboard for a large
 * tap target on phones / tablets where the per-key UI is unusable.
 *
 * Returns `false` during SSR and on the very first render so server output
 * matches client desktop rendering; switches synchronously on mount.
 */
export function useCoarsePointer(): boolean {
  const [isCoarse, setIsCoarse] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(pointer: coarse)");
    const onChange = () => setIsCoarse(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isCoarse;
}
