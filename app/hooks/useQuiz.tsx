'use client';

import { useState, useEffect, useCallback } from 'react';
import { questions as originalQuestions } from '../lib/questions';
import { shuffleArray, shuffleQuestionOptions } from '../lib/utils';

// Inject unique IDs to ensure deduplication works perfectly
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

  // 1. Initial Mount: Check for saved data
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('fl_quiz_progress');
    if (saved) setHasSavedProgress(true);
  }, []);

  // 2. Start a Fresh Quiz
  const handleNewQuiz = useCallback((category: string = "All Categories", limit?: number) => {
    let filtered = category === "All Categories"
      ? questionsWithIds
      : questionsWithIds.filter(q => q.cat === category);

    // Deduplicate and Shuffle
    const unique = Array.from(new Map(filtered.map(q => [q.id, q])).values());
    const randomized = shuffleArray(unique).map(q => shuffleQuestionOptions(q));
    const finalSelection = limit ? randomized.slice(0, limit) : randomized;

    // Reset all states
    setActiveQuestions(finalSelection);
    setScore(0);
    setCurrentIdx(0);
    setUserAnswers({});
    setMarkedQuestions(new Set());
    setMissedCategories([]);
    resetTimer(0);

    // Initial Save to LocalStorage
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

  // 3. Resume from Storage
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

  // 4. Save Answer & Sync Progress
  // This is the CRITICAL function that keeps your choices alive during review jumps
  const saveAnswer = useCallback((questionIdx: number, answerIdx: number, isCorrect: boolean) => {
    const newAnswers = { ...userAnswers, [questionIdx]: answerIdx };
    setUserAnswers(newAnswers);

    // Update missed categories for the final report
    if (!isCorrect) {
      const cat = activeQuestions[questionIdx].cat;
      setMissedCategories(prev => [...prev, cat]);
    }

    // Sync everything to LocalStorage
    const saved = localStorage.getItem('fl_quiz_progress');
    if (saved) {
      const data = JSON.parse(saved);
      data.idx = questionIdx;
      data.userAnswers = newAnswers;
      data.scr = isCorrect ? score + 1 : score;
      data.time = seconds;
      localStorage.setItem('fl_quiz_progress', JSON.stringify(data));
    }
  }, [userAnswers, activeQuestions, score, seconds]);

  // 5. Toggle Review Mark
  const toggleMark = useCallback((idx: number) => {
    const newMarks = new Set(markedQuestions);
    if (newMarks.has(idx)) {
      newMarks.delete(idx);
    } else {
      newMarks.add(idx);
    }
    setMarkedQuestions(newMarks);

    const saved = localStorage.getItem('fl_quiz_progress');
    if (saved) {
      const data = JSON.parse(saved);
      data.markedQuestions = Array.from(newMarks);
      localStorage.setItem('fl_quiz_progress', JSON.stringify(data));
    }
  }, [markedQuestions]);

  // 6. Global Reset
  const handleRestart = useCallback(() => {
    localStorage.removeItem('fl_quiz_progress');
    setHasSavedProgress(false);
    setView("welcome");
    setCurrentIdx(0);
    setScore(0);
    setUserAnswers({});
    setMarkedQuestions(new Set());
  }, []);

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
    handleResume,
    handleRestart,
    isReviewJump,
    setIsReviewJump,
  };
}