"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorX2 = useMotionValue(-100);
  const cursorY2 = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const isHovering = useRef(false);
  const ringRef1 = useRef<HTMLDivElement>(null);
  const ringRef2 = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const springConfigSlow = { damping: 30, stiffness: 150, mass: 1 };
  
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const springX2 = useSpring(cursorX2, springConfigSlow);
  const springY2 = useSpring(cursorY2, springConfigSlow);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      cursorX2.set(e.clientX);
      cursorY2.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleHoverIn = () => {
      isHovering.current = true;
      if (ringRef1.current) ringRef1.current.classList.add("hovering");
      if (ringRef2.current) ringRef2.current.classList.add("hovering");
      if (dotRef.current) dotRef.current.classList.add("hovering");
    };

    const handleHoverOut = () => {
      isHovering.current = false;
      if (ringRef1.current) ringRef1.current.classList.remove("hovering");
      if (ringRef2.current) ringRef2.current.classList.remove("hovering");
      if (dotRef.current) dotRef.current.classList.remove("hovering");
    };

    window.addEventListener("mousemove", moveCursor);

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverIn);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverIn);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
    };
  }, [cursorX, cursorY, cursorX2, cursorY2, dotX, dotY]);

  return (
    <>
      {/* Outer slow ring */}
      <motion.div
        ref={ringRef1}
        className="cursor-ring cursor-ring-outer hidden md:block border-orange-500/30 border-2"
        style={{ x: springX2, y: springY2 }}
      />
      {/* Inner fast ring */}
      <motion.div
        ref={ringRef2}
        className="cursor-ring hidden md:block border-rose-500 border-2"
        style={{ x: springX, y: springY }}
      />
      {/* Core dot */}
      <motion.div
        ref={dotRef}
        className="cursor-dot hidden md:block bg-amber-400 shadow-[0_0_15px_#fbbf24]"
        style={{ x: dotX, y: dotY }}
      />
    </>
  );
}
