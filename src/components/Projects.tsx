import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import GlassCard from "@/components/ui/glass-card";
import { projects } from "@/data/portfolio";

const Projects = () => {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress into various animation values
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.4, 0.2]);

  const handleOpenLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden">
      {/* Enhanced Background Effects with Scroll Animation */}
      <motion.div 
        className="absolute inset-0 bokeh-bg"
        style={{ 
          opacity: backgroundOpacity,
          y: backgroundY 
        }}
      />
      
      {/* Animated Background Elements with Scroll Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-accent opacity-5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
            x: [0, 20, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-gold opacity-5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.05, 0.1],
            x: [0, -15, 0],
            y: [0, 15, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 30]) }}
        />
        
        {/* Additional floating elements for more dynamic background */}
        <motion.div 
          className="absolute top-1/2 right-1/6 w-64 h-64 bg-gradient-primary opacity-3 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.08, 0.03],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [0, -40]),
            x: useTransform(scrollYProgress, [0, 1], [0, 20])
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/2 right-1/3 w-72 h-72 bg-gradient-secondary opacity-4 rounded-full blur-3xl"
          animate={{ 
            scale: [1.1, 0.9, 1.1],
            opacity: [0.04, 0.07, 0.04],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 3 }}
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [0, 25]),
            x: useTransform(scrollYProgress, [0, 1], [0, -15])
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            The things I have <span className="text-gradient">built</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I love turning ideas into interactive experiences — here are some of the projects I've brought to life.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <GlassCard className="p-6 h-full hover:shadow-card-hover transition-all duration-300">
                <div className="space-y-4">
                  {/* Project Screenshot Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg border border-accent/20 flex items-center justify-center">
                    <div className="text-4xl opacity-50">
                      {project.type === 'Desktop Application' ? '💻' : 
                       project.type === 'Web3 Application' ? '⛓️' : 
                       project.type === 'Web Application' ? '🌐' : '📱'}
                    </div>
                  </div>
                  
                  {/* Project Info */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xl font-display font-semibold text-foreground group-hover:text-accent transition-colors">
                          {project.title}
                        </h4>
                        <p className="text-sm text-accent font-medium">{project.subtitle}</p>
                      </div>
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOpenLink(project.githubUrl!)}
                            className="p-2 hover:bg-accent/20"
                          >
                            <Github className="w-4 h-4" />
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOpenLink(project.liveUrl!)}
                            className="p-2 hover:bg-accent/20"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;