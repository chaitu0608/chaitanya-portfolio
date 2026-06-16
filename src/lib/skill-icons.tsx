import type { SimpleIcon } from "simple-icons";
import {
  siAmazonwebservices,
  siAndroidstudio,
  siBootstrap,
  siC,
  siCanva,
  siCplusplus,
  siCss3,
  siDocker,
  siEthers,
  siExpress,
  siFastapi,
  siFigma,
  siFirebase,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siMongodb,
  siMui,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siNpm,
  siOpenjdk,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siShadcnui,
  siSolidity,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
} from "simple-icons";

type IconDef = Pick<SimpleIcon, "title" | "hex" | "path">;

const CUSTOM_ICONS: Record<string, IconDef> = {
  "VS Code": {
    title: "Visual Studio Code",
    hex: "007ACC",
    path: "M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.853 9.854a1.494 1.494 0 0 0-.29 1.705l2.376 4.95a1.494 1.494 0 0 0 1.705.29l9.853-9.853a1.494 1.494 0 0 0 .29-1.705l-2.377-4.95zM9.657 15.07l-2.812-2.812 8.803-8.803 2.812 2.812-8.803 8.803zm-1.06 1.06l-1.414 1.414-2.122-2.122 1.414-1.414 2.122 2.122zm11.314-11.314l-1.414 1.414-2.122-2.122 1.414-1.414 2.122 2.122z",
  },
  Azure: {
    title: "Microsoft Azure",
    hex: "0078D4",
    path: "M5.483 21.3H24L14.025 4.013l-3.038 8.347 5.836 6.38zM13.483 21.3L0 21.3l5.989-16.44L13.483 21.3z",
  },
  "Aceternity UI": {
    title: "Aceternity UI",
    hex: "A78BFA",
    path: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  },
  "Magic UI": {
    title: "Magic UI",
    hex: "F472B6",
    path: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  },
};

const SKILL_ICON_MAP: Record<string, SimpleIcon | IconDef> = {
  HTML: siHtml5,
  CSS: siCss3,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  React: siReact,
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
  Bootstrap: siBootstrap,
  "Material UI": siMui,
  ShadCN: siShadcnui,
  "Node.js": siNodedotjs,
  Express: siExpress,
  MongoDB: siMongodb,
  PostgreSQL: siPostgresql,
  SQL: siMysql,
  Firebase: siFirebase,
  Supabase: siSupabase,
  Solidity: siSolidity,
  "Ethers.js": siEthers,
  FastAPI: siFastapi,
  Git: siGit,
  GitHub: siGithub,
  npm: siNpm,
  "Android Studio": siAndroidstudio,
  Postman: siPostman,
  Figma: siFigma,
  Canva: siCanva,
  C: siC,
  "C++": siCplusplus,
  Java: siOpenjdk,
  Python: siPython,
  Docker: siDocker,
  AWS: siAmazonwebservices,
  Vercel: siVercel,
  ...CUSTOM_ICONS,
};

export function getSkillIcon(skillName: string): IconDef | undefined {
  return SKILL_ICON_MAP[skillName];
}

interface SkillIconProps {
  skillName: string;
  className?: string;
}

export function SkillIcon({ skillName, className = "h-2.5 w-2.5" }: SkillIconProps) {
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
