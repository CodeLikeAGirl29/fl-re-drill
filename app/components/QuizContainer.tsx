'use client';

import { useState, useEffect } from 'react';
import WelcomeScreen from './WelcomeScreen';
import QuestionCard from './quiz/QuestionCard';
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

  // Custom hook for timer
  const { formatTime, seconds } = useTimer();

  // Check for saved progress ONCE on mount
  useEffect(() => {
    const saved = localStorage.getItem('fl_quiz_progress');
    if (saved) {
      setHasSavedProgress(true);
    }
  }, []);

  const handleNewQuiz = () => {
    // 1. Shuffle
    const randomized = shuffleArray(originalQuestions);

    // 2. Reset States
    setActiveQuestions(randomized);
    setScore(0);
    setCurrentIdx(0);

    // 3. Clear and Set LocalStorage
    localStorage.setItem('fl_quiz_progress', JSON.stringify({
      idx: 0,
      scr: 0,
      orderedQuestions: randomized,
      time: 0
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
    // We use functional updates (prev => ...) to ensure we always have the latest data
    let nextScore = score;

    if (isCorrect) {
      setScore(prev => {
        nextScore = prev + 1;
        return nextScore;
      });
    }

    const nextIndex = currentIdx + 1;
    setCurrentIdx(nextIndex);

    // Save current state to local storage
    localStorage.setItem('fl_quiz_progress', JSON.stringify({
      idx: nextIndex,
      scr: isCorrect ? score + 1 : score,
      orderedQuestions: activeQuestions,
      time: seconds
    }));
  };

  // Final Background Save (Updates time periodically)
  useEffect(() => {
    if (view === 'quiz') {
      const data = JSON.parse(localStorage.getItem('fl_quiz_progress') || '{}');
      localStorage.setItem('fl_quiz_progress', JSON.stringify({
        ...data,
        idx: currentIdx,
        scr: score,
        time: seconds
      }));
    }
  }, [seconds, view, currentIdx, score]);

  return (
    <div className="w-full max-w-md mx-auto py-10 relative z-10">
      {/* Header Stats */}
      <div className="flex justify-between items-center mb-6 px-2">
        <span className="text-white/40 font-mono text-xs tracking-widest">{formatTime()}</span>
        <span className="text-indigo-400 font-black text-xs uppercase tracking-tighter">Score: {score}</span>
      </div>

      {/* Fixed Formula Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed top-6 right-6 z-50 bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter backdrop-blur-md hover:bg-indigo-500/30 transition-all"
      >
        <i className="fa-solid fa-calculator mr-2"></i> Formulas
      </button>

      {/* View Logic */}
      {view === 'welcome' ? (
        <WelcomeScreen
          onNew={handleNewQuiz}
          onResume={handleResume}
          hasProgress={hasSavedProgress}
        />
      ) : (
        <QuestionCard
          questionsList={activeQuestions}
          index={currentIdx}
          score={score}
          onNext={handleNext}
        />
      )}

      <FormulaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}