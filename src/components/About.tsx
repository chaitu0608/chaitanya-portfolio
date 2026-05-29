import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, MapPin } from "lucide-react";
import GlassCard from "@/components/ui/glass-card";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { personalInfo, contactInfo } from "@/data/portfolio";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

// Preview images for the photos badge (same sources as PhotoAlbum; add more in public/ as needed)
const PHOTO_ALBUM_PREVIEW_IMAGES = [
  "/profile-photo.png",
  "/codecell25.jpeg",
  "/profile2.jpeg",
  "/profile3.jpg",
];

interface AboutProps {
  onOpenPhotoAlbum?: () => void;
}

const About = ({ onOpenPhotoAlbum }: AboutProps) => {
  const sectionRef = useRef(null);
  const hasRevealedRef = useRef(false);
  const [startPhotoReveal, setStartPhotoReveal] = useState(false);
  const [showSoftOverlay, setShowSoftOverlay] = useState(true);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let revealTimer: number | null = null;
    let overlayTimer: number | null = null;

    const runRevealOnce = () => {
      if (hasRevealedRef.current) return;
      hasRevealedRef.current = true;
      const delay = prefersReducedMotion ? 0 : 800;
      revealTimer = window.setTimeout(() => {
        setStartPhotoReveal(true);
        if (!prefersReducedMotion) {
          overlayTimer = window.setTimeout(() => {
            setShowSoftOverlay(false);
          }, 1600);
        } else {
          setShowSoftOverlay(false);
        }
      }, delay);
    };

    if (document.readyState === "complete") {
      runRevealOnce();
      return () => {
        if (revealTimer !== null) window.clearTimeout(revealTimer);
        if (overlayTimer !== null) window.clearTimeout(overlayTimer);
      };
    }

    window.addEventListener("load", runRevealOnce, { once: true });
    return () => {
      window.removeEventListener("load", runRevealOnce);
      if (revealTimer !== null) window.clearTimeout(revealTimer);
      if (overlayTimer !== null) window.clearTimeout(overlayTimer);
    };
  }, [prefersReducedMotion]);

  // Absolute URL so resume opens in a new tab correctly (e.g. on localhost)
  const resumeHref =
    typeof window !== "undefined" && contactInfo.resumeUrl
      ? contactInfo.resumeUrl.startsWith("http")
        ? contactInfo.resumeUrl
        : `${window.location.origin}${contactInfo.resumeUrl}`
      : contactInfo.resumeUrl ?? "/ChaitanyaResume.pdf";

  const handleOpenLink = useCallback((url: string) => {
    window.open(url, '_blank');
  }, []);



  return (
    <section ref={sectionRef} id="about" className="relative flex min-h-screen items-center overflow-hidden px-4 pb-24 pt-32 section-transition md:px-6 lg:px-8">
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="space-y-9 md:space-y-10"
        >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="space-y-4"
          >
            <p className="text-accent font-mono text-sm tracking-wider smooth-text">
              Hello, I'm
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              <span className="text-gradient smooth-text">
                Chaitanya Dhamdhere
              </span>
            </h1>
            <TextGenerateEffect
              words={personalInfo.tagline}
              duration={0.35}
            />
        </motion.div>
        
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {personalInfo.description}
          </p>

                {/* Status Badge */}
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-accent/20">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-accent font-mono text-sm">Available for new projects</span>
                </div>

                {/* Location Info */}
                <div className="flex items-center gap-2 text-base">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="text-muted-foreground font-medium">Mumbai, India</span>
                </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 items-center">
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-lg px-6 text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 btn-primary smooth-button"
            >
              <Download className="w-5 h-5 mr-2 smooth-icon" />
              <span className="smooth-text">Resume</span>
            </a>

            <Button 
              variant="outline" 
              size="lg" 
              className="btn-secondary smooth-button"
              onClick={() => handleOpenLink(contactInfo.githubUrl)}
            >
              <Github className="w-5 h-5 mr-2 smooth-icon" />
              <span className="smooth-text">GitHub</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="btn-secondary smooth-button"
              onClick={() => handleOpenLink(contactInfo.linkedinUrl)}
            >
              <Linkedin className="w-5 h-5 mr-2 smooth-icon" />
              <span className="smooth-text">LinkedIn</span>
            </Button>
          </div>


        </motion.div>

        {/* Right Content - Professional Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ 
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Main Image Container - Simplified hover */}
            <motion.div
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { scale: 1.03, y: -5 }
              }
              transition={{ 
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="relative group smooth-card"
            >
              {/* Outer Glow Ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              
              {/* Main Image Card */}
              <GlassCard className="p-4 premium-glow relative overflow-hidden">
                {/* Bigger Image Container */}
                <div className="w-[28rem] h-[28rem] md:w-[32rem] md:h-[32rem] lg:w-[36rem] lg:h-[36rem] relative">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-accent/5 rounded-2xl"></div>
                  
                  {/* Grid Pattern Overlay */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full" style={{
                      backgroundImage: `
                        linear-gradient(rgba(32, 227, 178, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(32, 227, 178, 0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px'
                    }}></div>
                </div>
                
                  {/* Full Profile Photo (one-time blur -> sharp reveal) */}
                  <div className="absolute inset-2 bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl overflow-hidden border border-accent/20">
                    <motion.div
                      className="absolute inset-0"
                      initial={false}
                      animate={
                        prefersReducedMotion || startPhotoReveal
                          ? { filter: "blur(0px)", scale: 1, opacity: 1 }
                          : { filter: "blur(9px)", scale: 1.03, opacity: 0.88 }
                      }
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 1.45, ease: [0.22, 1, 0.36, 1] }
                      }
                    >
                      <ImageWithFallback
                        src="/profile-photo.png?v=2"
                        alt={personalInfo.name}
                        fallbackLabel={personalInfo.name}
                        fallbackVariant="initials"
                        loading="lazy"
                        decoding="async"
                        containerClassName="h-full w-full [&_span]:text-5xl md:[&_span]:text-6xl"
                      />
                    </motion.div>
                    {!prefersReducedMotion && (
                      <motion.div
                        initial={false}
                        animate={{ opacity: showSoftOverlay ? 1 : 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(140deg, rgba(36, 128, 156, 0.26), rgba(36, 128, 156, 0.08))",
                        }}
                      />
                    )}
                  </div>
                  
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-accent/30 rounded-full border border-accent/50 backdrop-blur-sm shadow-lg">
                    <div className={`w-2 h-2 bg-accent rounded-full ${prefersReducedMotion ? "" : "animate-pulse"}`} />
                    <span className="text-xs text-accent font-mono font-semibold">Open to work</span>
                  </div>
                  
                  {onOpenPhotoAlbum && (
                    <button
                      type="button"
                      onClick={onOpenPhotoAlbum}
                      className="absolute bottom-4 left-4 flex items-center justify-center rounded-full ring-2 ring-white/20 ring-offset-2 ring-offset-background/80 bg-black/40 backdrop-blur-sm p-1.5 hover:ring-accent/50 hover:bg-black/50 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      aria-label="View more photos"
                    >
                      <div className="relative flex h-9 w-[52px] items-center justify-center">
                        {PHOTO_ALBUM_PREVIEW_IMAGES.slice(0, 3).map((src, i) => (
                          <div
                            key={`${src}-${i}`}
                            className="absolute rounded-full overflow-hidden border-2 border-background/90 bg-muted shadow-md"
                            style={{
                              width: 28,
                              height: 28,
                              left: i * 14,
                              top: 6 - i * 1,
                              zIndex: 3 - i,
                            }}
                          >
                            <ImageWithFallback
                              src={src}
                              alt=""
                              fallbackLabel={personalInfo.name}
                              fallbackVariant="initials"
                              loading="lazy"
                              containerClassName="h-full w-full [&_span]:text-[10px]"
                            />
                          </div>
                        ))}
                      </div>
                    </button>
                  )}
                </div>
                
              </GlassCard>

              {/* Decorative Elements - Static */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-accent rounded-full opacity-60" />
              <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-gradient-gold rounded-full opacity-60" />
            </motion.div>

          </div>
        </motion.div>
        </div>
    </section>
  );
};

export default About;