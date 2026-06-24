import type { SimpleIcon } from "simple-icons";
import {
  siAmazonwebservices,
  siAndroidstudio,
  siAnthropic,
  siAppium,
  siBootstrap,
  siC,
  siCanva,
  siCplusplus,
  siChartdotjs,
  siCss3,
  siD3,
  siDocker,
  siElectron,
  siEthereum,
  siEthers,
  siExpo,
  siExpress,
  siFastapi,
  siFigma,
  siFirebase,
  siFramer,
  siGit,
  siGithub,
  siGooglecloud,
  siHtml5,
  siIpfs,
  siJavascript,
  siKotlin,
  siMongodb,
  siMui,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siNpm,
  siOpenai,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPostman,
  siPrisma,
  siPython,
  siReact,
  siShadcnui,
  siSolidity,
  siSupabase,
  siSwift,
  siTailwindcss,
  siTerraform,
  siTypescript,
  siVercel,
  siVite,
  siWeb3dotjs,
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
  "React Native": {
    title: "React Native",
    hex: "61DAFB",
    path: "M14.23 12.004a2.296 2.296 0 0 1-.67 1.625l-1.186 1.186a2.296 2.296 0 0 1-3.248 0l-1.186-1.186a2.296 2.296 0 0 1 0-3.248l1.186-1.186a2.296 2.296 0 0 1 3.248 0l1.186 1.186a2.296 2.296 0 0 1 .67 1.625zm-5.486 0a2.296 2.296 0 0 1 .67-1.625l1.186-1.186a2.296 2.296 0 0 1 3.248 0l1.186 1.186a2.296 2.296 0 0 1 0 3.248l-1.186 1.186a2.296 2.296 0 0 1-3.248 0l-1.186-1.186a2.296 2.296 0 0 1-.67-1.625zM12 2.004c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.527 2 12.004 6.477 2.004 12 2.004z",
  },
  "AI/ML": {
    title: "AI / ML",
    hex: "A78BFA",
    path: "M12 2a4 4 0 0 1 4 4v1h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2V6a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v1h4V6a2 2 0 0 0-2-2zm-1 8a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2z",
  },
  VLM: {
    title: "Vision Language Model",
    hex: "34D399",
    path: "M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4l-4 3-4-3H6a2 2 0 0 1-2-2V5zm4 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  },
  "CI/CD": {
    title: "CI/CD",
    hex: "22C55E",
    path: "M4 6a2 2 0 0 1 2-2h3v2H6v12h12V8h-3V6h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm7-2V2h2v2h-2zm-1 6h2v6h-2V10zm4 0h2v6h-2V10z",
  },
  DevSecOps: {
    title: "DevSecOps",
    hex: "38BDF8",
    path: "M12 2l9 4.5v9L12 20l-9-4.5v-9L12 2zm0 2.18L5 7.5 12 10.82 19 7.5 12 4.18zM5 16.32V9.18l7 3.32v7.14l-7-3.32zm14 0l-7 3.32v-7.14l7-3.32v7.14z",
  },
  SQLite: {
    title: "SQLite",
    hex: "003B57",
    path: "M12 2C7.03 2 3 6.03 3 11c0 2.2.9 4.18 2.34 5.62L12 22l6.66-5.38A7.96 7.96 0 0 0 21 11c0-4.97-4.03-9-9-9z",
  },
  Playwright: {
    title: "Playwright",
    hex: "2EAD33",
    path: "M4 4h16v16H4V4zm3 3v10h2.5l2-6 2 6H16V7h-2v8.5l-2.25-6.75L9.5 15.5V7H7z",
  },
};

const SKILL_ICON_MAP: Record<string, SimpleIcon | IconDef> = {
  HTML: siHtml5,
  CSS: siCss3,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  React: siReact,
  "React Native": CUSTOM_ICONS["React Native"],
  Expo: siExpo,
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
  Vite: siVite,
  Electron: siElectron,
  "D3.js": siD3,
  "Chart.js": siChartdotjs,
  "Framer Motion": siFramer,
  Bootstrap: siBootstrap,
  "Material UI": siMui,
  ShadCN: siShadcnui,
  "Node.js": siNodedotjs,
  Express: siExpress,
  FastAPI: siFastapi,
  Python: siPython,
  MongoDB: siMongodb,
  PostgreSQL: siPostgresql,
  SQL: siMysql,
  SQLite: CUSTOM_ICONS.SQLite,
  Prisma: siPrisma,
  PHP: siPhp,
  Firebase: siFirebase,
  Supabase: siSupabase,
  Solidity: siSolidity,
  "Web3.js": siWeb3dotjs,
  "Ethers.js": siEthers,
  Ethereum: siEthereum,
  IPFS: siIpfs,
  Playwright: CUSTOM_ICONS.Playwright,
  Appium: siAppium,
  OpenAI: siOpenai,
  Anthropic: siAnthropic,
  "AI/ML": CUSTOM_ICONS["AI/ML"],
  VLM: CUSTOM_ICONS.VLM,
  Kotlin: siKotlin,
  Swift: siSwift,
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
  Docker: siDocker,
  Terraform: siTerraform,
  AWS: siAmazonwebservices,
  Azure: CUSTOM_ICONS.Azure,
  "Google Cloud": siGooglecloud,
  Vercel: siVercel,
  "CI/CD": CUSTOM_ICONS["CI/CD"],
  DevSecOps: CUSTOM_ICONS.DevSecOps,
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
