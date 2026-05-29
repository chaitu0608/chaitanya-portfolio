import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/glass-card';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';

interface PhotoAlbumProps {
  isOpen: boolean;
  onClose: () => void;
}

const PhotoAlbum: React.FC<PhotoAlbumProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Photo album data (images from public folder; add more as needed)
  const photos = [
    {
      id: 1,
      src: '/profile-photo.png',
      title: 'Professional Headshot',
      description: 'Chaitanya at ETHGlobal New Delhi'
    },
    {
      id: 2,
      src: '/codecell25.jpeg',
      title: 'CodeCell Team',
      description: 'KJSCE CodeCell team photo - Building the future together'
    },
    {
      id: 3,
      src: '/profile2.jpeg',
      title: 'Exploring, learning, and growing every day',
      description: '2025-2026'
    },
    {
      id: 4,
      src: '/profile3.jpg',
      title: 'Yes,I overcame my stage fright',
      description: '2024-2025'
    }
  ];

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-4xl max-h-[90vh] w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <GlassCard className="p-6 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-gradient">
                Photo Album
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Photo Display */}
            <div className="relative mb-6">
              <div className="aspect-video bg-muted/20 rounded-lg overflow-hidden relative">
                <ImageWithFallback
                  src={photos[currentIndex].src}
                  alt={photos[currentIndex].title}
                  fallbackLabel={photos[currentIndex].title}
                  fallbackVariant="initials"
                  loading="lazy"
                  decoding="async"
                  containerClassName="h-full w-full [&_span]:text-4xl"
                />
              </div>

              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="sm"
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>

              {/* Photo Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {photos.length}
              </div>
            </div>

            {/* Photo Info */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">
                {photos[currentIndex].title}
              </h3>
              <p className="text-muted-foreground">
                {photos[currentIndex].description}
              </p>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center gap-2 mt-6">
              {photos.map((photo, index) => (
                <button
                  key={photo.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex
                      ? 'border-accent scale-110'
                      : 'border-transparent hover:border-accent/50'
                  }`}
                >
                  <ImageWithFallback
                    src={photo.src}
                    alt={photo.title}
                    fallbackLabel={photo.title}
                    fallbackVariant="initials"
                    loading="lazy"
                    decoding="async"
                    containerClassName="h-full w-full [&_span]:text-xs"
                  />
                </button>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PhotoAlbum;
