"use client";

import { useState, useEffect, useCallback } from "react";
import { Category, Question } from "../lib/questions";
import { shuffleArray, shuffleQuestionOptions } from "../lib/utils";

export function useQuiz(
  seconds: number,
  resetTimer: (s: number) => void,
  sourceQuestions: Question[] = [], // NEW — passed in from outside
) {
  const questionsWithIds = sourceQuestions.map((q, i) => ({
    ...q,
    id: q.id || `q-${i}`,
  }));

  const [view, setView] = useState<"welcome" | "quiz" | "review" | "results">(
    "welcome",
  );
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isReviewJump, setIsReviewJump] = useState(false);
  const [missedQuestions, setMissedQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number | null>>(
    {},
  );
  const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(
    new Set(),
  );
  const [missedCategories, setMissedCategories] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);

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

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("fl_quiz_progress");
    if (saved) setHasSavedProgress(true);
  }, []);

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

  const handleNewQuiz = useCallback(
    (category: string, limit?: number) => {
      if (questionsWithIds.length === 0) return; // wait for questions to load

      const filtered =
        category === "All Categories"
          ? questionsWithIds
          : questionsWithIds.filter((q) => q.cat === category);

      const randomized = shuffleArray(filtered).map((q) =>
        shuffleQuestionOptions(q),
      );

      let finalLimit = randomized.length;
      if (limit) {
        finalLimit = limit;
      } else if (category === "All Categories") {
        finalLimit = Math.min(100, randomized.length);
      }

      const finalSelection = randomized.slice(0, finalLimit);
      setActiveQuestions(finalSelection);
      setScore(0);
      setCurrentIdx(0);
      setUserAnswers({});
      setMarkedQuestions(new Set());
      setMissedCategories([]);
      resetTimer(0);
      setView("quiz");
    },
    [questionsWithIds, resetTimer],
  );

  const handleWeakestLinkDrill = useCallback(
    (limit: number = 20) => {
      if (questionsWithIds.length === 0) return;

      const savedStats = localStorage.getItem("fl_category_stats");
      if (!savedStats) return handleNewQuiz("All Categories", limit);

      const stats = JSON.parse(savedStats);
      const weakestCategories = Object.keys(stats).filter((cat) => {
        const { correct, total } = stats[cat];
        return total > 0 && correct / total < 0.75;
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
      setMissedCategories([]);
      resetTimer(0);
      setView("quiz");
    },
    [questionsWithIds, handleNewQuiz, resetTimer],
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

  const handleReviewDrill = useCallback(async () => {
    if (questionsWithIds.length === 0) return;

    // Get review question IDs from Firestore via the token
    const { auth } = await import("@/lib/firebase/client");
    const { getReviewQuestionIds } = await import("@/app/lib/actions/mastery");

    const token = (await auth.currentUser?.getIdToken()) ?? "";
    if (!token) return handleNewQuiz("All Categories", 20);

    const reviewIds = await getReviewQuestionIds(token);
    if (reviewIds.length === 0) return handleNewQuiz("All Categories", 20);

    const reviewPool = questionsWithIds.filter((q) => reviewIds.includes(q.id));

    const randomized = shuffleArray(reviewPool).map((q) =>
      shuffleQuestionOptions(q),
    );

    setActiveQuestions(randomized);
    setScore(0);
    setCurrentIdx(0);
    setUserAnswers({});
    setMarkedQuestions(new Set());
    setMissedCategories([]);
    resetTimer(0);
    setView("quiz");
  }, [questionsWithIds, handleNewQuiz, resetTimer]);

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
      const newScore = Object.entries(newAnswers).reduce((acc, [idx, ans]) => {
        const qIdx = parseInt(idx);
        return ans === activeQuestions[qIdx].correct ? acc + 1 : acc;
      }, 0);
      setScore(newScore);
    },
    [userAnswers, activeQuestions, updateCategoryStats],
  );

  const recordOutcome = useCallback(
    (category: Category, isCorrect: boolean, question?: Question) => {
      updateCategoryStats(category, isCorrect);
      if (!isCorrect) {
        setMissedCategories((prev) => Array.from(new Set([...prev, category])));
        if (question) {
          setMissedQuestions((prev) => {
            const exists = prev.find((q) => q.id === question.id);
            return exists ? prev : [...prev, question];
          });
        }
      }
    },
    [updateCategoryStats],
  );

  const toggleMark = useCallback((idx: number) => {
    setMarkedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
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
    setMissedQuestions([]);
  }, [resetTimer]);

  return {
    view,
    setView,
    activeQuestions,
    setActiveQuestions,
    currentIdx,
    setCurrentIdx,
    score,
    setScore,
    userAnswers,
    saveAnswer,
    markedQuestions,
    toggleMark,
    missedCategories,
    recordOutcome,
    isMounted,
    hasSavedProgress,
    handleNewQuiz,
    handleWeakestLinkDrill,
    handleResume,
    handleRestart,
    isReviewJump,
    setIsReviewJump,
    missedQuestions,
    setMissedQuestions,
    handleReviewDrill,
  };
}
