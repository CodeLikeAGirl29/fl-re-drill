"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Flashcard } from "./Flashcard";
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
  
  // Guard reference to ensure initialization code executes exactly once
  const deckBuiltRef = useRef(false);

  useEffect(() => {
    // If already initialized or building, drop out immediately to prevent loading state lockup
    if (deckBuiltRef.current) return;

    if (questions && questions.length > 0) {
      deckBuiltRef.current = true;

      const randomized = [...questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 25);

      setActiveDeck(randomized);
      setIsInitialized(true);
    } else if (questions && questions.length === 0) {
      deckBuiltRef.current = true;
      setIsInitialized(true);
    }
  }, [questions]); // Purely tracks incoming base questions data reference array length

  const handleSwipe = (direction: "left" | "right") => {
    if (currentIndex >= activeDeck.length) return;

    const currentQuestion = activeDeck[currentIndex];
    const isCorrect = direction === "right";

    // Advance index instantly to force AnimatePresence to transition properly
    setCurrentIndex((prev) => prev + 1);

    // Call layout tracking lifecycle handlers if passed
    if (onAnswer) onAnswer(currentQuestion.id, isCorrect);

    // Decouple the database sync completely so it never blocks the animation UI timeline
    if (isAuthenticated) {
      updateMastery(currentQuestion.id, isCorrect ? "mastered" : "review")
        .then((result) => {
          if (result && !result.success) {
            console.warn(`Telemetry sync deferred: ${result.error}`);
          }
        })
        .catch((err) => {
          console.warn("Database sync deferred safely to preserve card loop.", err);
        });
    }
  };

  // Prevent flash content jumps before array slicing is prepared
  if (!isInitialized) {
    return (
      <div className="text-center py-12">
        <div className="h-5 w-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  // Handle case where no questions are available for the selected category
  if (activeDeck.length === 0) {
    return (
      <div className="text-center font-space py-10">
        <h2 className="text-2xl font-black uppercase text-white tracking-tight">
          No Cards Available
        </h2>
        <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-xs">
          Select a different domain category from the welcome matrix.
        </p>
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

      {/* Mode set to "wait" ensures old indicators are unmounted cleanly before next card slides */}
      <AnimatePresence mode="wait" initial={false}>
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