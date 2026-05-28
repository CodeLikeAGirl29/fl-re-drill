"use client";

import { useState, useEffect } from "react";
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
  const [activeDeck, setActiveDeck] = useState<Question[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Randomize and slice down to 25 items on component initialization
  useEffect(() => {
    if (questions && questions.length > 0) {
      const randomized = [...questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 25);

      setActiveDeck(randomized);
      setIsInitialized(true);
    }
  }, [questions]);

  const handleSwipe = (direction: "left" | "right") => {
    if (currentIndex >= activeDeck.length) return;

    // 1. Snapshot the question data BEFORE updating state indexes
    const currentQuestion = activeDeck[currentIndex];
    const isCorrect = direction === "right";

    // 2. Instantly advance the UI step so card entry/exit transitions run smoothly
    setCurrentIndex((prev) => prev + 1);

    // 3. Fire the parent context tracking lifecycle hook if present
    if (onAnswer) onAnswer(currentQuestion.id, isCorrect);

    // 4. Decouple network mutations from the active unmounting components timeline
    if (isAuthenticated) {
      // Fire-and-forget background execution context isolated from layout lifecycles
      (async () => {
        try {
          const result = await updateMastery(
            currentQuestion.id,
            isCorrect ? "mastered" : "review",
          );
          if (result && !result.success) {
            console.warn(`Telemetry sync deferred: ${result.error}`);
          }
        } catch (err) {
          // Captures low-level network closures safely without crashing the client runtime
          console.warn("Background telemetry sync safely deferred.", err);
        }
      })();
    }
  };

  // Prevent layout jumps before array slicing is prepared
  if (!isInitialized || activeDeck.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="h-5 w-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (currentIndex >= activeDeck.length) {
    return (
      <div className="text-center font-space py-10">
        <h2 className="text-4xl font-black italic uppercase text-white tracking-tight">
          Drill Complete
        </h2>
        <p className="text-cyan-400 font-bold mt-2 uppercase tracking-widest text-xs">
          {isAuthenticated
            ? "Telemetry stats synchronized to your dashboard."
            : "Sign in to save your structural progress loops permanently."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[500px] relative">
      {/* Structural Round Counter */}
      <div className="mb-4 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
        Card <span className="text-white font-black">{currentIndex + 1}</span>{" "}
        of {activeDeck.length}
      </div>

      {/* Mode set to "wait" isolates component lifecycles cleanly */}
      <AnimatePresence mode="wait">
        <Flashcard
          key={activeDeck[currentIndex].id}
          question={activeDeck[currentIndex].question}
          answer={activeDeck[currentIndex].answer}
          onSwipe={handleSwipe}
        />
      </AnimatePresence>

      <div className="flex gap-6 mt-8 w-full max-w-sm">
        <button
          onClick={() => handleSwipe("left")}
          className="flex-1 py-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl font-bold uppercase text-[11px] font-mono tracking-wider hover:bg-rose-500/20 active:scale-[0.98] transition-all"
        >
          Need Review (←)
        </button>
        <button
          onClick={() => handleSwipe("right")}
          className="flex-1 py-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl font-bold uppercase text-[11px] font-mono tracking-wider hover:bg-emerald-500/20 active:scale-[0.98] transition-all"
        >
          Mastered (→)
        </button>
      </div>

      {!isAuthenticated && (
        <div className="mt-6">
          <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-slate-600 italic">
            // Guest Mode: Progress data bound locally
          </span>
        </div>
      )}
    </div>
  );
}
