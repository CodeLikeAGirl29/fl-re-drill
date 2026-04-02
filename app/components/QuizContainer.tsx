'use client';

import { useState, useEffect, useMemo } from 'react';
import WelcomeScreen from './WelcomeScreen';
import QuestionCard from './quiz/QuestionCard';
import ResultsView from './quiz/ResultsView';
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
    if (!isCorrect) {
      const currentCat = activeQuestions[currentIdx].cat;
      setMissedCategories(prev => [...prev, currentCat]);
    }
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    const nextIndex = currentIdx + 1;
    setCurrentIdx(nextIndex);
  };

  return (
    // Widened to max-w-4xl for the new card style
    <div className="w-full max-w-4xl mx-auto py-10 relative z-10 px-4">

      {/* HUD and Progress Bar only show if we haven't finished */}
      {view === 'quiz' && currentIdx < activeQuestions.length && (
        <>
          <div className="w-full bg-white/10 h-1.5 rounded-full mb-10 overflow-hidden">
            <div
              className="bg-[#06b6d4] h-full transition-all duration-500 ease-out"
              style={{ width: `${(currentIdx / activeQuestions.length) * 100}%` }}
            />
          </div>
        </>
      )}

      {/* View Switcher */}
      {view === 'welcome' ? (
        <WelcomeScreen onNew={handleNewQuiz} onResume={handleResume} hasProgress={hasSavedProgress} />
      ) : currentIdx < activeQuestions.length ? (
        <QuestionCard
          questionsList={activeQuestions}
          index={currentIdx}
          totalQuestions={activeQuestions.length}
          currentTime={formatTime()}
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