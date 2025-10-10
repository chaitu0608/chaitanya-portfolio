// Type definitions for the portfolio

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  logo: string;
  achievements: string[];
  website?: string;
  description?: string;
  tech?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa: string;
  icon: string;
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  type: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  thumbnail?: string;
}

export interface TechCategory {
  category: string;
  skills: string[];
  color: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl?: string;
}

export interface NavItem {
  label: string;
  href: string;
}