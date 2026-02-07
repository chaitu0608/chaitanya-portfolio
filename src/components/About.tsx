import React, { useCallback } from 'react';
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, MapPin } from "lucide-react";
import GlassCard from "@/components/ui/glass-card";
import { personalInfo, contactInfo } from "@/data/portfolio";
import { useRef } from "react";

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Memoized callbacks
  const exportToPDF = useCallback(() => {
    const resumeUrl = "/CD_Resume.pdf";
    window.open(resumeUrl, '_blank');
  }, []);

  const handleOpenLink = useCallback((url: string) => {
    window.open(url, '_blank');
  }, []);



  return (
    <section ref={sectionRef} id="about" className="min-h-screen flex items-center px-4 md:px-6 lg:px-8 pt-32 pb-24 relative overflow-hidden continuous-bg section-transition scroll-smooth">
      {/* Static Background - No scroll animations */}
      <div className="absolute inset-0 bokeh-bg opacity-40" />
      
      {/* Static Glassmorphism Overlay */}
      <div className="absolute inset-0 glass-enhanced opacity-15" />

      {/* Reduced Floating Particles - Static CSS only */}
      <div className="floating-particles z-1">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      {/* Static Background Elements - No animations */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-accent opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-gold opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center relative z-20">
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
            <h2 className="text-xl md:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed max-w-xl smooth-text">
              Software Engineering student passionate about turning ideas into impactful solutions through code.
            </h2>
        </motion.div>
        
          {/* Description */}
          <div className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl space-y-4">
            <p>
              Currently pursuing a B.Tech in Computer Engineering at KJ Somaiya College of Engineering, I'm passionate about building things and solving challenging problems.
            </p>
            <p>
              Somewhere between coding projects and crates of mangoes, I discovered how much I enjoy mixing innovation with real-world entrepreneurship.
            </p>
            <p className="text-accent/90 font-medium text-center italic">
              Just a guy trying to make sense of tech and life - learning, building, and exploring along the way.
            </p>
          </div>

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
          <div className="flex flex-wrap gap-3">
            <Button 
              size="lg" 
              className="btn-primary smooth-button"
              onClick={exportToPDF}
            >
              <Download className="w-5 h-5 mr-2 smooth-icon" />
              <span className="smooth-text">Resume</span>
            </Button>
            
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
              whileHover={{ 
                scale: 1.03,
                y: -5
              }}
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
                
                  {/* Full Profile Photo */}
                  <div className="absolute inset-2 bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl overflow-hidden border border-accent/20">
                    <img 
                      src="/profile-photo.png?v=2" 
                      alt="Chaitanya Dhamdhere" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      onLoad={() => console.log('Image loaded successfully')}
                      onError={(e) => {
                        console.log('Image failed to load, showing fallback');
                        e.currentTarget.style.display = 'none';
                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center text-6xl" style={{display: 'none'}}>
                      👨‍💻
                  </div>
                  </div>
                  
                  {/* Status Indicator - Floating on Photo */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 px-4 py-2 bg-accent/30 rounded-full border border-accent/50 backdrop-blur-sm shadow-lg">
                    <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-sm text-accent font-mono font-semibold">This is me</span>
                  </div>
                  
                  
                  <div className="absolute bottom-6 left-6 w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center border border-accent/30 backdrop-blur-sm">
                    <span className="text-xl">🚀</span>
                  </div>

                  <div className="absolute top-1/2 left-4 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center border border-accent/30 backdrop-blur-sm">
                    <span className="text-lg">💻</span>
                  </div>

                  <div className="absolute top-1/2 right-4 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center border border-accent/30 backdrop-blur-sm">
                    <span className="text-lg">⚡</span>
                  </div>

                  <div className="absolute top-6 left-6 w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center border border-accent/30 backdrop-blur-sm">
                    <span className="text-xl">⚛️</span>
          </div>

                  {/* Minimal Tech Emojis - Static only */}
          <div className="absolute top-4 left-1/2 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center border border-accent/30 backdrop-blur-sm">
                    <span className="text-lg">📊</span>
                  </div>

                    <div className="absolute bottom-8 right-8 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center border border-accent/30 backdrop-blur-sm">
                    <span className="text-lg">📱</span>
                    </div>

                  <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center border border-accent/30 backdrop-blur-sm">
                    <span className="text-xs">💡</span>
                  </div>
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