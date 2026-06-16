"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for the cursor position
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    // Only run on desktop/devices with pointers
    if (window.matchMedia("(hover: none)").matches) return;
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // Detect if we are hovering over an interactive element or an image
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "img" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference flex items-center justify-center"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{
          width: isHovering ? 64 : 8,
          height: isHovering ? 64 : 8,
          backgroundColor: isHovering ? "rgba(246, 243, 238, 1)" : "rgba(246, 243, 238, 1)",
          scale: isHovering ? 1 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="rounded-full flex items-center justify-center"
      >
        <motion.span 
          animate={{ opacity: isHovering ? 1 : 0 }}
          className="text-[8px] font-medium text-ink uppercase tracking-[0.2em] pointer-events-none"
        >
          {isHovering ? "View" : ""}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
