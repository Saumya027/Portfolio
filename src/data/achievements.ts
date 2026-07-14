export interface Achievement {
  id: string;
  title: string;
  value: string;
  numericValue: number;
  suffix: string;
  description: string;
  icon: string;
  color: string;
}

export const achievements: Achievement[] = [
  {
    id: "leetcode",
    title: "LeetCode Problems",
    value: "300+",
    numericValue: 300,
    suffix: "+",
    description: "Consistent problem solver with focus on algorithms & data structures",
    icon: "Code2",
    color: "from-orange-500 to-yellow-500",
  },
  {
    id: "contest",
    title: "Contest Rating",
    value: "1520+",
    numericValue: 1520,
    suffix: "+",
    description: "Competitive programming rating on LeetCode weekly contests",
    icon: "Trophy",
    color: "from-yellow-500 to-amber-500",
  },
  {
    id: "cgpa",
    title: "CGPA",
    value: "9.64",
    numericValue: 9.64,
    suffix: "/10",
    description: "Academic excellence across all semesters at PDEU",
    icon: "GraduationCap",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "gssoc",
    title: "GSSoC 2026",
    value: "Contributor",
    numericValue: 1,
    suffix: "",
    description: "Selected open source contributor for GirlScript Summer of Code 2026",
    icon: "Globe",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "hackathons",
    title: "Hackathons",
    value: "2+",
    numericValue: 2,
    suffix: "+",
    description: "IIT Gandhinagar Amalthea 2025, Aetrix Hackathon PDEU 2026",
    icon: "Zap",
    color: "from-violet-500 to-purple-500",
  },
  {
    id: "projects",
    title: "Projects Built",
    value: "10+",
    numericValue: 10,
    suffix: "+",
    description: "Full-stack, AI/ML, and open source projects shipped end-to-end",
    icon: "FolderKanban",
    color: "from-pink-500 to-rose-500",
  },
];
