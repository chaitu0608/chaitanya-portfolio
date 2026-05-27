import React, { useState, useRef, useEffect, lazy, Suspense, useCallback } from 'react';
import { motion } from 'framer-motion';
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import FloatingDock from "@/components/ui/floating-dock";
import { ScrollProvider } from "@/context/ScrollProvider";

// Lazy load components for better performance
const About = lazy(() => import("@/components/About"));
const Projects = lazy(() => import("@/components/Projects"));
const Experience = lazy(() => import("@/components/Experience"));
const Skills = lazy(() => import("@/components/Skills"));
const Footer = lazy(() => import("@/components/Footer"));
const Contact = lazy(() => import("@/components/Contact"));
const ContactModal = lazy(() => import("@/components/ContactModal"));
const BhaisEasterEgg = lazy(() => import("@/components/BhaisEasterEgg"));
const PhotoAlbum = lazy(() => import("@/components/PhotoAlbum"));

const BHAIS_TRIGGER = "bhais";
const SHER_TRIGGER = "sher";
const SHER_AUDIO = "/amandeep.m4a";

// Loading fallback component
const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

// Custom Cursor Toggle - Set to true to enable custom cursor
const ENABLE_CUSTOM_CURSOR = false;

const IndexNoThree = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPhotoAlbumOpen, setIsPhotoAlbumOpen] = useState(false);
  const [showBhaisEgg, setShowBhaisEgg] = useState(false);
  const bhaisBufferRef = useRef("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return;
      const buf = (bhaisBufferRef.current + e.key.toLowerCase()).slice(-BHAIS_TRIGGER.length);
      bhaisBufferRef.current = buf;
      if (buf === BHAIS_TRIGGER) setShowBhaisEgg(true);
      if (buf.slice(-SHER_TRIGGER.length) === SHER_TRIGGER) {
        const audio = new Audio(SHER_AUDIO);
        audio.play().catch(() => {});
      }
    };
    window.addEventListener("keydown", onKey, { passive: true });
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleContactClick = useCallback(() => {
    setIsContactModalOpen(true);
  }, []);

  const handleContactModalClose = useCallback(() => {
    setIsContactModalOpen(false);
  }, []);

  const handleOpenPhotoAlbum = useCallback(() => {
    setIsPhotoAlbumOpen(true);
  }, []);

  const handleClosePhotoAlbum = useCallback(() => {
    setIsPhotoAlbumOpen(false);
  }, []);

  return (
    <ScrollProvider>
    <div className="min-h-screen gradient-primary scroll-smooth">
      {/* Custom Cursor - Disabled for now, set ENABLE_CUSTOM_CURSOR to true to enable */}
      {ENABLE_CUSTOM_CURSOR && <CustomCursor />}
      
      {/* Optimized background - Reduced animations */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bokeh-bg opacity-40" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-accent opacity-5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-gold opacity-5 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Main Content - Simplified animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Navigation onContactClick={handleContactClick} />

        <main className="scroll-smooth pb-28">
          <Suspense fallback={<SectionLoader />}>
            <About onOpenPhotoAlbum={handleOpenPhotoAlbum} />
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
            <Contact onContactClick={handleContactClick} />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>

        {/* Floating Dock */}
        <FloatingDock onContactClick={handleContactClick} />
      </motion.div>

      {/* Modals */}
      <Suspense fallback={null}>
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={handleContactModalClose}
        />

        {showBhaisEgg && (
          <BhaisEasterEgg onClose={() => setShowBhaisEgg(false)} />
        )}

        <PhotoAlbum
          isOpen={isPhotoAlbumOpen}
          onClose={handleClosePhotoAlbum}
        />
      </Suspense>
    </div>
    </ScrollProvider>
  );
};

export default IndexNoThree;
