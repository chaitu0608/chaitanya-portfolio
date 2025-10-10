import skillsData from '@/data/skills.json';

// Types for our content structure
export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  gallery?: string[];
  date: string;
  status: string;
  role: string;
  team: string;
  duration: string;
  tech: string[];
  category: string;
  tags: string[];
  link?: string;
  repo?: string;
  metrics?: Array<{
    metric: string;
    value: string;
  }>;
  challenges?: string[];
  solutions?: string[];
}

export interface Experience {
  company: string;
  title: string;
  location: string;
  period: string;
  type: string;
  logo: string;
  description: string;
  achievements: string[];
  skills: string[];
  technologies: string[];
  highlights: string[];
}

export interface Skill {
  name: string;
  level: number;
  years: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  color: string;
  skills: Skill[];
}

// Content loading functions
export const loadProjects = async (): Promise<Project[]> => {
  try {
    // In a real app, you'd fetch this from an API or file system
    // For now, we'll return mock data that matches our YAML structure
    const projects: Project[] = [
      {
        slug: 'fairbnb',
        title: 'FairBNB',
        subtitle: 'Decentralized Rentals Platform',
        description: 'A decentralized rental platform built with Web3 technologies, featuring transparent pricing, smart contract automation, and community governance.',
        longDescription: 'FairBNB revolutionizes the short-term rental market by leveraging blockchain technology to create a transparent, fair, and community-driven platform.',
        thumbnail: '/assets/projects/fairbnb.png',
        gallery: ['/assets/projects/fairbnb-1.png', '/assets/projects/fairbnb-2.png'],
        date: '2024-08',
        status: 'In Development',
        role: 'Full Stack Developer & Smart Contract Developer',
        team: '3 developers, 1 designer',
        duration: '6 months',
        tech: ['React', 'Next.js', 'TypeScript', 'Solidity', 'Web3.js', 'Ethers.js', 'Tailwind CSS', 'Hardhat'],
        category: 'Web3',
        tags: ['react', 'next', 'web3', 'blockchain', 'solidity', 'typescript'],
        link: 'https://fairbnb.example',
        repo: 'https://github.com/chaitu0608/fairbnb',
        metrics: [
          { metric: 'Smart Contract Gas Optimization', value: '40% reduction' },
          { metric: 'User Onboarding Time', value: '2 minutes' },
          { metric: 'Transaction Success Rate', value: '99.8%' }
        ],
        challenges: [
          'Implementing cross-chain compatibility while maintaining security',
          'Optimizing gas costs for frequent transactions',
          'Creating intuitive UX for Web3 newcomers'
        ],
        solutions: [
          'Developed modular smart contract architecture with upgradeable components',
          'Implemented batch processing and state channels for gas optimization',
          'Created comprehensive onboarding flow with wallet connection guidance'
        ]
      },
      {
        slug: 'padhle',
        title: 'Padhle',
        subtitle: 'Student Portal & Learning Management System',
        description: 'A comprehensive student portal with attendance tracking, course management, and real-time communication features.',
        thumbnail: '/padhle.png',
        date: '2024-03',
        status: 'Completed',
        role: 'Full Stack Developer',
        team: '2 developers',
        duration: '4 months',
        tech: ['PHP', 'MySQL', 'JavaScript', 'AJAX', 'HTML/CSS', 'Bootstrap'],
        category: 'Web Application',
        tags: ['php', 'mysql', 'javascript', 'ajax', 'education'],
        link: 'https://padhle-demo.com',
        repo: 'https://github.com/chaitu0608/padhle',
        metrics: [
          { metric: 'Page Load Time', value: '< 2 seconds' },
          { metric: 'User Satisfaction', value: '4.8/5' },
          { metric: 'System Uptime', value: '99.9%' }
        ]
      },
      {
        slug: 'journalmate',
        title: 'JournalMate',
        subtitle: 'Secure Digital Diary Application',
        description: 'A secure and user-friendly digital diary application with password protection and rich-text editing capabilities.',
        thumbnail: '/assets/projects/journalmate.png',
        date: '2024-01',
        status: 'Completed',
        role: 'Desktop Application Developer',
        team: 'Solo project',
        duration: '2 months',
        tech: ['JavaFX', 'Java', 'SQLite', 'CSS'],
        category: 'Desktop Application',
        tags: ['javafx', 'java', 'sqlite', 'desktop'],
        repo: 'https://github.com/chaitu0608/journalmate',
        metrics: [
          { metric: 'Encryption Strength', value: 'AES-256' },
          { metric: 'Startup Time', value: '< 3 seconds' },
          { metric: 'Memory Usage', value: '< 100MB' }
        ]
      },
      {
        slug: 'tutelage',
        title: 'Tutelage',
        subtitle: 'Freelance Learning Platform',
        description: 'A React Native mobile application for a freelance tutoring platform, connecting students with qualified tutors.',
        thumbnail: '/assets/projects/tutelage.png',
        date: '2023-11',
        status: 'Completed',
        role: 'Mobile Developer',
        team: '4 developers, 2 designers',
        duration: '3 months',
        tech: ['React Native', 'JavaScript', 'Firebase', 'WebRTC'],
        category: 'Mobile Application',
        tags: ['react-native', 'javascript', 'mobile', 'firebase'],
        link: 'https://tutelage-app.com',
        repo: 'https://github.com/chaitu0608/tutelage',
        metrics: [
          { metric: 'App Store Rating', value: '4.6/5' },
          { metric: 'User Retention', value: '78%' },
          { metric: 'Crash Rate', value: '< 0.1%' }
        ]
      },
      {
        slug: 'trustwipe',
        title: 'TrustWipe',
        subtitle: 'Secure Data Wiping System',
        description: 'Designed a secure wiping engine implementing NIST SP 800-88 standards with overwrite, secure-erase, and crypto-erase methods. Developed a user-friendly React frontend for easy interaction and status monitoring. Built a robust Node.js backend to manage wipe requests, schedule tasks, and log activities.',
        thumbnail: '/trustwipe.jpg',
        date: '2024-05',
        status: 'Completed',
        role: 'Full Stack Developer & Security Engineer',
        team: 'Solo project',
        duration: '3 months',
        tech: ['C++', 'Python', 'Kotlin', 'Swift', 'Electron', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Firebase', 'OpenSSL'],
        category: 'Desktop Application',
        tags: ['c++', 'python', 'security', 'desktop', 'nodejs'],
        link: 'https://trustwipe.vercel.app/',
        repo: 'https://github.com/chaitu0608/trustwipe',
        metrics: [
          { metric: 'Data Wiping Speed', value: '500MB/s' },
          { metric: 'Security Compliance', value: 'NIST SP 800-88' },
          { metric: 'Success Rate', value: '99.9%' }
        ]
      },
      {
        slug: 'ama-app',
        title: 'Ama-App',
        subtitle: 'Full Stack Authentication System',
        description: 'A robust full-stack authentication system built with Next.js, TypeScript, and MongoDB, following modern security best practices.',
        thumbnail: '/assets/projects/ama-app.png',
        date: '2023-09',
        status: 'Completed',
        role: 'Full Stack Developer',
        team: 'Solo project',
        duration: '1 month',
        tech: ['Next.js', 'TypeScript', 'MongoDB', 'NextAuth.js', 'Tailwind CSS'],
        category: 'Full Stack Application',
        tags: ['nextjs', 'typescript', 'mongodb', 'authentication'],
        link: 'https://ama-app-demo.com',
        repo: 'https://github.com/chaitu0608/ama-app',
        metrics: [
          { metric: 'Authentication Success Rate', value: '99.9%' },
          { metric: 'Page Load Time', value: '< 1.5 seconds' },
          { metric: 'Security Score', value: 'A+' }
        ]
      }
    ];
    
    return projects;
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
};

export const loadExperience = async (): Promise<Experience[]> => {
  try {
    const experience: Experience[] = [
      {
        company: 'KJSCE CodeCell',
        title: 'Core Team Member',
        location: 'Mumbai, India',
        period: 'Nov. 2023 - Present',
        type: 'Volunteer',
        logo: '🏢',
        description: 'Leading technical initiatives and mentoring students in competitive programming, web development, and emerging technologies.',
        achievements: [
          'Delivered high-impact tech sessions to 200+ attendees on Competitive Programming, Development, and Web3',
          'Led organization of national-level hackathons (CodeUnCode, KJSCE HACK 8) with 500+ participants',
          'Mentored juniors in full-stack technologies, enabling collaborative project work',
          'Developed and maintained the organization\'s website and event management systems',
          'Created educational content and workshops for beginner to intermediate developers'
        ],
        skills: ['Leadership', 'Mentoring', 'Event Management', 'Web Development', 'Competitive Programming'],
        technologies: ['React', 'Node.js', 'Python', 'C++', 'JavaScript', 'TypeScript'],
        highlights: [
          'Increased hackathon participation by 150% through improved marketing and outreach',
          'Reduced event setup time by 60% through automated registration systems',
          'Mentored 50+ students in their first open-source contributions'
        ]
      },
      {
        company: 'Fresh@Home',
        title: 'Operations & Marketing Assistant',
        location: 'Mumbai, India',
        period: '2023-24',
        type: 'Part-time',
        logo: '🏪',
        description: 'Managed inventory operations and marketing strategies for a local fresh produce business, focusing on data-driven decision making and process optimization.',
        achievements: [
          'Spearheaded inventory and procurement strategies, reducing wastage and maximizing profitability',
          'Analyzed sales trends and seasonal demand for data-driven purchasing decisions',
          'Improved packaging and presentation to enhance shelf life and customer appeal',
          'Implemented digital marketing campaigns that increased online orders by 40%',
          'Streamlined delivery operations resulting in 25% faster order fulfillment'
        ],
        skills: ['Operations Management', 'Data Analysis', 'Marketing', 'Inventory Management', 'Process Optimization'],
        technologies: ['Excel', 'Google Analytics', 'Social Media Marketing', 'Inventory Management Systems'],
        highlights: [
          'Reduced food waste by 30% through better inventory forecasting',
          'Increased customer retention by 35% through improved service quality',
          'Developed automated reporting systems for daily operations'
        ]
      }
    ];
    
    return experience;
  } catch (error) {
    console.error('Error loading experience:', error);
    return [];
  }
};

export const loadSkills = (): Record<string, SkillCategory> => {
  return skillsData;
};

// Utility functions
export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
  const projects = await loadProjects();
  return projects.find(project => project.slug === slug) || null;
};

export const getFeaturedProjects = async (limit: number = 3): Promise<Project[]> => {
  const projects = await loadProjects();
  return projects.slice(0, limit);
};

export const getProjectsByCategory = async (category: string): Promise<Project[]> => {
  const projects = await loadProjects();
  return projects.filter(project => project.category === category);
};

export const getRecentExperience = async (limit: number = 2): Promise<Experience[]> => {
  const experience = await loadExperience();
  return experience.slice(0, limit);
};
