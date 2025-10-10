import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { experiences } from "@/data/portfolio";
import { ExternalLink } from "lucide-react";

const Experience = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Transform scroll progress for the timeline line
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="experience" className="py-20 px-4 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bokeh-bg opacity-20" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-teal-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3.5s' }} />
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10" ref={containerRef}>
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gradient">Professional Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-accent mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A timeline of my professional growth and key achievements in the tech industry
          </p>
        </motion.div>
        
        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Progress Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-muted-foreground/20 to-muted-foreground/20">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-teal-400 via-purple-500 to-teal-400 rounded-full"
              style={{
                height: lineHeight,
                opacity: lineOpacity,
                boxShadow: "0 0 20px rgba(20, 184, 166, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)"
              }}
            />
          </div>

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              const cardRef = useRef<HTMLDivElement>(null);
              const isInView = useInView(cardRef, { once: true, margin: "-100px" });

              return (
                <motion.div
                  key={index}
                  ref={cardRef}
                  initial={{ opacity: 0, x: isEven ? -100 : 100, y: 50 }}
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: isEven ? -100 : 100, y: 50 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  className={`relative flex items-center ${isEven ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full border-4 border-background shadow-lg z-10">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>

                  {/* Experience Card */}
                  <motion.div
                    className={`w-full max-w-2xl ${isEven ? 'ml-16' : 'mr-16'}`}
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    onHoverStart={() => setHoveredCard(index)}
                    onHoverEnd={() => setHoveredCard(null)}
                  >
                    <div className={`
                      relative overflow-hidden
                      bg-gradient-to-br from-card/30 via-card/20 to-card/10
                      backdrop-blur-md border border-accent/20
                      rounded-2xl shadow-2xl
                      transition-all duration-500
                      ${hoveredCard === index 
                        ? 'shadow-teal-500/25 border-teal-400/40' 
                        : 'hover:shadow-accent/20 hover:border-accent/30'
                      }
                    `}>
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      
                      {/* Shimmer Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        initial={{ x: "-100%" }}
                        animate={hoveredCard === index ? { x: "100%" } : { x: "-100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />

                      <div className="relative z-10 p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            {exp.company === "KJSCE CodeCell" ? (
                              <motion.img
                                src="/codecell.png"
                                alt="KJSCE CodeCell Logo"
                                className="w-12 h-12 object-contain"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                              />
                            ) : (
                              <motion.span 
                                className="text-2xl"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                              >
                                {exp.logo}
                              </motion.span>
                            )}
                            <div>
                              <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                              <p className="text-accent font-medium">{exp.company}</p>
                              <p className="text-muted-foreground text-sm">{exp.location}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {exp.period}
                            </Badge>
                            {exp.website && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-accent hover:text-accent/80 p-1 h-auto group text-xs"
                                onClick={() => window.open(exp.website, '_blank')}
                              >
                                <ExternalLink className="w-4 h-4 mr-1 transition-transform group-hover:translate-x-1" />
                                <span className="relative">
                                  Visit Website
                                  <motion.div
                                    className="absolute bottom-0 left-0 h-0.5 bg-accent"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.3 }}
                                  />
                                </span>
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        {exp.description && (
                          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                            {exp.description}
                          </p>
                        )}

                        {/* Tech Tags */}
                        {exp.tech && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {exp.tech.map((tech, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Badge 
                                  variant="outline" 
                                  className="bg-gradient-to-r from-teal-400/10 to-purple-500/10 border-accent/30 text-accent hover:border-accent/50 transition-all duration-300 text-xs px-2 py-1"
                                >
                                  {tech}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* Key Contributions - Hover to Reveal */}
                        <div className="border-t border-accent/10 pt-4">
                          <div className="text-sm font-medium text-muted-foreground mb-2">
                            Key Contributions
                          </div>
                          
                          <motion.div
                            initial={false}
                            animate={{
                              height: hoveredCard === index ? "auto" : 0,
                              opacity: hoveredCard === index ? 1 : 0
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={hoveredCard === index ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="text-muted-foreground text-sm flex items-start"
                                >
                                  <span className="text-accent mr-2 mt-1">•</span>
                                  <span>{achievement}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                          
                          {hoveredCard !== index && (
                            <div className="text-xs text-muted-foreground/60 italic">
                              Hover to explore key contributions
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;