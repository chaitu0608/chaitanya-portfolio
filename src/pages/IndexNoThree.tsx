import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from "@/components/Navigation";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import Contact from "@/components/Contact";
import PhotoAlbum from "@/components/PhotoAlbum";
import DeveloperModeModal from "@/components/DeveloperModeModal";
import FloatingDock from "@/components/ui/floating-dock";
import CustomCursor from "@/components/CustomCursor";

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
    <div className="min-h-screen gradient-primary">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Simple background without Three.js */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bokeh-bg opacity-40" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-accent opacity-5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-gold opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Main Content */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Navigation onContactClick={() => setIsContactModalOpen(true)} />

          <main>
            <About onAvatarClick={handleAvatarClick} />

            <Projects />

            <Experience />

            <Skills />

            <Contact />
          </main>

          <Footer onContactClick={() => setIsContactModalOpen(true)} />

          {/* Floating Dock */}
          <FloatingDock onContactClick={() => setIsContactModalOpen(true)} />
        </motion.div>
      </AnimatePresence>

      {/* Modals */}
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
    </div>
  );
};

export default IndexNoThree;
