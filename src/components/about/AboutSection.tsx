"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface CounterProps {
  value: number;
  suffix?: string;
  isDecimal?: boolean;
}

function AnimatedCounter({ value, suffix = "", isDecimal = false }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = isDecimal ? eased * value : Math.floor(eased * value);
      setCount(current);
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value, isDecimal]);

  return (
    <span ref={ref}>
      {isDecimal ? count.toFixed(2) : count}
      {suffix}
    </span>
  );
}

const stats = [
  { label: "CGPA", value: 9.64, suffix: "/10", isDecimal: true, color: "from-blue-400 to-cyan-400" },
  { label: "LeetCode Problems", value: 300, suffix: "+", color: "from-orange-400 to-yellow-400" },
  { label: "Projects Built", value: 10, suffix: "+", color: "from-violet-400 to-purple-400" },
  { label: "Open Source PRs", value: 5, suffix: "+", color: "from-green-400 to-emerald-400" },
];

const containerVariants: any = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [data, setData] = useState({
    cgpa: "9.64/10",
    aboutText1: "I'm a Computer Engineering undergraduate at Pandit Deendayal Energy University, Gandhinagar. My journey started with a deep fascination for how software can solve real-world problems at scale.",
    aboutText2: "I specialize in building full-stack web applications and AI-powered systems — from deepfake detection platforms to intelligent pharmacy management tools. I believe great software is both technically excellent and beautifully crafted.",
    aboutText3: "Beyond code, I actively contribute to open source as a GSSoC 2026 contributor and have solved 300+ LeetCode problems — constantly pushing myself to learn and grow."
  });

  useEffect(() => {
    async function fetchAbout() {
      try {
        const docSnap = await getDoc(doc(db, "general", "info"));
        if (docSnap.exists()) {
          setData(docSnap.data() as any);
        }
      } catch (e) {
        console.error("Firebase fetch failed, using fallback.");
      }
    }
    fetchAbout();
  }, []);

  return (
    <section id="about" className="section-padding bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="container-max">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-blue-400">About Me</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight">
              The Story So Far
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — Story */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {data.aboutText1.split('CGPA')[0]}
                CGPA of <span className="gradient-text font-bold">{data.cgpa}</span>. 
                {data.aboutText1.split('scale.')[1] ? ' scale.' + data.aboutText1.split('scale.')[1] : ''}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {data.aboutText2}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {data.aboutText3}
              </p>

              {/* Coursework chips */}
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Core Coursework</p>
                <div className="flex flex-wrap gap-2">
                  {["DSA", "OOP", "DBMS", "OS", "Computer Networks", "Theory of Computation", "Computer Architecture", "IoT"].map((course) => (
                    <span key={course} className="px-3 py-1 rounded-full text-xs font-medium glass border border-white/10 text-muted-foreground">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right — Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all group hover:-translate-y-1"
                >
                  <div className={`text-3xl sm:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} isDecimal={stat.isDecimal} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground font-medium">{stat.label}</p>
                  <div className={`mt-3 h-px w-full bg-gradient-to-r ${stat.color} opacity-20 group-hover:opacity-50 transition-opacity`} />
                </div>
              ))}

              {/* Education card */}
              <div className="col-span-2 glass-card rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">B.Tech Computer Engineering</p>
                    <p className="text-muted-foreground text-sm mt-0.5">Pandit Deendayal Energy University, Gandhinagar</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 font-medium">2024 – 2028</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 font-medium">CGPA 9.64</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
