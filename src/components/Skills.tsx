import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { techCategories } from "@/data/portfolio";
import { SkillIcon } from "@/lib/skill-icons";

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
      className="py-20 px-4 relative overflow-hidden continuous-bg section-transition"
    >
      <div className="absolute inset-0 bokeh-bg opacity-30" />
      <div className="floating-particles">
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-accent opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-gold opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tools and technologies I use to build and ship products.
          </p>
        </motion.div>

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
              className={`rounded-2xl glass-enhanced border border-accent/20 shadow-2xl hover:shadow-accent/25 overflow-hidden border-l-4 transition-all duration-300 group ${CATEGORY_ACCENT[cat.category] ?? "border-l-accent bg-accent/5"}`}
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
