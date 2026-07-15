"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, Command } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Journey", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // IntersectionObserver for active section
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav shadow-lg shadow-black/10" : "bg-transparent"
        }`}
      >
        <div className="container-max flex items-center justify-between h-16 px-4 sm:px-6">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#hero")}
            className="flex items-center gap-2 font-bold text-lg tracking-tight"
          >
            <span className="hidden sm:block gradient-text-primary text-xl">Saumya Pandey</span>
            <span className="sm:hidden gradient-text-primary text-xl">Saumya</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                activeSection === link.href.replace("#", "")
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Command search trigger */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-muted-foreground bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors border border-black/10 dark:border-white/10"
            >
              <Command size={14} />
              <span className="text-foreground">Search</span>
              <kbd className="font-mono bg-black/10 dark:bg-white/20 px-1 rounded ml-1 text-foreground">⌘K</kbd>
            </button>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/10 dark:hover:bg-white/10 transition-all"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Sun size={16} />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Moon size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            )}

            {/* Hire me CTA */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection("#contact"); }}
              className="hidden sm:flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/25"
            >
              Hire Me
            </a>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-40 w-72 glass-nav shadow-2xl flex flex-col pt-20 pb-8 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left px-4 py-3 rounded-xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="mt-auto">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection("#contact"); }}
                className="flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-violet-500 text-white"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
