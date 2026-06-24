import {
  Experience,
  Education,
  Project,
  ContactInfo,
} from "@/types";
import { MEET_URL, RESUME_PATH } from "@/data/links";

/** Cloudinary-hosted static assets (migrated from public/) */
export const cloudinaryAssets = {
  og: "https://www.cdhamdhere.xyz/og.png",
  jio: "https://res.cloudinary.com/dlejfav7z/image/upload/v1780658902/jio_w3g71c.png",
  rxgpt:
    "https://res.cloudinary.com/dlejfav7z/image/upload/v1782286508/T09CL6WUBNU-U09CL6WUC1E-cf6b1918ac92-512_zvbvns.jpg",
  codecell:
    "https://res.cloudinary.com/dlejfav7z/image/upload/v1780658847/codecell_vipmzf.png",
  padhle:
    "https://res.cloudinary.com/dlejfav7z/image/upload/v1780658989/padhle_c9ruf7.png",
  starQuest:
    "https://res.cloudinary.com/dlejfav7z/image/upload/v1780659033/StarQuest_myyvff.jpg",
  trustwipe:
    "https://res.cloudinary.com/dlejfav7z/image/upload/v1780659095/trustwipe_jnfpug.jpg",
  tutelage:
    "https://res.cloudinary.com/dlejfav7z/image/upload/v1780659130/tutelage_ddgcra.png",
  vertexSimulator:
    "https://res.cloudinary.com/dlejfav7z/image/upload/v1780659152/Vertex-Simulator_qmgeh3.png",
  shieldeye:
    "https://res.cloudinary.com/dlejfav7z/image/upload/v1780659718/shieldeye_pxr70b.png",
  zkMultiCloud:
    "https://res.cloudinary.com/dlejfav7z/image/upload/v1780666318/Screenshot_2026-06-05_at_7.01.23_PM_zxo7rg.png",
  verifyr: "/verifyr-preview.png",
} as const;

/** GitHub social preview for projects without a custom thumbnail */
export function githubOgPreview(owner: string, repo: string): string {
  return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
}

/** Circular profile logo — sourced from PHOTOS[0] ("this is me") */
export const brandAssets = {
  avatar: "/avatar.png",
  favicon: "/favicon.png",
  avatarCloudinary:
    "https://res.cloudinary.com/dlejfav7z/image/upload/f_auto,q_auto,w_180,h_180,c_fill,r_max/v1780516051/WhatsApp_Image_2026-06-04_at_01.09.30_ambcsl.jpg",
} as const;

// Personal Information
export const personalInfo = {
  name: "Chaitanya Dhamdhere",
  nickname: "chaitu",
  title: "Engineer · Builder · Freelancer · Student · Business · Explorer",
  description:
    "21-year-old Computer Engineering student from Mumbai building full-stack apps, developer tools, and practical AI — from zero to something people actually use.",
  tagline: "I design, build, and ship software that people actually use.",
};

/** About section — typed in about.txt; `##` sections, `>` pull quotes, `//` comments */
export const aboutLines = [
  "## what i ship",
  "I build *full-stack apps*, developer tools, and practical AI —",
  "taking ideas from zero to something people actually use.",
  "",
  "## outside the terminal",
  "Outside code: my family's fruit trading business at *APMC*.",
  "Wholesale, retail, export — *mangoes*, strawberries, real logistics.",
  "That side taught me supply chains, margins, and trust",
  "no tutorial could.",
  "",
  "## how i think",
  "Engineering + entrepreneurship shaped how I think:",
  "systems, leverage, and what it takes to ship in the real world.",
  "",
  "Also into startups, finance, and how companies get built.",
  "> I build. I learn. I ship.",
  "Most of what I make starts as a question I couldn't drop.",
  "",
  "Currently building, learning, figuring it out — one project at a time.",
  "",
  "// always up for good conversations, good food, good business ideas and obv good mangoes.",
] as const;

// Contact Information
export const contactInfo: ContactInfo = {
  email: "c.dhamdhere@somaiya.edu",
  phone: "+91 8369137838",
  location: "Mumbai, India",
  githubUrl: "https://github.com/chaitu0608",
  linkedinUrl: "https://www.linkedin.com/in/chaitanya-dhamdhere/",
  twitterUrl: "https://twitter.com/chaitu0608",
  resumeUrl: RESUME_PATH,
  meetUrl: MEET_URL,
};

/** Recruiter-facing meta — rendered as env vars in About identity pane */
export const aboutMeta = {
  role: personalInfo.title,
  location: contactInfo.location,
  status: "open to internships & collaborations",
  school: "KJ Somaiya College of Engineering, Mumbai · Computer Engineering",
} as const;

// Experience Data
export const experiences: Experience[] = [
  {
    title: "Full Stack Developer Intern",
    company: "RxGPT",
    location: "Mumbai, India",
    period: "Jun 2026 - Aug 2026",
    logo: cloudinaryAssets.rxgpt,
    logoFit: "cover",
    logoBg: "dark",
    website: "https://www.linkedin.com/company/rxgpt/",
    description:
      "Full-stack intern at RxGPT — building product features for smarter hospitals and better patient care.",
    achievements: [
      "Contributing across the stack on RxGPT's healthcare platform — frontend, APIs, and integrations.",
      "Shipping intern deliverables in a fast-moving health-tech product environment.",
    ],
  },
  {
    title: "Software Development Intern",
    company: "Jio Platforms Limited",
    location: "Mumbai, India",
    period: "Dec 2025 - Jan 2026",
    logo: cloudinaryAssets.jio,
    logoFit: "contain",
    logoBg: "light",
    description:
      "Interned with Jio-Events and Spectrum Jio — enterprise platforms, AI learning games, and a full-stack capstone.",
    achievements: [
      "Studied the Jio-Events webinar platform — UI architecture, data flow, and dev lifecycles.",
      "Designed frontend interactions for AI-driven learning games under Spectrum Jio.",
      "Shipped KanbanFlow as an end-to-end capstone project.",
    ],
  },
  {
    title: "Core Team Member",
    company: "KJSCE CodeCell",
    location: "Mumbai, India",
    period: "July 2024 - Present",
    logo: cloudinaryAssets.codecell,
    logoFit: "contain",
    logoBg: "light",
    website: "https://kjssecodecell.com/",
    description:
      "Core team at KJSCE's technical community — workshops, hackathons, and competitive programming.",
    achievements: [
      "Ran tech sessions for 200+ students across CP, dev, and Web3.",
      "Co-led national hackathons (DEVOPIA, HACK 8) — 500+ participants, 10K+ reach.",
    ],
  },
  {
    title: "Operations & Marketing Assistant",
    company: "Fresh@Home",
    location: "Mumbai, India",
    period: "2023-24",
    logo: "🥭",
    description:
      "Family fruit trading business at APMC — wholesale, retail, and export. Real logistics, margins, and supply chains outside the terminal.",
    achievements: [
      "Managed inventory and procurement across wholesale and retail — cut wastage, improved margins.",
      "Used sales trends and seasonal demand to guide stock and sourcing decisions.",
    ],
  },
];

// Education Data
export const education: Education[] = [
  {
    degree: "Bachelor of Technology in Computer Engineering",
    institution: "K.J. Somaiya College of Engineering",
    location: "Mumbai, India",
    period: "Jul. 2023 - May 2027",
    gpa: "Currently pursuing",
    icon: "🎓",
  },
];

// Projects Data (order + size drives bento layout in Projects.tsx)
export const projects: Project[] = [
  {
    title: "Verifyr",
    size: "wide",
    subtitle: "Autonomous Mobile QA Agent",
    summary:
      "Vision-language agent that drives real Android apps, verifies on-screen values, and runs web-to-mobile parity checks.",
    description:
      "Verifyr is an autonomous mobile QA agent that drives a real Android app on an emulator using a vision-language model: it reads each screen (screenshot + accessibility tree), decides one action at a time, executes through Appium, and repeats until the goal is reached. It can verify what the app displays against a source-of-truth value from a website or API.",
    problem:
      "Mobile QA teams need reliable, repeatable checks that reconcile live app UI against web and API sources of truth — without brittle manual test scripts.",
    solution:
      "Built an importable Python engine with CLI agent, parity checker, and a FastAPI + React dashboard — live WebSocket step streaming, scheduled checks, Supabase-backed auth and artifacts, and eval harness for Pass@N reliability.",
    impact: [
      "Three surfaces on one engine: CLI agent, parity checker, and web dashboard",
      "Reliability backstops: loop detection, error tolerance, step budgets, verifier gating",
      "Structured per-step artifacts and evaluation harness for measuring agent reliability",
    ],
    highlights: [
      "VLM-driven agent loop with Appium + accessibility tree observations",
      "Web-to-mobile parity reconciliation across web, API, and live app UI",
      "Dockerized deployment with Supabase Auth, Postgres, and Storage",
    ],
    tech: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Appium",
      "VLM",
      "Supabase",
      "Docker",
    ],
    type: "Full Stack Application",
    githubUrl: "https://github.com/tkshsbcue/Verifyr",
    thumbnail: cloudinaryAssets.verifyr,
    featured: true,
  },
  {
    title: "ShieldEye",
    size: "hero",
    featured: true,
    subtitle: "Advanced Threat Detection System",
    summary:
      "Real-time URL threat scanner that detects and visualizes 12+ attack types.",
    description:
      "Production-ready, full-stack cyberattack detection and visualization platform that identifies, analyzes, and classifies 12+ URL-based attacks in real time. Built for SIH 2025 | Team ShieldEye. Detects SQL Injection (error/union/time/blind), XSS (reflected/stored/DOM), SSRF, Directory Traversal, Command Injection, LFI/RFI, XXE, Web Shell Upload, Credential Stuffing, Brute Force, HTTP Parameter Pollution, and Typosquatting.",
    problem:
      "Security teams need fast, explainable URL threat analysis without spinning up heavy enterprise tooling.",
    solution:
      "Built a full-stack detector with real-time classification, attack dashboards, and ML-assisted pattern matching across 12+ attack vectors.",
    impact: [
      "12+ attack types detected in real time with visual breakdowns",
      "Deployed production instance on Vercel for demos and SIH judging",
      "End-to-end stack: scanning engine, API layer, and interactive UI",
    ],
    highlights: [
      "Unified detection pipeline for SQLi, XSS, SSRF, and traversal variants",
      "Attack visualization for non-technical stakeholders",
    ],
    tech: ["Full-Stack", "Real-time", "Security", "AI/ML", "Visualization"],
    type: "Web Application",
    thumbnail: cloudinaryAssets.shieldeye,
    liveUrl: "https://shieldeye.vercel.app",
  },
  {
    title: "SpendSense",
    size: "tall",
    featured: true,
    subtitle: "Free AI Spend Audit Tool",
    summary:
      "No-login audit that benchmarks AI subscriptions and surfaces instant savings.",
    description:
      "Free AI tool spend audit — list your tools, plans, seats and monthly spend, get an instant shareable report with downgrades, seat fixes and savings math. Benchmarks 8 vendors (Cursor, Copilot, Claude, ChatGPT, Anthropic API, OpenAI API, Gemini, Windsurf) against public list pricing. Rule-based math, no login, under 3 minutes.",
    problem:
      "Teams overspend on overlapping AI subscriptions with no quick way to benchmark seats and plans.",
    solution:
      "Shipped a zero-login audit flow with vendor benchmarks, savings math, and shareable OG reports.",
    impact: [
      "8 AI vendors benchmarked against public list pricing",
      "Shareable report generated in under 3 minutes",
      "No auth required — frictionless lead-gen style UX",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Product Analytics", "Vercel OG"],
    type: "Web Application",
    thumbnail: "https://credex-intern.vercel.app/opengraph-image?619e52654fdd82d8",
    liveUrl: "https://credex-intern.vercel.app/",
  },
  {
    title: "ZkMultiCloud",
    size: "wide",
    featured: true,
    subtitle: "Zero-Trust DevSecOps Multi-Cloud Platform",
    summary:
      "Visual platform to design and deploy secure CI/CD pipelines across AWS, Azure, and GCP.",
    description:
      "Web-based Zero-Trust DevSecOps platform to visually design, automate, and deploy multi-cloud CI/CD pipelines across AWS, Azure, and GCP using Terraform-based Infrastructure as Code.",
    problem:
      "Teams struggle to standardize secure CI/CD pipelines across multiple cloud providers without building separate tooling per environment.",
    solution:
      "Built a unified TypeScript platform with visual pipeline composition and Terraform-driven deployment workflows for AWS, Azure, and Google Cloud.",
    impact: [
      "Single workflow for multi-cloud pipeline design and delivery",
      "Zero-Trust DevSecOps framing for safer cloud operations",
      "Live web app deployed for portfolio demos and validation",
    ],
    highlights: [
      "Visual pipeline orchestration with IaC automation",
      "Cloud-agnostic flow covering AWS, Azure, and GCP",
    ],
    tech: ["TypeScript", "Terraform", "DevSecOps", "CI/CD", "AWS", "Azure", "GCP"],
    type: "Web Application",
    githubUrl: "https://github.com/chaitu0608/ZkMultiCloud",
    liveUrl: "https://zk-multi-cloud-frontend.vercel.app",
    thumbnail: cloudinaryAssets.zkMultiCloud,
  },
  {
    title: "TrustWipe",
    size: "wide",
    featured: true,
    subtitle: "Secure Data Wiping System",
    summary:
      "NIST SP 800-88 compliant wiping engine with a cross-platform control UI.",
    description:
      "Designed a secure wiping engine implementing NIST SP 800-88 standards with overwrite, secure-erase, and crypto-erase methods. Developed a user-friendly React frontend for easy interaction and status monitoring. Built a robust Node.js backend to manage wipe requests, schedule tasks, and log activities.",
    problem:
      "Organizations need verifiable, standards-compliant data erasure before device resale or disposal.",
    solution:
      "Engineered a NIST SP 800-88 compliant wipe engine with overwrite, secure-erase, and crypto-erase paths plus a React + Electron control UI.",
    impact: [
      "Multiple wipe methods aligned to NIST SP 800-88",
      "Cross-platform desktop shell with status monitoring",
      "Open-source on GitHub with live demo deployment",
    ],
    tech: ["C++", "Python", "Kotlin", "Swift", "Electron", "Node.js", "Express", "PostgreSQL", "MongoDB", "Firebase", "OpenSSL"],
    type: "Desktop Application",
    thumbnail: cloudinaryAssets.trustwipe,
    githubUrl: "https://github.com/chaitu0608/trustwipe",
    liveUrl: "https://trustwipe.vercel.app/",
  },
  {
    title: "Tutelage",
    size: "half",
    featured: true,
    subtitle: "Educational Social Platform",
    summary:
      "Mobile social app for CA, CS, and CMA students to share study materials.",
    description:
      "Full-featured educational social platform for Indian professional certification students (CA, CS, CMA). Allows users to share study materials, organize content by books and topics, build personalized learning feeds, connect with mentors, and interact via likes, comments, and bookmarks. Mobile app built with React Native + Expo, backend with Node.js/Express and MongoDB, OTP-based auth, AWS S3 storage and extensive post/topic models.",
    tech: ["React Native", "Expo", "TypeScript", "Node.js", "Express", "MongoDB", "AWS S3"],
    type: "Mobile Application",
    thumbnail: cloudinaryAssets.tutelage,
  },
  {
    title: "StarQuest",
    size: "half",
    featured: true,
    subtitle: "ETHGlobal Project",
    summary:
      "Hackathon Web3 app with smart contracts, wallet auth, and on-chain flows.",
    description:
      "A decentralized application built for ETHGlobal hackathon focusing on blockchain integration and smart contract development. Features include user authentication, transaction management, and real-time updates.",
    tech: ["React", "Solidity", "Web3.js", "Ethereum", "IPFS", "MetaMask"],
    type: "Web3 Application",
    thumbnail: cloudinaryAssets.starQuest,
  },
  {
    title: "Padhle",
    size: "third",
    subtitle: "Learning Management System",
    description:
      "Role-based system with attendance tracking and course management. AJAX-powered interface with real-time updates. Secure session management and SQL injection prevention.",
    tech: ["AJAX", "PHP", "MySQL", "JavaScript", "HTML/CSS"],
    type: "Web Application",
    thumbnail: cloudinaryAssets.padhle,
    githubUrl: "https://github.com/chaitu0608/padhle",
    liveUrl: undefined,
  },
  {
    title: "Vertex Cover Simulator",
    size: "third",
    subtitle: "Algorithm Visualization",
    description:
      "Interactive visualization tool for understanding vertex cover algorithms. Features step-by-step execution, performance metrics, and educational content for computer science students.",
    tech: ["JavaScript", "D3.js", "HTML5", "CSS3", "Algorithm Visualization"],
    type: "Web Application",
    thumbnail: cloudinaryAssets.vertexSimulator,
    githubUrl: "https://github.com/chaitu0608/vertex-cover-simulator",
    liveUrl: "https://bhoumishgrover.github.io/Vertex-Cover-Simulator/",
  },
  {
    title: "Next-Ama App",
    size: "third",
    subtitle: "Full Stack Authentication",
    description:
      "Built a robust full-stack authentication system using Next.js (App Router), TypeScript, and MongoDB, following best practices from the 'Chai aur Code' Next.js Auth playlist.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Authentication", "Tailwind CSS", "Prisma", "NextAuth.js"],
    type: "Full Stack Application",
    githubUrl: "https://github.com/chaitu0608/next-ama-app",
    thumbnail: githubOgPreview("chaitu0608", "next-ama-app"),
  },
  {
    title: "JournalMate",
    size: "third",
    subtitle: "JavaFX Desktop App",
    description:
      "Built a secure and user-friendly digital diary application with a dynamic JavaFX interface, focusing on smooth navigation and interactivity. Implemented robust features like password-protected access and rich-text content editing.",
    tech: ["JavaFX", "Java", "SQLite", "CSS", "OOPM"],
    type: "Desktop Application",
    githubUrl: "https://github.com/chaitu0608/journalmate",
    thumbnail: githubOgPreview("chaitu0608", "journalmate"),
  },
  {
    title: "Weather App",
    size: "third",
    subtitle: "React Weather Dashboard",
    description:
      "A responsive weather application built with React featuring real-time weather data, location-based forecasts, and interactive charts. Includes dark/light mode and offline capabilities.",
    tech: ["React", "JavaScript", "API Integration", "Chart.js", "CSS3", "Responsive Design"],
    type: "Web Application",
    githubUrl: "https://github.com/chaitu0608/weather-app",
    thumbnail: githubOgPreview("chaitu0608", "weather-app"),
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const archiveProjects = projects.filter((p) => !p.featured);
