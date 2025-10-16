import React from 'react';
import { motion } from 'framer-motion';
import LampContainer from '@/components/ui/lamp';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';
import { contactInfo } from '@/data/portfolio';

const Contact: React.FC = () => {
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
    </section>
  );
};

export default Contact;


