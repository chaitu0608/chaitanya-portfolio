import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { experiences } from "@/data/portfolio";
import { ExternalLink, ChevronDown } from "lucide-react";

const Experience = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Transform scroll progress for the timeline line
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const toggleExpand = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
    
    // Smooth scroll to the expanded card
    setTimeout(() => {
      const cardElement = document.getElementById(`experience-card-${index}`);
      if (cardElement) {
        cardElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest',
          inline: 'nearest'
        });
      }
    }, 150);
  };

  return (
    <section id="experience" className="py-20 px-4 md:px-6 lg:px-8 relative overflow-hidden continuous-bg section-transition scroll-smooth">
      {/* Enhanced Background Effects with Scroll Continuity */}
      <motion.div 
        className="absolute inset-0 bokeh-bg"
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 0.3, 0.2, 0.1]),
          y: useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
        }}
      />

      {/* Reduced Background Elements - No Overlapping */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-accent opacity-5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-teal-400/10 rounded-full blur-3xl"
          animate={{ 
            scale: [0.9, 1.1, 0.9],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
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
          <motion.h2 
            className="text-4xl md:text-5xl font-display font-bold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="text-gradient"
              initial={{ backgroundPosition: "0% 50%" }}
              whileInView={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              Work Experience
            </motion.span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-accent mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          />
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Good engineering isn't just built, it's refined — here's what shaped mine.
          </motion.p>
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
                  <motion.div 
                    className="absolute left-6 w-4 h-4 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full border-4 border-background shadow-lg z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    {/* Ripple effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-teal-400/30 to-purple-500/30 rounded-full"
                      animate={{
                        scale: [1, 2, 3],
                        opacity: [0.5, 0.2, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                  </motion.div>

                  {/* Experience Card */}
                  <motion.div
                    id={`experience-card-${index}`}
                    className={`w-full max-w-2xl ${isEven ? 'ml-16' : 'mr-16'} group`}
                    whileHover={{ 
                      y: -12,
                      scale: 1.03,
                      rotateY: 2,
                      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
                    }}
                  >
                    <motion.div 
                      className="relative p-6 rounded-3xl bg-gradient-to-r from-card/30 via-card/20 to-card/10 backdrop-blur-xl border border-accent/20 shadow-2xl hover:shadow-accent/25 transition-all duration-500 overflow-hidden"
                      animate={{
                        boxShadow: expandedCard === index 
                          ? "0 25px 50px -12px rgba(20, 184, 166, 0.25), 0 0 0 1px rgba(20, 184, 166, 0.4)"
                          : "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Dynamic Neon Glow Overlay */}
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-accent/5 via-transparent to-accent/5 transition-opacity duration-500 ${expandedCard === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-accent/8 to-transparent transition-opacity duration-500 ${expandedCard === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>

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
                          </div>
                  </div>
                  
                        {/* Description */}
                        {exp.description && (
                          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                            {exp.description}
                          </p>
                        )}

                        {/* Visit Website Button */}
                        {exp.website && (
                          <motion.div
                            className="mb-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ delay: 0.3 }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className="group relative overflow-hidden border-accent/30 text-accent hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
                                onClick={() => window.open(exp.website, '_blank')}
                              >
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-purple-500/10"
                                  initial={{ x: "-100%" }}
                                  whileHover={{ x: "0%" }}
                                  transition={{ duration: 0.3 }}
                                />
                                <motion.div
                                  className="relative flex items-center gap-2"
                                  whileHover={{ x: 2 }}
                                >
                                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:rotate-12" />
                                  <span className="relative font-medium">
                                    Visit Website
                                    <motion.div
                                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-teal-400 to-purple-500"
                                      initial={{ width: 0 }}
                                      whileHover={{ width: "100%" }}
                                      transition={{ duration: 0.3 }}
                                    />
                                  </span>
                                </motion.div>
                              </Button>
                            </motion.div>
                          </motion.div>
                        )}

                        {/* Tech Tags */}
                        {exp.tech && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {exp.tech.map((tech, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0, opacity: 0, rotate: -10 }}
                                animate={isInView ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0, opacity: 0, rotate: -10 }}
                                transition={{ 
                                  delay: 0.5 + i * 0.1,
                                  type: "spring",
                                  stiffness: 200,
                                  damping: 15
                                }}
                                whileHover={{ 
                                  scale: 1.1, 
                                  y: -3,
                                  rotate: [0, -2, 2, 0],
                                  transition: { duration: 0.3 }
                                }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <motion.div
                                  whileHover={{
                                    boxShadow: "0 0 20px rgba(20, 184, 166, 0.4)"
                                  }}
                                >
                                  <Badge 
                                    variant="outline" 
                                    className="bg-gradient-to-r from-teal-400/10 to-purple-500/10 border-accent/30 text-accent hover:border-accent/50 transition-all duration-300 text-xs px-3 py-1.5 cursor-pointer"
                                  >
                                    {tech}
                                  </Badge>
                                </motion.div>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* Key Contributions - Expandable with Button */}
                        <div className="border-t border-accent/10 pt-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium text-muted-foreground">
                              Key Contributions
                            </div>
                            <motion.button
                              onClick={() => toggleExpand(index)}
                              className="p-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 hover:border-accent/40 transition-all duration-300"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              aria-label={expandedCard === index ? "Collapse" : "Expand"}
                            >
                              <motion.div
                                animate={{ rotate: expandedCard === index ? 180 : 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                              >
                                <ChevronDown className="w-5 h-5" />
                              </motion.div>
                            </motion.button>
                          </div>
                          
                          <motion.div
                            initial={false}
                            animate={{
                              height: expandedCard === index ? "auto" : 0,
                              opacity: expandedCard === index ? 1 : 0,
                              marginTop: expandedCard === index ? "0.5rem" : "0"
                            }}
                            transition={{ 
                              duration: 0.4, 
                              ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            className="overflow-hidden"
                          >
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={expandedCard === index ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                  transition={{ 
                                    delay: i * 0.05, 
                                    duration: 0.3,
                                    ease: "easeOut"
                                  }}
                                  className="text-muted-foreground text-sm flex items-start"
                                >
                                  <span className="text-accent mr-2 mt-1">•</span>
                                  <span>{achievement}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        </div>
              </div>
                    </motion.div>
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