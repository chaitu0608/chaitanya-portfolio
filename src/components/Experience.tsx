import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { experiences } from "@/data/portfolio";
import { ChevronDown, ExternalLink, Sparkles } from "lucide-react";
import SectionMarquee from "@/components/scroll/SectionMarquee";
import BigTypeReveal from "@/components/scroll/BigTypeReveal";
import type { Experience as ExperienceItem } from "@/types";
import { cn } from "@/lib/utils";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

function formatIndex(n: number): string {
  return String(n).padStart(2, "0");
}

interface RolePanelProps {
  exp: ExperienceItem;
  index: number;
  isActive: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onFocus: () => void;
}

const RolePanel: React.FC<RolePanelProps> = ({
  exp,
  index,
  isActive,
  isOpen,
  onToggle,
  onFocus,
}) => {
  const impactPreview =
    exp.achievements[0]?.length > 120
      ? `${exp.achievements[0].slice(0, 117)}…`
      : exp.achievements[0];

  return (
    <motion.article
      data-exp-index={index}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
      className={cn(
        "rounded-2xl overflow-hidden transition-all duration-300",
        "glass-panel border",
        isActive
          ? "border-accent/40 shadow-[0_0_32px_rgba(32,227,178,0.12)] -translate-y-0.5"
          : "border-accent/20 opacity-80"
      )}
    >
      <div className="p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            {exp.logo.startsWith("/") || exp.logo.startsWith("http") ? (
              <img
                src={exp.logo}
                alt=""
                className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover ring-2 ring-accent/20 shrink-0"
              />
            ) : (
              <span className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-muted/50 ring-2 ring-accent/20 flex items-center justify-center text-2xl shrink-0">
                {exp.logo}
              </span>
            )}
            <div className="min-w-0">
              <span className="font-mono text-xs text-accent/70 mb-1 block">
                {formatIndex(index + 1)}
              </span>
              <h3 className="text-lg md:text-xl font-display font-semibold leading-tight text-foreground">
                {exp.title}
              </h3>
              <p className="text-sm text-accent font-medium">{exp.company}</p>
              <p className="text-xs text-muted-foreground">{exp.location}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs shrink-0">
            {exp.period}
          </Badge>
        </div>

        {isActive ? (
          <>
            {exp.description && (
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{exp.description}</p>
            )}

            {exp.tech && exp.tech.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {exp.tech.slice(0, 6).map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="border-accent/30 bg-accent/10 text-accent text-xs"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              {!isActive && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-accent/30 text-accent hover:bg-accent/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFocus();
                  }}
                >
                  Focus role
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="border-accent/30 text-accent hover:bg-accent/10"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
              >
                <ChevronDown
                  className={cn(
                    "w-4 h-4 mr-2 transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                />
                {isOpen ? "Hide contributions" : "View contributions"}
              </Button>
              {exp.website && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-accent"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(exp.website, "_blank");
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit website
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-3">
            {impactPreview && (
              <p className="text-xs text-muted-foreground line-clamp-2">{impactPreview}</p>
            )}
            <Button
              variant="outline"
              size="sm"
              className="border-accent/30 text-accent hover:bg-accent/10"
              onClick={(e) => {
                e.stopPropagation();
                onFocus();
              }}
            >
              Focus role
            </Button>
          </div>
        )}
      </div>

      {isActive && (
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="overflow-hidden border-t border-accent/10 bg-black/10"
        >
          <div className="p-5 md:p-6">
            <div className="flex items-center gap-2 mb-3 text-accent">
              <Sparkles className="w-4 h-4" />
              <p className="text-sm font-medium">Key contributions</p>
            </div>
            <ul className="space-y-2">
              {exp.achievements.map((achievement) => (
                <li key={achievement} className="text-sm text-muted-foreground flex items-start">
                  <span className="text-accent mr-2 mt-0.5 shrink-0">•</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </motion.article>
  );
};

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const rolesY = useTransform(scrollYProgress, [0, 1], ["12px", "-12px"]);

  useEffect(() => {
    const root = rolesRef.current;
    if (!root) return;

    const cards = root.querySelectorAll<HTMLElement>("[data-exp-index]");
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-exp-index"));
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setOpenIndex(activeIndex);
  }, [activeIndex]);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleFocus = useCallback((index: number) => {
    setActiveIndex(index);
    setOpenIndex(index);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-20 px-4 md:pl-8 relative overflow-hidden continuous-bg section-transition"
    >
      <div className="absolute inset-0 bokeh-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-accent opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-gold opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="hidden md:block absolute left-2 top-24 bottom-24 z-20 w-8">
        <div className="bento-progress-rail h-full">
          <motion.div className="bento-progress-fill" style={{ height: progressHeight }} />
        </div>
        <p className="absolute -left-1 top-0 font-mono text-[10px] text-muted-foreground -rotate-90 origin-left translate-y-8 whitespace-nowrap">
          {formatIndex(activeIndex + 1)} / {formatIndex(experiences.length)}
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
            The path I <span className="text-gradient">took</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Roles that shaped how I ship, collaborate, and lead execution.
          </p>
        </motion.div>

        <SectionMarquee text="EXPERIENCE · ROLES · IMPACT · " className="mb-8" repeat={8} />

        <BigTypeReveal className="mb-10 md:mb-12">
          SHAPED BY <span className="text-gradient">EXPERIENCE.</span>
        </BigTypeReveal>

        <motion.div
          ref={rolesRef}
          className="max-w-4xl mx-auto space-y-4 md:space-y-5"
          style={{ y: prefersReducedMotion ? 0 : rolesY }}
        >
          {experiences.map((exp, index) => (
            <RolePanel
              key={`${exp.company}-${exp.title}`}
              exp={exp}
              index={index}
              isActive={activeIndex === index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              onFocus={() => handleFocus(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
