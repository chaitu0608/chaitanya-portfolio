import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useInViewport } from "@/hooks/useInViewport";

export type AboutSequencePhase = "name" | "meta" | "content";

const META_DELAY_MS = 300;

export function useAboutSequence() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInViewport({ rootMargin: "80px" });
  const [phase, setPhase] = useState<AboutSequencePhase>(
    reduced ? "content" : "name",
  );

  const onNameComplete = useCallback(() => {
    if (reduced) return;
    setPhase("meta");
  }, [reduced]);

  useEffect(() => {
    if (reduced || phase !== "meta") return;
    const id = window.setTimeout(() => setPhase("content"), META_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [phase, reduced]);

  const contentEnabled = reduced || (phase === "content" && inView);
  const metaVisible = reduced || phase === "meta" || phase === "content";
  const typewriterEnabled = contentEnabled;

  return {
    ref,
    inView,
    phase,
    metaVisible,
    contentEnabled,
    typewriterEnabled,
    onNameComplete,
  };
}
