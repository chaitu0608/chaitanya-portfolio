import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LampContainer from '@/components/ui/lamp';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';
import { contactInfo } from '@/data/portfolio';

const Contact: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setTypedText(prev => {
        const newText = prev + e.key.toLowerCase();
        if (newText.includes('pushpak')) {
          setShowEasterEgg(true);
          if (audio) {
            audio.currentTime = 0;
            audio.play().catch(console.error);
          }
          return '';
        }
        
        return newText.slice(-10); // Keep only last 10 characters
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [audio]);

  useEffect(() => {
    const audioElement = new Audio('/pushpa.m4a');
    audioElement.preload = 'auto';
    setAudio(audioElement);
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    };
  }, []);

  

  return (
    <section id="contact" className="py-20 px-4 relative overflow-hidden continuous-bg section-transition scroll-smooth">
      {/* Enhanced Glassmorphism Background */}
      <motion.div className="absolute inset-0 bokeh-bg z-0" style={{ opacity: 0.2 }} />
      
      {/* Glassmorphism Overlay */}
      <motion.div 
        className="absolute inset-0 glass-enhanced z-0"
        style={{ 
          opacity: 0.15
        }}
      />

      {/* Reduced Floating Particles for better performance */}
      <div className="floating-particles z-1">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${15 + i * 25}%`,
              top: `${20 + (i % 2) * 50}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>
      
      {/* Reduced Glassmorphism Orbs to prevent overlapping */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-accent opacity-8 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-teal-400/10 rounded-full blur-3xl"
          animate={{ 
            scale: [0.9, 1.1, 0.9],
            opacity: [0.1, 0.13, 0.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Header with Lamp */}
        <LampContainer>
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-slate-200 to-slate-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Let’s Connect
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Have an opportunity, idea, or question? I’d love to hear from you.
            </motion.p>
          </div>
        </LampContainer>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Contact Cards */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <CardSpotlight className="p-6 hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">Email</div>
                    <a 
                      href={`mailto:${contactInfo.email}`} 
                      className="text-foreground hover:text-blue-400 smooth-transition font-medium"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              </CardSpotlight>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <CardSpotlight className="p-6 hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-green-500/20 to-green-600/20 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">Phone</div>
                    <a 
                      href={`tel:${contactInfo.phone}`} 
                      className="text-foreground hover:text-green-400 smooth-transition font-medium"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
              </CardSpotlight>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <CardSpotlight className="p-6 cursor-pointer hover:scale-105 transition-all duration-300 group">
                  <a href={contactInfo.githubUrl} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-3 text-center">
                    <div className="p-4 rounded-full bg-gradient-to-r from-gray-500/20 to-gray-600/20 group-hover:scale-110 transition-transform duration-300">
                      <Github className="w-8 h-8 text-gray-400" />
                    </div>
                    <span className="font-semibold">GitHub</span>
                    <span className="text-xs text-muted-foreground">Check out my projects</span>
                  </a>
                </CardSpotlight>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <CardSpotlight className="p-6 cursor-pointer hover:scale-105 transition-all duration-300 group">
                  <a href={contactInfo.linkedinUrl} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-3 text-center">
                    <div className="p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 group-hover:scale-110 transition-transform duration-300">
                      <Linkedin className="w-8 h-8 text-blue-400" />
                    </div>
                    <span className="font-semibold">LinkedIn</span>
                    <span className="text-xs text-muted-foreground">Let's connect</span>
                  </a>
                </CardSpotlight>
              </motion.div>
            </div>
          </div>
          {/* Enhanced Apple Music Playlist Embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <CardSpotlight className="p-6 hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <motion.h3 
                  className="text-2xl font-bold text-gradient mb-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  My Vibe 🎶
                </motion.h3>
                <motion.p 
                  className="text-muted-foreground text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  What I'm listening to right now
                </motion.p>
              </div>
              <div className="w-full h-full rounded-xl overflow-hidden glass-enhanced border border-accent/20 shadow-2xl">
                <iframe
                  title="Apple Music Playlist"
                  allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-pointer-lock"
                  className="w-full h-[420px]"
                  data-theme="dark"
                  src={"https://embed.music.apple.com/in/playlist/chaitu101/pl.u-AkAm81pUx87R2zE?theme=dark"}
                />
              </div>
            </CardSpotlight>
          </motion.div>
        </div>
      </div>

      {/* Easter Egg */}
      {showEasterEgg && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowEasterEgg(false)}
        >
          <motion.div
            initial={{ rotate: -5 }}
            animate={{ rotate: 5 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="relative"
          >
            <CardSpotlight className="p-6 max-w-md">
              <div className="text-center space-y-4">
                <motion.img
                  src="/pushpak.jpeg"
                  alt="Pushpak"
                  className="w-48 h-48 mx-auto rounded-2xl object-cover"
                  loading="lazy"
                  decoding="async"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                />
                <motion.h3
                  className="text-2xl font-bold text-gradient"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Pushpa Don
                </motion.h3>
                <motion.p
                  className="text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Mai toh chaitu ki kutiya hu..bhowbhow
                </motion.p>
                <motion.button
                  onClick={() => {
                    setShowEasterEgg(false);
                    if (audio) {
                      audio.pause();
                      audio.currentTime = 0;
                    }
                  }}
                  className="btn-secondary mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  Close
                </motion.button>
              </div>
            </CardSpotlight>
          </motion.div>
        </motion.div>
      )}

      
    </section>
  );
};

export default Contact;


