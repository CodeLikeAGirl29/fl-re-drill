"use client";

import { useState, useEffect, useCallback } from "react";
import { Timer, Bookmark, BookmarkCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DiamondDivider from "./DiamondDivider";

interface Question {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
  cat: string;
}

interface QuestionCardProps {
  index: number;
  onNext: (isCorrect: boolean) => void;
  questionsList: Question[];
  totalQuestions: number;
  currentTime: string;
  isMarked: boolean;
  onToggleMark: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export default function QuestionCard({
  index,
  onNext,
  questionsList,
  totalQuestions,
  currentTime,
  isMarked,
  onToggleMark,
}: QuestionCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setSelected(null);
    setIsAnswered(false);
  }, [index]);

  const q = questionsList ? questionsList[index] : null;

  const handleNextClick = useCallback(() => {
    const isCorrect = selected === q?.correct;
    onNext(isCorrect);
  }, [onNext, q?.correct, selected]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isAnswered && ["1", "2", "3", "4"].includes(event.key)) {
        const optionIndex = parseInt(event.key) - 1;
        if (q?.options && q.options[optionIndex]) {
          setSelected(optionIndex);
          setIsAnswered(true);
        }
      }
      if (event.key === "Enter" && (isAnswered || isMarked)) handleNextClick();
      if (event.key.toLowerCase() === "m") onToggleMark();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnswered, isMarked, q?.q, q?.options, handleNextClick, onToggleMark]);

  const addLeadingZero = (number: number) =>
    number > 9 ? number : `0${number}`;

  if (!q) return null;

  const formatExplanation = (text: string) => {
    if (!text) return "No explanation provided.";
    return text
      .replace(/(Key Point:)/g, '<b class="text-cyan-400 font-bold">$1</b>')
      .replace(/(Calculation:)/g, '<b class="text-purple-400 font-bold">$1</b>')
      .replace(/(Correction:)/g, '<b class="text-rose-400 font-bold">$1</b>');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto w-full max-w-2xl bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl px-5 md:px-8 py-4 shadow-2xl relative z-10"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-xl font-medium text-cyan-400">
            {addLeadingZero(index + 1)}
          </span>
          <span className="text-lg font-medium text-slate-400">
            /{addLeadingZero(totalQuestions)}
          </span>
        </div>

        <button
          onClick={onToggleMark}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border ${
            isMarked
              ? "bg-rose-500 border-rose-400 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]"
              : "bg-slate-800 border-white/10 text-slate-400 hover:border-white/20"
          }`}
        >
          {isMarked ? (
            <BookmarkCheck size={12} fill="white" />
          ) : (
            <Bookmark size={12} />
          )}
          <span>{isMarked ? "Marked" : "Mark for Review"}</span>
        </button>

        <div className="flex w-[90px] items-center gap-1.5 justify-end">
          <Timer className="text-cyan-400" width={18} height={18} />
          <span className="text-base font-medium text-cyan-400">
            {currentTime}
          </span>
        </div>
      </div>

      <div className="mb-0.5">
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
          {q.cat}
        </span>
      </div>
      <h3 className="mb-3 text-base font-medium text-white leading-snug">
        {q.q}
      </h3>

      <DiamondDivider />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-2"
      >
        {q.options.map((opt: string, i: number) => {
          const isSelected = selected === i;
          const isCorrect = i === q.correct;

          return (
            <motion.button
              key={`${index}-${i}`}
              variants={itemVariants}
              whileHover={{ scale: 1.01, x: 3 }}
              whileTap={{ scale: 0.98 }}
              disabled={isAnswered}
              onClick={() => {
                setSelected(i);
                setIsAnswered(true);
              }}
              className={`w-full block text-left rounded-lg border px-3 py-2.5 text-sm transition-all duration-300 ease-in-out ${
                isAnswered
                  ? isCorrect
                    ? "border-emerald-500 bg-emerald-500/10 text-white"
                    : isSelected
                      ? "border-rose-500 bg-rose-500/10 text-white"
                      : "border-white/10 bg-slate-900 text-slate-500 opacity-50"
                  : isSelected
                    ? "border-cyan-500 bg-cyan-500/15 text-white"
                    : "border-white/10 bg-slate-900 text-white hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                    isSelected
                      ? "bg-white text-slate-900 border-white"
                      : "border-white/20 text-white/40"
                  }`}
                >
                  {i + 1}
                </span>
                {opt}
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 rounded-lg bg-slate-900 border-l-2 border-cyan-500"
          >
            <p
              className="text-xs text-slate-400 italic leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: formatExplanation(q.explanation),
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end mt-3">
        <button
          onClick={handleNextClick}
          disabled={!isAnswered && !isMarked}
          className="min-w-[110px] rounded-lg border border-cyan-500 bg-cyan-500 px-5 py-1.5 text-sm font-semibold text-slate-950 transition duration-300 hover:scale-105 hover:bg-cyan-400 disabled:opacity-20"
        >
          {index + 1 === totalQuestions ? "Finish" : "Next"}
        </button>
      </div>
    </motion.div>
  );
}
