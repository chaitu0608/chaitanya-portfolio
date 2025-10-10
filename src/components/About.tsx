import React from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, MapPin } from "lucide-react";
import GlassCard from "@/components/ui/glass-card";
import { personalInfo, contactInfo } from "@/data/portfolio";

interface AboutProps {
  onAvatarClick: () => void;
}

const About: React.FC<AboutProps> = ({ onAvatarClick }) => {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress into various animation values
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.6, 0.3]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  // Simple PDF export function
  const exportToPDF = async () => {
    // For now, just open the resume URL if available
    const resumeUrl = "/resume.pdf"; // You can update this path
    if (resumeUrl) {
      window.open(resumeUrl, '_blank');
    }
  };

  const handleOpenLink = (url: string) => {
    window.open(url, '_blank');
  };



  return (
    <section id="about" className="min-h-screen flex items-center px-4 pt-32 pb-20 relative overflow-hidden continuous-bg section-transition">
      {/* Enhanced Bokeh Background with Scroll Animation */}
      <motion.div 
        className="absolute inset-0 bokeh-bg"
        style={{ 
          opacity: backgroundOpacity,
          y: backgroundY 
        }}
      />

      {/* Floating Particles */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      {/* Animated Background Elements with Scroll Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-accent opacity-5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
            x: [0, 20, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-gold opacity-5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.05, 0.1],
            x: [0, -15, 0],
            y: [0, 15, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 30]) }}
        />
        
        {/* Additional floating elements for more dynamic background */}
        <motion.div 
          className="absolute top-1/2 left-1/6 w-64 h-64 bg-gradient-primary opacity-3 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.08, 0.03],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [0, -40]),
            x: useTransform(scrollYProgress, [0, 1], [0, 20])
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-gradient-secondary opacity-4 rounded-full blur-3xl"
          animate={{ 
            scale: [1.1, 0.9, 1.1],
            opacity: [0.04, 0.07, 0.04],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 3 }}
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [0, 25]),
            x: useTransform(scrollYProgress, [0, 1], [0, -15])
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-accent font-mono text-sm tracking-wider"
            >
              Hello, I'm
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-4xl md:text-6xl font-display font-bold leading-tight"
            >
              <span className="text-gradient typing-animation">Chaitanya Dhamdhere</span>
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-lg"
            >
              Software Engineering student passionate about turning ideas into impactful solutions through code.
            </motion.h2>
        </motion.div>
        
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl space-y-3"
          >
            <p>
              Currently pursuing a B.Tech in Computer Engineering at KJ Somaiya College of Engineering, I'm passionate about building things and solving challenging problems.
            </p>
            <p>
              Somewhere between coding projects and crates of mangoes, I discovered how much I enjoy mixing innovation with real-world entrepreneurship.
            </p>
            <p className="text-accent/90 font-medium text-center italic">
              Just a guy trying to make sense of tech and life - learning, building, and exploring along the way.
            </p>
          </motion.div>

                {/* Status Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-accent/20"
                >
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-accent font-mono text-sm">Available for new projects</span>
                </motion.div>

                {/* Location Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="flex items-center gap-2 text-base"
                >
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="text-muted-foreground font-medium">Mumbai, India</span>
                </motion.div>

          {/* Action Buttons */}
                      <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap gap-3"
          >
            <Button 
              size="lg" 
              className="btn-primary"
              onClick={exportToPDF}
            >
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="btn-secondary"
              onClick={() => handleOpenLink(contactInfo.githubUrl)}
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="btn-secondary"
              onClick={() => handleOpenLink(contactInfo.linkedinUrl)}
            >
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </Button>
          </motion.div>


        </motion.div>

        {/* Right Content - Professional Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">

            {/* Main Image Container with Scroll Animation */}
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ duration: 0.3 }}
              className="relative group cursor-pointer"
              onClick={onAvatarClick}
              style={{
                scale: imageScale,
                rotateY: imageRotate
              }}
            >
              {/* Outer Glow Ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              
              {/* Main Image Card */}
              <GlassCard className="p-4 premium-glow relative overflow-hidden">
                {/* Bigger Image Container */}
                <div className="w-96 h-96 relative">
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
                      src="/profile-photo.jpeg?v=2" 
                      alt="Chaitanya Dhamdhere" 
                      className="w-full h-full object-cover"
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
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-accent/20 rounded-full border border-accent/30 backdrop-blur-sm">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-xs text-accent font-mono">This is me</span>
                  </div>
                  
                  
                  <motion.div
                    className="absolute bottom-6 left-6 w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center border border-accent/30 backdrop-blur-sm"
                    animate={{ rotate: [360, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  >
                    <span className="text-xl">🚀</span>
                  </motion.div>

                  <motion.div
                    className="absolute top-1/2 left-4 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center border border-accent/30 backdrop-blur-sm"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="text-lg">💻</span>
                  </motion.div>

                      <motion.div
                    className="absolute top-1/2 right-4 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center border border-accent/30 backdrop-blur-sm"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  >
                    <span className="text-lg">⚡</span>
                      </motion.div>

                  <motion.div
                    className="absolute top-6 left-6 w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center border border-accent/30 backdrop-blur-sm"
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  >
                    <span className="text-xl">⚛️</span>
          </motion.div>

                  {/* Minimal Tech Emojis - Key Ones Only */}
          <motion.div
                    className="absolute top-4 left-1/2 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center border border-accent/30 backdrop-blur-sm"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-lg">📊</span>
                  </motion.div>

                    <motion.div
                    className="absolute bottom-8 right-8 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center border border-accent/30 backdrop-blur-sm"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  >
                    <span className="text-lg">📱</span>
                    </motion.div>

                  <motion.div
                    className="absolute bottom-4 left-1/2 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center border border-accent/30 backdrop-blur-sm"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    <span className="text-lg">🌐</span>
                  </motion.div>

                  <motion.div
                    className="absolute top-1/2 left-1/4 w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center border border-accent/30 backdrop-blur-sm"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <span className="text-xs">💡</span>
                  </motion.div>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end justify-center pb-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    className="text-center"
                  >
                    <div className="text-sm text-accent font-mono">Click for Photo Album!</div>
                  </motion.div>
                </div>
              </GlassCard>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-accent rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-2 -right-2 w-3 h-3 bg-gradient-gold rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
            </motion.div>

              </div>
          </motion.div>
        </div>
    </section>
  );
};

export default About;