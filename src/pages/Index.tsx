import React, { useState, lazy, Suspense, useCallback } from 'react';
import { motion } from 'framer-motion';
import Navigation from "@/components/Navigation";
import FloatingDock from "@/components/ui/floating-dock";
import { ScrollProvider } from "@/context/ScrollProvider";

const About = lazy(() => import("@/components/About"));
const Projects = lazy(() => import("@/components/Projects"));
const Experience = lazy(() => import("@/components/Experience"));
const Skills = lazy(() => import("@/components/Skills"));
const Footer = lazy(() => import("@/components/Footer"));
const Contact = lazy(() => import("@/components/Contact"));
const ContactModal = lazy(() => import("@/components/ContactModal"));
const PhotoAlbum = lazy(() => import("@/components/PhotoAlbum"));

const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
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
    <ScrollProvider>
    <div className="min-h-screen gradient-primary">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bokeh-bg opacity-40" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-accent opacity-5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-gold opacity-5 rounded-full blur-3xl" />
        </div>
      </div>

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
