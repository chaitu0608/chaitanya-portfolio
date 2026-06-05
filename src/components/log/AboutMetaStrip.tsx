import { motion, useReducedMotion } from "framer-motion";
import { aboutMeta } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const META_LINES = [
  { key: "ROLE", value: aboutMeta.role.toLowerCase() },
  { key: "LOC", value: aboutMeta.location.toLowerCase() },
  { key: "EDU", value: aboutMeta.school.toLowerCase() },
  { key: "STATUS", value: aboutMeta.status },
] as const;

interface AboutMetaStripProps {
  visible?: boolean;
  className?: string;
}

export function AboutMetaStrip({ visible = true, className }: AboutMetaStripProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn("about-meta-strip space-y-1", className)}
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 6 }}
      transition={{ duration: reduced ? 0.15 : 0.4 }}
      aria-hidden={!visible}
    >
      {META_LINES.map(({ key, value }) => (
        <p key={key} className="about-meta-line font-mono text-xs sm:text-[0.8125rem]">
          <span className="text-emerald-400/90">{key}=</span>
          <span className="text-zinc-300">{value}</span>
        </p>
      ))}
    </motion.div>
  );
}
