'use client';

import { useState, useEffect, useMemo } from 'react';
import WelcomeScreen from './WelcomeScreen';
import QuestionCard from './quiz/QuestionCard';
import ResultsView from './quiz/ResultsView';
import FormulaModal from './FormulaModal';
import QuizCalculator from './QuizCalculator'; // New Component
import { useTimer } from '../hooks/useTimer';
import { questions as originalQuestions } from '../lib/questions';
import { shuffleArray, shuffleQuestionOptions } from '../lib/utils';
import { Calculator, BookOpen } from 'lucide-react';

export default function QuizContainer() {
  const [activeQuestions, setActiveQuestions] = useState(originalQuestions);
  const [view, setView] = useState<'welcome' | 'quiz'>('welcome');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const [missedCategories, setMissedCategories] = useState<string[]>([]);

  const { formatTime, seconds } = useTimer();

  // Logic for Top 3 Missed Categories
  const topMissed = useMemo(() => {
    const counts: Record<string, number> = {};
    missedCategories.forEach(cat => counts[cat] = (counts[cat] || 0) + 1);
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
  }, [missedCategories]);

  // Logic for Emerald Coast Ranks
  const getRank = (finalScore: number, total: number) => {
    const percentage = (finalScore / total) * 100;
    if (percentage >= 95) return { name: "Emerald Coast Legend", sub: "Ready for Sundance." };
    if (percentage >= 85) return { name: "Luxury Broker", sub: "Destin listings await." };
    if (percentage >= 75) return { name: "Licensed Professional", sub: "You passed the State Exam!" };
    if (percentage >= 60) return { name: "Probationary Associate", sub: "Almost there. Drill F.S. 475." };
    return { name: "The Anchor", sub: "Stuck in the sand. Back to the books!" };
  };

  useEffect(() => {
    const saved = localStorage.getItem('fl_quiz_progress');
    if (saved) setHasSavedProgress(true);
  }, []);

  const handleNewQuiz = (category: string = "All Categories") => {
    // 1. Filter by category first
    let filtered = originalQuestions;
    if (category !== "All Categories") {
      filtered = originalQuestions.filter(q => q.cat === category);
    }

    // 2. Shuffle the order of the filtered questions
    const shuffledQuestions = shuffleArray(filtered);

    // 3. Shuffle the A, B, C, D options for each question
    const randomized = shuffledQuestions.map(q => shuffleQuestionOptions(q));

    // 4. Update state
    setActiveQuestions(randomized);
    setScore(0);
    setCurrentIdx(0);
    setMissedCategories([]);

    // 5. Update localStorage with the specific filtered set
    localStorage.setItem('fl_quiz_progress', JSON.stringify({
      idx: 0,
      scr: 0,
      orderedQuestions: randomized,
      time: 0,
      category: category // Store category for context if needed
    }));

    setView('quiz');
  };

  const handleResume = () => {
    const saved = localStorage.getItem('fl_quiz_progress');
    if (saved) {
      const { idx, scr, orderedQuestions } = JSON.parse(saved);
      if (orderedQuestions && orderedQuestions.length > 0) {
        setActiveQuestions(orderedQuestions);
        setScore(scr);
        setCurrentIdx(idx);
        setView('quiz');
      }
    }
  };

  const handleNext = (isCorrect: boolean) => {
    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    } else {
      const currentCat = activeQuestions[currentIdx].cat;
      setMissedCategories(prev => [...prev, currentCat]);
    }
    const nextIndex = currentIdx + 1;
    setCurrentIdx(nextIndex);
    localStorage.setItem('fl_quiz_progress', JSON.stringify({
      idx: nextIndex,
      scr: newScore,
      orderedQuestions: activeQuestions,
      time: seconds
    }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-10 relative z-10 px-4">

      {/* 1. DYNAMIC PROGRESS BAR */}
      {view === 'quiz' && currentIdx < activeQuestions.length && (
        <div className="w-full mb-10 animate-in fade-in duration-700">
          <div className="w-full bg-white/5 h-6 rounded-full overflow-hidden relative border border-white/10 shadow-inner">
            {(() => {
              const progress = (currentIdx / activeQuestions.length) * 100;
              const currentPassRate = currentIdx > 0 ? (score / currentIdx) * 100 : 0;

              // Color based on CURRENT PASS RATE (Success Logic)
              let barColor = "bg-[#1d4ed8]"; // Default Blue
              if (currentPassRate >= 75) barColor = "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]";
              else if (currentPassRate < 70 && currentIdx > 5) barColor = "bg-rose-500";

              return (
                <div
                  className={`${barColor} h-full transition-all duration-700 ease-out flex items-center justify-center text-[0.625rem] font-black text-white uppercase tracking-widest`}
                  style={{ width: `${progress}%` }}
                >
                  {progress > 10 && <span>{Math.round(progress)}% Complete</span>}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* 2. VIEW SWITCHER */}
      {view === 'welcome' ? (
        <WelcomeScreen
          onNew={handleNewQuiz}
          onResume={handleResume}
          hasProgress={hasSavedProgress}
        />
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
          rank={getRank(score, activeQuestions.length)} // Passing the custom rank
        />
      )}

      {/* 3. FLOATING TOOLKIT (Calculator + Formulas) */}
      {view === 'quiz' && currentIdx < activeQuestions.length && (
        <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-[60]">
          {/* Calculator Toggle */}
          <button
            onClick={() => setIsCalcOpen(!isCalcOpen)}
            className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 border-4 border-[#1e293b] group ${isCalcOpen ? 'bg-emerald-600 scale-110' : 'bg-slate-700 hover:bg-slate-600'
              }`}
          >
            <Calculator size={24} className="text-white group-hover:rotate-12 transition-transform" />
          </button>

          {/* Formula Sheet Toggle */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-14 h-14 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 border-4 border-[#1e293b] hover:scale-110"
          >
            <BookOpen size={24} />
          </button>
        </div>
      )}

      {/* 4. MODALS & OVERLAYS */}
      <FormulaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <QuizCalculator
        isOpen={isCalcOpen}
        onClose={() => setIsCalcOpen(false)}
      />

    </div>
  );
}