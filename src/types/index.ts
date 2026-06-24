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
  /** `contain` for padded brand marks; `cover` for full-bleed logos */
  logoFit?: "cover" | "contain";
  logoBg?: "dark" | "light";
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa: string;
  icon: string;
}

export type ProjectSize = "hero" | "tall" | "wide" | "half" | "third";

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  type: string;
  size?: ProjectSize;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  thumbnail?: string;
  /** Short card blurb — one line, shown on project tiles */
  summary?: string;
  /** Case-study: what problem this project solves */
  problem?: string;
  /** Case-study: how you solved it */
  solution?: string;
  /** Case-study: measurable or qualitative outcomes */
  impact?: string[];
  /** Case-study: technical challenges overcome */
  highlights?: string[];
  /** Show full card in Work flagship section */
  featured?: boolean;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl?: string;
  /** Resume PDF path — opens inline in the browser */
  resumeUrl?: string;
  /** Google Meet link for /meet redirect */
  meetUrl: string;
}