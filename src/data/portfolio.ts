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
    period: "Nov. 2023 - Present",
    logo: "🏢",
    achievements: [
      "Delivered high-impact tech sessions to 200+ attendees on Competitive Programming, Development, and Web3",
      "Led organization of national-level hackathons (CodeUnCode, KJSCE HACK 8) with 500+ participants",
      "Mentored juniors in full-stack technologies, enabling collaborative project work",
    ],
  },
  {
    title: "Operations & Marketing Assistant",
    company: "Fresh@Home",
    location: "Mumbai, India",
    period: "2023-24",
    logo: "🏪",
    achievements: [
      "Spearheaded inventory and procurement strategies, reducing wastage and maximizing profitability",
      "Analyzed sales trends and seasonal demand for data-driven purchasing decisions",
      "Improved packaging and presentation to enhance shelf life",
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
    title: "Padhle",
    subtitle: "Student Portal",
    description:
      "Role-based system with attendance tracking and course management. AJAX-powered interface with real-time updates. Secure session management and SQL injection prevention.",
    tech: ["AJAX", "PHP", "MySQL", "JavaScript", "HTML/CSS"],
    type: "Web Application",
    githubUrl: "https://github.com/yourusername/padhle",
    liveUrl: "https://padhle-demo.com",
  },
  {
    title: "JournalMate",
    subtitle: "JavaFX",
    description:
      "Built a secure and user-friendly digital diary application with a dynamic JavaFX interface, focusing on smooth navigation and interactivity. Implemented robust features like password-protected access and rich-text content editing.",
    tech: ["JavaFX", "Java", "SQLite", "CSS"],
    type: "Desktop Application",
    githubUrl: "https://github.com/yourusername/journalmate",
  },
  {
    title: "Tutelage",
    subtitle: "Freelance",
    description:
      "Collaborated with a cross-functional team to build a production-ready React Native application for a freelance startup. Delivered a responsive, high-performance app with consistent functionality across Android and iOS platforms.",
    tech: ["React Native", "JavaScript", "Mobile Development"],
    type: "Mobile Application",
    githubUrl: "https://github.com/yourusername/tutelage",
  },
  {
    title: "Ama-App",
    subtitle: "Full Stack Auth System",
    description:
      "Built a robust full-stack authentication system using Next.js (App Router), TypeScript, and MongoDB, following best practices from the 'Chai aur Code' Next.js Auth playlist.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Authentication"],
    type: "Full Stack Application",
    githubUrl: "https://github.com/yourusername/ama-app",
    liveUrl: "https://ama-app-demo.com",
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
      "Firebase",
      "Supabase",
      "Microsoft Azure",
    ],
    color: "bg-gradient-accent",
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "Docker", "Arduino"],
    color: "bg-gradient-primary",
  },
  {
    category: "Data Science & AI",
    skills: ["NumPy", "pandas", "OpenCV", "Matplotlib"],
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
