"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface FlashcardProps {
  question: string;
  answer: string;
  direction: "left" | "right" | null;
  onSwipe: (direction: "left" | "right") => void;
}

export function Flashcard({
  question,
  answer,
  direction,
  onSwipe,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Automatically reset to the front face whenever a new question arrives
  useEffect(() => {
    setIsFlipped(false);
  }, [question]);

  return (
    <motion.div
      className="w-full max-w-sm h-64 [perspective:1000px] cursor-pointer"
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{
        opacity: 0,
        scale: 0.9,
        y: -25,
        x: direction === "left" ? -200 : 200,
        transition: { duration: 0.2, ease: "easeIn" },
      }}
    >
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d] transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Face */}
        <div className="absolute inset-0 w-full h-full bg-slate-900 border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center text-center [backface-visibility:hidden]">
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-500 mb-4 block">
            Question
          </span>
          <p className="text-white text-lg font-medium leading-relaxed">
            {question}
          </p>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider mt-6 font-mono">
            Click Card to Reveal
          </span>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 w-full h-full bg-slate-950 border border-cyan-500/30 rounded-2xl p-6 flex flex-col justify-center items-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 mb-4 block">
            Correct Answer Context
          </span>
          <p className="text-slate-200 text-base leading-relaxed">{answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
