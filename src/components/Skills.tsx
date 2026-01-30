import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CardSpotlight } from '@/components/ui/card-spotlight';

const SMOOTH_EASE = [0.25, 0.46, 0.45, 0.94] as const;

const Skills = () => {
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const firstRowRef = useRef<HTMLDivElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);
  const firstRowInView = useInView(firstRowRef, { once: true, margin: "-60px" });
  const secondRowInView = useInView(secondRowRef, { once: true, margin: "-60px" });

  // Define all the skill logos with their names and logo URLs
  const skills = [
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Matplotlib', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg' },
    { name: 'Jupyter Notebook', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
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
    { name: 'Cloudflare', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg' },
    { name: 'Ethers.js', logo: 'https://raw.githubusercontent.com/ethers-io/ethers.js/main/docs/ethers.svg' },
    { name: 'Web3.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/web3js/web3js-original.svg' },
    { name: 'Bootstrap', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
    { name: 'Aceternity UI', logo: 'https://aceternity.com/favicon.ico' },
    { name: 'Magic UI', logo: 'https://magicui.design/favicon.ico' },
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Express.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    { name: 'Rust', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg' },
    { name: 'XML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xml/xml-original.svg' },
    { name: 'AutoCAD', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/autocad/autocad-original.svg' },
    { name: 'Tally', logo: 'https://tally.so/favicon.ico' },
    { name: 'Notion', logo: 'https://www.notion.so/front-static/favicon.ico' },
    { name: 'R', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' },
  ];

  // Split skills into two rows
  const firstRow = skills.slice(0, Math.ceil(skills.length / 2));
  const secondRow = skills.slice(Math.ceil(skills.length / 2));

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 px-4 md:px-6 lg:px-8 relative overflow-hidden continuous-bg section-transition scroll-smooth"
    >
      {/* Static background – in line with Work Experience */}
      <div className="absolute inset-0 bokeh-bg opacity-20" />
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-accent opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-teal-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header – scroll Y animation, matches Experience */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: SMOOTH_EASE }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            <motion.span
              className="text-gradient"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={headerInView ? { backgroundPosition: "100% 50%" } : { backgroundPosition: "0% 50%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              Skills & Technologies
            </motion.span>
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-accent mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            animate={headerInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />
          <TypewriterSubtitle inView={headerInView} />
        </motion.div>

        {/* Skills rows – scroll Y-axis reveal, smooth */}
        <div className="space-y-8">
          {/* First row – animates up when in view */}
          <motion.div
            ref={firstRowRef}
            className="flex gap-6 overflow-hidden"
            initial={{ opacity: 0, y: 56 }}
            animate={firstRowInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 56 }}
            transition={{ duration: 0.75, ease: SMOOTH_EASE, delay: 0.15 }}
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
                repeatType: "loop",
              }}
              style={{ animationPlayState: isHovered ? "paused" : "running" }}
            >
              {[...firstRow, ...firstRow].map((skill, index) => (
                <SkillCard key={`first-${index}`} skill={skill} />
              ))}
            </motion.div>
          </motion.div>

          {/* Second row – animates up when in view */}
          <motion.div
            ref={secondRowRef}
            className="flex gap-6 overflow-hidden"
            initial={{ opacity: 0, y: 56 }}
            animate={secondRowInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 56 }}
            transition={{ duration: 0.75, ease: SMOOTH_EASE, delay: 0.3 }}
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
                repeatType: "loop",
              }}
              style={{ animationPlayState: isHovered ? "paused" : "running" }}
            >
              {[...secondRow, ...secondRow].map((skill, index) => (
                <SkillCard key={`second-${index}`} skill={skill} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

// Single skill card for marquee rows
const SkillCard: React.FC<{ skill: { name: string; logo: string } }> = ({ skill }) => (
  <motion.div
    className="flex-shrink-0"
    whileHover={{ scale: 1.1, y: -5, transition: { duration: 0.3, ease: SMOOTH_EASE } }}
  >
    <CardSpotlight className="w-20 h-20 p-4">
      <div className="flex flex-col items-center justify-center h-full">
        <motion.img
          src={skill.logo}
          alt={skill.name}
          className="w-8 h-8 mb-1 object-contain"
          whileHover={{
            rotate: 360,
            scale: 1.2,
            filter: "brightness(1.2) saturate(1.3)",
          }}
          transition={{ duration: 0.6, ease: "easeInOut", scale: { duration: 0.3 } }}
          onError={(e) => {
            const el = e.currentTarget;
            el.style.display = "none";
            const fallback = el.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = "block";
          }}
        />
        <div
          className="w-8 h-8 mb-1 bg-gradient-to-br from-teal-400 to-purple-500 rounded-full hidden"
          style={{ display: "none" }}
        />
        <motion.span
          className="text-xs text-muted-foreground text-center leading-tight"
          whileHover={{ color: "hsl(var(--accent))", scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          {skill.name}
        </motion.span>
      </div>
    </CardSpotlight>
  </motion.div>
);

// Subtitle with typewriter; animation synced to header inView
const TypewriterSubtitle: React.FC<{ inView?: boolean }> = ({ inView = false }) => {
  const fullText = "Tools that get the job done.";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => (i < fullText.length ? fullText.slice(0, ++i) : prev));
      if (i >= fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <motion.p
      className="text-lg text-muted-foreground max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay: 0.5, ease: SMOOTH_EASE }}
    >
      {displayed}
      <span
        className="inline-block w-3 h-5 align-middle bg-accent ml-1 animate-pulse font-mono"
        style={{ opacity: displayed.length === fullText.length ? 0 : 1 }}
      />
    </motion.p>
  );
};