"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TbArrowDown, TbDownload, TbMail } from "react-icons/tb";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/ui/BrandIcons";
import { HeroStats } from "./HeroStats";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const titles = [
  "Full-Stack Developer",
  "AI Engineer",
  "Open Source Contributor",
  "Problem Solver",
];

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < word.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
    } else if (!deleting && charIndex === word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    setDisplay(word.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return display;
}

export function HeroSection() {
  const typewriterText = useTypewriter(titles);
  const [resumeUrl, setResumeUrl] = useState("/resume.pdf");

  useEffect(() => {
    async function fetchResumeUrl() {
      try {
        const snap = await getDoc(doc(db, "general", "info"));
        if (snap.exists() && snap.data().resumeUrl) {
          setResumeUrl(snap.data().resumeUrl);
        }
      } catch (err) {
        console.error("Failed to fetch resumeUrl");
      }
    }
    fetchResumeUrl();
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.1)_0%,transparent_70%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-max section-padding relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-orange-500/20 text-xs font-medium text-orange-400 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight"
            >
              Hi, I&apos;m
              <span className="gradient-text block mt-2">Saumya Pandey</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 text-xl sm:text-2xl font-semibold text-muted-foreground min-h-[2rem]"
            >
              <span className="gradient-text-primary">{typewriterText}</span>
              <span className="animate-pulse text-orange-400">|</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              Computer Engineering undergraduate at{" "}
              <span className="text-foreground font-medium">PDEU</span> passionate about building
              scalable software, AI-powered applications, and solving challenging engineering
              problems with elegant code.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <button
                onClick={scrollToProjects}
                className="px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:opacity-90 transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5"
              >
                View Projects
              </button>
              <button
                onClick={scrollToContact}
                className="px-6 py-3 rounded-full font-semibold glass border border-white/20 text-foreground hover:bg-white/10 transition-all hover:-translate-y-0.5"
              >
                Contact Me
              </button>
              <a
                href={resumeUrl}
                download
                target="_blank"
                className="px-6 py-3 rounded-full font-semibold text-muted-foreground hover:text-foreground glass border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-0.5 flex items-center gap-2"
              >
                <TbDownload size={18} />
                Resume
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="mt-6 flex items-center gap-4 justify-center lg:justify-start"
            >
              <a href="https://github.com/Saumya027" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all hover:-translate-y-0.5">
                <GithubIcon size={18} />
              </a>
              <a href="https://linkedin.com/in/saumya-pandey-747421348" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all hover:-translate-y-0.5">
                <LinkedinIcon size={18} />
              </a>
              <a href="mailto:saumyap0107@gmail.com"
                className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all hover:-translate-y-0.5">
                <TbMail size={20} />
              </a>
              <div className="h-px w-8 bg-white/10" />
              <span className="text-xs text-muted-foreground">Ahmedabad, India</span>
            </motion.div>

            {/* Stats */}
            <HeroStats />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="mt-3 text-sm text-muted-foreground tracking-[0.3em] uppercase font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <TbArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
