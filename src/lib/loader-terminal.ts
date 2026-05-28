import { personalInfo, projects } from "@/data/portfolio";

const topProjects = projects
  .slice(0, 3)
  .map((p) => p.title)
  .join(" · ");

export const LOADER_COMMANDS = [
  "whoami",
  "npx chaitu-portfolio boot",
  "export OPEN_TO_WORK=true",
];

export const LOADER_OUTPUTS: Record<number, string[]> = {
  0: [`✓ ${personalInfo.name} — Full Stack Developer`],
  1: [
    "→ 200 OK · React · TypeScript · Node.js · Mumbai",
    `→ ${topProjects} (+${Math.max(0, projects.length - 3)} more)`,
  ],
  2: ["→ Hiring? Contact below · ChaitanyaResume.pdf"],
};
