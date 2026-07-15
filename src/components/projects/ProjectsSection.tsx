"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { ArrowRight } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const snap = await getDocs(collection(db, "projects"));
        const data: any[] = [];
        snap.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
        data.sort((a, b) => a.order - b.order);
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects");
      }
    }
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="section-padding">
      <div className="container-max">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-4">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-emerald-400">Featured Work</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight mb-8">Projects</h2>
            <p className="mt-8 text-muted-foreground max-w-xl mx-auto text-center">
              A selection of projects that showcase my technical depth across full-stack engineering, AI/ML, and system design.
            </p>
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          {/* More projects link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-10"
          >
            <a
              href="https://github.com/Saumya027"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/10 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-white/25 transition-all group"
            >
              View All on GitHub
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
