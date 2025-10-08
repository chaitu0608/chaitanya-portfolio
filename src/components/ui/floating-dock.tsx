import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  User, 
  Briefcase, 
  Code, 
  Star,
  Mail, 
  Github,
  Linkedin,
  Twitter,
  ChevronUp
} from 'lucide-react';

interface DockItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
  onClick?: () => void;
  external?: boolean;
}

interface FloatingDockProps {
  className?: string;
  onContactClick?: () => void;
}

const FloatingDock: React.FC<FloatingDockProps> = ({ 
  className,
  onContactClick 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const dockItems: DockItem[] = [
    {
      icon: User,
      label: 'About',
      href: '#about',
    },
    {
      icon: Code,
      label: 'Projects',
      href: '#projects',
    },
    {
      icon: Briefcase,
      label: 'Experience',
      href: '#experience',
    },
    {
      icon: Star,
      label: 'Skills',
      href: '#skills',
    },
    {
      icon: Mail,
      label: 'Contact',
      onClick: onContactClick,
    },
  ];

  const socialItems: DockItem[] = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/chaitu0608',
      external: true,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/chaitanya-dhamdhere/',
      external: true,
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com/chaitu0608',
      external: true,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleItemClick = (item: DockItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      if (item.external) {
        window.open(item.href, '_blank');
      } else {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={cn(
            'fixed bottom-6 left-0 right-0 z-50',
            className
          )}
        >
          <div className="max-w-7xl mx-auto px-6 flex justify-center">
          {/* Main Dock */}
          <div className="glass-panel px-4 py-3 rounded-full shadow-card">
            <div className="flex items-center gap-2">
              {/* Navigation Items */}
              {dockItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleItemClick(item)}
                  className="p-3 rounded-full hover:bg-glass-bg-strong smooth-transition group relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-accent smooth-transition" />
                  
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-card text-xs text-card-foreground rounded-md opacity-0 group-hover:opacity-100 smooth-transition pointer-events-none whitespace-nowrap">
                    {item.label}
                  </div>
                </motion.button>
              ))}
              
              {/* Separator */}
              <div className="w-px h-6 bg-border mx-2" />
              
              {/* Social Items */}
              {socialItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleItemClick(item)}
                  className="p-3 rounded-full hover:bg-glass-bg-strong smooth-transition group relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-accent smooth-transition" />
                  
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-card text-xs text-card-foreground rounded-md opacity-0 group-hover:opacity-100 smooth-transition pointer-events-none whitespace-nowrap">
                    {item.label}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Scroll to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 p-2 glass-panel rounded-full shadow-card hover:shadow-card-hover smooth-transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronUp className="w-4 h-4 text-muted-foreground hover:text-accent smooth-transition" />
          </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingDock;
