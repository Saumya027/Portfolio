"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { GraduationCap, Pill, Zap, MapPin, Globe, Shield, Calendar, Briefcase, Award } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap size={20} />,
  Pill: <Pill size={20} />,
  Zap: <Zap size={20} />,
  MapPin: <MapPin size={20} />,
  Globe: <Globe size={20} />,
  Shield: <Shield size={20} />,
  Briefcase: <Briefcase size={20} />,
  Award: <Award size={20} />,
  Calendar: <Calendar size={20} />,
};

export function TimelineSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [timelineEntries, setTimelineEntries] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTimeline() {
      try {
        const snap = await getDocs(collection(db, "timeline"));
        const data: any[] = [];
        snap.forEach(doc => data.push(doc.data()));
        data.sort((a, b) => a.order - b.order);
        setTimelineEntries(data);
      } catch (err) {
        console.error("Failed to fetch timeline");
      }
    }
    fetchTimeline();
  }, []);

  return (
    <section id="timeline" className="section-padding bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent">
      <div className="container-max">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-orange-400">My Journey</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight mb-8">Timeline</h2>
            <p className="mt-8 text-muted-foreground max-w-xl mx-auto text-center">
              Key milestones in my engineering journey — from day one at PDEU to building production AI systems.
            </p>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative mt-8 w-full overflow-x-auto pb-8 custom-scrollbar">
            <div className="min-w-max px-4 sm:px-12 relative flex items-center h-[1000px] md:h-[850px]">
              
              {/* Glowing Central Track Line */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent dark:shadow-[0_0_15px_rgba(255,255,255,0.6)] shadow-[0_0_15px_rgba(0,0,0,0.1)] z-0 -translate-y-1/2" />

              {timelineEntries.map((entry, i) => {
                const isTop = i % 2 === 0;
                
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: isTop ? -30 : 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-[300px] sm:w-[340px] h-full flex flex-col justify-center group px-4"
                  >
                    {/* The Node on the track */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                      <div className="w-3.5 h-3.5 rounded-full bg-background border-[2px] border-foreground/30 group-hover:border-foreground transition-all shadow-sm dark:group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] group-hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:scale-125" />
                    </div>

                    {/* Vertical Connector Line */}
                    <div className={`absolute left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-foreground/20 to-transparent transition-all group-hover:from-foreground/40 ${
                      isTop ? 'bottom-1/2 h-10 bg-gradient-to-t' : 'top-1/2 h-10'
                    }`} />

                    {/* Card Container */}
                    <div className={`absolute left-0 w-full px-4 ${isTop ? 'bottom-[calc(50%+40px)]' : 'top-[calc(50%+40px)]'}`}>
                      {/* Icon */}
                      <div className={`flex justify-center z-10 relative ${isTop ? 'mb-[-20px]' : 'mt-[-20px] order-last'}`}>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${entry.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-all duration-300 ring-4 ring-background`}>
                          {iconMap[entry.icon]}
                        </div>
                      </div>

                      {/* Card */}
                      <motion.div
                        whileHover={{ y: isTop ? -5 : 5 }}
                        className={`glass-card rounded-2xl p-5 border border-white/10 hover:border-white/25 transition-all w-full text-center bg-background/40 backdrop-blur-md relative ${isTop ? 'pt-8' : 'pb-8'} z-0`}
                      >
                        {/* Year Badge */}
                        <div className={`absolute left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background border border-white/10 shadow-sm ${isTop ? '-top-3' : '-bottom-3'}`}>
                          <span className={`text-xs font-bold bg-gradient-to-r ${entry.color} bg-clip-text text-transparent tracking-wider uppercase`}>
                            {entry.year}
                          </span>
                        </div>

                        <h3 className={`font-bold text-lg text-foreground ${!isTop && 'mt-4'}`}>{entry.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{entry.description}</p>

                        {/* Tags */}
                        {entry.tags && (
                          <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                            {entry.tags.map((tag) => (
                              <span key={tag} className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
