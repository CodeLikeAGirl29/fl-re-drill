'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import WelcomeScreen from './WelcomeScreen';
import QuestionCard from './quiz/QuestionCard';
import ResultsView from './quiz/ResultsView';
import FormulaModal from './FormulaModal';
import QuizCalculator from './QuizCalculator';
import { useTimer } from '../hooks/useTimer';
import { questions as originalQuestions } from '../lib/questions';
import { shuffleArray, shuffleQuestionOptions } from '../lib/utils';
import { Calculator, BookOpen, Bookmark, ChevronRight } from 'lucide-react';

export default function QuizContainer() {
  const [activeQuestions, setActiveQuestions] = useState(originalQuestions);
  const [view, setView] = useState<'welcome' | 'quiz' | 'review' | 'results'>('welcome');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const [missedCategories, setMissedCategories] = useState<string[]>([]);
  const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set());

  const { formatTime, seconds } = useTimer();

  const topMissed = useMemo(() => {
    const counts: Record<string, number> = {};
    missedCategories.forEach(cat => counts[cat] = (counts[cat] || 0) + 1);
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
  }, [missedCategories]);

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
    let filtered = originalQuestions;
    if (category !== "All Categories") {
      filtered = originalQuestions.filter(q => q.cat === category);
    }

    const shuffledQuestions = shuffleArray(filtered);
    const randomized = shuffledQuestions.map(q => shuffleQuestionOptions(q));

    setActiveQuestions(randomized);
    setScore(0);
    setCurrentIdx(0);
    setMissedCategories([]);
    setMarkedQuestions(new Set());

    localStorage.setItem('fl_quiz_progress', JSON.stringify({
      idx: 0,
      scr: 0,
      orderedQuestions: randomized,
      markedQuestions: [],
      time: 0,
      category: category
    }));

    setView('quiz');
  };

  const handleResume = () => {
    const saved = localStorage.getItem('fl_quiz_progress');
    if (saved) {
      const { idx, scr, orderedQuestions, markedQuestions: savedMarks } = JSON.parse(saved);
      if (orderedQuestions && orderedQuestions.length > 0) {
        setActiveQuestions(orderedQuestions);
        setScore(scr);
        setCurrentIdx(idx);
        if (savedMarks) setMarkedQuestions(new Set(savedMarks));
        setView('quiz');
      }
    }
  };

  const handleToggleMark = () => {
    const newMarked = new Set(markedQuestions);
    if (newMarked.has(currentIdx)) {
      newMarked.delete(currentIdx);
    } else {
      newMarked.add(currentIdx);
    }
    setMarkedQuestions(newMarked);

    const saved = localStorage.getItem('fl_quiz_progress');
    if (saved) {
      const data = JSON.parse(saved);
      data.markedQuestions = Array.from(newMarked);
      localStorage.setItem('fl_quiz_progress', JSON.stringify(data));
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

    if (nextIndex >= activeQuestions.length) {
      localStorage.removeItem('fl_quiz_progress');
      setHasSavedProgress(false);
      setView('review'); // Trigger Review Screen
    } else {
      setCurrentIdx(nextIndex);
      localStorage.setItem('fl_quiz_progress', JSON.stringify({
        idx: nextIndex,
        scr: newScore,
        orderedQuestions: activeQuestions,
        markedQuestions: Array.from(markedQuestions),
        time: seconds
      }));
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-10 relative z-10 px-4 font-sans">

      {/* 1. PROGRESS BAR */}
      {view === 'quiz' && currentIdx < activeQuestions.length && (
        <div className="w-full mb-10 animate-in fade-in duration-700">
          <div className="w-full bg-white/5 h-6 rounded-full overflow-hidden relative border border-white/10 shadow-inner">
            {(() => {
              const progress = (currentIdx / activeQuestions.length) * 100;
              const currentPassRate = currentIdx > 0 ? (score / currentIdx) * 100 : 0;
              let barColor = "bg-[#1d4ed8]";
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
        <WelcomeScreen onNew={handleNewQuiz} onResume={handleResume} hasProgress={hasSavedProgress} />
      ) : view === 'quiz' ? (
        <QuestionCard
          questionsList={activeQuestions}
          index={currentIdx}
          totalQuestions={activeQuestions.length}
          currentTime={formatTime()}
          onNext={handleNext}
          isMarked={markedQuestions.has(currentIdx)}
          onToggleMark={handleToggleMark}
        />
      ) : view === 'review' ? (
        <div className="mx-auto w-full max-w-2xl bg-[#1e293b] p-8 rounded-xl border border-[#444444] shadow-2xl animate-in fade-in zoom-in duration-500">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Review Session</h2>
            <p className="text-[#817a8e] text-sm italic">Review flagged items before final submission.</p>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-8 gap-3 mb-10 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
            {activeQuestions.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentIdx(i);
                  setView('quiz');
                }}
                className={`h-14 flex flex-col items-center justify-center rounded-lg border transition-all duration-300 ${markedQuestions.has(i)
                  ? 'border-rose-500 bg-rose-500/20 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.2)]'
                  : 'border-white/10 bg-white/5 text-[#817a8e] hover:border-[#06b6d4] hover:text-white'
                  }`}
              >
                <span className="text-xs font-bold">{i + 1}</span>
                {markedQuestions.has(i) && <Bookmark size={12} fill="currentColor" className="mt-1" />}
              </button>
            ))}
          </div>

          <button
            onClick={() => setView('results')}
            className="group w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-lg transition-all flex items-center justify-center gap-2"
          >
            Submit Final Exam
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      ) : (
        <ResultsView
          score={score}
          total={activeQuestions.length}
          missed={topMissed}
          rank={getRank(score, activeQuestions.length)}
        />
      )}

      {/* 3. TOOLKIT */}
      {(view === 'quiz' || view === 'review') && (
        <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-[60]">
          <button
            onClick={() => setIsCalcOpen(!isCalcOpen)}
            className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 border-4 border-[#1e293b] group ${isCalcOpen ? 'bg-emerald-600 scale-110' : 'bg-slate-700 hover:bg-slate-600'
              }`}
          >
            <Calculator size={24} className="text-white group-hover:rotate-12 transition-transform" />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-14 h-14 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 border-4 border-[#1e293b] hover:scale-110"
          >
            <BookOpen size={24} />
          </button>
        </div>
      )}

      <FormulaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <QuizCalculator isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
    </div>
  );
}