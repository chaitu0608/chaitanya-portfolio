import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download, Github } from "lucide-react";
import { contactInfo, personalInfo } from "@/data/portfolio";
import { getResumePath, RESUME_DOWNLOAD_NAME } from "@/lib/resume";
import { AboutNameReveal } from "./AboutNameReveal";
import { AboutMetaStrip } from "./AboutMetaStrip";
import { AboutTypewriter } from "./AboutTypewriter";
import { PhotoAlbumPolaroid } from "./PhotoAlbumPolaroid";
import { AboutSocialLinks } from "./AboutSocialLinks";
import { SectionHeader } from "./SectionHeader";
import { LogDossierWindowChrome, LogPaneChrome } from "./LogDossier";
import { useAboutSequence } from "@/hooks/useAboutSequence";
import { cn } from "@/lib/utils";

export function About() {
  const reduced = useReducedMotion();
  const [typingDone, setTypingDone] = useState(false);

  const {
    ref: dossierRef,
    metaVisible,
    contentEnabled,
    typewriterEnabled,
    onNameComplete,
  } = useAboutSequence();

  return (
    <section
      id="about"
      className="log-section relative flex min-h-[calc(100svh-5rem)] flex-col px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader index="01_about" path="./who_i_am" pathOnly />

        <motion.div
          ref={dossierRef}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="log-dossier overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/60 sm:overflow-visible"
        >
          <LogDossierWindowChrome path="~/who_i_am.md" />

          <div className="about-dossier-identity border-b border-zinc-800 px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
              <div className="min-w-0 space-y-4">
                <AboutNameReveal onComplete={onNameComplete} />
                <AboutMetaStrip visible={metaVisible} />
                <p className="max-w-xl font-mono text-sm text-zinc-400">
                  {personalInfo.tagline}
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:pt-1">
                <a
                  href={getResumePath()}
                  download={RESUME_DOWNLOAD_NAME}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="log-focus inline-flex w-full items-center justify-center gap-2 rounded border border-emerald-500/40 bg-emerald-500/5 px-4 py-2 font-mono text-sm text-emerald-400 transition-colors hover:bg-emerald-500/10 hover:text-emerald-300 sm:w-auto"
                >
                  <Download className="h-4 w-4" />
                  [ download resume ]
                </a>
                <a
                  href={contactInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="log-focus inline-flex w-full items-center justify-center gap-2 rounded border border-zinc-700 px-4 py-2 font-mono text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100 sm:w-auto"
                >
                  <Github className="h-4 w-4" />
                  [ view github ]
                </a>
              </div>
            </div>
          </div>

          <div className="hidden border-b border-zinc-800 bg-zinc-900/40 lg:grid lg:grid-cols-2">
            <LogPaneChrome
              path="~/about.txt"
              status={typingDone ? "done" : "typing"}
              className="border-b-0 border-r border-zinc-800"
            />
            <LogPaneChrome path="~/photos/" className="border-b-0" />
          </div>

          <div className="grid overflow-hidden sm:overflow-visible lg:grid-cols-2 lg:items-stretch">
            <div className="flex min-h-0 flex-col border-b border-zinc-800 lg:border-b-0 lg:border-r lg:border-zinc-800">
              <LogPaneChrome
                path="~/about.txt"
                status={typingDone ? "done" : "typing"}
                className="lg:hidden"
              />
              <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-6">
                <AboutTypewriter
                  variant="embedded"
                  enabled={typewriterEnabled}
                  onDoneChange={setTypingDone}
                  className="h-full"
                />
              </div>
            </div>

            <div className="relative z-30 flex min-h-0 flex-col overflow-hidden bg-zinc-900/20 sm:overflow-visible">
              <LogPaneChrome path="~/photos/" className="lg:hidden" />
              <div className="flex flex-1 flex-col items-center justify-center gap-4 overflow-hidden px-4 py-8 sm:gap-5 sm:overflow-visible sm:px-8 sm:py-10 sm:pt-16 lg:gap-6 lg:px-10 lg:pb-10 lg:pt-24">
                <PhotoAlbumPolaroid
                  variant="embedded"
                  loadEnabled={contentEnabled}
                />
                <AboutSocialLinks />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
