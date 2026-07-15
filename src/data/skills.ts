export interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon?: string;
  imageIcon?: string;
  iconColor?: string;
  level: number; // 1-5
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    icon: "Code2",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "C++", icon: "SiCplusplus", iconColor: "#00599C", level: 5 },
      { name: "Python", imageIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", level: 5 },
      { name: "JavaScript", icon: "SiJavascript", iconColor: "#F7DF1E", level: 4 },
      { name: "TypeScript", icon: "SiTypescript", iconColor: "#3178C6", level: 4 },
      { name: "SQL", icon: "SiPostgresql", iconColor: "#4169E1", level: 4 },
    ],
  },
  {
    name: "Frontend",
    icon: "Layout",
    color: "from-cyan-500 to-teal-500",
    skills: [
      { name: "HTML5", imageIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", level: 5 },
      { name: "CSS3", imageIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", level: 5 },
      { name: "React", icon: "SiReact", iconColor: "#61DAFB", level: 5 },
      { name: "Next.js", icon: "SiNextdotjs", iconColor: "#000000", level: 5 },
      { name: "Tailwind CSS", icon: "SiTailwindcss", iconColor: "#06B6D4", level: 5 },
    ],
  },
  {
    name: "Backend",
    icon: "Server",
    color: "from-teal-500 to-emerald-500",
    skills: [
      { name: "FastAPI", icon: "SiFastapi", iconColor: "#009688", level: 4 },
      { name: "Flask", icon: "SiFlask", iconColor: "#000000", level: 4 },
      { name: "Node.js", icon: "SiNodedotjs", iconColor: "#339933", level: 3 },
    ],
  },
  {
    name: "Databases",
    icon: "Database",
    color: "from-violet-500 to-purple-500",
    skills: [
      { name: "PostgreSQL", icon: "SiPostgresql", iconColor: "#4169E1", level: 4 },
      { name: "MongoDB", icon: "SiMongodb", iconColor: "#47A248", level: 4 },
      { name: "Firebase", icon: "SiFirebase", iconColor: "#FFCA28", level: 4 },
    ],
  },
  {
    name: "AI / ML",
    icon: "Brain",
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "TensorFlow", icon: "SiTensorflow", iconColor: "#FF6F00", level: 4 },
      { name: "PyTorch", icon: "SiPytorch", iconColor: "#EE4C2C", level: 3 },
      { name: "Scikit-Learn", icon: "SiScikitlearn", iconColor: "#F7931E", level: 4 },
      { name: "Pandas", icon: "SiPandas", iconColor: "#150458", level: 5 },
    ],
  },
  {
    name: "Tools",
    icon: "Wrench",
    color: "from-pink-500 to-rose-500",
    skills: [
      { name: "Git", icon: "SiGit", iconColor: "#F05032", level: 5 },
      { name: "Docker", imageIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", level: 4 },
      { name: "AWS", imageIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", level: 3 },
      { name: "Linux", icon: "SiLinux", iconColor: "#FCC624", level: 4 },
    ],
  },
  {
    name: "Concepts",
    icon: "Network",
    color: "from-orange-500 to-amber-500",
    skills: [
      { name: "System Design", level: 4 },
      { name: "REST APIs", level: 5 },
      { name: "Computer Networks", level: 4 },
      { name: "Agile Development", level: 4 },
    ],
  },
];
