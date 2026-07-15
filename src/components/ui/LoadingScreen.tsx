"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          <div className="text-center">
            {/* Animated Loader */}
            <div className="flex justify-center mb-8">
              <motion.div
                className="w-16 h-16 border-4 border-orange-500"
                animate={{
                  scale: [1, 1.5, 1.5, 1, 1],
                  rotate: [0, 0, 180, 180, 0],
                  borderRadius: ["20%", "20%", "50%", "50%", "20%"]
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.5, 0.8, 1],
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-3 text-sm text-gray-500 tracking-[0.3em] uppercase font-mono"
            >
              Loading Portfolio
            </motion.p>

            {/* Progress bar */}
            <motion.div className="mt-8 w-48 h-[2px] bg-gray-800 rounded-full mx-auto overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 1.4, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
