'use client';

import { useState, useEffect, useMemo } from 'react';
import WelcomeScreen from './WelcomeScreen';
import QuestionCard from './quiz/QuestionCard';
import ResultsView from './quiz/ResultsView'; // Make sure to create this file!
import FormulaModal from './FormulaModal';
import { useTimer } from '../hooks/useTimer';
import { questions as originalQuestions } from '../lib/questions';
import { shuffleArray } from '../lib/utils';

export default function QuizContainer() {
  const [activeQuestions, setActiveQuestions] = useState(originalQuestions);
  const [view, setView] = useState<'welcome' | 'quiz'>('welcome');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const [missedCategories, setMissedCategories] = useState<string[]>([]);

  const { formatTime, seconds } = useTimer();

  // 1. Logic to calculate top missed categories for the report
  const topMissed = useMemo(() => {
    const counts: Record<string, number> = {};
    missedCategories.forEach(cat => counts[cat] = (counts[cat] || 0) + 1);
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
  }, [missedCategories]);

  useEffect(() => {
    const saved = localStorage.getItem('fl_quiz_progress');
    if (saved) setHasSavedProgress(true);
  }, []);

  const handleNewQuiz = () => {
    const randomized = shuffleArray(originalQuestions);
    setActiveQuestions(randomized);
    setScore(0);
    setCurrentIdx(0);
    setMissedCategories([]);
    localStorage.setItem('fl_quiz_progress', JSON.stringify({
      idx: 0, scr: 0, orderedQuestions: randomized, time: 0
    }));
    setView('quiz');
  };

  const handleResume = () => {
    const saved = localStorage.getItem('fl_quiz_progress');
    if (saved) {
      const { idx, scr, orderedQuestions } = JSON.parse(saved);
      if (orderedQuestions) setActiveQuestions(orderedQuestions);
      setCurrentIdx(idx);
      setScore(scr);
      setView('quiz');
    }
  };

  const handleNext = (isCorrect: boolean) => {
    // FIX: Track missed categories only if WRONG
    if (!isCorrect) {
      const currentCat = activeQuestions[currentIdx].cat;
      setMissedCategories(prev => [...prev, currentCat]);
    }

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    const nextIndex = currentIdx + 1;
    setCurrentIdx(nextIndex);

    localStorage.setItem('fl_quiz_progress', JSON.stringify({
      idx: nextIndex,
      scr: isCorrect ? score + 1 : score,
      orderedQuestions: activeQuestions,
      time: seconds
    }));
  };

  // Background timer save
  useEffect(() => {
    if (view === 'quiz' && currentIdx < activeQuestions.length) {
      const data = JSON.parse(localStorage.getItem('fl_quiz_progress') || '{}');
      localStorage.setItem('fl_quiz_progress', JSON.stringify({
        ...data, idx: currentIdx, scr: score, time: seconds
      }));
    }
  }, [seconds, view, currentIdx, score, activeQuestions.length]);

  return (
    <div className="w-full max-w-md mx-auto py-10 relative z-10 px-4">
      {/* Top HUD */}
      <div className="flex justify-between items-center mb-4 px-2">
        <span className="text-white/40 font-mono text-[10px] tracking-widest">{formatTime()}</span>
        <span className="text-indigo-400 font-black text-[10px] uppercase tracking-tighter">Score: {score}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/10 h-1.5 rounded-full mb-6 overflow-hidden">
        <div
          className="bg-indigo-500 h-full transition-all duration-500 ease-out"
          style={{ width: `${(currentIdx / activeQuestions.length) * 100}%` }}
        />
      </div>

      {/* View Switcher */}
      {view === 'welcome' ? (
        <WelcomeScreen onNew={handleNewQuiz} onResume={handleResume} hasProgress={hasSavedProgress} />
      ) : currentIdx < activeQuestions.length ? (
        <QuestionCard
          questionsList={activeQuestions}
          index={currentIdx}
          score={score}
          onNext={handleNext}
        />
      ) : (
        <ResultsView
          score={score}
          total={activeQuestions.length}
          missed={topMissed}
        />
      )}

      <FormulaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}