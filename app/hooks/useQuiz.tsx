'use client';

import { useState, useEffect, useCallback } from 'react';
import { questions as originalQuestions, Category } from '../lib/questions';
import { shuffleArray, shuffleQuestionOptions } from '../lib/utils';

const questionsWithIds = originalQuestions.map((q, i) => ({ ...q, id: `q-${i}` }));

export function useQuiz(seconds: number, resetTimer: (s: number) => void) {
  const [view, setView] = useState<"welcome" | "quiz" | "review" | "results">("welcome");
  const [activeQuestions, setActiveQuestions] = useState(questionsWithIds);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isReviewJump, setIsReviewJump] = useState(false);

  // Persistence States
  const [userAnswers, setUserAnswers] = useState<Record<number, number | null>>({});
  const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set());
  const [missedCategories, setMissedCategories] = useState<string[]>([]);

  // Hydration/Status States
  const [isMounted, setIsMounted] = useState(false);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);

  // --- 1. Category Stats Tracking (Long-term Data) ---
  const updateCategoryStats = useCallback((category: Category, isCorrect: boolean) => {
    const savedStats = localStorage.getItem('fl_category_stats');
    const stats = savedStats ? JSON.parse(savedStats) : {};

    if (!stats[category]) stats[category] = { correct: 0, total: 0 };
    stats[category].total += 1;
    if (isCorrect) stats[category].correct += 1;

    localStorage.setItem('fl_category_stats', JSON.stringify(stats));
  }, []);

  // --- 2. Initial Mount Check ---
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('fl_quiz_progress');
    if (saved) setHasSavedProgress(true);
  }, []);

  // --- 3. Start Fresh Quiz ---
  const handleNewQuiz = useCallback((category: string = "All Categories", limit?: number) => {
    let filtered = category === "All Categories"
      ? questionsWithIds
      : questionsWithIds.filter(q => q.cat === category);

    const randomized = shuffleArray(filtered).map(q => shuffleQuestionOptions(q));
    const finalSelection = limit ? randomized.slice(0, limit) : randomized;

    setActiveQuestions(finalSelection);
    setScore(0);
    setCurrentIdx(0);
    setUserAnswers({});
    setMarkedQuestions(new Set());
    setMissedCategories([]);
    resetTimer(0);

    localStorage.setItem('fl_quiz_progress', JSON.stringify({
      idx: 0,
      scr: 0,
      orderedQuestions: finalSelection,
      markedQuestions: [],
      userAnswers: {},
      time: 0,
      category
    }));

    setView('quiz');
  }, [resetTimer]);

  // --- 4. Weakest Link Drill ---
  const handleWeakestLinkDrill = useCallback((limit: number = 20) => {
    const savedStats = localStorage.getItem('fl_category_stats');
    if (!savedStats) {
      // Fallback if no data exists yet
      return handleNewQuiz("All Categories", limit);
    }

    const stats = JSON.parse(savedStats);

    // Identify categories with < 75% accuracy
    const weakestCategories = Object.keys(stats).filter(cat => {
      const { correct, total } = stats[cat];
      return (correct / total) < 0.75;
    });

    let filtered = weakestCategories.length > 0
      ? questionsWithIds.filter(q => weakestCategories.includes(q.cat))
      : questionsWithIds; // If they are doing great everywhere, just give them a mix

    const randomized = shuffleArray(filtered).slice(0, limit).map(q => shuffleQuestionOptions(q));

    setActiveQuestions(randomized);
    setScore(0);
    setCurrentIdx(0);
    setUserAnswers({});
    setMarkedQuestions(new Set());
    resetTimer(0);
    setView('quiz');
  }, [handleNewQuiz, resetTimer]);

  // --- 5. Resume ---
  const handleResume = useCallback(() => {
    const saved = localStorage.getItem('fl_quiz_progress');
    if (saved) {
      const data = JSON.parse(saved);
      setActiveQuestions(data.orderedQuestions);
      setScore(data.scr);
      setCurrentIdx(data.idx);
      setUserAnswers(data.userAnswers || {});
      setMarkedQuestions(new Set(data.markedQuestions || []));
      resetTimer(data.time || 0);
      setView('quiz');
    }
  }, [resetTimer]);

  // --- 6. Save Answer & Sync ---
  const saveAnswer = useCallback((questionIdx: number, answerIdx: number, isCorrect: boolean) => {
    const newAnswers = { ...userAnswers, [questionIdx]: answerIdx };
    setUserAnswers(newAnswers);

    const question = activeQuestions[questionIdx];

    // Update Long-term Stats
    updateCategoryStats(question.cat, isCorrect);

    // Update Session missed categories
    if (!isCorrect) {
      setMissedCategories(prev => Array.from(new Set([...prev, question.cat])));
    }

    // Sync Session
    const saved = localStorage.getItem('fl_quiz_progress');
    if (saved) {
      const data = JSON.parse(saved);
      data.idx = questionIdx;
      data.userAnswers = newAnswers;
      // Recalculate score based on all answers to prevent score drift during review jumps
      const newScore = Object.entries(newAnswers).reduce((acc, [idx, ans]) => {
        return ans === activeQuestions[parseInt(idx)].correct ? acc + 1 : acc;
      }, 0);

      setScore(newScore);
      data.scr = newScore;
      data.time = seconds;
      localStorage.setItem('fl_quiz_progress', JSON.stringify(data));
    }
  }, [userAnswers, activeQuestions, seconds, updateCategoryStats]);

  // --- 7. UI Helpers ---
  const toggleMark = useCallback((idx: number) => {
    const newMarks = new Set(markedQuestions);
    newMarks.has(idx) ? newMarks.delete(idx) : newMarks.add(idx);
    setMarkedQuestions(newMarks);

    const saved = localStorage.getItem('fl_quiz_progress');
    if (saved) {
      const data = JSON.parse(saved);
      data.markedQuestions = Array.from(newMarks);
      localStorage.setItem('fl_quiz_progress', JSON.stringify(data));
    }
  }, [markedQuestions]);

  const handleRestart = useCallback(() => {
    localStorage.removeItem('fl_quiz_progress');
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
    handleWeakestLinkDrill, // NEW
    handleResume,
    handleRestart,
    isReviewJump,
    setIsReviewJump,
  };
}