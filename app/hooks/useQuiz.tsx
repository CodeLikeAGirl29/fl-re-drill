"use client";

import { useState, useEffect, useCallback } from "react";
import { questions as originalQuestions, Category } from "../lib/questions";
import { shuffleArray, shuffleQuestionOptions } from "../lib/utils";

// Initialize with IDs once to prevent mismatching during re-shuffles
const questionsWithIds = originalQuestions.map((q, i) => ({
  ...q,
  id: `q-${i}`,
}));

export function useQuiz(seconds: number, resetTimer: (s: number) => void) {
  const [view, setView] = useState<"welcome" | "quiz" | "review" | "results">(
    "welcome",
  );
  const [activeQuestions, setActiveQuestions] = useState(questionsWithIds);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isReviewJump, setIsReviewJump] = useState(false);

  // Persistence States
  const [userAnswers, setUserAnswers] = useState<Record<number, number | null>>(
    {},
  );
  const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(
    new Set(),
  );
  const [missedCategories, setMissedCategories] = useState<string[]>([]);

  // Hydration/Status States
  const [isMounted, setIsMounted] = useState(false);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);

  // --- 1. Long-term Mastery Stats ---
  const updateCategoryStats = useCallback(
    (category: Category, isCorrect: boolean) => {
      const savedStats = localStorage.getItem("fl_category_stats");
      const stats = savedStats ? JSON.parse(savedStats) : {};

      if (!stats[category]) stats[category] = { correct: 0, total: 0 };
      stats[category].total += 1;
      if (isCorrect) stats[category].correct += 1;

      localStorage.setItem("fl_category_stats", JSON.stringify(stats));
    },
    [],
  );

  // --- 2. Mount & Persistence Sync ---
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("fl_quiz_progress");
    if (saved) setHasSavedProgress(true);
  }, []);

  // Synchronize state changes to localStorage
  useEffect(() => {
    if (view === "quiz" || view === "review") {
      const saved = localStorage.getItem("fl_quiz_progress");
      const data = saved ? JSON.parse(saved) : {};

      data.idx = currentIdx;
      data.time = seconds;
      data.scr = score;
      data.userAnswers = userAnswers;
      data.markedQuestions = Array.from(markedQuestions);
      data.orderedQuestions = activeQuestions;

      localStorage.setItem("fl_quiz_progress", JSON.stringify(data));
      setHasSavedProgress(true);
    }
  }, [
    currentIdx,
    seconds,
    score,
    userAnswers,
    markedQuestions,
    view,
    activeQuestions,
  ]);

  // --- 3. Action Handlers ---

  const handleNewQuiz = useCallback(
    (category: string, limit?: number) => {
      // 1. Filter by specific category if requested
      const filtered =
        category === "All Categories"
          ? questionsWithIds
          : questionsWithIds.filter((q) => q.cat === category);

      // 2. Fully randomize the questions and the multiple choice options order
      const randomized = shuffleArray(filtered).map((q) =>
        shuffleQuestionOptions(q),
      );

      // 3. Determine the final question selection limit
      let finalLimit = randomized.length;
      if (limit) {
        finalLimit = limit;
      } else if (category === "All Categories") {
        finalLimit = Math.min(100, randomized.length); // Caps at 100 to simulate the Florida state exam
      }

      // 4. Slice out our selection pool
      const finalSelection = randomized.slice(0, finalLimit);

      // 5. Initialize active state parameters
      setActiveQuestions(finalSelection);
      setScore(0);
      setCurrentIdx(0);
      setUserAnswers({});
      setMarkedQuestions(new Set());
      setMissedCategories([]);
      resetTimer(0);
      setView("quiz");
    },
    [resetTimer],
  );

  const handleWeakestLinkDrill = useCallback(
    (limit: number = 20) => {
      const savedStats = localStorage.getItem("fl_category_stats");
      if (!savedStats) return handleNewQuiz("All Categories", limit);

      const stats = JSON.parse(savedStats);

      // Target categories under 75% mastery
      const weakestCategories = Object.keys(stats).filter((cat) => {
        const { correct, total } = stats[cat];
        return correct / total < 0.75;
      });

      const pool =
        weakestCategories.length > 0
          ? questionsWithIds.filter((q) => weakestCategories.includes(q.cat))
          : questionsWithIds;

      const randomized = shuffleArray(pool)
        .slice(0, limit)
        .map((q) => shuffleQuestionOptions(q));

      setActiveQuestions(randomized);
      setScore(0);
      setCurrentIdx(0);
      setUserAnswers({});
      setMarkedQuestions(new Set());
      resetTimer(0);
      setView("quiz");
    },
    [handleNewQuiz, resetTimer],
  );

  const handleResume = useCallback(() => {
    const saved = localStorage.getItem("fl_quiz_progress");
    if (saved) {
      const data = JSON.parse(saved);
      setActiveQuestions(data.orderedQuestions);
      setScore(data.scr);
      setCurrentIdx(data.idx);
      setUserAnswers(data.userAnswers || {});
      setMarkedQuestions(new Set(data.markedQuestions || []));
      resetTimer(data.time || 0);
      setView("quiz");
    }
  }, [resetTimer]);

  const saveAnswer = useCallback(
    (questionIdx: number, answerIdx: number, isCorrect: boolean) => {
      const newAnswers = { ...userAnswers, [questionIdx]: answerIdx };
      setUserAnswers(newAnswers);

      const question = activeQuestions[questionIdx];
      updateCategoryStats(question.cat, isCorrect);

      if (!isCorrect) {
        setMissedCategories((prev) =>
          Array.from(new Set([...prev, question.cat])),
        );
      }

      // Re-calculate total score to ensure accuracy across non-linear navigation
      const newScore = Object.entries(newAnswers).reduce((acc, [idx, ans]) => {
        const qIdx = parseInt(idx);
        return ans === activeQuestions[qIdx].correct ? acc + 1 : acc;
      }, 0);

      setScore(newScore);
    },
    [userAnswers, activeQuestions, updateCategoryStats],
  );

  const toggleMark = useCallback((idx: number) => {
    setMarkedQuestions((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  }, []);

  const handleRestart = useCallback(() => {
    localStorage.removeItem("fl_quiz_progress");
    setHasSavedProgress(false);
    setView("welcome");
    setCurrentIdx(0);
    setScore(0);
    setUserAnswers({});
    setMarkedQuestions(new Set());
    resetTimer(0);
  }, [resetTimer]);

  return {
    view,
    setView,
    activeQuestions,
    currentIdx,
    setCurrentIdx,
    score,
    setScore,
    userAnswers,
    saveAnswer,
    markedQuestions,
    toggleMark,
    missedCategories,
    isMounted,
    hasSavedProgress,
    handleNewQuiz,
    handleWeakestLinkDrill,
    handleResume,
    handleRestart,
    isReviewJump,
    setIsReviewJump,
  };
}
