"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LightningStrike() {
  const [strikes, setStrikes] = useState<number[]>([]);

  useEffect(() => {
    // Generate random lightning strikes periodically
    const interval = setInterval(() => {
      // 30% chance of a lightning strike every 3 seconds
      if (Math.random() > 0.7) {
        const id = Date.now();
        setStrikes((prev) => [...prev, id]);
        
        // Remove it after animation completes
        setTimeout(() => {
          setStrikes((prev) => prev.filter((strikeId) => strikeId !== id));
        }, 1000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <AnimatePresence>
        {strikes.map((id) => {
          const left = Math.random() * 80 + 10; // Random position 10% to 90%
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0, 0.8, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              style={{
                position: "absolute",
                top: 0,
                left: `${left}%`,
                width: "4px",
                height: "100%",
                background: "linear-gradient(180deg, rgba(255,165,0,0) 0%, rgba(255,165,0,0.8) 50%, rgba(255,255,255,1) 100%)",
                filter: "blur(4px)",
                transform: `rotate(${Math.random() * 20 - 10}deg)`,
              }}
            >
              {/* Inner bright core */}
              <div 
                className="w-[1px] h-full mx-auto bg-white"
                style={{
                  boxShadow: "0 0 20px 5px rgba(255, 165, 0, 0.8)",
                }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
