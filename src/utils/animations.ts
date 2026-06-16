import {
  SCROLL_DURATION,
  SCROLL_OFFSET,
  scrollToTarget,
} from "@/lib/scroll/lenis";

export const scrollToSection = (href: string) => {
  scrollToTarget(href, { offset: SCROLL_OFFSET, duration: SCROLL_DURATION });
};

export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

export const animationClasses = {
  fadeInUp: "animate-fadeInUp",
  fadeInLeft: "animate-fadeInLeft",
  fadeInRight: "animate-fadeInRight",
  scaleIn: "animate-scaleIn",
  slideInUp: "animate-slideInUp",
};
