/* ============================================
   PORTFOLIO DATA — Single source of truth
   ============================================ */

export const identity = {
  name: "Saksham Tiwari",
  firstName: "Saksham",
  lastName: "Tiwari",
  title: "Software Developer",
  tagline: "Building with Curiosity. Engineering with Purpose.",
  heroDescription:
    "I enjoy transforming ideas into practical software through thoughtful engineering and clean design. From backend systems and relational databases to modern web applications, I love building projects that challenge me to learn, improve, and create meaningful digital experiences.",
  email: "sakshamt1304@gmail.com",
  location: "India",
  socials: {
    github: "https://github.com/tsaksham1304",
    linkedin: "https://www.linkedin.com/in/sakshamt1304/",
    leetcode: "https://leetcode.com/u/sakshamt1304/",
  },
} as const;

export const about = {
  paragraphs: [
    "I'm Saksham, a Computer Science Engineering student who believes the best way to learn is by building.",
    "Rather than simply studying concepts, I enjoy applying them to real-world software projects—from designing normalized databases and backend systems to creating responsive web applications with modern technologies.",
    "Every project is an opportunity to improve my engineering mindset, write cleaner code, and understand how software can solve practical problems.",
    "Currently, I'm focused on strengthening my foundations in Data Structures & Algorithms, backend development, and software engineering while preparing for internship opportunities.",
  ],
  highlights: [
    ["the best way to learn is by building"],
    ["designing normalized databases", "modern technologies"],
    ["improve my engineering mindset", "write cleaner code"],
    ["Data Structures & Algorithms", "backend development"],
  ] as readonly string[][],
  education: {
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science Engineering",
    university: "SRM Institute of Science and Technology",
    expectedGraduation: "2028",
    cgpa: 9.7,
  },
} as const;

export interface ProjectHighlight {
  text: string;
  metric?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  highlights: ProjectHighlight[];
  github: string;
  liveDemo?: string;
  featured: boolean;
  accentColor: "amber" | "cyan" | "indigo" | "purple";
}

export const projects: Project[] = [
  {
    id: "crm360",
    title: "CRM 360",
    subtitle: "Customer Intelligence System",
    description:
      "A full-stack Customer Relationship Management platform designed to efficiently manage customer information, interactions, and business insights using a normalized relational database architecture.",
    techStack: ["Python", "Flask", "MySQL", "JavaScript", "HTML", "CSS"],
    highlights: [
      { text: "Normalized relational database", metric: "10 tables" },
      { text: "Automated data generation pipeline", metric: "1900+ records" },
      { text: "Customer management and analytics modules" },
      { text: "CRUD operations with relational integrity" },
      { text: "Responsive intuitive interface" },
    ],
    github: "https://github.com/tsaksham1304/CRM360-Customer-Intelligence-System",
    featured: true,
    accentColor: "cyan",
  },
  {
    id: "ai-summarizer",
    title: "AI Text Summarizer",
    subtitle: "Intelligent Content Compression",
    description:
      "An AI-powered web application that transforms lengthy text into concise summaries through a modern, responsive, and user-friendly interface.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Puter.js"],
    highlights: [
      { text: "Modern React architecture" },
      { text: "Clean responsive interface" },
      { text: "Fast summarization workflow" },
      { text: "Focused on UX and performance" },
    ],
    github: "https://github.com/tsaksham1304/AI-Text-Summarizer",
    featured: false,
    accentColor: "cyan",
  },
];

export interface TechCategory {
  name: string;
  items: string[];
}

export const techStack: TechCategory[] = [
  {
    name: "Languages",
    items: ["Java", "Python", "C", "C++", "JavaScript", "TypeScript"],
  },
  {
    name: "Frontend",
    items: ["React", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    name: "Backend",
    items: ["Flask", "JDBC"],
  },
  {
    name: "Database",
    items: ["MySQL"],
  },
  {
    name: "Tools",
    items: ["Git", "GitHub", "VS Code"],
  },
  {
    name: "Core Concepts",
    items: [
      "DSA",
      "OOP",
      "DBMS"
    ],
  },
];

export interface Certification {
  title: string;
  issuer: string;
  badge?: string;
}

export const certifications: Certification[] = [
  {
    title: "Programming in Java",
    issuer: "NPTEL",
    badge: "Elite + Gold",
  },
  {
    title: "Object-Oriented Programming",
    issuer: "NPTEL",
    badge: "Elite + Silver",
  },
  {
    title: "Database Management Systems",
    issuer: "NPTEL",
  },
];

export const currentFocus = [
  "Building practical software projects",
  "Strengthening Data Structures & Algorithms",
  "Backend Development",
  "Exploring Artificial Intelligence",
  "Preparing for Software Engineering Internships",
] as const;

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#tech" },
  { label: "Work", href: "#projects" },
  { label: "Proof", href: "#certifications" },
  { label: "Contact", href: "#contact" },
] as const;
