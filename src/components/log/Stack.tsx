import { motion, useReducedMotion } from "framer-motion";
import { techCategories } from "@/data/portfolio";
import { currentSetup } from "@/data/setup";
import { SectionHeader } from "./SectionHeader";

const proofs: Record<string, string> = {
  languages: "Used across TrustWipe and algorithm simulators.",
  "web development": "Shipped ShieldEye and SpendSense to production.",
  "cloud / databases": "Deployed on Vercel with persistent data stores.",
  tools: "Daily workflow for CI, collaboration, and releases.",
  "data science & ai": "Applied in detection/classification features.",
  "soft skills": "Proven through workshops and hackathon operations.",
};

export function Stack() {
  const reduced = useReducedMotion();

  return (
    <section
      id="stack"
      className="log-section border-t border-zinc-900 px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="05_stack"
          path="./setup.sh"
          title="capabilities"
        />

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="mt-10 space-y-8"
        >
          {techCategories.map((cat) => (
            <div key={cat.category}>
              <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                {cat.category.toLowerCase()}
              </p>
              <p className="mt-1 font-mono text-xs text-zinc-400">
                {proofs[cat.category.toLowerCase()] ?? "Applied in shipped work."}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span key={skill} className="log-chip">
                    {skill.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Current setup */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-14 rounded border border-zinc-800 bg-zinc-950/50 p-5 font-mono text-sm"
        >
          <p className="text-emerald-400">~ ./setup</p>
          <div className="mt-3 grid gap-1.5 pl-4 sm:grid-cols-[120px_1fr]">
            {currentSetup.map((row) => (
              <div
                key={row.key}
                className="grid grid-cols-[100px_1fr] gap-x-4 sm:contents"
              >
                <span className="text-zinc-500">{row.key}</span>
                <span className="text-zinc-300">{row.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
