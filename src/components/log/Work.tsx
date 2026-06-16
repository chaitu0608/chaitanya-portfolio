import { ExternalLink, Github } from "lucide-react";
import { contactInfo, projects } from "@/data/portfolio";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";
import { LogDossierShell, LogPaneChrome, LogTag } from "./LogDossier";
import { LivePreview } from "./LivePreview";

const FLAGSHIP = [
  "SpendSense",
  "ShieldEye",
  "ZkMultiCloud",
  "TrustWipe",
  "Tutelage",
  "StarQuest",
];

const MAX_TAGS = 6;

function isLive(p: Project) {
  return Boolean(p.liveUrl);
}

function projectSummary(project: Project): string {
  if (project.summary) return project.summary;
  if (project.problem) return project.problem;
  return project.description.split(".")[0] + ".";
}

function projectSlug(title: string): string {
  return title.replace(/\s+/g, "").toLowerCase();
}

export function Work() {
  const flagship = FLAGSHIP.map((title) =>
    projects.find((p) => p.title === title),
  ).filter((p): p is Project => p !== undefined);
  const githubReposUrl = `${contactInfo.githubUrl}?tab=repositories`;

  return (
    <section
      id="work"
      className="log-section border-t border-zinc-900 px-4 py-12 sm:px-6 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader index="03_work" path="./projects" pathOnly />

        <LogDossierShell windowPath="~/projects/">
          <div className="border-b border-zinc-800 bg-zinc-900/20">
            <LogPaneChrome path="~/projects/readme.md" />
            <div className="space-y-2 p-5 sm:p-6 lg:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-emerald-400">
                selected projects
              </p>
              <p className="log-prose">
                Projects I have worked on end-to-end — from idea to something people
                can use.
              </p>
            </div>
          </div>

          <div className="border-b border-zinc-800">
            <LogPaneChrome path="~/projects/flagship/" />
            <div className="flex flex-col gap-4 p-5 sm:p-6 lg:p-8">
              {flagship.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/20">
            <LogPaneChrome path="~/projects/archive.txt" />
            <div className="p-5 sm:p-6 lg:p-8">
              <a
                href={githubReposUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="log-focus inline-flex items-center gap-2.5 font-mono text-base text-emerald-400/90 transition-colors hover:text-emerald-300 sm:text-lg"
              >
                <Github className="h-5 w-5 sm:h-6 sm:w-6" />
                show more projects on github
                <ExternalLink className="h-4 w-4 opacity-70 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
        </LogDossierShell>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const live = isLive(project);
  const slug = projectSlug(project.title);

  return (
    <article className="group overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/20 transition-colors duration-200 hover:border-emerald-500/35 hover:bg-zinc-900/30">
      <div className="flex flex-col gap-2 border-b border-zinc-800/80 bg-zinc-950/40 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-5">
        <p className="min-w-0 truncate font-mono text-[10px] text-zinc-600 sm:text-xs">
          ~/projects/{slug}.md
        </p>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="log-focus inline-flex items-center gap-1.5 rounded border border-emerald-500/45 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-medium text-emerald-400 transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/15 hover:text-emerald-300"
            >
              <ExternalLink className="h-3 w-3" />
              live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="log-focus inline-flex items-center gap-1.5 rounded border border-zinc-700 px-2.5 py-1 font-mono text-xs text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200"
            >
              <Github className="h-3 w-3" />
              repo
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 sm:gap-5 sm:p-5 lg:grid-cols-2 lg:items-start lg:gap-6">
        <div className="flex min-w-0 flex-col">
          <div className="flex items-start gap-2">
            <span
              className={cn(
                "mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full",
                live
                  ? "bg-emerald-500 shadow-[0_0_6px_rgba(74,222,128,0.45)]"
                  : "border border-zinc-500",
              )}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <h3 className="break-words font-mono text-base font-semibold leading-snug text-zinc-100 sm:text-lg">
                  {project.title}
                </h3>
                <span
                  className={cn(
                    "rounded border px-1.5 py-px font-mono text-[10px] uppercase tracking-wider",
                    live
                      ? "border-emerald-500/40 text-emerald-400"
                      : "border-zinc-700 text-zinc-400",
                  )}
                >
                  {live ? "live" : "wip"}
                </span>
              </div>
              <p className="mt-1 font-mono text-xs text-zinc-500 sm:text-sm">
                {project.subtitle}
              </p>
            </div>
          </div>

          <p className="mt-3 font-mono text-sm leading-relaxed text-zinc-400">
            {projectSummary(project)}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.tech.slice(0, MAX_TAGS).map((t) => (
              <LogTag key={t}>{t.toLowerCase()}</LogTag>
            ))}
            {project.tech.length > MAX_TAGS && (
              <span className="font-mono text-xs text-zinc-500">
                +{project.tech.length - MAX_TAGS}
              </span>
            )}
          </div>
        </div>

        <div className="flex min-w-0 items-start lg:justify-end">
          <LivePreview
            liveUrl={project.liveUrl}
            thumbnail={project.thumbnail}
            title={project.title}
            size="large"
            className="w-full lg:max-w-[340px]"
          />
        </div>
      </div>
    </article>
  );
}
