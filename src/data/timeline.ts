export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  tags?: string[];
}

export const timelineEntries: TimelineEntry[] = [
  {
    year: "2024",
    title: "Started B.Tech at PDEU",
    description:
      "Began Computer Engineering at Pandit Deendayal Energy University, Gandhinagar. Dived deep into DSA, OOP, DBMS, and Computer Networks — building a rock-solid CS foundation.",
    icon: "GraduationCap",
    color: "from-blue-500 to-cyan-500",
    tags: ["Education", "DSA", "PDEU"],
  },
  {
    year: "2025",
    title: "Built PharmaSense",
    description:
      "Developed an AI-powered pharmacy management system with demand forecasting, FEFO inventory management, and real-time expiry monitoring using React, Firebase, and Flask ML models.",
    icon: "Pill",
    color: "from-violet-500 to-purple-500",
    tags: ["React", "Firebase", "Flask", "AI/ML"],
  },
  {
    year: "2025",
    title: "Hackathon Experiences",
    description:
      "Participated in IIT Gandhinagar Odoo — Amalthea Hackathon 2025, gaining invaluable experience building under pressure, collaborating in teams, and shipping production-quality code fast.",
    icon: "Zap",
    color: "from-yellow-500 to-orange-500",
    tags: ["IIT Gandhinagar", "Amalthea", "Teamwork"],
  },
  {
    year: "2026",
    title: "Launched ServiceConnect",
    description:
      "Built a full-stack location-aware service marketplace platform with JWT auth, OTP verification, map-based discovery (Leaflet + OpenStreetMap), and role-based booking workflows.",
    icon: "MapPin",
    color: "from-teal-500 to-emerald-500",
    tags: ["Next.js", "TypeScript", "MongoDB", "Full-Stack"],
  },
  {
    year: "2026",
    title: "GSSoC 2026 Contributor",
    description:
      "Selected as an open source contributor for GirlScript Summer of Code 2026 — contributing to real-world projects, collaborating with the global developer community, and growing as an engineer.",
    icon: "Globe",
    color: "from-orange-500 to-red-500",
    tags: ["Open Source", "GSSoC", "Community"],
  },
  {
    year: "2026 – Present",
    title: "DeepGuard Platform",
    description:
      "Currently developing a multimodal deepfake detection and forensic analysis platform using PyTorch, Hugging Face Transformers, FastAPI, and PostgreSQL — with explainable AI at its core.",
    icon: "Shield",
    color: "from-blue-500 to-violet-500",
    tags: ["PyTorch", "Hugging Face", "FastAPI", "Ongoing"],
  },
];
