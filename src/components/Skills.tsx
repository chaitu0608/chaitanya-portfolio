import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { techCategories } from "@/data/portfolio";
import { SkillIcon } from "@/lib/skill-icons";
import { SectionHeader } from "@/components/ui/section-header";

const CATEGORY_ACCENT: Record<string, string> = {
  Languages: "border-l-teal-500 bg-teal-500/5",
  "Web Development": "border-l-emerald-500 bg-emerald-500/5",
  "Cloud / Databases": "border-l-cyan-500 bg-cyan-500/5",
  Tools: "border-l-amber-500 bg-amber-500/5",
  "Data Science & AI": "border-l-violet-500 bg-violet-500/5",
  "Soft Skills": "border-l-rose-500/80 bg-rose-500/5",
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden px-4 py-20 section-transition"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Stack"
          title={
            <>
              Skills & <span className="text-gradient">Technologies</span>
            </>
          }
          description="Languages, frameworks, and tools I reach for when shipping production software."
          className="mb-16"
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {techCategories.map((cat, index) => (
            <motion.div
              key={cat.category}
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, x: index % 2 === 0 ? -30 : 30, scale: 0.95 }
              }
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, x: 0, scale: 1 }
              }
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={
                prefersReducedMotion ? undefined : { scale: 1.02, y: -4 }
              }
              className={`group overflow-hidden rounded-2xl border border-glass-border glass-panel shadow-card transition-all duration-300 hover:border-accent/30 hover:shadow-card-hover border-l-4 ${CATEGORY_ACCENT[cat.category] ?? "border-l-accent bg-accent/5"}`}
            >
              <div className="p-4 border-b border-border/40">
                <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                  {cat.category}
                </h3>
              </div>
              <div className="p-4 flex flex-wrap gap-2">
                {cat.skills.map((skillName) => (
                  <span
                    key={skillName}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/60 text-muted-foreground text-xs font-medium hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <SkillIcon skillName={skillName} />
                    <span>{skillName}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
