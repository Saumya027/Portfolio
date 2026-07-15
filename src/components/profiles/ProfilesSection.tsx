"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/ui/BrandIcons";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const iconMap: Record<string, React.ReactNode> = {
  github: <GithubIcon size={28} />,
  linkedin: <LinkedinIcon size={28} />,
  leetcode: <LeetcodeIcon size={28} />
};

export function ProfilesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const snap = await getDocs(collection(db, "profiles"));
        const data: any[] = [];
        snap.forEach(doc => data.push(doc.data()));
        data.sort((a, b) => a.order - b.order);
        setProfiles(data);
      } catch (err) {
        console.error("Failed to fetch profiles");
      }
    }
    fetchProfiles();
  }, []);

  return (
    <section id="profiles" className="section-padding">
      <div className="container-max">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-cyan-400">Online Presence</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight mb-8">Coding Profiles</h2>
            <p className="mt-8 text-muted-foreground max-w-xl mx-auto text-center">
              Follow along on my public profiles to see real-time contributions, problem-solving, and professional updates.
            </p>
          </div>

          {/* Profile cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {profiles.map((profile, i) => (
              <motion.a
                key={profile.id}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className={`relative glass-card rounded-2xl p-6 border border-white/10 ${profile.borderColor} transition-all duration-300 group overflow-hidden block`}
              >
                {/* Top gradient line */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${profile.color}`} />

                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${profile.color} flex items-center justify-center text-white`}>
                    {iconMap[profile.iconName]}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${profile.badgeColor}`}>
                      {profile.badge}
                    </span>
                    <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-foreground">{profile.name}</h3>
                <p className="text-sm text-muted-foreground mt-0.5 font-mono">{profile.handle}</p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{profile.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mt-5">
                  {profile.stats.map((stat: { label: string; value: string }) => (
                    <div key={stat.label} className="bg-white/5 rounded-xl p-3">
                      <p className={`text-lg font-bold bg-gradient-to-r ${profile.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
