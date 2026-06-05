import { useEffect, useState } from "react";

const DEFAULT_ROOT_MARGIN = "-40% 0px -40% 0px";

export function useSectionSpy(
  sectionIds: readonly string[],
  rootMargin = DEFAULT_ROOT_MARGIN,
): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin, threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds, rootMargin]);

  return activeId;
}
