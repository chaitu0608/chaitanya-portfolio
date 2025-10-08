import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, User, Briefcase, Code, Star, Mail } from "lucide-react";
import { navItems, personalInfo } from "@/data/portfolio";
import { scrollToSection } from "@/utils/animations";
import { motion, AnimatePresence } from "framer-motion";

interface NavigationProps {
  onContactClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onContactClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navIcons = {
    home: Home,
    about: User,
    experience: Briefcase,
    projects: Code,
    skills: Star,
    contact: Mail
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
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
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (href: string) => {
    if (href === '#contact' && onContactClick) {
      onContactClick();
    } else {
      scrollToSection(href);
    }
    setIsOpen(false);
    setActiveSection(href.substring(1));
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`fixed top-6 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-panel border border-accent/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center glow">
              <span className="text-lg">👨‍💻</span>
            </div>
            <div className="text-xl font-display font-bold text-gradient">
              Chaitanya
            </div>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = navIcons[item.href.substring(1) as keyof typeof navIcons];
              return (
                <motion.button
                  key={item.label}
                  onClick={() => handleScrollToSection(item.href)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm smooth-transition ${
                    activeSection === item.href.substring(1)
                      ? "bg-accent/20 text-accent glow border border-accent/30"
                      : "text-muted-foreground hover:bg-accent/10 hover:text-accent"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {item.label}
                </motion.button>
              );
            })}
          </div>
          
          {/* Status & Contact */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-accent font-mono text-xs">AVAILABLE</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onContactClick}
              className="btn-secondary text-xs"
            >
              Get in touch
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden border border-accent/30 text-accent hover:bg-accent/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glass-panel border-t border-accent/20 mt-2"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = navIcons[item.href.substring(1) as keyof typeof navIcons];
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleScrollToSection(item.href)}
                      className={`flex items-center gap-3 w-full text-left text-sm py-3 px-4 rounded-lg smooth-transition ${
                        activeSection === item.href.substring(1)
                          ? "bg-accent/20 text-accent"
                          : "text-muted-foreground hover:bg-accent/10"
                      }`}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      {item.label}
                    </button>
                  );
                })}
                
                {/* Mobile Contact Button */}
                <div className="pt-2 border-t border-accent/20">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onContactClick}
                    className="w-full btn-secondary text-xs"
                  >
                    Get in touch
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;