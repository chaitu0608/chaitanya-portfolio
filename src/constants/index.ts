// Site configuration constants
export const SITE_CONFIG = {
  title: "Chaitanya Dhamdhere - Full Stack Developer Portfolio",
  description: "Computer Engineering student and Full Stack Developer passionate about building innovative web applications. Skilled in React, Next.js, TypeScript, and more.",
  url: "https://chaitanya-portfolio.com",
  ogImage: "https://lovable.dev/opengraph-image-p98pqg.png",
  twitterHandle: "@lovable_dev"
} as const;

// Animation configuration
export const ANIMATION_CONFIG = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500
  },
  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
  }
} as const;

// Theme configuration
export const THEME_CONFIG = {
  colors: {
    primary: "210 100% 50%",
    secondary: "0 0% 8%", 
    accent: "0 0% 10%"
  }
} as const;