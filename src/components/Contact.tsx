import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LampContainer from '@/components/ui/lamp';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';
import { contactInfo } from '@/data/portfolio';

const Contact: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showPaajiEgg, setShowPaajiEgg] = useState(false);
  const [showEthGlobalEgg, setShowEthGlobalEgg] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [paajiAudio, setPaajiAudio] = useState<HTMLAudioElement | null>(null);
  const [paajiVideo, setPaajiVideo] = useState<HTMLVideoElement | null>(null);
  const [ethGlobalVideo, setEthGlobalVideo] = useState<HTMLVideoElement | null>(null);

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
        if (newText.includes('paaji')) {
          setShowPaajiEgg(true);
          if (paajiAudio && paajiVideo) {
            paajiAudio.currentTime = 0;
            paajiVideo.currentTime = 0;
            paajiAudio.play().catch(console.error);
            paajiVideo.play().catch(console.error);
          }
          return '';
        }
        if (newText.includes('ethglobal')) {
          setShowEthGlobalEgg(true);
          if (ethGlobalVideo) {
            ethGlobalVideo.currentTime = 0;
            ethGlobalVideo.play().catch(console.error);
          }
          return '';
        }
        return newText.slice(-10); // Keep only last 10 characters
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [audio, paajiAudio, paajiVideo, ethGlobalVideo]);

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

  useEffect(() => {
    const paajiAudioElement = new Audio('/amandeep.m4a');
    const paajiVideoElement = document.createElement('video');
    paajiVideoElement.src = '/amandeep.MOV';
    paajiVideoElement.preload = 'auto';
    paajiVideoElement.muted = true; // Mute video since we're playing audio separately
    
    paajiAudioElement.addEventListener('ended', () => {
      setShowPaajiEgg(false);
      paajiVideoElement.pause();
      paajiVideoElement.currentTime = 0;
    });

    setPaajiAudio(paajiAudioElement);
    setPaajiVideo(paajiVideoElement);
    
    return () => {
      if (paajiAudioElement) {
        paajiAudioElement.pause();
        paajiAudioElement.currentTime = 0;
      }
      if (paajiVideoElement) {
        paajiVideoElement.pause();
        paajiVideoElement.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    const ethGlobalVideoElement = document.createElement('video');
    ethGlobalVideoElement.src = '/ethglobal.MOV';
    ethGlobalVideoElement.preload = 'auto';
    
    ethGlobalVideoElement.addEventListener('ended', () => {
      setShowEthGlobalEgg(false);
    });

    setEthGlobalVideo(ethGlobalVideoElement);
    
    return () => {
      if (ethGlobalVideoElement) {
        ethGlobalVideoElement.pause();
        ethGlobalVideoElement.currentTime = 0;
      }
    };
  }, []);

  return (
    <section id="contact" className="py-20 px-4 relative overflow-hidden continuous-bg section-transition">
      {/* Background */}
      <motion.div className="absolute inset-0 bokeh-bg" style={{ opacity: 0.2 }} />

      <div className="max-w-7xl mx-auto relative z-10">
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
          {/* Quick contact cards */}
          <div className="space-y-6">
            <CardSpotlight className="p-5">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent mt-1" />
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <a href={`mailto:${contactInfo.email}`} className="text-foreground hover:text-accent smooth-transition">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </CardSpotlight>

            <CardSpotlight className="p-5">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent mt-1" />
                <div>
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <a href={`tel:${contactInfo.phone}`} className="text-foreground hover:text-accent smooth-transition">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
            </CardSpotlight>

            <div className="grid grid-cols-2 gap-6">
              <CardSpotlight className="p-4 cursor-pointer" >
                <a href={contactInfo.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Github className="w-5 h-5 text-accent" />
                  <span>GitHub</span>
                </a>
              </CardSpotlight>
              <CardSpotlight className="p-4 cursor-pointer" >
                <a href={contactInfo.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Linkedin className="w-5 h-5 text-accent" />
                  <span>LinkedIn</span>
                </a>
              </CardSpotlight>
            </div>
          </div>
          {/* Apple Music Playlist Embed */}
          <CardSpotlight className="p-3">
            <div className="w-full h-full rounded-xl overflow-hidden glass-enhanced border border-accent/20">
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
                  src="/pushpak.png"
                  alt="Pushpak"
                  className="w-48 h-48 mx-auto rounded-2xl object-cover"
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

      {/* Paaji Easter Egg */}
      {showPaajiEgg && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            className="relative max-w-lg w-full mx-4"
            initial={{ rotate: -2 }}
            animate={{ rotate: 2 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          >
            <CardSpotlight className="p-4">
              <div className="relative">
                <video
                  ref={(el) => {
                    if (el && paajiVideo) {
                      el.src = paajiVideo.src;
                      el.currentTime = paajiVideo.currentTime;
                      if (!paajiVideo.paused) {
                        el.play().catch(console.error);
                      }
                    }
                  }}
                  className="w-full h-auto rounded-xl"
                  muted
                  loop={false}
                />
                <motion.div
                  className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-white font-bold text-lg">Paaji! 🎬</h3>
                </motion.div>
                <motion.div
                  className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-white text-sm">jatt da muqabla</p>
                </motion.div>
                <motion.button
                  onClick={() => {
                    setShowPaajiEgg(false);
                    if (paajiAudio) {
                      paajiAudio.pause();
                      paajiAudio.currentTime = 0;
                    }
                    if (paajiVideo) {
                      paajiVideo.pause();
                      paajiVideo.currentTime = 0;
                    }
                  }}
                  className="absolute top-4 right-4 bg-red-500/80 hover:bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-sm transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
              </div>
            </CardSpotlight>
          </motion.div>
        </motion.div>
      )}

      {/* ETHGlobal Easter Egg */}
      {showEthGlobalEgg && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            className="relative max-w-lg w-full mx-4"
            initial={{ rotate: -2 }}
            animate={{ rotate: 2 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          >
            <CardSpotlight className="p-4">
              <div className="relative">
                <video
                  ref={(el) => {
                    if (el && ethGlobalVideo) {
                      el.src = ethGlobalVideo.src;
                      el.currentTime = ethGlobalVideo.currentTime;
                      if (!ethGlobalVideo.paused) {
                        el.play().catch(console.error);
                      }
                    }
                  }}
                  className="w-full h-auto rounded-xl"
                  loop={false}
                />
                <motion.div
                  className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-white font-bold text-lg">ETHGlobal! 🚀</h3>
                </motion.div>
                <motion.div
                  className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-white text-sm">Type "ethglobal" to trigger this easter egg</p>
                </motion.div>
                <motion.button
                  onClick={() => {
                    setShowEthGlobalEgg(false);
                    if (ethGlobalVideo) {
                      ethGlobalVideo.pause();
                      ethGlobalVideo.currentTime = 0;
                    }
                  }}
                  className="absolute top-4 right-4 bg-red-500/80 hover:bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-sm transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
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


