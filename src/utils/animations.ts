// Ultra-Smooth scroll utility
export const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - 100; // Account for fixed header
    
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
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