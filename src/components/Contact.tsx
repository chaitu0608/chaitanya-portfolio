import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  FileText,
  Music,
  Send,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactInfo } from "@/data/portfolio";
import { getResumeHref } from "@/lib/resume";
import SectionMarquee from "@/components/scroll/SectionMarquee";
import BigTypeReveal from "@/components/scroll/BigTypeReveal";
import { SectionHeader } from "@/components/ui/section-header";
import { useTheme } from "@/hooks/use-theme";

const APPLE_MUSIC_PLAYLIST =
  "https://embed.music.apple.com/in/playlist/chaitu101/pl.u-AkAm81pUx87R2zE";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const tileVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

interface ContactProps {
  onContactClick?: () => void;
}

const Contact: React.FC<ContactProps> = ({ onContactClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { resolved } = useTheme();
  const [copied, setCopied] = useState(false);
  const resumeHref = getResumeHref();
  const musicEmbedSrc = `${APPLE_MUSIC_PLAYLIST}?theme=${resolved === "dark" ? "dark" : "light"}`;

  const [reducedMotion, setReducedMotion] = useState(false);
  const musicSectionRef = useRef<HTMLDivElement>(null);
  const [musicInView, setMusicInView] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = musicSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMusicInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${contactInfo.email}`;
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden px-4 py-20 section-transition"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Contact"
          title={
            <>
              Let&apos;s <span className="text-gradient">connect</span>
            </>
          }
          description="Open to internships, full-time roles, and collaborations. I usually reply within 24 hours."
          className="mb-8"
        />

        <SectionMarquee text="CONNECT · REACH OUT · BUILD TOGETHER · " className="mb-8" />

        <BigTypeReveal className="mb-10 md:mb-12">
          READY WHEN <span className="text-gradient">YOU ARE.</span>
        </BigTypeReveal>

        <motion.div
          className="contact-bento-grid max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Contact channels */}
          <motion.div
            variants={tileVariants}
            className="contact-tile contact-tile-channels rounded-2xl border border-glass-border glass-panel p-6 shadow-card md:p-7"
          >
            <p className="font-mono text-xs text-accent/70 mb-4">01 — Direct</p>
            <div className="space-y-5">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-4 group"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors shrink-0">
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
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors shrink-0">
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
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                  <MapPin className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Location</p>
                  <p className="font-medium text-foreground">{contactInfo.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Apple Music */}
          <motion.div
            ref={musicSectionRef}
            variants={tileVariants}
            className="contact-tile contact-tile-music flex min-h-[320px] flex-col overflow-hidden rounded-2xl border border-glass-border glass-panel shadow-card lg:min-h-[380px]"
          >
            <div className="p-3 border-b border-accent/10 flex items-center gap-2 shrink-0">
              <Music className="h-5 w-5 text-accent shrink-0" />
              <p className="font-semibold text-foreground text-sm">My vibe</p>
              <p className="text-xs text-muted-foreground hidden sm:inline">
                — What I&apos;m listening to
              </p>
              <span className="ml-auto font-mono text-[10px] text-accent/60">02</span>
            </div>
            <div className="flex-1 min-h-[280px] bg-muted/20">
              {musicInView ? (
                <iframe
                  title="Apple Music Playlist"
                  allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-pointer-lock"
                  className="w-full h-full min-h-[280px] border-0"
                  src={musicEmbedSrc}
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full min-h-[280px] items-center justify-center text-sm text-muted-foreground">
                  Scroll to load playlist…
                </div>
              )}
            </div>
          </motion.div>

          {/* Social strip */}
          <motion.div
            variants={tileVariants}
            className="contact-tile contact-tile-social grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <a
              href={contactInfo.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-2 rounded-2xl border border-glass-border glass-panel p-5 text-center shadow-card transition-all hover:border-accent/40 hover:shadow-card-hover"
            >
              <Github className="h-7 w-7 text-muted-foreground group-hover:text-accent transition-colors" />
              <span className="font-semibold text-foreground">GitHub</span>
              <span className="text-xs text-muted-foreground">Projects & code</span>
            </a>
            <a
              href={contactInfo.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-2 rounded-2xl border border-glass-border glass-panel p-5 text-center shadow-card transition-all hover:border-accent/40 hover:shadow-card-hover"
            >
              <Linkedin className="h-7 w-7 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <span className="font-semibold text-foreground">LinkedIn</span>
              <span className="text-xs text-muted-foreground">Connect</span>
            </a>
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 rounded-2xl border border-glass-border glass-panel p-5 text-center shadow-card transition-all hover:border-accent/40 hover:shadow-card-hover"
            >
              <FileText className="h-7 w-7 text-accent" />
              <span className="font-semibold text-foreground">Resume</span>
              <span className="text-xs text-muted-foreground">PDF download</span>
            </a>
          </motion.div>

          {/* CTA row */}
          <motion.div
            variants={tileVariants}
            className="contact-tile contact-tile-cta flex flex-col items-stretch gap-4 rounded-2xl border border-glass-border glass-panel p-6 shadow-card sm:flex-row sm:items-center"
          >
            <Button
              size="lg"
              className="flex-1 gap-2 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
              onClick={onContactClick}
            >
              <Send className="h-4 w-4" />
              Send a message
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 gap-2 border-accent/30 hover:bg-accent/10"
              asChild
            >
              <a href={`mailto:${contactInfo.email}`}>
                <Mail className="h-4 w-4" />
                Email me
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="gap-2 shrink-0"
              onClick={handleCopyEmail}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-accent" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy email
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
