"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const techIcons = [
  { label: "React", color: "#61dafb", symbol: "⚛" },
  { label: "Python", color: "#3776ab", symbol: "🐍" },
  { label: "Next.js", color: "#ffffff", symbol: "▲" },
  { label: "TypeScript", color: "#3178c6", symbol: "TS" },
  { label: "PyTorch", color: "#ee4c2c", symbol: "🔦" },
  { label: "Docker", color: "#2496ed", symbol: "🐋" },
];

export function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {techIcons.map((icon, i) => {
        const angle = (i / techIcons.length) * Math.PI * 2;
        const radius = 52; // percent from center
        const x = (50 + radius * Math.cos(angle)).toFixed(2);
        const y = (50 + radius * Math.sin(angle) * 0.6).toFixed(2);
        const delay = i * 0.3;
        const duration = 3 + i * 0.5;

        return (
          <motion.div
            key={icon.label}
            className="absolute"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{
              opacity: 0.8,
              scale: 1,
              y: [0, -12, 0],
            }}
            transition={{
              opacity: { delay, duration: 0.5 },
              scale: { delay, duration: 0.5, type: "spring" },
              y: { delay: delay + 0.5, duration, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <div
              className="w-12 h-12 rounded-xl glass flex items-center justify-center text-xl font-bold shadow-lg"
              style={{ borderColor: `${icon.color}30` }}
              title={icon.label}
            >
              {icon.symbol}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
