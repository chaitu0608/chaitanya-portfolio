import {
  Experience,
  Education,
  Project,
  TechCategory,
  ContactInfo,
  NavItem,
} from "@/types";

// Personal Information
export const personalInfo = {
  name: "Chaitanya Dhamdhere",
  title: "Full Stack Developer & Problem Solver",
  description:
    "Computer Engineering student passionate about building innovative web applications and solving complex problems through code.",
  tagline: "Building the future, one line of code at a time.",
};

// Contact Information
export const contactInfo: ContactInfo = {
  email: "c.dhamdhere@somaiya.edu",
  phone: "+91 8369137838",
  location: "Mumbai, India",
  githubUrl: "https://github.com/chaitu0608",
  linkedinUrl: "https://www.linkedin.com/in/chaitanya-dhamdhere/",
  resumeUrl: "/resume.pdf",
};

// Navigation Items
export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

// Experience Data
export const experiences: Experience[] = [
  {
    title: "Core Team Member",
    company: "KJSCE CodeCell",
    location: "Mumbai, India",
    period: "July 2024 - Present",
    logo: "🏢",
    website: "https://kjssecodecell.com/",
    description: "Technical community at K. J. Somaiya College of Engineering focused on fostering coding culture through workshops, hackathons, and competitive programming.",
    achievements: [
      "Delivered high-impact tech sessions to 200+ attendees on Competitive Programming, Development, and Web3, improving engagement and technical proficiency by designing beginner-friendly workshops and interactive contests.",
      "Led the organization of national-level hackathons (KJSCE DEVOPIA, KJSCE HACK 8) with 500+ participants and 10K+ online reach by managing cross-functional teams, streamlining operations, and executing strategic marketing campaigns, ensuring maximum outreach and seamless execution.",
    ],
  },
  {
    title: "Operations & Marketing Assistant",
    company: "Fresh@Home",
    location: "Mumbai, India",
    period: "2023-24",
    logo: "🏪",
    achievements: [
      "Spearheaded inventory and procurement strategies, significantly reducing wastage and maximizing profitability across both wholesale and retail segments",
      "Analyzed sales trends and seasonal demand to guide data-driven purchasing decisions and maintain optimal stock levels",
      "Sourced high-quality domestic and imported fruits while improving packaging to enhance shelf life and presentation",
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

// Projects Data
export const projects: Project[] = [
  {
    title: "ShieldEye",
    subtitle: "Advanced Threat Detection System",
    description:
      "Production-ready, full-stack cyberattack detection and visualization platform that identifies, analyzes, and classifies 12+ URL-based attacks in real time. Built for SIH 2025 | Team ShieldEye. Detects SQL Injection (error/union/time/blind), XSS (reflected/stored/DOM), SSRF, Directory Traversal, Command Injection, LFI/RFI, XXE, Web Shell Upload, Credential Stuffing, Brute Force, HTTP Parameter Pollution, and Typosquatting.",
    tech: ["Full-Stack", "Real-time", "Security", "AI/ML", "Visualization"],
    type: "Web Application",
    thumbnail: "/shieldeye.png",
    liveUrl: "https://shieldeye.vercel.app",
  },
  {
    title: "TrustWipe",
    subtitle: "Secure Data Wiping System",
    description:
      "Designed a secure wiping engine implementing NIST SP 800-88 standards with overwrite, secure-erase, and crypto-erase methods. Developed a user-friendly React frontend for easy interaction and status monitoring. Built a robust Node.js backend to manage wipe requests, schedule tasks, and log activities.",
    tech: ["C++", "Python", "Kotlin", "Swift", "Electron", "Node.js", "Express", "PostgreSQL", "MongoDB", "Firebase", "OpenSSL"],
    type: "Desktop Application",
    thumbnail: "/trustwipe.jpg",
    githubUrl: "https://github.com/chaitu0608/trustwipe",
    liveUrl: "https://trustwipe.vercel.app/",
  },
  {
    title: "StarQuest",
    subtitle: "ETHGlobal Project",
    description:
      "A decentralized application built for ETHGlobal hackathon focusing on blockchain integration and smart contract development. Features include user authentication, transaction management, and real-time updates.",
    tech: ["React", "Solidity", "Web3.js", "Ethereum", "IPFS", "MetaMask"],
    type: "Web3 Application",
    thumbnail: "/StarQuest.jpeg",
    githubUrl: "https://github.com/chaitu0608/starquest",
    liveUrl: "https://starquest-demo.com",
  },
  {
    title: "Padhle",
    subtitle: "Learning Management System",
    description:
      "Role-based system with attendance tracking and course management. AJAX-powered interface with real-time updates. Secure session management and SQL injection prevention.",
    tech: ["AJAX", "PHP", "MySQL", "JavaScript", "HTML/CSS"],
    type: "Web Application",
    thumbnail: "/padhle.png",
    githubUrl: "https://github.com/chaitu0608/padhle",
    liveUrl: "https://padhle-demo.com",
  },
  {
    title: "Vertex Cover Simulator",
    subtitle: "Algorithm Visualization",
    description:
      "Interactive visualization tool for understanding vertex cover algorithms. Features step-by-step execution, performance metrics, and educational content for computer science students.",
    tech: ["JavaScript", "D3.js", "HTML5", "CSS3", "Algorithm Visualization"],
    type: "Web Application",
    thumbnail: "/Vertex-Simulator.png",
    githubUrl: "https://github.com/chaitu0608/vertex-cover-simulator",
    liveUrl: "https://bhoumishgrover.github.io/Vertex-Cover-Simulator/",
  },
  {
    title: "JournalMate",
    subtitle: "JavaFX Desktop App",
    description:
      "Built a secure and user-friendly digital diary application with a dynamic JavaFX interface, focusing on smooth navigation and interactivity. Implemented robust features like password-protected access and rich-text content editing.",
    tech: ["JavaFX", "Java", "SQLite", "CSS", "OOPM"],
    type: "Desktop Application",
    githubUrl: "https://github.com/chaitu0608/journalmate",
  },
  {
    title: "Weather App",
    subtitle: "React Weather Dashboard",
    description:
      "A responsive weather application built with React featuring real-time weather data, location-based forecasts, and interactive charts. Includes dark/light mode and offline capabilities.",
    tech: ["React", "JavaScript", "API Integration", "Chart.js", "CSS3", "Responsive Design"],
    type: "Web Application",
    githubUrl: "https://github.com/chaitu0608/weather-app",
    liveUrl: "https://weather-app-demo.com",
  },
  {
    title: "Next-Ama App",
    subtitle: "Full Stack Authentication",
    description:
      "Built a robust full-stack authentication system using Next.js (App Router), TypeScript, and MongoDB, following best practices from the 'Chai aur Code' Next.js Auth playlist.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Authentication", "Tailwind CSS", "Prisma", "NextAuth.js"],
    type: "Full Stack Application",
    githubUrl: "https://github.com/chaitu0608/next-ama-app",
    liveUrl: "https://next-ama-demo.com",
  },
];

// Tech Stack Data
export const techCategories: TechCategory[] = [
  {
    category: "Languages",
    skills: [
      "C++",
      "Python",
      "C",
      "Java",
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "SQL",
      "PHP",
      "R",
    ],
    color: "bg-gradient-primary",
  },
  {
    category: "Web Development",
    skills: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "Web3.js",
      "Ethers.js",
      "Solidity",
      "Tailwind CSS",
      "Bootstrap",
      "FastAPI",
    ],
    color: "bg-gradient-secondary",
  },
  {
    category: "Cloud / Databases",
    skills: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Firebase",
      "Supabase",
      "Vercel",
      "Cloudflare",
      "Microsoft Azure",
    ],
    color: "bg-gradient-accent",
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "Docker", "Arduino", "Notion"],
    color: "bg-gradient-primary",
  },
  {
    category: "Data Science & AI",
    skills: ["NumPy", "pandas", "OpenCV", "Matplotlib", "Jupyter Notebook"],
    color: "bg-gradient-secondary",
  },
  {
    category: "Soft Skills",
    skills: [
      "Adaptability",
      "Leadership",
      "Team Collaboration",
      "Problem Solving",
      "Quick Learning",
      "Presentation",
    ],
    color: "bg-gradient-accent",
  },
];
