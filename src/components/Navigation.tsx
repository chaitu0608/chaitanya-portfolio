import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  User,
  Briefcase,
  Code,
  Star,
  Mail,
  MessageCircle,
} from "lucide-react";
import { navItems } from "@/data/portfolio";
import { scrollToSection } from "@/utils/animations";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useThrottle } from "@/hooks/useThrottle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

interface NavigationProps {
  onContactClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onContactClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const prefersReducedMotion = useReducedMotion();

  const navIcons = useMemo(
    () => ({
      about: User,
      projects: Code,
      experience: Briefcase,
      skills: Star,
      contact: Mail,
    }),
    [],
  );

  const sections = useMemo(
    () => navItems.map((item) => item.href.substring(1)),
    [],
  );

  const handleScroll = useThrottle(() => {
    setScrolled(window.scrollY > 50);

    const currentSection = sections.find((section) => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });

    if (currentSection) {
      setActiveSection(currentSection);
    }
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("lenis-scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("lenis-scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleScrollToSection = useCallback((href: string) => {
    scrollToSection(href);
    setIsOpen(false);
    setActiveSection(href.substring(1));
  }, []);

  const navTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const };

  return (
    <motion.nav
      initial={prefersReducedMotion ? false : { y: -24, opacity: 0 }}
      animate={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
      transition={navTransition}
      className="fixed left-0 right-0 top-4 z-50 px-4"
    >
      <div className="mx-auto max-w-7xl">
        <div
          className={cn(
            "flex h-14 items-center gap-2 rounded-2xl border px-3 md:px-4 mac-dock-blur",
            scrolled
              ? "glass-enhanced border-border/60 shadow-card"
              : "border-border/40 bg-glass-bg-strong/80",
          )}
        >
          {/* Brand — mobile + desktop */}
          <button
            type="button"
            onClick={() => handleScrollToSection("#about")}
            className="flex shrink-0 items-center gap-2 rounded-lg px-2 py-1 text-left transition-colors hover:text-accent"
            aria-label="Go to about section"
          >
            <span className="hidden items-center gap-2 md:flex" aria-hidden>
              <span className="mac-traffic-lights">
                <span className="close" />
                <span className="minimize" />
                <span className="maximize" />
              </span>
            </span>
            <span className="font-mono text-xs font-medium text-muted-foreground md:text-sm">
              <span className="text-accent md:hidden">CD</span>
              <span className="hidden md:inline">Chaitu&apos;s Macbook</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon =
                navIcons[item.href.substring(1) as keyof typeof navIcons];
              const isActive = activeSection === item.href.substring(1);

              return (
                <motion.button
                  key={item.label}
                  type="button"
                  onClick={() => handleScrollToSection(item.href)}
                  whileHover={
                    prefersReducedMotion ? undefined : { scale: 1.04, y: -1 }
                  }
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                  className={cn(
                    "relative flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "border border-accent/30 bg-accent/15 text-accent"
                      : "text-muted-foreground hover:bg-accent/10 hover:text-accent",
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{item.label}</span>
                  {isActive && !prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-accent/10"
                      layoutId="activeTab"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-2">
            {onContactClick && (
              <Button
                size="sm"
                className="hidden bg-accent text-accent-foreground hover:bg-accent/90 md:inline-flex"
                onClick={onContactClick}
              >
                <MessageCircle className="mr-1.5 h-4 w-4" />
                Message
              </Button>
            )}
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="border border-border/60 md:hidden"
              onClick={() => setIsOpen((o) => !o)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, height: 0, y: -8 }
              }
              animate={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 1, height: "auto", y: 0 }
              }
              exit={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 0, height: 0, y: -8 }
              }
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-2 overflow-hidden rounded-2xl border border-border/60 glass-panel md:hidden"
            >
              <div className="space-y-1 p-3">
                {navItems.map((item) => {
                  const Icon =
                    navIcons[item.href.substring(1) as keyof typeof navIcons];
                  const isActive = activeSection === item.href.substring(1);

                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleScrollToSection(item.href)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors",
                        isActive
                          ? "border border-accent/30 bg-accent/15 text-accent"
                          : "text-muted-foreground hover:bg-accent/10",
                      )}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      {item.label}
                    </button>
                  );
                })}
                {onContactClick && (
                  <Button
                    className="mt-2 w-full bg-accent text-accent-foreground"
                    onClick={() => {
                      setIsOpen(false);
                      onContactClick();
                    }}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Send a message
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
