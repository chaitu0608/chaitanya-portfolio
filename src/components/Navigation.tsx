import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Briefcase, Code, Star, Mail, MessageCircle } from "lucide-react";
import { navItems } from "@/data/portfolio";
import { scrollToSection } from "@/utils/animations";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useThrottle } from "@/hooks/useThrottle";

interface NavigationProps {
  onContactClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onContactClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const prefersReducedMotion = useReducedMotion();

  const navIcons = useMemo(() => ({
    about: User,
    projects: Code,
    experience: Briefcase,
    skills: Star,
    contact: Mail
  }), []);

  const sections = useMemo(() => navItems.map(item => item.href.substring(1)), []);

  const handleScroll = useThrottle(() => {
    const isScrolled = window.scrollY > 50;
    setScrolled(isScrolled);
    
    const currentSection = sections.find(section => {
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

  const handleToggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const navTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const };

  return (
    <motion.nav
      initial={prefersReducedMotion ? false : { y: -100, opacity: 0 }}
      animate={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
      transition={navTransition}
      className={`fixed top-6 left-0 right-0 z-50 smooth-transition-ultra ${
        scrolled ? "glass-enhanced border border-accent/20 shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center h-16 gap-2">
          
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => {
              const Icon = navIcons[item.href.substring(1) as keyof typeof navIcons];
              const isActive = activeSection === item.href.substring(1);
              
              return (
                <motion.div
                  key={item.label}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.6, delay: 0.6 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
                  }
                >
                  <motion.button
                    onClick={() => handleScrollToSection(item.href)}
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -2 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm smooth-button group overflow-hidden ${
                      isActive
                        ? "bg-accent/20 text-accent smooth-glow border border-accent/30"
                        : "text-muted-foreground hover:bg-accent/10 hover:text-accent"
                    }`}
                  >
                    <div className="flex items-center gap-2 relative z-10">
                      {Icon && <Icon className="w-4 h-4 smooth-icon" />}
                      <span className="smooth-text">{item.label}</span>
                    </div>
                    {isActive && !prefersReducedMotion && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/20 to-accent/10"
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                </motion.div>
              );
            })}
            {onContactClick && (
              <Button
                size="sm"
                className="ml-2 bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={onContactClick}
              >
                <MessageCircle className="w-4 h-4 mr-1.5" />
                Message
              </Button>
            )}
          </div>
          
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.6, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
            }
            className="md:hidden"
          >
            <Button
              variant="ghost"
              size="sm"
              className="border border-accent/30 text-accent hover:bg-accent/10 smooth-button"
              onClick={handleToggleMenu}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <motion.div
                animate={prefersReducedMotion ? undefined : { rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X className="w-5 h-5 smooth-icon" /> : <Menu className="w-5 h-5 smooth-icon" />}
              </motion.div>
            </Button>
          </motion.div>
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, height: 0, y: -20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, height: "auto", y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0, y: -20 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
              }
              className="md:hidden glass-panel border-t border-accent/20 mt-2 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item, index) => {
                  const Icon = navIcons[item.href.substring(1) as keyof typeof navIcons];
                  const isActive = activeSection === item.href.substring(1);
                  
                  return (
                    <motion.div
                      key={item.label}
                      initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
                      animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.4, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
                      }
                    >
                      <motion.button
                        onClick={() => handleScrollToSection(item.href)}
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.02, x: 4 }}
                        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className={`relative flex items-center gap-3 w-full text-left text-sm py-3 px-4 rounded-lg smooth-button group overflow-hidden ${
                          isActive
                            ? "bg-accent/20 text-accent border border-accent/30 smooth-glow"
                            : "text-muted-foreground hover:bg-accent/10"
                        }`}
                      >
                        <div className="flex items-center gap-3 relative z-10">
                          {Icon && <Icon className="w-4 h-4 smooth-icon" />}
                          <span className="smooth-text">{item.label}</span>
                        </div>
                      </motion.button>
                    </motion.div>
                  );
                })}
                {onContactClick && (
                  <Button
                    className="w-full mt-2 bg-accent text-accent-foreground"
                    onClick={() => {
                      setIsOpen(false);
                      onContactClick();
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
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
