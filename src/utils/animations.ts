// Easing: ease-out cubic for very smooth, slow deceleration at the end
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

// Ultra-smooth, slow programmatic scroll (duration ~1.4s, eased)
export const scrollToSection = (href: string) => {
  const element = document.querySelector(href) as HTMLElement | null;
  if (!element) return;

  const offset = 100; // account for fixed header
  const targetY =
    element.getBoundingClientRect().top + window.scrollY - offset;
  const startY = window.scrollY;
  const distance = targetY - startY;
  const durationMs = 1600; // slow, smooth scroll
  const startTime = performance.now();

  const tick = (now: number) => {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / durationMs, 1);
    const eased = easeOutCubic(t);
    window.scrollTo(0, startY + distance * eased);
    if (t < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

// Intersection Observer for animations
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Animation classes
export const animationClasses = {
  fadeInUp: 'animate-fadeInUp',
  fadeInLeft: 'animate-fadeInLeft',
  fadeInRight: 'animate-fadeInRight',
  scaleIn: 'animate-scaleIn',
  slideInUp: 'animate-slideInUp'
};