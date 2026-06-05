import { motion, useReducedMotion } from "framer-motion";
import { education, experiences } from "@/data/portfolio";
import { contactInfo } from "@/data/portfolio";
import { SectionHeader } from "./SectionHeader";

// Deterministic short hash from a string (simple djb2 → hex 7 chars)
function shortHash(input: string): string {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  // 32-bit unsigned, take 7 hex chars
  return (hash >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

function dateForCommit(period: string): string {
  // Simple parser: take a year if present, otherwise "now"
  const m = period.match(/(\d{4})/);
  const y = m ? m[1] : new Date().getFullYear().toString();
  return `${y}-01-15`;
}

function commitType(title: string): "feat" | "perf" | "refactor" {
  if (title.toLowerCase().includes("intern")) return "feat";
  if (title.toLowerCase().includes("operations")) return "perf";
  return "refactor";
}

export function Experience() {
  const reduced = useReducedMotion();

  return (
    <section
      id="experience"
      className="log-section border-t border-zinc-900 px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          index="04_experience"
          path="./git_log"
          title="git log --author=chaitanya"
        />

        <div className="mt-10 space-y-10">
          {experiences.map((exp, i) => {
            const hash = shortHash(exp.company + exp.period);
            const date = dateForCommit(exp.period);
            return (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="font-mono text-sm leading-relaxed"
              >
                <p className="text-amber-300">
                  commit{" "}
                  <span className="text-amber-200">{hash}</span>{" "}
                  <span className="text-zinc-500">·</span>{" "}
                  <span className="text-zinc-400">{exp.period}</span>
                </p>
                <p className="break-words text-zinc-500">
                  Author: Chaitu &lt;
                  <span className="break-all">{contactInfo.email}</span>&gt;
                </p>
                <p className="text-zinc-500">Date:   {date}</p>
                <p className="text-zinc-500">Refs:   main, career/{exp.company.toLowerCase().split(" ")[0]}</p>
                <div className="mt-3 pl-4">
                  <p className="text-zinc-100">
                    <span className="text-emerald-400">{commitType(exp.title)}:</span>{" "}
                    {exp.title.toLowerCase()} @ {exp.company}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {exp.achievements.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-zinc-300"
                      >
                        <span className="text-zinc-600 shrink-0">-</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {exp.tech && exp.tech.length > 0 && (
                    <p className="mt-2 text-xs text-zinc-500">
                      Tags:{" "}
                      <span className="text-zinc-400">
                        {exp.tech.join(" · ").toLowerCase()}
                      </span>
                    </p>
                  )}
                  <p className="mt-1 text-xs text-zinc-500">
                    files changed: {8 + exp.achievements.length} · +{90 + exp.achievements.length * 14} -{20 + exp.achievements.length * 4}
                  </p>
                </div>
                {i < experiences.length - 1 && (
                  <div className="mt-8 log-divider" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Education block */}
        <div className="mt-16 border-t border-dashed border-zinc-800 pt-8 font-mono text-sm">
          <p className="text-emerald-400">~ ./education</p>
          {education.map((e) => (
            <div key={e.degree} className="mt-2 pl-4 text-zinc-300">
              <p>
                {e.degree} ·{" "}
                <span className="text-zinc-400">{e.institution}</span> · {e.location}
              </p>
              <p className="text-zinc-500">
                {e.period.toLowerCase()} · {e.gpa.toLowerCase()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
