"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { FaCheck, FaRotateRight } from "react-icons/fa6";

interface FlashcardProps {
  question: string;
  answer: string;
  onSwipe: (direction: "left" | "right") => void;
}

export default function Flashcard({
  question,
  answer,
  onSwipe,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const x = useMotionValue(0);

  // Dynamic styling based on drag distance
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const checkOpacity = useTransform(x, [50, 150], [0, 1]);
  const undoOpacity = useTransform(x, [-50, -150], [0, 1]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 150) onSwipe("right");
    else if (info.offset.x < -150) onSwipe("left");
  };

  return (
    <div className="relative w-full max-w-sm aspect-[3/4] perspective-1000 cursor-grab active:cursor-grabbing">
      {/* Swipe Indicators */}
      <motion.div
        style={{ opacity: checkOpacity }}
        className="absolute top-10 right-10 z-20 text-green-400 text-6xl pointer-events-none"
      >
        <FaCheck />
      </motion.div>
      <motion.div
        style={{ opacity: undoOpacity }}
        className="absolute top-10 left-10 z-20 text-rose-500 text-6xl pointer-events-none"
      >
        <FaRotateRight />
      </motion.div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x, rotate, opacity }}
        onDragEnd={handleDragEnd}
        onClick={() => setIsFlipped(!isFlipped)}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative w-full h-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] border-4 border-white preserve-3d"
      >
        {/* Front Side: Question */}
        <div className="absolute inset-0 backface-hidden bg-slate-900 p-8 flex flex-col items-center justify-center text-center">
          <span className="text-cyan-400 font-black text-xs uppercase tracking-[0.3em] mb-4">
            Question
          </span>
          <h3 className="text-2xl font-bold leading-tight italic text-slate-400 question">
            {question}
          </h3>
          <p className="mt-8 text-slate-500 text-[10px] font-black uppercase">
            Tap to Flip | Swipe to Score
          </p>
        </div>

        {/* Back Side: Answer */}
        <div className="absolute inset-0 backface-hidden bg-cyan-600 p-8 flex flex-col items-center justify-center text-center [transform:rotateY(180deg)]">
          <span className="text-white/60 font-black text-xs uppercase tracking-[0.3em] mb-4">
            Answer
          </span>
          <h3 className="text-2xl font-black text-zinc-600/900 leading-tight answer">
            {answer}
          </h3>
        </div>
      </motion.div>
    </div>
  );
}
