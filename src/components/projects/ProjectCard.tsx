"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ExternalLink, ArrowUpRight, Clock, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative glass-card rounded-3xl border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/30"
    >
      {/* Gradient glow on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      {/* Project image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 pointer-events-none" />

        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            project.status === "ongoing"
              ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
              : "bg-green-500/20 text-green-300 border border-green-500/30"
          }`}>
            {project.status === "ongoing" ? <Clock size={10} /> : <CheckCircle2 size={10} />}
            {project.status === "ongoing" ? "Ongoing" : "Completed"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6">
        <h3 className="text-xl font-bold text-foreground group-hover:gradient-text transition-all">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {/* Features */}
        <ul className="mt-4 space-y-1.5">
          {project.features.slice(0, 4).map((feat) => (
            <li key={feat} className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
              {feat}
            </li>
          ))}
          {project.features.length > 4 && (
            <li className="text-xs text-blue-400">+{project.features.length - 4} more</li>
          )}
        </ul>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mt-5">
          {project.stack.map((tech) => (
            <span key={tech} className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-6">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium glass border border-white/10 hover:border-white/25 text-muted-foreground hover:text-foreground transition-all"
          >
            <GithubIcon size={14} />
            GitHub
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:opacity-90 transition-opacity"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
          <a
            href={`/projects/${project.id}`}
            className="ml-auto flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Case Study
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
