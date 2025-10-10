import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Define all the skill logos with their names and logo URLs
  const skills = [
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Matplotlib', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg' },
    { name: 'Pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
    { name: 'NumPy', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Shadcn', logo: 'https://avatars.githubusercontent.com/u/124599?v=4' },
    { name: 'Material UI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg' },
    { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'Canva', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' },
    { name: 'Vercel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
    { name: 'Solidity', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg' },
    { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    { name: 'Bootstrap', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
    { name: 'Aceternity UI', logo: 'https://aceternity.com/favicon.ico' },
    { name: 'Magic UI', logo: 'https://magicui.design/favicon.ico' },
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Express.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    { name: 'Rust', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg' },
    { name: 'XML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xml/xml-original.svg' },
    { name: 'AutoCAD', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/autocad/autocad-original.svg' },
    { name: 'Tally', logo: 'https://tally.so/favicon.ico' },
    { name: 'R', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' },
  ];

  // Split skills into two rows
  const firstRow = skills.slice(0, Math.ceil(skills.length / 2));
  const secondRow = skills.slice(Math.ceil(skills.length / 2));

  return (
    <section id="skills" className="py-20 px-4 relative overflow-hidden continuous-bg section-transition">
      {/* Enhanced Background Effects */}
      <motion.div 
        className="absolute inset-0 bokeh-bg"
        style={{ 
          opacity: 0.15
        }}
      />

      {/* Floating Particles - Enhanced */}
      <div className="floating-particles">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, 10, -5, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 6 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
          />
        ))}
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-accent opacity-5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.05, 0.12, 0.08, 0.05],
            x: [0, 30, -15, 0],
            y: [0, -20, 15, 0],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/8 to-teal-400/8 rounded-full blur-3xl"
          animate={{ 
            scale: [0.8, 1.1, 1, 0.8],
            opacity: [0.06, 0.1, 0.08, 0.06],
            x: [0, -25, 20, 0],
            y: [0, 30, -10, 0],
            rotate: [360, 270, 180, 90, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 8
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
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
              Skills & Technologies
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
            Technologies and tools I work with to bring ideas to life
          </motion.p>
        </motion.div>

        {/* Skills Container */}
        <div className="space-y-8">
          {/* First Row - Left to Right */}
          <motion.div 
            className="flex gap-6 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              className="flex gap-6"
              animate={{ x: [0, -100 * firstRow.length] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
              style={{
                animationPlayState: isHovered ? "paused" : "running"
              }}
            >
              {[...firstRow, ...firstRow].map((skill, index) => (
                <motion.div
                  key={`first-${index}`}
                  className="flex-shrink-0"
                  whileHover={{ 
                    scale: 1.1,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="glass-enhanced rounded-2xl p-4 w-20 h-20 flex flex-col items-center justify-center group cursor-pointer relative overflow-hidden">
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                    
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-teal-400/10 via-purple-500/10 to-teal-400/10 rounded-2xl"
                      animate={{
                        opacity: [0, 0.3, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />

                    <motion.img 
                      src={skill.logo}
                      alt={skill.name}
                      className="w-8 h-8 mb-1 relative z-10 object-contain"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      onError={(e) => {
                        // Fallback to a simple colored div if image fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'block';
                      }}
                    />
                    <div 
                      className="w-8 h-8 mb-1 relative z-10 bg-gradient-to-br from-teal-400 to-purple-500 rounded-full hidden"
                      style={{ display: 'none' }}
                    />
                    <span className="text-xs text-muted-foreground text-center leading-tight relative z-10">
                      {skill.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Second Row - Right to Left */}
          <motion.div 
            className="flex gap-6 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              className="flex gap-6"
              animate={{ x: [-100 * secondRow.length, 0] }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
              style={{
                animationPlayState: isHovered ? "paused" : "running"
              }}
            >
              {[...secondRow, ...secondRow].map((skill, index) => (
                <motion.div
                  key={`second-${index}`}
                  className="flex-shrink-0"
                  whileHover={{ 
                    scale: 1.1,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="glass-enhanced rounded-2xl p-4 w-20 h-20 flex flex-col items-center justify-center group cursor-pointer relative overflow-hidden">
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                    
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-teal-400/10 to-purple-500/10 rounded-2xl"
                      animate={{
                        opacity: [0, 0.3, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    />

                    <motion.img 
                      src={skill.logo}
                      alt={skill.name}
                      className="w-8 h-8 mb-1 relative z-10 object-contain"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      onError={(e) => {
                        // Fallback to a simple colored div if image fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'block';
                      }}
                    />
                    <div 
                      className="w-8 h-8 mb-1 relative z-10 bg-gradient-to-br from-teal-400 to-purple-500 rounded-full hidden"
                      style={{ display: 'none' }}
                    />
                    <span className="text-xs text-muted-foreground text-center leading-tight relative z-10">
                      {skill.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;