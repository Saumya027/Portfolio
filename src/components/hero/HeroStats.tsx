"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "CGPA", value: "9.64/10" },
  { label: "LeetCode", value: "300+" },
  { label: "GSSoC", value: "2026" },
  { label: "Stack", value: "AI + Full Stack" },
];

export function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="flex flex-wrap justify-center gap-3 mt-8"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3 + i * 0.1, duration: 0.4, type: "spring" }}
          className="glass rounded-full px-4 py-2 flex items-center gap-2 border border-white/10"
        >
          <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
          <span className="w-px h-3 bg-white/20" />
          <span className="text-xs font-bold gradient-text">{stat.value}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
