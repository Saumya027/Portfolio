"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { 
  Code2, Layout, Server, Database, Brain, Wrench, Network 
} from "lucide-react";
import * as SiIcons from "react-icons/si";

const categoryIconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={18} />,
  Layout: <Layout size={18} />,
  Server: <Server size={18} />,
  Database: <Database size={18} />,
  Brain: <Brain size={18} />,
  Wrench: <Wrench size={18} />,
  Network: <Network size={18} />,
};

// Helper to render Si icons by name string
const renderSiIcon = (iconName: string, className?: string, color?: string) => {
  const IconComponent = (SiIcons as any)[iconName];
  if (!IconComponent) return <span>{iconName}</span>;
  return <IconComponent className={className} style={{ color: color }} />;
};

const containerVariants: any = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].name);

  const currentCategory = skillCategories.find((c) => c.name === activeCategory)!;

  return (
    <section id="skills" className="section-padding bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent">
      <div className="container-max">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-violet-400">Technical Expertise</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight mb-8">Skills & Technologies</h2>
            <p className="mt-8 text-muted-foreground max-w-xl mx-auto text-center">
              A curated toolkit built through hands-on projects, competitive programming, and open source contributions.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {skillCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.name
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                    : "glass border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/10"
                }`}
              >
                {categoryIconMap[cat.icon]}
                {cat.name}
              </button>
            ))}
          </div>

          {/* Skills grid */}
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {currentCategory.skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.03 }}
                className="glass-card rounded-2xl p-5 border border-white/10 hover:border-white/25 transition-all cursor-default text-center group"
              >
                {(skill.imageIcon || skill.icon) && (
                  <div className="text-3xl mb-3 flex justify-center">
                    {skill.imageIcon ? (
                      <img 
                        src={skill.imageIcon} 
                        alt={skill.name} 
                        className="h-8 w-8 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" 
                      />
                    ) : (
                      renderSiIcon(
                        skill.icon!, 
                        "mx-auto h-8 w-8 drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]", 
                        skill.iconColor
                      )
                    )}
                  </div>
                )}
                <p className="font-semibold text-sm text-foreground flex items-center justify-center min-h-[32px]">{skill.name}</p>
                {/* Skill level dots */}
                <div className="flex justify-center gap-1 mt-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        i < skill.level
                          ? `bg-gradient-to-r ${currentCategory.color}`
                          : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
}
