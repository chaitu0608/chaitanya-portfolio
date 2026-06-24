import { useReducedMotion } from "framer-motion";
import { useCoarsePointer } from "@/hooks/use-coarse-pointer";
import { projects, githubOgPreview } from "@/data/portfolio";
import { skillCategories } from "@/data/skills";
import type { Project } from "@/types";
import { SkillIcon } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";
import { LogDossierShell } from "./LogDossier";
import { SectionHeader } from "./SectionHeader";

function projectHref(project: Project): string | undefined {
  return project.liveUrl ?? project.githubUrl;
}

function projectLogo(project: Project): string | undefined {
  if (project.thumbnail) return project.thumbnail;
  const href = project.githubUrl;
  if (!href) return undefined;
  const match = href.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return undefined;
  return githubOgPreview(match[1], match[2]);
}

function projectInitials(title: string): string {
  return title
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function SkillPill({ name }: { name: string }) {
  return (
    <span className="skill-pill inline-flex shrink-0 items-center gap-1.5 rounded-md border border-zinc-800/70 bg-zinc-900/40 px-2.5 py-1">
      <SkillIcon skillName={name} className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" />
      <span className="whitespace-nowrap font-mono text-xs leading-none text-zinc-400 sm:text-sm">
        {name}
      </span>
    </span>
  );
}

function ProjectSkillPill({ project }: { project: Project }) {
  const href = projectHref(project);
  const logo = projectLogo(project);
  const label = project.title;

  const content = (
    <>
      {logo ? (
        <span className="relative h-[18px] w-[18px] shrink-0 overflow-hidden rounded-[5px] border border-zinc-700/80 bg-zinc-900 sm:h-5 sm:w-5">
          <img
            src={logo}
            alt=""
            className="block h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </span>
      ) : (
        <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border border-zinc-700/80 bg-zinc-800 font-mono text-[9px] font-medium text-zinc-300 sm:h-5 sm:w-5 sm:text-[10px]">
          {projectInitials(label)}
        </span>
      )}
      <span className="whitespace-nowrap font-mono text-xs leading-none text-zinc-300 sm:text-sm">
        {label}
      </span>
    </>
  );

  const className =
    "skill-pill inline-flex shrink-0 items-center gap-2 rounded-md border border-zinc-800/70 bg-zinc-900/40 px-2.5 py-1.5 transition-colors hover:border-emerald-500/30 hover:bg-zinc-900/70";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(className, "log-focus")}
        aria-label={`Open ${label}`}
      >
        {content}
      </a>
    );
  }

  return <span className={className}>{content}</span>;
}

function SkillsMarquee({
  skills,
  reverse = false,
}: {
  skills: string[];
  reverse?: boolean;
}) {
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const track = [...skills, ...skills];

  if (reduced || coarse) {
    return (
      <div className="flex flex-wrap gap-2 px-1 py-1">
        {skills.map((skill) => (
          <SkillPill key={skill} name={skill} />
        ))}
      </div>
    );
  }

  return (
    <div className="skills-marquee-row group relative overflow-hidden py-1">
      <div
        className={cn(
          "flex w-max gap-2.5 px-1 sm:gap-3",
          reverse ? "skills-marquee-reverse" : "skills-marquee",
        )}
      >
        {track.map((skill, i) => (
          <SkillPill key={`${skill}-${i}`} name={skill} />
        ))}
      </div>
    </div>
  );
}

function ProjectsMarquee({
  items,
  reverse = false,
}: {
  items: Project[];
  reverse?: boolean;
}) {
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const track = [...items, ...items];

  if (reduced || coarse) {
    return (
      <div className="flex flex-wrap gap-2 px-1 py-1">
        {items.map((project) => (
          <ProjectSkillPill key={project.title} project={project} />
        ))}
      </div>
    );
  }

  return (
    <div className="skills-marquee-row group relative overflow-hidden py-1">
      <div
        className={cn(
          "flex w-max gap-2.5 px-1 sm:gap-3",
          reverse ? "skills-marquee-reverse" : "skills-marquee",
        )}
      >
        {track.map((project, i) => (
          <ProjectSkillPill key={`${project.title}-${i}`} project={project} />
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className="log-section border-t border-zinc-900 px-4 py-12 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="04_skills"
          path="./skills/"
          title="skills"
          size="large"
        />

        <LogDossierShell windowPath="~/skills/manifest.json" className="mt-10">
          <div className="space-y-5 p-5 sm:space-y-6 sm:p-6 lg:p-8">
            <p className="font-mono text-xs text-emerald-500/80 sm:text-sm">
              $ ls -la ./modules/
            </p>

            <div>
              <div className="mb-1.5 flex items-baseline gap-2.5 px-1">
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 sm:text-sm">
                  shipped projects
                </span>
                <span className="font-mono text-[10px] text-zinc-600 sm:text-xs">
                  MOD_00
                </span>
              </div>
              <ProjectsMarquee items={projects} />
            </div>

            {skillCategories.map((cat, i) => (
              <div key={cat.id}>
                <div className="mb-1.5 flex items-baseline gap-2.5 px-1">
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 sm:text-sm">
                    {cat.label}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-600 sm:text-xs">
                    {cat.mod}
                  </span>
                </div>
                <SkillsMarquee skills={cat.skills} reverse={i % 2 === 1} />
              </div>
            ))}
          </div>
        </LogDossierShell>
      </div>
    </section>
  );
}
