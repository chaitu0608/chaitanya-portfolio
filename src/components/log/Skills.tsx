import { useReducedMotion } from "framer-motion";
import { useCoarsePointer } from "@/hooks/use-coarse-pointer";
import { skillCategories } from "@/data/skills";
import { SkillIcon } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";
import { LogDossierShell } from "./LogDossier";
import { SectionHeader } from "./SectionHeader";

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
