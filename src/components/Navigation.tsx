import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  User,
  Briefcase,
  Code,
  Star,
  Mail,
  MessageCircle,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/data/portfolio";
import { scrollToSection } from "@/utils/animations";
import { motion, useReducedMotion } from "framer-motion";
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
            "mac-dock-blur flex h-14 items-center gap-2 rounded-2xl border px-3 md:px-4",
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

          {/* Desktop nav — shadcn NavigationMenu */}
          <NavigationMenu className="mx-auto hidden max-w-none flex-1 justify-center md:flex">
            <NavigationMenuList className="gap-1">
              {navItems.map((item) => {
                const sectionId = item.href.substring(1);
                const Icon = navIcons[sectionId as keyof typeof navIcons];
                const isActive = activeSection === sectionId;

                return (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink
                      active={isActive}
                      onSelect={(e) => {
                        e.preventDefault();
                        handleScrollToSection(item.href);
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleScrollToSection(item.href);
                      }}
                      href={item.href}
                      className={cn(
                        "relative flex cursor-pointer select-none items-center gap-2 rounded-full px-3 py-2 text-sm font-medium outline-none transition-colors",
                        "focus-visible:ring-2 focus-visible:ring-accent/40",
                        isActive
                          ? "border border-accent/30 bg-accent/15 text-accent"
                          : "text-muted-foreground hover:bg-accent/10 hover:text-accent",
                      )}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      <span>{item.label}</span>
                      {isActive && !prefersReducedMotion && (
                        <motion.span
                          aria-hidden
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-full bg-accent/10"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

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
            <kbd className="hidden rounded border border-border/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground lg:inline">
              ⌘K
            </kbd>

            {/* Mobile drawer — shadcn Sheet */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="border border-border/60 md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[88vw] max-w-sm border-border/60 bg-background/95 backdrop-blur-xl"
              >
                <SheetHeader className="text-left">
                  <SheetTitle className="flex items-center gap-2 font-mono text-sm">
                    <span className="mac-traffic-lights" aria-hidden>
                      <span className="close" />
                      <span className="minimize" />
                      <span className="maximize" />
                    </span>
                    Chaitu&apos;s Macbook
                  </SheetTitle>
                </SheetHeader>

                <nav className="mt-6 flex flex-col gap-1">
                  {navItems.map((item) => {
                    const sectionId = item.href.substring(1);
                    const Icon = navIcons[sectionId as keyof typeof navIcons];
                    const isActive = activeSection === sectionId;

                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => handleScrollToSection(item.href)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                          isActive
                            ? "border border-accent/30 bg-accent/15 text-accent"
                            : "text-muted-foreground hover:bg-accent/10 hover:text-accent",
                        )}
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        {item.label}
                      </button>
                    );
                  })}
                </nav>

                {onContactClick && (
                  <Button
                    className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => {
                      setIsOpen(false);
                      onContactClick();
                    }}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Send a message
                  </Button>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
