import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

interface ProjectCaseStudyDialogProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectCaseStudyDialog({
  project,
  open,
  onOpenChange,
}: ProjectCaseStudyDialogProps) {
  if (!project) return null;

  const thumb = project.thumbnail ?? project.imageUrl;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-border/60 bg-background/95 backdrop-blur-xl sm:max-w-3xl">
        {thumb && (
          <div className="relative -mx-6 -mt-6 mb-4 h-44 overflow-hidden rounded-t-lg sm:h-52">
            <ImageWithFallback
              src={thumb}
              alt=""
              fallbackLabel={project.title}
              fallbackVariant="project"
              containerClassName="h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
        )}

        <DialogHeader className="text-left">
          <p className="font-mono text-xs uppercase tracking-widest text-accent/80">
            {project.type}
          </p>
          <DialogTitle className="font-display text-2xl sm:text-3xl">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-base text-accent/90">
            {project.subtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 text-sm leading-relaxed">
          {project.problem && (
            <div>
              <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Problem
              </h3>
              <p className="text-foreground/90">{project.problem}</p>
            </div>
          )}

          {project.solution && (
            <div>
              <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Solution
              </h3>
              <p className="text-foreground/90">{project.solution}</p>
            </div>
          )}

          <div>
            <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Overview
            </h3>
            <p className="text-muted-foreground">{project.description}</p>
          </div>

          {project.impact && project.impact.length > 0 && (
            <div>
              <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Impact
              </h3>
              <ul className="space-y-2">
                {project.impact.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-foreground/90 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-accent"
                  >
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Key challenges
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                {project.highlights.map((item) => (
                  <li key={item} className="pl-4 border-l-2 border-accent/30">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Badge
                key={t}
                variant="outline"
                className="border-accent/25 bg-accent/10 text-accent"
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                Source
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button size="sm" className="bg-accent text-accent-foreground" asChild>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live demo
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
