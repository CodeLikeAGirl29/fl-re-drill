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
  isAuthenticated: boolean; // Add this to resolve the build error
}

export default function FlashcardContainer({
  questions,
  isAuthenticated,
}: FlashcardContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = async (direction: "left" | "right") => {
    if (currentIndex >= questions.length) return;

    const currentQuestion = questions[currentIndex];

    // 1. Only attempt to sync with Supabase if the user is logged in
    if (isAuthenticated) {
      const status = direction === "right" ? "mastered" : "review";
      // Silently update the database via Server Action
      try {
        await updateMastery(currentQuestion.id, status);
      } catch (error) {
        console.error("Mastery sync failed:", error);
      }
    }

    // 2. Always move to the next card for the UI experience
    setCurrentIndex((prev) => prev + 1);
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
    <div className="flex items-center justify-center w-full min-h-[500px] relative">
      <AnimatePresence mode="wait">
        <Flashcard
          key={questions[currentIndex].id}
          question={questions[currentIndex].question}
          answer={questions[currentIndex].answer}
          onSwipe={handleSwipe}
        />
      </AnimatePresence>

      {/* Visual indicator for Guest Mode */}
      {!isAuthenticated && (
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 italic">
            Guest Mode: Progress not syncing
          </span>
        </div>
      )}
    </div>
  );
}
