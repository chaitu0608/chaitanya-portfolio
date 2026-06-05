import { motion, useReducedMotion } from "framer-motion";
import { nowData } from "@/data/now";
import { SectionHeader } from "./SectionHeader";
import { GithubProof } from "./GithubProof";

function Group({
  label,
  items,
}: {
  label: string;
  items: readonly string[];
}) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <ul className="mt-2 space-y-1 font-mono text-sm text-zinc-300">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-emerald-400">-</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Now() {
  const reduced = useReducedMotion();

  return (
    <section id="now" className="log-section border-t border-zinc-900 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="03_now" path="./now.txt" title="current_processes" />
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          <div className="rounded border border-zinc-800 bg-zinc-950/50 p-5">
            <p className="font-mono text-sm text-emerald-400">$ cat now.txt</p>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <Group label="currently_building" items={nowData.building} />
              <Group label="learning" items={nowData.learning} />
              <Group label="reading" items={nowData.reading} />
              <Group label="exploring" items={nowData.exploring} />
            </div>
          </div>
          <GithubProof />
        </motion.div>
      </div>
    </section>
  );
}
