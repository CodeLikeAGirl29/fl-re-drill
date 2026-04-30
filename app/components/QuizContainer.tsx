'use client';

import { useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import WelcomeScreen from "./WelcomeScreen";
import QuestionCard from "./quiz/QuestionCard";
import ResultsView from "./quiz/ResultsView";
import FormulaModal from "./FormulaModal";
import QuizCalculator from "./QuizCalculator";
import BreathingDivider from "./quiz/BreathingDivider";

import { useQuiz } from "../hooks/useQuiz";
import { useTimer } from "../hooks/useTimer";

import {
  IoCalculatorOutline,
  IoBookOutline,
  IoCheckmarkDoneCircleOutline,
  IoArrowForward
} from "react-icons/io5";

export default function QuizContainer() {
  const tm = useTimer();
  const qz = useQuiz(tm.seconds, tm.resetTimer);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);

  const getRank = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 94) return { name: "Exam Master", sub: "Absolute mastery. You're ready to dominate.", color: "text-emerald-400" };
    if (percentage >= 85) return { name: "High Achiever", sub: "Strong safety margin for the state exam.", color: "text-cyan-400" };
    if (percentage >= 75) return { name: "Licensed Associate", sub: "You passed! Stay sharp to keep that lead.", color: "text-blue-400" };
    if (percentage >= 65) return { name: "Non-Pass (Near Miss)", sub: "Close, but the state requires 75% to pass.", color: "text-orange-400" };
    return { name: "Below Standards", sub: "Significant study required in Law and Math.", color: "text-rose-400" };
  };

  if (!qz.isMounted) return <div className="min-h-screen bg-[#0f172a]" />;

  // Common animation variants for the "Slide Up" effect
  const slideUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-10 relative z-10 px-4 font-sans">

      {/* PROGRESS BAR (Static above the animated content) */}
      {(qz.view === "quiz" || qz.view === "review") && (
        <div className="w-full mb-6 group">
          <div className="flex justify-between items-end mb-1.5 px-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Session Progress</span>
            <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest">
              {qz.currentIdx + 1} / {qz.activeQuestions.length}
            </span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-cyan-500 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(6,182,212,0.4)]"
              style={{ width: `${((qz.currentIdx + 1) / qz.activeQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* VIEW ENGINE WITH ANIMATION */}
      <AnimatePresence mode="wait">
        {qz.view === "welcome" && (
          <motion.div key="welcome" {...slideUp}>
            <WelcomeScreen
              onNew={qz.handleNewQuiz}
              onResume={qz.handleResume}
              hasProgress={qz.hasSavedProgress}
            />
          </motion.div>
        )}

        {qz.view === "quiz" && (
          <motion.div key={`quiz-${qz.currentIdx}`} {...slideUp}>
            <QuestionCard
              index={qz.currentIdx}
              questionsList={qz.activeQuestions}
              totalQuestions={qz.activeQuestions.length}
              currentTime={tm.formatTime()}
              isMarked={qz.markedQuestions.has(qz.currentIdx)}
              onToggleMark={() => qz.toggleMark(qz.currentIdx)}
              onNext={(correct) => {
                if (correct) qz.setScore(s => s + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                if (qz.isReviewJump) {
                  qz.setIsReviewJump(false);
                  qz.setView("review");
                  return;
                }
                if (qz.currentIdx + 1 >= qz.activeQuestions.length) {
                  qz.setView("review");
                } else {
                  qz.setCurrentIdx(i => i + 1);
                }
              }}
            />
          </motion.div>
        )}

        {qz.view === "review" && (
          <motion.div key="review" {...slideUp} className="mx-auto w-full max-w-2xl bg-[#1e293b]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="text-center mb-8">
              <IoCheckmarkDoneCircleOutline size={48} className="mx-auto text-emerald-400 mb-4" />
              <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Final Audit</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">Review flagged items before state submission.</p>
            </div>
            <BreathingDivider />
            <div className="grid grid-cols-6 sm:grid-cols-10 gap-2 mb-10 max-h-64 overflow-y-auto pr-2">
              {qz.activeQuestions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { qz.setCurrentIdx(i); qz.setIsReviewJump(true); qz.setView("quiz"); }}
                  className={`h-10 flex flex-col items-center justify-center rounded-lg border transition-all duration-300 ${qz.markedQuestions.has(i) ? "border-rose-500 bg-rose-500/20 text-rose-400" : "border-white/5 bg-white/5 text-slate-500 hover:border-cyan-500 hover:text-white"
                    }`}
                >
                  <span className="text-[10px] font-black">{i + 1}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => qz.setView("results")}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
            >
              Submit for Grading <IoArrowForward />
            </button>
          </motion.div>
        )}

        {qz.view === "results" && (
          <motion.div key="results" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <ResultsView
              score={qz.score}
              total={qz.activeQuestions.length}
              missed={[]}
              rank={getRank(qz.score, qz.activeQuestions.length)}
              onRestart={qz.handleRestart}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING TOOLKIT (Static) */}
      {qz.view === "quiz" && (
        <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => setIsCalcOpen(true)}
            className="w-14 h-14 bg-slate-800 rounded-full border border-white/10 flex items-center justify-center text-white shadow-2xl"
          >
            <IoCalculatorOutline size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => setIsModalOpen(true)}
            className="w-14 h-14 bg-blue-600 rounded-full border border-white/10 flex items-center justify-center text-white shadow-2xl"
          >
            <IoBookOutline size={24} />
          </motion.button>
        </div>
      )}

      <FormulaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <QuizCalculator isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
    </div>
  );
}