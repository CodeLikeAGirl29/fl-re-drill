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

export default function FlashcardContainer({
  questions,
}: {
  questions: Question[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = async (direction: "left" | "right") => {
    const currentQuestion = questions[currentIndex];
    const status = direction === "right" ? "mastered" : "review";

    // Silently update the database
    await updateMastery(currentQuestion.id, status);

    // Move to next card
    setCurrentIndex((prev) => prev + 1);
  };

  if (currentIndex >= questions.length) {
    return (
      <div className="text-center font-space">
        <h2 className="text-4xl font-black italic uppercase text-white">
          Drill Complete
        </h2>
        <p className="text-cyan-400 font-bold mt-2">
          Stats updated in your dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full min-h-[500px]">
      <AnimatePresence mode="wait">
        <Flashcard
          key={questions[currentIndex].id}
          question={questions[currentIndex].question}
          answer={questions[currentIndex].answer}
          onSwipe={handleSwipe}
        />
      </AnimatePresence>
    </div>
  );
}
