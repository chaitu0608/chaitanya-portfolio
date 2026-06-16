export interface SkillCategory {
  id: string;
  label: string;
  mod: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "frontend",
    mod: "MOD_01",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
      "Material UI",
      "ShadCN",
      "Aceternity UI",
      "Magic UI",
    ],
  },
  {
    id: "backend",
    label: "backend",
    mod: "MOD_02",
    skills: [
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "SQL",
      "Firebase",
      "Supabase",
      "Solidity",
      "Ethers.js",
      "FastAPI",
    ],
  },
  {
    id: "tools",
    label: "tools",
    mod: "MOD_03",
    skills: [
      "Git",
      "GitHub",
      "npm",
      "VS Code",
      "Android Studio",
      "Postman",
      "Figma",
      "Canva",
    ],
  },
  {
    id: "languages",
    label: "languages",
    mod: "MOD_04",
    skills: ["C", "C++", "Java", "Python"],
  },
  {
    id: "cloud",
    label: "cloud",
    mod: "MOD_05",
    skills: ["Docker", "Azure", "AWS", "Vercel"],
  },
];
