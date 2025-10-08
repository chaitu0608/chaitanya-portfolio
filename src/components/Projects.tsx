import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Database, Smartphone, Globe } from "lucide-react";
import GlassCard from "@/components/ui/glass-card";
import ProjectCard from "@/components/ui/project-card";
import { loadProjects, getFeaturedProjects, Project } from "@/lib/content";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchProjects = async () => {
      const allProjects = await loadProjects();
      const featured = await getFeaturedProjects(3);
      setProjects(allProjects);
      setFeaturedProjects(featured);
    };

    fetchProjects();
  }, []);

  const categories = ['All', 'Web3', 'Web Application', 'Mobile Application', 'Full Stack Application', 'Desktop Application'];
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Web3':
        return <Globe className="w-4 h-4" />;
      case 'Web Application':
        return <Code className="w-4 h-4" />;
      case 'Mobile Application':
        return <Smartphone className="w-4 h-4" />;
      case 'Full Stack Application':
        return <Database className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  return (
    <section id="projects" className="py-20 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bokeh-bg opacity-20" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-accent opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-gold opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
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
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, featuring innovative solutions and modern technologies
          </p>
        </motion.div>

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {[
            { label: 'Projects', value: projects.length },
            { label: 'Technologies', value: '15+' },
            { label: 'Success Rate', value: '100%' },
            { label: 'Client Satisfaction', value: '5.0' }
          ].map((stat, index) => (
            <GlassCard key={index} className="p-6 text-center">
              <div className="text-2xl md:text-3xl font-display font-bold text-accent mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </GlassCard>
          ))}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`smooth-transition ${
                selectedCategory === category 
                  ? "btn-primary" 
                  : "btn-secondary"
              }`}
            >
              {getCategoryIcon(category)}
              <span className="ml-2">{category}</span>
            </Button>
          ))}
        </motion.div>

        {/* Featured Projects */}
        {selectedCategory === 'All' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-display font-semibold mb-8 text-center">
              Featured Work
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-display font-semibold mb-8 text-center">
            {selectedCategory === 'All' ? 'All Projects' : `${selectedCategory} Projects`}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <GlassCard className="p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-display font-semibold mb-4">
              Interested in working together?
            </h3>
            <p className="text-muted-foreground mb-6">
              I'm always excited to take on new challenges and create amazing digital experiences.
            </p>
            <Button className="btn-primary">
              Let's discuss your project
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;