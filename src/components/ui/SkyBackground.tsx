"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function SkyBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-1000">
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? "opacity-100 bg-[#060814]" : "opacity-0"}`} 
      />
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${!isDark ? "opacity-100 bg-white" : "opacity-0"}`} 
      />

      {isDark ? <NightSky /> : <DaySky />}
    </div>
  );
}

function NightSky() {
  const [starShadows, setStarShadows] = useState<string>("");
  const [shootingStars, setShootingStars] = useState<{ id: number; top: number; left: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate 3000 stars using a single box-shadow string for extreme performance
    let shadows = "";
    for (let i = 0; i < 3000; i++) {
      const x = Math.floor(Math.random() * 200); // 0 to 200vw
      const y = Math.floor(Math.random() * 200); // 0 to 200vw
      const opacity = (Math.random() * 0.8 + 0.2).toFixed(2);
      shadows += `${x}vw ${y}vw rgba(255,255,255,${opacity})${i < 2999 ? ", " : ""}`;
    }
    setStarShadows(shadows);

    // Generate 3 shooting stars
    const shooters = Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      top: Math.random() * 50, // Upper half
      left: Math.random() * 100, // Anywhere
      delay: Math.random() * 15,
    }));
    setShootingStars(shooters);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Night Aurora Lights */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: ["-10%", "10%", "-10%"]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -left-20 w-[60vw] h-[40vh] bg-emerald-500/20 blur-[120px] rounded-full"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          x: ["10%", "-10%", "10%"]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-10 right-0 w-[50vw] h-[50vh] bg-indigo-500/20 blur-[120px] rounded-full"
      />

      {/* Rotating Starfield */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 300, ease: "linear" }}
          className="w-full h-full relative"
        >
          {starShadows && (
            <div
              className="rounded-full"
              style={{
                width: "2px",
                height: "2px",
                boxShadow: starShadows,
                background: "transparent",
              }}
            />
          )}
        </motion.div>
      </div>

      {/* Shooting Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {shootingStars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ 
              x: 0, 
              y: 0, 
              opacity: 0,
              rotate: -45,
              scale: 0
            }}
            animate={{ 
              x: "-150vw", 
              y: "150vh", 
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              delay: star.delay,
              repeatDelay: 20 + Math.random() * 10, // Wait 20-30s before shooting again
              ease: "easeIn",
            }}
            className="absolute h-px w-[100px] sm:w-[150px] bg-gradient-to-r from-white to-transparent"
            style={{ 
              top: `${star.top}%`, 
              left: `${star.left}%`,
            }}
          >
            {/* Glowing head of the shooting star (on the left side because it moves down-left) */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[3px] bg-white rounded-full shadow-[0_0_20px_5px_rgba(255,255,255,1)]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DaySky() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate random light particles on client to avoid hydration mismatch
    const generatedParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 4, // 4px to 10px
      duration: Math.random() * 10 + 10, // 10s to 20s
      delay: Math.random() * 5,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-50">
      {/* Floating Light Particles */}
      <div className="absolute inset-0 z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-blue-400/20 shadow-[0_0_15px_rgba(96,165,250,0.4)] backdrop-blur-sm"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{ 
              y: ["-20%", "20%", "-20%"],
              x: ["-10%", "10%", "-10%"],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              repeat: Infinity,
              duration: particle.duration,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Ambient Aurora Mesh Gradients */}
      {/* Orb 1: Soft Cyan */}
      <motion.div
        animate={{
          x: ["0%", "30%", "0%"],
          y: ["0%", "15%", "0%"],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] bg-cyan-300/40 rounded-full blur-[90px]"
      />

      {/* Orb 2: Light Blue */}
      <motion.div
        animate={{
          x: ["0%", "-30%", "0%"],
          y: ["0%", "30%", "0%"],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] -right-[10%] w-[50vw] h-[50vw] bg-blue-400/30 rounded-full blur-[100px]"
      />

      {/* Orb 3: Pastel Purple */}
      <motion.div
        animate={{
          x: ["-20%", "20%", "-20%"],
          y: ["-15%", "-35%", "-15%"],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[20%] left-[20%] w-[55vw] h-[55vw] bg-purple-300/40 rounded-full blur-[90px]"
      />

      {/* Orb 4: Soft Rose/Pink */}
      <motion.div
        animate={{
          x: ["15%", "-15%", "15%"],
          y: ["15%", "-25%", "15%"],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[10%] -right-[10%] w-[45vw] h-[45vw] bg-rose-300/30 rounded-full blur-[90px]"
      />
    </div>
  );
}
