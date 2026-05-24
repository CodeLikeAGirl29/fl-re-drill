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
  const dragX = useMotionValue(0);

  // Dynamic styling based on drag distance
  const rotate = useTransform(dragX, [-200, 200], [-25, 25]);
  const opacityTransform = useTransform(dragX, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const checkOpacity = useTransform(dragX, [50, 150], [0, 1]);
  const undoOpacity = useTransform(dragX, [-50, -150], [0, 1]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x > 150) {
      onSwipe("right");
    } else if (info.offset.x < -150) {
      onSwipe("left");
    }
  };

  // Define structured animation variants to prevent style overrides
  const cardVariants = {
    initial: {
      x: 350,
      opacity: 0,
      scale: 0.95,
    },
    animate: (flipped: boolean) => ({
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: flipped ? 180 : 0,
    }),
    exit: {
      x: dragX.get() >= 0 ? 600 : -600,
      opacity: 0,
      scale: 0.9,
    }
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
        // Pass dragX to track drag, but allow Framer variants to handle x animation positioning
        style={{ x: dragX, rotate, opacity: opacityTransform }}
        onDragEnd={handleDragEnd}
        onClick={() => setIsFlipped(!isFlipped)}
        
        // Connect variants configuration
        variants={cardVariants}
        custom={isFlipped}
        initial="initial"
        animate="animate"
        exit="exit"
        
        // Crisp transition timeline settings
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 28,
        }}
        className="relative w-full h-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] border-4 border-white preserve-3d will-change-transform bg-slate-900"
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
          <h3 className="text-2xl font-black text-zinc-900 leading-tight answer">
            {answer}
          </h3>
        </div>
      </motion.div>
    </div>
  );
}