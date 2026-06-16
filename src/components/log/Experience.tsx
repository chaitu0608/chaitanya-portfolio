import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { education, experiences } from "@/data/portfolio";
import type { Experience as ExperienceEntry } from "@/types";
import { SectionHeader } from "./SectionHeader";
import {
  LogDossierShell,
  LogPaneChrome,
  LogTag,
} from "./LogDossier";

function experiencePanePath(company: string): string {
  if (company.includes("Jio")) return "~/experience/jio.md";
  if (company.includes("CodeCell")) return "~/experience/codecell.md";
  if (company.includes("Fresh")) return "~/experience/fresh@home.md";
  return "~/experience/role.md";
}

function companyInitials(company: string): string {
  return company
    .replace(/[@.]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function CompanyLogo({ logo, company }: { logo: string; company: string }) {
  if (!logo) {
    return (
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900/80 font-mono text-xs font-medium text-zinc-400 sm:h-12 sm:w-12"
        aria-hidden
      >
        {companyInitials(company)}
      </span>
    );
  }

  const isEmoji = !logo.startsWith("http");

  if (isEmoji) {
    return (
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900/80 text-xl sm:h-12 sm:w-12"
        aria-hidden
      >
        {logo}
      </span>
    );
  }

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md border border-zinc-800 bg-white p-1.5 sm:h-12 sm:w-12">
      <img
        src={logo}
        alt={`${company} logo`}
        className="h-full w-full object-contain"
        loading="lazy"
      />
    </div>
  );
}

function ExperienceCard({
  exp,
  index,
}: {
  exp: ExperienceEntry;
  index: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="flex min-h-0 flex-col"
    >
      <LogPaneChrome path={experiencePanePath(exp.company)} />

      <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
          <CompanyLogo logo={exp.logo} company={exp.company} />

          <div className="min-w-0 flex-1 space-y-2">
            <h3 className="font-mono text-base font-semibold text-zinc-100 sm:text-lg">
              {exp.title}
            </h3>
            {exp.website ? (
              <a
                href={exp.website}
                target="_blank"
                rel="noopener noreferrer"
                className="log-focus inline-flex items-center gap-1 font-mono text-sm text-emerald-400/90 transition-colors hover:text-emerald-300"
              >
                {exp.company}
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <p className="font-mono text-sm text-emerald-400/90">{exp.company}</p>
            )}
            <p className="log-prose-meta">
              {exp.period.toLowerCase()} · {exp.location.toLowerCase()}
            </p>
          </div>
        </div>

        {exp.description ? <p className="log-prose">{exp.description}</p> : null}

        <ul className="max-w-3xl space-y-2.5">
          {exp.achievements.map((item) => (
            <li
              key={item}
              className="flex gap-3 font-mono text-sm leading-relaxed text-zinc-300"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/80" />
              <span className="min-w-0 break-words">{item}</span>
            </li>
          ))}
        </ul>

        {exp.tech && exp.tech.length > 0 ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {exp.tech.map((tag) => (
              <LogTag key={tag}>{tag.toLowerCase()}</LogTag>
            ))}
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      className="log-section border-t border-zinc-900 px-4 py-12 sm:px-6 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader index="02_experience" path="./experience" pathOnly />

        <LogDossierShell windowPath="~/experience/">
          <div className="divide-y divide-zinc-800">
            {experiences.map((exp, i) => (
              <ExperienceCard key={`${exp.company}-${exp.period}`} exp={exp} index={i} />
            ))}
          </div>

          <div className="border-t border-zinc-800 bg-zinc-900/20">
            <LogPaneChrome path="~/education.txt" />
            <div className="space-y-4 p-5 sm:p-6 lg:p-8">
              {education.map((entry) => (
                <div key={entry.degree} className="max-w-3xl space-y-1.5">
                  <p className="font-mono text-base font-semibold text-zinc-100 sm:text-lg">
                    {entry.degree}
                  </p>
                  <p className="font-mono text-sm text-zinc-400">
                    {entry.institution} · {entry.location.toLowerCase()}
                  </p>
                  <p className="log-prose-meta">
                    {entry.period.toLowerCase()} · {entry.gpa.toLowerCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </LogDossierShell>
      </div>
    </section>
  );
}
