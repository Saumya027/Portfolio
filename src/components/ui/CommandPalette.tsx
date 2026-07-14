"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Code2,
  FolderKanban,
  Trophy,
  GitBranch,
  Clock,
  Mail,
  Sun,
  Moon,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "next-themes";

interface Command {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { theme, setTheme } = useTheme();

  const commands: Command[] = [
    {
      id: "hero",
      label: "Go to Home",
      icon: <Home size={16} />,
      action: () => scrollTo("hero"),
      category: "Navigate",
    },
    {
      id: "about",
      label: "About Saumya",
      icon: <User size={16} />,
      action: () => scrollTo("about"),
      category: "Navigate",
    },
    {
      id: "skills",
      label: "View Skills",
      icon: <Code2 size={16} />,
      action: () => scrollTo("skills"),
      category: "Navigate",
    },
    {
      id: "projects",
      label: "See Projects",
      icon: <FolderKanban size={16} />,
      action: () => scrollTo("projects"),
      category: "Navigate",
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: <Trophy size={16} />,
      action: () => scrollTo("achievements"),
      category: "Navigate",
    },
    {
      id: "profiles",
      label: "Coding Profiles",
      icon: <GitBranch size={16} />,
      action: () => scrollTo("profiles"),
      category: "Navigate",
    },
    {
      id: "timeline",
      label: "Journey Timeline",
      icon: <Clock size={16} />,
      action: () => scrollTo("timeline"),
      category: "Navigate",
    },
    {
      id: "contact",
      label: "Contact Me",
      icon: <Mail size={16} />,
      action: () => scrollTo("contact"),
      category: "Navigate",
    },
    {
      id: "theme-toggle",
      label: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
      icon: theme === "dark" ? <Sun size={16} /> : <Moon size={16} />,
      action: () => setTheme(theme === "dark" ? "light" : "dark"),
      category: "Actions",
    },
    {
      id: "github",
      label: "Open GitHub Profile",
      icon: <Github size={16} />,
      action: () => window.open("https://github.com/Saumya027", "_blank"),
      category: "Links",
    },
    {
      id: "linkedin",
      label: "Open LinkedIn",
      icon: <Linkedin size={16} />,
      action: () => window.open("https://linkedin.com/in/saumya-pandey-747421348", "_blank"),
      category: "Links",
    },
    {
      id: "leetcode",
      label: "Open LeetCode Profile",
      icon: <ExternalLink size={16} />,
      action: () => window.open("https://leetcode.com/SaumyaP0107", "_blank"),
      category: "Links",
    },
    {
      id: "resume",
      label: "Download Resume",
      icon: <ExternalLink size={16} />,
      action: () => window.open("/resume.pdf", "_blank"),
      category: "Actions",
    },
  ];

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  }

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const categories = [...new Set(filtered.map((c) => c.category))];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[900] bg-black/60 backdrop-blur-sm"
          />
          {/* Palette */}
          <motion.div
            key="palette"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[901] w-full max-w-xl"
          >
            <div className="glass rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-gray-500 outline-none"
                />
                <kbd className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded font-mono">ESC</kbd>
              </div>

              {/* Results */}
              <div className="py-2 max-h-80 overflow-y-auto">
                {categories.map((category) => (
                  <div key={category}>
                    <p className="px-4 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {category}
                    </p>
                    {filtered
                      .filter((c) => c.category === category)
                      .map((cmd) => (
                        <button
                          key={cmd.id}
                          onClick={cmd.action}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-white/5 transition-colors text-left"
                        >
                          <span className="text-gray-400">{cmd.icon}</span>
                          {cmd.label}
                        </button>
                      ))}
                  </div>
                ))}
                {filtered.length === 0 && (
                  <p className="px-4 py-8 text-center text-sm text-gray-500">No results found.</p>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-white/10 flex items-center gap-4 text-xs text-gray-500">
                <span><kbd className="font-mono bg-white/5 px-1.5 py-0.5 rounded">↑↓</kbd> navigate</span>
                <span><kbd className="font-mono bg-white/5 px-1.5 py-0.5 rounded">↵</kbd> select</span>
                <span className="ml-auto">
                  <kbd className="font-mono bg-white/5 px-1.5 py-0.5 rounded">⌘K</kbd> to toggle
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
