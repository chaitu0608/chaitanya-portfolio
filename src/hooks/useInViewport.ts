import { useEffect, useRef, useState } from "react";

interface UseInViewportOptions {
  rootMargin?: string;
  threshold?: number;
}

export function useInViewport(options: UseInViewportOptions = {}) {
  const { rootMargin = "80px", threshold = 0.01 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return { ref, inView };
}
