import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import FloatingDock from "@/components/ui/floating-dock";

// Lazy load components for better performance
const About = lazy(() => import("@/components/About"));
const Projects = lazy(() => import("@/components/Projects"));
const Experience = lazy(() => import("@/components/Experience"));
const Skills = lazy(() => import("@/components/Skills"));
const Footer = lazy(() => import("@/components/Footer"));
const Contact = lazy(() => import("@/components/Contact"));
const ContactModal = lazy(() => import("@/components/ContactModal"));
const PhotoAlbum = lazy(() => import("@/components/PhotoAlbum"));
const DeveloperModeModal = lazy(() => import("@/components/DeveloperModeModal"));

// Loading fallback component
const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

// Custom Cursor Toggle - Set to true to enable custom cursor
const ENABLE_CUSTOM_CURSOR = false;

const IndexNoThree = () => {
  console.log('IndexNoThree component is rendering...');
  
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPhotoAlbumOpen, setIsPhotoAlbumOpen] = useState(false);
  const [isDeveloperModeOpen, setIsDeveloperModeOpen] = useState(false);
  const [konamiCode, setKonamiCode] = useState<string[]>([]);

  // Handle avatar clicks for photo album
  const handleAvatarClick = () => {
    setIsPhotoAlbumOpen(true);
  };

  // Konami code easter egg
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
      ];

      setKonamiCode(prev => {
        const newCode = [...prev, e.code];
        if (newCode.length > konamiSequence.length) {
          newCode.shift();
        }
        
        if (newCode.length === konamiSequence.length && 
            newCode.every((code, index) => code === konamiSequence[index])) {
          setIsDeveloperModeOpen(true);
          return [];
        }
        
        return newCode;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen gradient-primary scroll-smooth">
      {/* Custom Cursor - Disabled for now, set ENABLE_CUSTOM_CURSOR to true to enable */}
      {ENABLE_CUSTOM_CURSOR && <CustomCursor />}
      
      {/* Simple background without Three.js */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bokeh-bg opacity-40" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-accent opacity-5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-gold opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Navigation onContactClick={() => setIsContactModalOpen(true)} />

          <main className="scroll-smooth">
            <Suspense fallback={<SectionLoader />}>
              <About onAvatarClick={handleAvatarClick} />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <Projects />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <Experience />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <Skills />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <Contact />
            </Suspense>
          </main>

          <Suspense fallback={null}>
            <Footer onContactClick={() => setIsContactModalOpen(true)} />
          </Suspense>

          {/* Floating Dock */}
          <FloatingDock onContactClick={() => setIsContactModalOpen(true)} />
        </motion.div>
      </AnimatePresence>

      {/* Modals */}
      <Suspense fallback={null}>
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />

        <PhotoAlbum
          isOpen={isPhotoAlbumOpen}
          onClose={() => setIsPhotoAlbumOpen(false)}
        />

        <DeveloperModeModal
          isOpen={isDeveloperModeOpen}
          onClose={() => setIsDeveloperModeOpen(false)}
        />
      </Suspense>
    </div>
  );
};

export default IndexNoThree;
