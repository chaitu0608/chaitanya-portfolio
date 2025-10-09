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

        {/* Projects Grid - Custom Landscape Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-8 max-w-6xl mx-auto"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                y: -6,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group relative"
            >
              {/* Landscape Glassmorphism Card */}
              <div className="relative p-6 rounded-3xl bg-gradient-to-r from-card/30 via-card/20 to-card/10 backdrop-blur-xl border border-accent/20 shadow-2xl hover:shadow-accent/25 transition-all duration-500 overflow-hidden">
                {/* Dynamic Neon Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-accent/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content - Landscape Layout */}
                <div className="relative z-10 flex flex-col lg:flex-row gap-6 items-start">
                  {/* Project Visual - Landscape */}
                  <div className="w-full lg:w-80 flex-shrink-0">
                    <div className="w-full h-48 bg-gradient-to-br from-accent/20 via-accent/10 to-accent/5 rounded-2xl border border-accent/20 flex items-center justify-center relative overflow-hidden">
                      {/* Device Frame Effect */}
                      <div className="absolute inset-3 bg-gradient-to-br from-background/95 to-background/85 rounded-xl border border-accent/10 flex items-center justify-center overflow-hidden">
                        {project.thumbnail ? (
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className={`w-full h-full rounded-lg ${
                              project.title === 'StarQuest' 
                                ? 'object-contain' 
                                : 'object-cover'
                            }`}
                            onError={(e) => {
                              // Fallback to emoji if image fails to load
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className="text-4xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                          style={{ display: project.thumbnail ? 'none' : 'flex' }}
                        >
                          {project.type === 'Desktop Application' ? '💻' : 
                           project.type === 'Web3 Application' ? '⛓️' : 
                           project.type === 'Web Application' ? '🌐' : '📱'}
                        </div>
              </div>
              
                      {/* Animated Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Floating Particles Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-4 left-4 w-2 h-2 bg-accent/60 rounded-full animate-pulse"></div>
                        <div className="absolute top-8 right-6 w-1.5 h-1.5 bg-accent/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute bottom-6 left-8 w-1 h-1 bg-accent/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>
                    </div>
                  </div>
                  
                  {/* Project Information - Landscape */}
                  <div className="flex-1 space-y-4">
                    {/* Title and Links */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300 mb-2">
                          {project.title}
                        </h3>
                        <p className="text-accent/80 font-medium text-sm mb-3">{project.subtitle}</p>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 ml-4">
                        {project.githubUrl && (
                          <motion.button
                            onClick={() => handleOpenLink(project.githubUrl!)}
                            className="p-3 rounded-xl bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 hover:border-accent/40 transition-all duration-300"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github className="w-5 h-5" />
                          </motion.button>
                        )}
                        {project.liveUrl && (
                          <motion.button
                            onClick={() => handleOpenLink(project.liveUrl!)}
                            className="p-3 rounded-xl bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 hover:border-accent/40 transition-all duration-300"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ExternalLink className="w-5 h-5" />
                          </motion.button>
                        )}
                      </div>
                </div>
                
                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed text-sm">
                  {project.description}
                </p>
                
                    {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: techIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="px-3 py-1.5 bg-accent/15 text-accent text-xs rounded-full border border-accent/30 font-medium hover:bg-accent/25 hover:border-accent/50 transition-all duration-300 cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                        </motion.span>
                      ))}
                      {project.tech.length > 4 && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 }}
                          viewport={{ once: true }}
                          className="px-3 py-1.5 bg-muted/50 text-muted-foreground text-xs rounded-full border border-muted/50 font-medium"
                        >
                          +{project.tech.length - 4}
                        </motion.span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Border Glow */}
                <div className="absolute inset-0 rounded-3xl border border-accent/10 group-hover:border-accent/40 transition-colors duration-500"></div>
                
                {/* Corner Accents */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-accent/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transitionDelay: '0.1s' }}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        </div>
    </section>
  );
};

export default Projects;