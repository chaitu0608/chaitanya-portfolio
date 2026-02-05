import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, FileText, Music } from "lucide-react";
import { contactInfo } from "@/data/portfolio";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, { once: true, margin: "-40px" });
  const rightInView = useInView(rightRef, { once: true, margin: "-40px" });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 px-4 relative overflow-hidden continuous-bg section-transition scroll-smooth"
    >
      {/* Same background as "The things I have built" */}
      <div className="absolute inset-0 bokeh-bg opacity-30" />
      <div className="floating-particles">
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-accent opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-gold opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header – same design as Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Let&apos;s <span className="text-gradient">connect</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have an opportunity, idea, or question? I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Bento layout – left: contact list card, right: social + music */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Left: one card with email, phone, location */}
          <motion.div
            ref={leftRef}
            className="lg:col-span-5 space-y-4"
            initial={{ opacity: 0, x: -24 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <div className="rounded-2xl glass-enhanced border border-accent/20 shadow-2xl hover:shadow-accent/25 transition-all duration-300 p-6">
              <div className="space-y-5">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-4 group"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
                    <p className="font-medium text-foreground truncate group-hover:text-accent transition-colors">
                      {contactInfo.email}
                    </p>
                  </div>
                </a>
                <div className="h-px bg-border/60" />
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-4 group"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Phone</p>
                    <p className="font-medium text-foreground group-hover:text-emerald-400 transition-colors">
                      {contactInfo.phone}
                    </p>
                  </div>
                </a>
                <div className="h-px bg-border/60" />
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Location</p>
                    <p className="font-medium text-foreground">{contactInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: social cards + music */}
          <motion.div
            ref={rightRef}
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: 24 }}
            animate={rightInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <a
                href={contactInfo.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl glass-enhanced border border-accent/20 shadow-2xl hover:shadow-accent/25 p-5 flex flex-col items-center gap-3 text-center group transition-all duration-300"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                  <Github className="h-6 w-6" />
                </span>
                <span className="font-semibold text-foreground">GitHub</span>
                <span className="text-xs text-muted-foreground">Projects & code</span>
              </a>
              <a
                href={contactInfo.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl glass-enhanced border border-accent/20 shadow-2xl hover:shadow-accent/25 p-5 flex flex-col items-center gap-3 text-center group transition-all duration-300"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </span>
                <span className="font-semibold text-foreground">LinkedIn</span>
                <span className="text-xs text-muted-foreground">Connect</span>
              </a>
              <a
                href={contactInfo.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="col-span-2 rounded-2xl glass-enhanced border border-accent/20 shadow-2xl hover:shadow-accent/25 p-4 flex items-center justify-center gap-3 group transition-all duration-300"
              >
                <FileText className="h-5 w-5 text-accent" />
                <span className="font-semibold text-foreground">Resume / CV</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* My vibe – centered, full-width row, no space below left */}
        <motion.div
          className="flex justify-center w-full mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          viewport={{ once: true }}
        >
          <div className="w-full max-w-xl rounded-2xl glass-enhanced border border-accent/20 shadow-2xl hover:shadow-accent/25 overflow-hidden transition-all duration-300">
            <div className="p-3 border-b border-accent/10 flex items-center justify-center gap-2">
              <Music className="h-5 w-5 text-accent shrink-0" />
              <p className="font-semibold text-foreground text-sm">My vibe</p>
              <p className="text-xs text-muted-foreground hidden sm:inline">— What I&apos;m listening to</p>
            </div>
            <div className="w-full aspect-[4/3] max-h-[380px] bg-muted/20 overflow-hidden">
              <iframe
                title="Apple Music Playlist"
                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-pointer-lock"
                className="w-full h-full min-h-[280px] border-0"
                src="https://embed.music.apple.com/in/playlist/chaitu101/pl.u-AkAm81pUx87R2zE?theme=dark"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
