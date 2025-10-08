import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Smartphone, Globe, Wrench, Users } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';
import { loadSkills, SkillCategory } from '@/lib/content';

const Skills = () => {
  const [skills, setSkills] = useState<Record<string, SkillCategory>>({});

  useEffect(() => {
    const fetchSkills = () => {
      const skillsData = loadSkills();
      setSkills(skillsData);
    };

    fetchSkills();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend Development':
        return <Code className="w-6 h-6" />;
      case 'Backend Development':
        return <Database className="w-6 h-6" />;
      case 'Mobile Development':
        return <Smartphone className="w-6 h-6" />;
      case 'Databases & Cloud':
        return <Globe className="w-6 h-6" />;
      case 'Tools & Technologies':
        return <Wrench className="w-6 h-6" />;
      case 'Soft Skills':
        return <Users className="w-6 h-6" />;
      default:
        return <Code className="w-6 h-6" />;
    }
  };

  const getProficiencyColor = (level: number) => {
    if (level >= 90) return 'from-green-500 to-emerald-500';
    if (level >= 80) return 'from-blue-500 to-cyan-500';
    if (level >= 70) return 'from-yellow-500 to-orange-500';
    if (level >= 60) return 'from-purple-500 to-pink-500';
    return 'from-gray-500 to-slate-500';
  };

  return (
    <section id="skills" className="py-20 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bokeh-bg opacity-20" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-accent opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-gold opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
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
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(skills).map(([key, category], categoryIndex) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-6 h-full">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                    {getCategoryIcon(category.category)}
                  </div>
                  <h3 className="text-xl font-display font-semibold">{category.category}</h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: skillIndex * 0.05 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      {/* Skill Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs text-muted-foreground">({skill.years})</span>
                        </div>
                        <span className="text-sm font-mono text-accent">{skill.level}%</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${getProficiencyColor(skill.level)}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>

                      {/* Skill Description */}
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {skill.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <GlassCard className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-display font-semibold mb-4">
                Skills Overview
              </h3>
              <p className="text-muted-foreground">
                Continuously learning and expanding my technical expertise
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Frontend', value: '90%', color: 'from-blue-500 to-cyan-500' },
                { label: 'Backend', value: '75%', color: 'from-green-500 to-emerald-500' },
                { label: 'Mobile', value: '70%', color: 'from-purple-500 to-pink-500' },
                { label: 'DevOps', value: '65%', color: 'from-yellow-500 to-orange-500' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className={`w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">{item.value}</span>
                  </div>
                  <div className="text-sm font-medium">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Learning Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <GlassCard className="p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-display font-semibold mb-4">
              Learning Philosophy
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Technology evolves rapidly, and so do I. I believe in continuous learning, 
              staying updated with the latest trends, and always being ready to adapt to new challenges. 
              Every project is an opportunity to learn something new and improve my skills.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
