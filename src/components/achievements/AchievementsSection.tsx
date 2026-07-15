"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2, Trophy, GraduationCap, Globe, Zap, FolderKanban
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={24} />,
  Trophy: <Trophy size={24} />,
  GraduationCap: <GraduationCap size={24} />,
  Globe: <Globe size={24} />,
  Zap: <Zap size={24} />,
  FolderKanban: <FolderKanban size={24} />,
};

export function AchievementsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [achievements, setAchievements] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const snap = await getDocs(collection(db, "achievements"));
        const data: any[] = [];
        snap.forEach(doc => data.push(doc.data()));
        data.sort((a, b) => a.order - b.order);
        setAchievements(data);
      } catch (err) {
        console.error("Failed to fetch achievements");
      }
    }
    fetchAchievements();
  }, []);

  return (
    <section id="achievements" className="section-padding bg-gradient-to-b from-transparent via-violet-500/[0.03] to-transparent">
      <div className="container-max">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-yellow-400">Milestones</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight">Achievements</h2>
            <p className="mt-8 text-muted-foreground max-w-xl mx-auto text-center">
              Numbers that reflect dedication, consistency, and a drive to keep leveling up.
            </p>
          </div>

          {/* Achievements grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {achievements.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative glass-card rounded-2xl p-6 border border-white/10 hover:border-white/25 transition-all group overflow-hidden"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4`}>
                  {iconMap[item.icon]}
                </div>

                {/* Value */}
                <div className={`text-4xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                  {item.value}
                </div>

                {/* Title */}
                <p className="mt-1 font-bold text-foreground">{item.title}</p>

                {/* Description */}
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>

                {/* Decorative line */}
                <div className={`mt-4 h-px bg-gradient-to-r ${item.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
