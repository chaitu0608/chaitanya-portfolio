import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";
import { LivePreview } from "./LivePreview";

const FLAGSHIP = [
  "SpendSense",
  "ShieldEye",
  "ZkMultiCloud",
  "TrustWipe",
  "Tutelage",
  "StarQuest",
];

/** 2-column bento: full-width hero rows + paired half tiles */
const BENTO_LAYOUT: Record<
  string,
  { span: string; maxTags: number }
> = {
  SpendSense: { span: "md:col-span-2", maxTags: 5 },
  ShieldEye: { span: "md:col-span-1", maxTags: 3 },
  ZkMultiCloud: { span: "md:col-span-1", maxTags: 3 },
  TrustWipe: { span: "md:col-span-2", maxTags: 5 },
  Tutelage: { span: "md:col-span-1", maxTags: 3 },
  StarQuest: { span: "md:col-span-1", maxTags: 3 },
};

const DEFAULT_BENTO = { span: "md:col-span-1", maxTags: 3 };

function isLive(p: Project) {
  return Boolean(p.liveUrl);
}

function projectSummary(project: Project): string {
  if (project.summary) return project.summary;
  if (project.problem) return project.problem;
  return project.description.split(".")[0] + ".";
}

export function Work() {
  const flagship = FLAGSHIP.map((title) =>
    projects.find((p) => p.title === title),
  ).filter((p): p is Project => p !== undefined);
  const older = projects.filter((p) => !FLAGSHIP.includes(p.title));
  const [showOlder, setShowOlder] = useState(false);

  return (
    <section
      id="work"
      className="log-section border-t border-zinc-900 px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          index="02_work"
          path="./selected_projects"
          title="selected work"
        />
        <div className="-mt-6 mb-8 space-y-2 md:mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-400">
            SELECTED PROJECTS.
          </p>
          <p className="max-w-2xl font-mono text-sm text-zinc-400">
            Projects I have worked on end-to-end.
          </p>
          <p className="font-mono text-xs text-zinc-500">
            {flagship.length} flagship · {older.length} archived
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:items-stretch">
          {flagship.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => setShowOlder((s) => !s)}
            className="log-focus flex items-center gap-2 rounded font-mono text-sm text-zinc-400 transition-colors hover:text-emerald-400"
          >
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                showOlder && "rotate-90",
              )}
            />
            {showOlder ? "hide" : "show"} {older.length} older project
            {older.length === 1 ? "" : "s"}
          </button>

          <AnimatePresence initial={false}>
            {showOlder && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-2 border border-zinc-800 bg-zinc-950/40 p-4">
                  {older.map((p) => (
                    <div
                      key={p.title}
                      className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-dashed border-zinc-900 pb-2 font-mono text-sm last:border-b-0 last:pb-0"
                    >
                      <span className="text-zinc-100">{p.title}</span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-zinc-500">{p.type}</span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-xs text-zinc-500">
                        {p.tech.slice(0, 3).join(" · ")}
                      </span>
                      <span className="ml-auto flex gap-3">
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-zinc-400 hover:text-emerald-400"
                          >
                            repo ↗
                          </a>
                        )}
                        {p.liveUrl && (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-zinc-400 hover:text-emerald-400"
                          >
                            live ↗
                          </a>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const live = isLive(project);
  const bento = BENTO_LAYOUT[project.title] ?? DEFAULT_BENTO;
  const fullWidth = bento.span.includes("col-span-2");

  return (
    <article
      className={cn(
        "group flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-zinc-800 bg-gradient-to-b from-zinc-950/70 to-zinc-950/30 transition-all duration-200 hover:border-emerald-500/35",
        bento.span,
      )}
    >
      <div className="flex h-full flex-col p-3 sm:p-4">
        <div className="flex items-start gap-2">
          <span
            className={cn(
              "mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full",
              live
                ? "bg-emerald-500 shadow-[0_0_6px_rgba(74,222,128,0.45)]"
                : "border border-zinc-500",
            )}
            aria-hidden
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <h3 className="break-words font-mono text-sm font-semibold leading-snug text-zinc-100">
                {project.title}
              </h3>
              <span
                className={cn(
                  "rounded border px-1.5 py-px font-mono text-[9px] uppercase tracking-wider",
                  live
                    ? "border-emerald-500/40 text-emerald-400"
                    : "border-zinc-700 text-zinc-400",
                )}
              >
                {live ? "live" : "wip"}
              </span>
            </div>
            <p className="mt-0.5 font-mono text-[11px] text-zinc-500">
              {project.subtitle}
            </p>
          </div>
        </div>

        <LivePreview
          liveUrl={project.liveUrl}
          thumbnail={project.thumbnail}
          title={project.title}
          size={fullWidth ? "medium" : "compact"}
          className="mt-2.5 w-full"
        />

        <p
          className={cn(
            "mt-2.5 font-mono text-[11px] leading-snug text-zinc-400",
            fullWidth ? "line-clamp-2" : "line-clamp-3",
          )}
        >
          {projectSummary(project)}
        </p>

        <div className="mt-2 flex flex-wrap gap-1 font-mono text-[10px]">
          {project.tech.slice(0, bento.maxTags).map((t) => (
            <span key={t} className="log-chip">
              {t.toLowerCase()}
            </span>
          ))}
          {project.tech.length > bento.maxTags && (
            <span className="text-zinc-500">
              +{project.tech.length - bento.maxTags}
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="log-focus inline-flex items-center gap-1 rounded border border-zinc-700 px-2.5 py-1 font-mono text-xs text-zinc-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-400"
            >
              <ExternalLink className="h-3 w-3" /> live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="log-focus inline-flex items-center gap-1 rounded border border-zinc-700 px-2.5 py-1 font-mono text-xs text-zinc-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-400"
            >
              <Github className="h-3 w-3" /> repo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
