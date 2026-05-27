import { scrollToTarget } from "@/lib/scroll/lenis";

const NAV_OFFSET = 100;

export const scrollToSection = (href: string) => {
  scrollToTarget(href, { offset: NAV_OFFSET, duration: 1.2 });
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
