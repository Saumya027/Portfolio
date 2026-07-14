export interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon: string;
  level: number; // 1-5
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    icon: "Code2",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "C++", icon: "⚙️", level: 5 },
      { name: "Python", icon: "🐍", level: 5 },
      { name: "JavaScript", icon: "🟨", level: 4 },
      { name: "TypeScript", icon: "🔷", level: 4 },
      { name: "SQL", icon: "🗃️", level: 4 },
    ],
  },
  {
    name: "Frontend",
    icon: "Layout",
    color: "from-cyan-500 to-teal-500",
    skills: [
      { name: "React", icon: "⚛️", level: 5 },
      { name: "Next.js", icon: "▲", level: 5 },
      { name: "Tailwind CSS", icon: "🎨", level: 5 },
      { name: "Framer Motion", icon: "✨", level: 4 },
    ],
  },
  {
    name: "Backend",
    icon: "Server",
    color: "from-teal-500 to-emerald-500",
    skills: [
      { name: "FastAPI", icon: "⚡", level: 4 },
      { name: "Flask", icon: "🧪", level: 4 },
      { name: "Node.js", icon: "🟢", level: 3 },
    ],
  },
  {
    name: "Databases",
    icon: "Database",
    color: "from-violet-500 to-purple-500",
    skills: [
      { name: "PostgreSQL", icon: "🐘", level: 4 },
      { name: "MongoDB", icon: "🍃", level: 4 },
      { name: "Firebase", icon: "🔥", level: 4 },
    ],
  },
  {
    name: "AI / ML",
    icon: "Brain",
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "PyTorch", icon: "🔦", level: 4 },
      { name: "Hugging Face", icon: "🤗", level: 4 },
      { name: "Scikit-Learn", icon: "📊", level: 4 },
      { name: "OpenCV", icon: "👁️", level: 3 },
    ],
  },
  {
    name: "Tools",
    icon: "Wrench",
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Git", icon: "🌿", level: 5 },
      { name: "GitHub", icon: "🐙", level: 5 },
      { name: "Docker", icon: "🐋", level: 3 },
    ],
  },
];
