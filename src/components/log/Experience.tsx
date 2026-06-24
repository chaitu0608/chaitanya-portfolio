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
  if (company.includes("RxGPT")) return "~/experience/rxgpt.md";
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

const LOGO_FRAME =
  "relative shrink-0 overflow-hidden rounded-xl border border-zinc-700/80 bg-zinc-900 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]";

const LOGO_SIZE = "h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28";

function CompanyLogo({
  logo,
  company,
  logoFit = "cover",
  logoBg = "dark",
}: {
  logo: string;
  company: string;
  logoFit?: "cover" | "contain";
  logoBg?: "dark" | "light";
}) {
  const bgClass = logoBg === "light" ? "bg-white" : "bg-zinc-950";
  const fitClass = logoFit === "contain" ? "object-contain p-1.5" : "object-cover object-center";

  if (!logo) {
    return (
      <span
        className={`${LOGO_FRAME} ${LOGO_SIZE} flex items-center justify-center font-mono text-sm font-medium text-zinc-400`}
        aria-hidden
      >
        {companyInitials(company)}
      </span>
    );
  }

  const isEmoji = !logo.startsWith("http") && !logo.startsWith("/");

  if (isEmoji) {
    return (
      <span
        className={`${LOGO_FRAME} ${LOGO_SIZE} flex items-center justify-center text-3xl sm:text-4xl`}
        aria-hidden
      >
        {logo}
      </span>
    );
  }

  return (
    <div className={`${LOGO_FRAME} ${LOGO_SIZE} ${bgClass}`}>
      <img
        src={logo}
        alt={`${company} logo`}
        className={`block h-full w-full ${fitClass}`}
        loading="lazy"
        decoding="async"
        draggable={false}
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

      <div className="flex flex-1 flex-col gap-6 p-5 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7 lg:gap-8">
          <CompanyLogo
            logo={exp.logo}
            company={exp.company}
            logoFit={exp.logoFit}
            logoBg={exp.logoBg}
          />

          <div className="min-w-0 flex-1 space-y-2.5 sm:pt-1">
            <h3 className="font-mono text-lg font-semibold leading-snug text-zinc-50 sm:text-xl">
              {exp.title}
            </h3>
            {exp.website ? (
              <a
                href={exp.website}
                target="_blank"
                rel="noopener noreferrer"
                className="log-focus inline-flex items-center gap-1.5 font-mono text-base text-emerald-400 transition-colors hover:text-emerald-300"
              >
                {exp.company}
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              </a>
            ) : (
              <p className="font-mono text-base text-emerald-400/95">
                {exp.company}
              </p>
            )}
            <p className="font-mono text-sm text-zinc-400 sm:text-[0.9375rem]">
              <span className="text-zinc-300">{exp.period}</span>
              <span className="text-zinc-600"> · </span>
              <span>{exp.location}</span>
            </p>
          </div>
        </div>

        {exp.description ? (
          <p className="max-w-3xl font-mono text-sm leading-relaxed text-zinc-300 sm:text-base sm:leading-7">
            {exp.description}
          </p>
        ) : null}

        {exp.achievements.length > 0 ? (
          <ul className="max-w-3xl space-y-3 border-l border-emerald-500/20 pl-4 sm:space-y-3.5 sm:pl-5">
            {exp.achievements.map((item) => (
              <li
                key={item}
                className="flex gap-3 font-mono text-sm leading-relaxed text-zinc-200 sm:text-[0.9375rem] sm:leading-7"
              >
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span className="min-w-0 break-words">{item}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {exp.tech && exp.tech.length > 0 ? (
          <div className="flex flex-wrap gap-2 pt-0.5">
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
            <div className="space-y-5 p-5 sm:p-7 lg:p-8">
              {education.map((entry) => (
                <div key={entry.degree} className="max-w-3xl space-y-2">
                  <p className="font-mono text-lg font-semibold text-zinc-50 sm:text-xl">
                    {entry.degree}
                  </p>
                  <p className="font-mono text-base text-zinc-400">
                    {entry.institution} · {entry.location}
                  </p>
                  <p className="font-mono text-sm text-zinc-400 sm:text-[0.9375rem]">
                    <span className="text-zinc-300">{entry.period}</span>
                    <span className="text-zinc-600"> · </span>
                    <span>{entry.gpa}</span>
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
