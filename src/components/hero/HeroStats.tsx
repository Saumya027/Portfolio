"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export function HeroStats() {
  const [stats, setStats] = useState([
    { label: "CGPA", value: "9.64/10" },
    { label: "LeetCode", value: "300+" },
    { label: "GSSoC", value: "2026" },
    { label: "Stack", value: "AI + Full Stack" },
  ]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const snap = await getDoc(doc(db, "general", "info"));
        if (snap.exists() && snap.data().heroStats) {
          setStats(snap.data().heroStats);
        }
      } catch (err) {
        console.error("Failed to fetch hero stats");
      }
    }
    fetchStats();
  }, []);
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
