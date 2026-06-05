import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download, Github, ChevronDown } from "lucide-react";
import { contactInfo, personalInfo, aboutMeta } from "@/data/portfolio";
import { AboutNameReveal } from "./AboutNameReveal";
import { AboutMetaStrip } from "./AboutMetaStrip";
import { AboutTypewriter } from "./AboutTypewriter";
import { PhotoAlbumPolaroid } from "./PhotoAlbumPolaroid";
import { AboutSocialLinks } from "./AboutSocialLinks";
import { SectionHeader } from "./SectionHeader";
import { useAboutSequence } from "@/hooks/useAboutSequence";
import { cn } from "@/lib/utils";

function PaneChrome({
  path,
  status,
  className,
}: {
  path: string;
  status?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-zinc-800 bg-zinc-900/40 px-4 py-2.5 sm:px-5",
        className,
      )}
    >
      <span className="font-mono text-xs text-zinc-500 sm:text-sm">{path}</span>
      {status ? (
        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">
          {status}
        </span>
      ) : null}
    </div>
  );
}

function DossierWindowChrome() {
  return (
    <div className="flex items-center gap-3 border-b border-zinc-800 bg-zinc-900/50 px-4 py-2.5 sm:px-5">
      <div className="flex items-center gap-1.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/75" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/75" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/75" />
      </div>
      <span className="font-mono text-xs text-zinc-500 sm:text-sm">
        ~/who_i_am.md
      </span>
    </div>
  );
}

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
      className="log-section relative flex min-h-[calc(100svh-4rem)] flex-col px-4 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader index="01_about" path="./who_i_am" pathOnly />

        <motion.div
          ref={dossierRef}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="about-dossier overflow-visible rounded-lg border border-zinc-800 bg-zinc-950/60"
        >
          <DossierWindowChrome />

          <div className="about-dossier-identity border-b border-zinc-800 px-5 py-6 sm:px-6 sm:py-8 lg:px-8">
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
                  href={contactInfo.resumeUrl ?? "/ChaitanyaResume.pdf"}
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
            <PaneChrome
              path="~/about.txt"
              status={typingDone ? "done" : "typing"}
              className="border-b-0 border-r border-zinc-800"
            />
            <PaneChrome path="~/photos/" className="border-b-0" />
          </div>

          <div className="grid overflow-visible lg:grid-cols-2 lg:items-stretch">
            <div className="flex min-h-0 flex-col border-b border-zinc-800 lg:border-b-0 lg:border-r lg:border-zinc-800">
              <PaneChrome
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

            <div className="relative z-30 flex min-h-0 flex-col overflow-visible bg-zinc-900/20">
              <PaneChrome path="~/photos/" className="lg:hidden" />
              <div className="flex flex-1 flex-col items-center justify-center gap-5 overflow-visible px-8 pb-8 pl-8 pr-12 pt-16 sm:pl-10 sm:pr-14 sm:pt-20 lg:gap-6 lg:px-10 lg:pb-10 lg:pr-16 lg:pt-24">
                <PhotoAlbumPolaroid
                  variant="embedded"
                  loadEnabled={contentEnabled}
                />
                <AboutSocialLinks />
              </div>
            </div>
          </div>

          <div className="about-dossier-footer flex flex-col gap-2 border-t border-zinc-800 bg-zinc-900/30 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p className="font-mono text-[10px] text-zinc-600 sm:text-xs">
              {aboutMeta.location.toLowerCase()} · {aboutMeta.school.toLowerCase()} ·{" "}
              {aboutMeta.status}
            </p>
            <p className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 sm:text-xs">
              <ChevronDown className="h-3 w-3 shrink-0" />
              scroll or press{" "}
              <kbd className="rounded border border-zinc-700 px-1.5 py-0.5 text-[10px] text-zinc-300">
                j
              </kbd>
              <span className="text-zinc-600">·</span>
              <kbd className="hidden rounded border border-zinc-700 px-1.5 py-0.5 text-[10px] text-zinc-300 sm:inline">
                g+w
              </kbd>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
