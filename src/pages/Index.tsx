import React, { useState, lazy, Suspense, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Navigation from "@/components/Navigation";
import FloatingDock from "@/components/ui/floating-dock";
const PageAmbient = lazy(() =>
  import("@/components/PageAmbient").then((m) => ({ default: m.PageAmbient })),
);
import { ScrollProvider } from "@/context/ScrollProvider";
import { useIsMobile } from "@/hooks/use-mobile";

const About = lazy(() => import("@/components/About"));
const Projects = lazy(() => import("@/components/Projects"));
const Experience = lazy(() => import("@/components/Experience"));
const Skills = lazy(() => import("@/components/Skills"));
const Footer = lazy(() => import("@/components/Footer"));
const Contact = lazy(() => import("@/components/Contact"));
const ContactModal = lazy(() => import("@/components/ContactModal"));
const PhotoAlbum = lazy(() => import("@/components/PhotoAlbum"));
const CommandPalette = lazy(() =>
  import("@/components/CommandPalette").then((m) => ({
    default: m.CommandPalette,
  })),
);

const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const smoothScroll = !isMobile && !prefersReducedMotion;

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPhotoAlbumOpen, setIsPhotoAlbumOpen] = useState(false);

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
    <ScrollProvider enabled={smoothScroll}>
    <a
      href="#about"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100001] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
    >
      Skip to content
    </a>
    <div className="min-h-screen gradient-primary transition-colors duration-500">
      <Suspense fallback={null}>
        <PageAmbient />
      </Suspense>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Navigation onContactClick={handleContactClick} />

        <main className="pb-28">
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

        <FloatingDock onContactClick={handleContactClick} />

        <Suspense fallback={null}>
          <CommandPalette onContactClick={handleContactClick} />
        </Suspense>

        {/* Crawlers: semantic content when sections are below fold */}
        <div className="sr-only">
          <h1>Chaitanya Dhamdhere — Full Stack Developer Portfolio</h1>
          <p>
            Chaitanya Dhamdhere is a Full Stack Developer and Computer
            Engineering student at K. J. Somaiya College of Engineering, Mumbai.
            Skills include React, TypeScript, Node.js, Next.js, MongoDB, and
            PostgreSQL. Experience at Jio Platforms and KJSCE CodeCell.
          </p>
        </div>
      </motion.div>

      <Suspense fallback={null}>
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={handleContactModalClose}
        />
        <PhotoAlbum
          isOpen={isPhotoAlbumOpen}
          onClose={handleClosePhotoAlbum}
        />
      </Suspense>
    </div>
    </ScrollProvider>
  );
};

export default Index;
