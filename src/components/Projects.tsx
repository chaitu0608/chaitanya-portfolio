import React, { useCallback, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/portfolio";
import type { Project, ProjectSize } from "@/types";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

const MARQUEE_TEXT = "PROJECTS · BUILD · SHIP · ";
const GITHUB_PROFILE = "https://github.com/chaitu0608";

const TECH_CAPTIONS: Record<string, string> = {
  "Full-Stack": "End-to-end architecture and deployment",
  "Real-time": "Live detection and streaming updates",
  Security: "Threat classification and attack surface analysis",
  "AI/ML": "Model-assisted detection pipelines",
  Visualization: "Interactive attack dashboards",
  "Next.js": "App Router, server components, Vercel deploy",
  TypeScript: "Strict typing across the stack",
  "Tailwind CSS": "Utility-first responsive UI",
  Vercel: "Edge deployment and preview URLs",
  "Product Analytics": "Conversion and audit funnel tracking",
  "Vercel OG": "Dynamic Open Graph image generation",
  "React Native": "Cross-platform mobile app",
  Expo: "OTA updates and native modules",
  "Node.js": "REST APIs and background jobs",
  Express: "Middleware, routing, and auth layers",
  MongoDB: "Document models and aggregations",
  "AWS S3": "Media storage and signed URLs",
  React: "Component architecture and state",
  Solidity: "Smart contracts on Ethereum",
  "Web3.js": "On-chain reads and writes",
  Ethereum: "Mainnet integration",
  IPFS: "Decentralized asset storage",
  MetaMask: "Wallet connect flows",
  "C++": "Low-level secure wipe engine",
  Python: "Automation and tooling scripts",
  Electron: "Cross-platform desktop shell",
  PostgreSQL: "Relational data and migrations",
  Firebase: "Auth and realtime sync",
  OpenSSL: "Cryptographic erase paths",
  AJAX: "Async UI without full page reloads",
  PHP: "Server-side LMS logic",
  MySQL: "Course and attendance schema",
  JavaScript: "DOM and API integration",
  "HTML/CSS": "Semantic markup and layout",
  "D3.js": "Algorithm step visualization",
  JavaFX: "Desktop UI framework",
  Java: "OOP diary application core",
  SQLite: "Local encrypted storage",
  "API Integration": "Third-party weather APIs",
  "Chart.js": "Forecast visualizations",
  Authentication: "Session and OAuth flows",
  Prisma: "Type-safe database ORM",
  "NextAuth.js": "Provider-based auth",
};

const SIZE_CLASS: Record<ProjectSize, string> = {
  hero: "bento-tile-hero",
  tall: "bento-tile-tall",
  wide: "bento-tile-wide",
  half: "bento-tile-half",
  third: "bento-tile-third",
};

const TITLE_SIZE: Record<ProjectSize, string> = {
  hero: "text-3xl md:text-4xl",
  tall: "text-2xl md:text-3xl",
  wide: "text-2xl md:text-3xl",
  half: "text-xl md:text-2xl",
  third: "text-lg md:text-xl",
};

function formatIndex(n: number): string {
  return String(n).padStart(2, "0");
}

const MarqueeHeader = () => (
  <div className="relative mb-8 overflow-hidden border-y border-accent/10 py-4">
    <div className="bento-marquee-track">
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="font-display text-2xl md:text-3xl font-bold text-gradient whitespace-nowrap px-8"
        >
          {MARQUEE_TEXT}
        </span>
      ))}
    </div>
  </div>
);

interface TechChipProps {
  tech: string;
}

const TechChip: React.FC<TechChipProps> = ({ tech }) => {
  const [hovered, setHovered] = useState(false);
  const caption = TECH_CAPTIONS[tech] ?? `${tech} — used in this build`;

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-accent/10 text-accent border border-accent/25 cursor-default">
        {tech}
      </span>
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-30 mt-1 w-max max-w-[200px] px-2 py-1 text-[10px] rounded-md bg-background/95 border border-accent/30 text-muted-foreground shadow-lg pointer-events-none"
          >
            {caption}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

interface BentoTileProps {
  project: Project;
  index: number;
  onOpenLink: (url: string) => void;
}

const BentoTile: React.FC<BentoTileProps> = ({ project, index, onOpenLink }) => {
  const prefersReducedMotion = useReducedMotion();
  const size = project.size ?? "third";
  const visibleTech = project.tech.slice(0, 4);
  const extraCount = project.tech.length - visibleTech.length;
  const thumb = project.thumbnail ?? project.imageUrl;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      data-bento-index={index}
      className={cn(
        "bento-tile group glass-panel rounded-2xl border border-glass-border",
        "hover:border-accent/40 hover:shadow-card-hover",
        "transition-colors duration-300",
        SIZE_CLASS[size]
      )}
    >
      {thumb && (
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={thumb}
            alt={`${project.title} preview`}
            fallbackLabel={project.title}
            fallbackVariant="project"
            loading="lazy"
            className="opacity-25 group-hover:opacity-35 group-hover:scale-[1.03] transition-all duration-500"
            containerClassName="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full p-5 md:p-6">
        <span className="font-mono text-xs text-accent/70 mb-2">
          {formatIndex(index + 1)}
        </span>

        <div className="flex-1 min-h-0">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
            {project.type}
          </p>
          <h3
            className={cn(
              "font-display font-bold text-foreground leading-tight mb-1",
              TITLE_SIZE[size]
            )}
          >
            {project.title}
          </h3>
          <p className="text-sm text-accent/90 font-medium mb-2">{project.subtitle}</p>
          {(size === "hero" || size === "tall" || size === "wide") && (
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-3 md:line-clamp-4">
              {project.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3 mb-3">
          {visibleTech.map((t) => (
            <TechChip key={t} tech={t} />
          ))}
          {extraCount > 0 && (
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-muted/30 text-muted-foreground">
              +{extraCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mt-auto">
          {project.githubUrl && (
            <button
              type="button"
              onClick={() => onOpenLink(project.githubUrl!)}
              className="p-2 rounded-lg bg-background/60 border border-glass-border hover:border-accent/50 hover:text-accent transition-colors"
              aria-label={`${project.title} on GitHub`}
            >
              <Github className="w-4 h-4" />
            </button>
          )}
          {project.liveUrl && (
            <button
              type="button"
              onClick={() => onOpenLink(project.liveUrl!)}
              className="p-2 rounded-lg bg-background/60 border border-glass-border hover:border-accent/50 hover:text-accent transition-colors"
              aria-label={`${project.title} live demo`}
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handleOpenLink = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  React.useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const tiles = grid.querySelectorAll<HTMLElement>("[data-bento-index]");
    if (!tiles.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-bento-index"));
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    tiles.forEach((tile) => observer.observe(tile));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden px-4 py-20 section-transition md:pl-8"
    >
      <div className="pointer-events-none absolute bottom-24 left-2 top-24 z-20 hidden w-8 md:block">
        <div className="bento-progress-rail h-full">
          <motion.div className="bento-progress-fill" style={{ height: progressHeight }} />
        </div>
        <p className="absolute -left-1 top-0 font-mono text-[10px] text-muted-foreground -rotate-90 origin-left translate-y-8 whitespace-nowrap">
          {formatIndex(activeIndex + 1)} / {formatIndex(projects.length)}
        </p>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-3">
            The things I have <span className="text-gradient">built</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selected work — tap a tile for code or live demos.
          </p>
        </motion.div>

        <MarqueeHeader />

        <motion.p
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-foreground/90 mb-10 md:mb-12 tracking-tight"
        >
          BUILT TO <span className="text-gradient">SHIP.</span>
        </motion.p>

        <div ref={gridRef} className="bento-grid">
          {projects.map((project, index) => (
            <BentoTile
              key={project.title}
              project={project}
              index={index}
              onOpenLink={handleOpenLink}
            />
          ))}

          <motion.a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className={cn(
              "bento-tile bento-tile-archive group glass-panel rounded-2xl",
              "border border-dashed border-accent/30 flex flex-col items-center justify-center",
              "hover:border-accent/60 hover:bg-accent/5 transition-all p-6 text-center"
            )}
          >
            <span className="font-mono text-xs text-accent/70 mb-2">
              {formatIndex(projects.length + 1)}
            </span>
            <Github className="w-10 h-10 text-accent mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-display text-xl font-bold">More on GitHub</p>
            <p className="text-sm text-muted-foreground mt-1">@chaitu0608</p>
          </motion.a>
        </div>

        {isInView && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-muted-foreground mt-10"
          >
            Hover tech chips for context · {projects.length} featured projects
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default Projects;
