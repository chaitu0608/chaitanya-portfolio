import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, Tag, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from './glass-card';
import { Project } from '@/lib/content';

interface ProjectCardProps {
  project: Project;
  className?: string;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  className,
  onClick 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleExternalClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank');
  };

  return (
    <motion.div
      className={cn('group', className)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <GlassCard
        className="h-full cursor-pointer overflow-hidden"
        onClick={onClick}
        hover={false}
      >
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className={`w-full h-full ${
                project.title === 'StarQuest' 
                  ? 'object-contain' 
                  : 'object-cover'
              }`}
              onError={(e) => {
                // Fallback to gradient background if image fails to load
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
          ) : null}
          <div 
            className="w-full h-full bg-gradient-accent flex items-center justify-center"
            style={{ display: project.thumbnail ? 'none' : 'flex' }}
          >
            <div className="text-4xl">🚀</div>
          </div>
          
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.link && (
              <motion.button
                onClick={(e) => handleExternalClick(e, project.link!)}
                className="p-3 bg-accent rounded-full text-accent-foreground hover:bg-accent/90 smooth-transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-5 h-5" />
              </motion.button>
            )}
            {project.repo && (
              <motion.button
                onClick={(e) => handleExternalClick(e, project.repo!)}
                className="p-3 bg-background/80 backdrop-blur-sm rounded-full text-foreground hover:bg-background smooth-transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
              </motion.button>
            )}
          </motion.div>

          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <span className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              project.status === 'Completed' 
                ? 'badge-accent' 
                : project.status === 'In Development'
                ? 'badge-gold'
                : 'badge'
            )}>
              {project.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-accent smooth-transition">
                {project.title}
              </h3>
              <motion.div
                className="text-accent"
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </div>
            <p className="text-sm text-muted-foreground">{project.subtitle}</p>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
            {project.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{project.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              <span>{project.category}</span>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted/50 text-muted-foreground rounded-md text-xs"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-2 py-1 bg-muted/50 text-muted-foreground rounded-md text-xs">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default ProjectCard;
