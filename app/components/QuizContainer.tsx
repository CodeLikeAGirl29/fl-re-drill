'use client';

import { useState, useEffect } from 'react';
import WelcomeScreen from './WelcomeScreen';
import QuestionCard from './quiz/QuestionCard';
import FormulaModal from './FormulaModal';
import { useTimer } from '../hooks/useTimer';

export default function QuizContainer() {
  const [view, setView] = useState<'welcome' | 'quiz'>('welcome');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const { formatTime, seconds } = useTimer();

  // Update saveProgress to include seconds
  useEffect(() => {
    if (view === 'quiz') {
      localStorage.setItem('fl_quiz_progress', JSON.stringify({
        idx: currentIdx,
        scr: score,
        time: seconds
      }));
    }
  }, [currentIdx, score, seconds, view]);

  useEffect(() => {
    const saved = localStorage.getItem('fl_quiz_progress');
    if (saved) setHasSavedProgress(true);
  }, []);

  const handleResume = () => {
    const saved = localStorage.getItem('fl_quiz_progress');
    if (saved) {
      const { idx, scr } = JSON.parse(saved);
      setCurrentIdx(idx);
      setScore(scr);
      setView('quiz');
    }
  };

  const handleNext = (isCorrect: boolean) => {
    if (isCorrect) {
      // Use the functional update (prev => prev + 1)
      setScore((prevScore) => {
        const newScore = prevScore + 1;

        // Update LocalStorage with the NEW score immediately
        localStorage.setItem('fl_quiz_progress', JSON.stringify({
          idx: currentIdx + 1,
          scr: newScore
        }));

        return newScore;
      });
    } else {
      // Just update the index if incorrect
      localStorage.setItem('fl_quiz_progress', JSON.stringify({
        idx: currentIdx + 1,
        scr: score
      }));
    }

    setCurrentIdx((prevIdx) => prevIdx + 1);
  };

  const handleNewQuiz = () => {
    localStorage.removeItem('fl_quiz_progress');
    setCurrentIdx(0);
    setScore(0);
    setView('quiz');
  };

  return (
    <div className="w-full max-w-md mx-auto py-10 relative z-10">
      <div className="flex justify-between items-center mb-6 px-2">
        <span className="text-white/40 font-mono text-xs tracking-widest">{formatTime()}</span>
        <span className="text-indigo-400 font-black text-xs uppercase tracking-tighter">Score: {score}</span>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed top-6 right-6 z-50 bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter backdrop-blur-md hover:bg-indigo-500/30 transition-all"
      >
        <i className="fa-solid fa-calculator mr-2"></i> Formulas
      </button>

      {view === 'welcome' ? (
        <WelcomeScreen
          onNew={handleNewQuiz}
          onResume={handleResume}
          hasProgress={hasSavedProgress}
        />
      ) : (
        <QuestionCard
          index={currentIdx}
          score={score}
          onNext={(isCorrect: boolean) => {
            if (isCorrect) setScore(s => s + 1);
            setCurrentIdx(i => i + 1);
            // Save progress logic here
            localStorage.setItem('fl_quiz_progress', JSON.stringify({ idx: currentIdx + 1, scr: isCorrect ? score + 1 : score }));
          }}
        />
      )}

      <FormulaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}