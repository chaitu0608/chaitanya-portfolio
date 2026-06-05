import type { SimpleIcon } from "simple-icons";
import {
  siBootstrap,
  siCplusplus,
  siCloudflare,
  siCss3,
  siDocker,
  siExpress,
  siFastapi,
  siFirebase,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siJupyter,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siNotion,
  siNumpy,
  siPandas,
  siPhp,
  siPostgresql,
  siPython,
  siR,
  siReact,
  siSolidity,
  siTailwindcss,
  siTypescript,
  siVercel,
  siWeb3dotjs,
} from "simple-icons";

const SKILL_ICON_MAP: Record<string, SimpleIcon> = {
  "C++": siCplusplus,
  Python: siPython,
  HTML: siHtml5,
  CSS: siCss3,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  SQL: siPostgresql,
  PHP: siPhp,
  R: siR,
  "React.js": siReact,
  "Next.js": siNextdotjs,
  "Node.js": siNodedotjs,
  "Express.js": siExpress,
  "Web3.js": siWeb3dotjs,
  "Tailwind CSS": siTailwindcss,
  Bootstrap: siBootstrap,
  MongoDB: siMongodb,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  Firebase: siFirebase,
  Vercel: siVercel,
  Cloudflare: siCloudflare,
  Git: siGit,
  GitHub: siGithub,
  Docker: siDocker,
  Notion: siNotion,
  NumPy: siNumpy,
  pandas: siPandas,
  "Jupyter Notebook": siJupyter,
  Solidity: siSolidity,
  FastAPI: siFastapi,
};

export function getSkillIcon(skillName: string): SimpleIcon | undefined {
  return SKILL_ICON_MAP[skillName];
}

interface SkillIconProps {
  skillName: string;
  className?: string;
}

export function SkillIcon({ skillName, className = "h-4 w-4" }: SkillIconProps) {
  const icon = getSkillIcon(skillName);
  if (!icon) return null;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill={`#${icon.hex}`}
      aria-hidden
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}
