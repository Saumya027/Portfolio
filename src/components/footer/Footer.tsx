"use client";

import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: <GithubIcon size={18} />, href: "https://github.com/Saumya027", label: "GitHub" },
  { icon: <LinkedinIcon size={18} />, href: "https://linkedin.com/in/saumya-pandey-747421348", label: "LinkedIn" },
  { icon: <Mail size={18} />, href: "mailto:saumyap0107@gmail.com", label: "Email" },
];

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-white/5">
      <div className="container-max px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo + Tagline */}
          <div className="text-center md:text-left">
            <button onClick={scrollToTop} className="text-xl font-black tracking-tight gradient-text-primary">
              Saumya Pandey
            </button>
            <p className="text-sm text-muted-foreground mt-1">
              Building Intelligent Software Solutions
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-4">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials + scroll to top */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all hover:-translate-y-0.5"
              >
                {link.icon}
              </a>
            ))}
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white hover:opacity-90 transition-all hover:-translate-y-0.5 ml-2"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Saumya Pandey. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with{" "}
            <span className="gradient-text font-semibold">Next.js 15 · TypeScript · Tailwind · Framer Motion</span>
          </p>
          <p>
            <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-medium">
              Open to Work
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
