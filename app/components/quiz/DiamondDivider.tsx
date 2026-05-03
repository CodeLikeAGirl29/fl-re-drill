"use client";

import { motion } from "framer-motion";
import { CSSProperties } from "react";

interface DiamondDividerProps {
  /** Use "cyan" for the default light blue, or pass a hex like "bg-[#06b6d4]" */
  color?: string;
  className?: string;
}

export default function DiamondDivider({
  color = "cyan",
  className = ""
}: DiamondDividerProps) {

  const isHex = color.startsWith('bg-[#');
  const hexColor = isHex ? color.slice(4, -1) : undefined;

  // Use the master light blue (Cyan 500) if no hex is provided
  const lineStyle: CSSProperties = isHex ? { borderColor: hexColor } : {};
  const diamondStyle: CSSProperties = isHex ? { backgroundColor: hexColor, borderColor: hexColor } : {};

  // Explicit classes for the light blue theme
  const standardLineClass = color === "cyan" ? "border-cyan-500" : "";
  const standardDiamondClass = color === "cyan" ? "bg-cyan-500 border-cyan-500" : "";

  return (
    <div className={`relative flex items-center justify-center w-full my-10 px-2 ${className} font-space`}>
      {/* LEFT DASHED LINE - Increased opacity to 40% so the blue is visible */}
      <div
        className={`flex-grow border-t border-dashed opacity-40 ${standardLineClass}`}
        style={lineStyle}
      />

      {/* CENTER BREATHING DIAMONDS */}
      <div className="mx-6 flex items-center gap-4">
        {[0, 0.8, 1.6].map((delay, i) => (
          <motion.div
            key={i}
            initial={{ rotate: 45, scale: 1, opacity: 0.8 }} // Ensures it starts as a diamond
            animate={{
              opacity: [0.8, 0.2, 0.8],
              scale: [1, 1.2, 1],
              rotate: 45
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay
            }}
            className={`w-1.5 h-1.5 border ${standardDiamondClass} shadow-[0_0_12px_rgba(6,182,212,0.5)]`}
            style={diamondStyle}
          />
        ))}
      </div>

      {/* RIGHT DASHED LINE */}
      <div
        className={`flex-grow border-t border-dashed opacity-40 ${standardLineClass}`}
        style={lineStyle}
      />
    </div>
  );
}