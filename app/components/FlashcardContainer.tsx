"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Flashcard from "./Flashcard";
import { updateMastery } from "@/app/lib/actions/mastery";

interface Question {
  id: string;
  question: string;
  answer: string;
}

interface FlashcardContainerProps {
  questions: Question[];
  isAuthenticated: boolean;
  onAnswer?: (id: string, isCorrect: boolean) => void;
}

export default function FlashcardContainer({
  questions,
  isAuthenticated,
  onAnswer,
}: FlashcardContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: "left" | "right") => {
    if (currentIndex >= questions.length) return;

    const currentQuestion = questions[currentIndex];
    const isCorrect = direction === "right";

    // CHANGE: Make this instant or very short (10ms)
    setCurrentIndex((prev) => prev + 1);

    // Background updates...
    if (onAnswer) onAnswer(currentQuestion.id, isCorrect);
    if (isAuthenticated) {
      updateMastery(
        currentQuestion.id,
        isCorrect ? "mastered" : "review",
      ).catch(console.error);
    }
  };

  if (currentIndex >= questions.length) {
    return (
      <div className="text-center font-space py-10">
        <h2 className="text-4xl font-black italic uppercase text-white">
          Drill Complete
        </h2>
        <p className="text-cyan-400 font-bold mt-2 uppercase tracking-widest text-xs">
          {isAuthenticated
            ? "Stats updated in your dashboard."
            : "Sign in to save your progress permanently."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[500px] relative">
      <AnimatePresence mode="popLayout">
        <Flashcard
          key={questions[currentIndex].id}
          question={questions[currentIndex].question}
          answer={questions[currentIndex].answer}
          onSwipe={handleSwipe}
        />
      </AnimatePresence>

      <div className="flex gap-10 mt-8">
        <button
          onClick={() => handleSwipe("left")}
          className="px-6 py-2 bg-rose-500/20 border border-rose-500/50 text-rose-400 rounded-xl font-bold uppercase text-xs hover:bg-rose-500/30 transition-colors"
        >
          Need Review (Left)
        </button>
        <button
          onClick={() => handleSwipe("right")}
          className="px-6 py-2 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 rounded-xl font-bold uppercase text-xs hover:bg-emerald-500/30 transition-colors"
        >
          Mastered (Right)
        </button>
      </div>

      {!isAuthenticated && (
        <div className="mt-6">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 italic">
            Guest Mode: Progress not syncing
          </span>
        </div>
      )}
    </div>
  );
}
