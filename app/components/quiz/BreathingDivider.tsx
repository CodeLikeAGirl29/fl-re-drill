'use client';

import { motion } from "framer-motion";

export default function BreathingDivider() {
  return (
    <div className="relative w-full flex justify-center items-center mb-8 h-4 overflow-visible">
      {/* THE PULSING GRADIENT LINE */}
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{
          opacity: [0.1, 0.4, 0.1], // Subtle breathing in opacity
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        // A single thin line with a center-focused gradient
        className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent shadow-[0_0_8px_rgba(6,182,212,0.2)]"
      />
    </div>
  );
}