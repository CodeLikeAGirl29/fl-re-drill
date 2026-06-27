"use client";

import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaLayerGroup } from "react-icons/fa6";
import {
  IoCalculatorOutline,
  IoBookOutline,
  IoCheckmarkDoneCircleOutline,
  IoArrowForward,
} from "react-icons/io5";

import WelcomeScreen from "./WelcomeScreen";
import QuestionCard from "./QuestionCard";
import ResultsView from "./ResultsView";
import DiamondDivider from "./DiamondDivider";
import QuizCalculator from "./QuizCalculator";
import FormulaModal from "@/app/components/FormulaModal";
import FlashcardContainer from "@/app/components/flashcards/FlashcardContainer";

import { useQuestions, useFlashcards } from "@/app/hooks/useQuestions";
import { useQuiz } from "@/app/hooks/useQuiz";
import { useTimer } from "@/app/hooks/useTimer";
import { auth } from "@/lib/firebase/client";
import { shuffleQuestionOptions } from "@/app/lib/utils";
import {
  updateCategoryStat,
  type MasteryRecord,
} from "@/app/lib/actions/mastery";

interface QuizContainerProps {
  mode: "standard" | "quick20" | "flashcards" | "weakest" | "review";
  category: string;
  onAnswer: (id: string, isCorrect: boolean) => void;
  onExit: () => void;
  isAuthenticated: boolean;
  masteryStats: MasteryRecord[];
}

export default function QuizContainer({
  mode,
  category,
  onExit,
  onAnswer,
  isAuthenticated,
  masteryStats,
}: QuizContainerProps) {
  const { questions, loading: questionsLoading } = useQuestions();
  const { flashcards, loading: flashcardsLoading } = useFlashcards();
  const tm = useTimer();
  const qz = useQuiz(tm.seconds, tm.resetTimer, questions);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [retryMode, setRetryMode] = useState(false);

  useEffect(() => {
    if (qz.view === "welcome") {
      if (mode === "standard") {
        qz.handleNewQuiz(category);
      } else if (mode === "quick20") {
        qz.handleNewQuiz(category, 20);
      } else if (mode === "weakest") {
        qz.handleWeakestLinkDrill(20);
      } else if (mode === "review") {
        qz.handleReviewDrill(); // This is the new line
      }
    }
  }, [mode, category]);

  useEffect(() => {
    if (qz.view === "review" || qz.view === "results") {
      tm.stopTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qz.view]);

  const slideUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  };

  const preparedFlashcards = useMemo(() => {
    if (mode === "flashcards") {
      return [...flashcards].sort(() => 0.5 - Math.random());
    }
    return [];
  }, [mode, flashcards]);

  const getRank = (score: number, total: number) => {
    const percentage = total > 0 ? (score / total) * 100 : 0;
    if (percentage >= 94)
      return {
        name: "Exam Master",
        sub: "Absolute mastery. You're ready to dominate.",
        color: "text-emerald-400",
      };
    if (percentage >= 85)
      return {
        name: "High Achiever",
        sub: "Strong safety margin for the state exam.",
        color: "text-cyan-400",
      };
    if (percentage >= 75)
      return {
        name: "Licensed Associate",
        sub: "You passed! Stay sharp to keep that lead.",
        color: "text-blue-400",
      };
    if (percentage >= 65)
      return {
        name: "Non-Pass (Near Miss)",
        sub: "Close, but the state requires 75% to pass.",
        color: "text-orange-400",
      };
    return {
      name: "Below Standards",
      sub: "Significant study required in Law and Math.",
      color: "text-rose-400",
    };
  };

  const handleRetryMissed = () => {
    if (!qz.missedQuestions || qz.missedQuestions.length === 0) return;
    const retryQuestions = qz.missedQuestions.map((q) =>
      shuffleQuestionOptions(q),
    );
    qz.setActiveQuestions(retryQuestions);
    qz.setScore(0);
    qz.setCurrentIdx(0);
    qz.setMissedQuestions([]);
    tm.resetTimer(0);
    qz.setView("quiz");
    setRetryMode(true);
  };

  if (questionsLoading || flashcardsLoading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!qz.isMounted) return <div className="min-h-screen bg-[#0f172a]" />;

  // --- BRANCH: FLASHCARD MODE ---
  if (mode === "flashcards") {
    return (
      <div className="w-full max-w-2xl mx-auto py-10 relative z-10 px-4 font-sans">
        <motion.div initial="initial" animate="animate" variants={slideUp}>
          <div className="w-full mb-12 border-b border-white/10 pb-6">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={onExit}
                className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 font-black uppercase text-[10px] tracking-widest transition-colors"
              >
                <FaChevronLeft /> End Session
              </button>
              <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
                <FaLayerGroup className="text-purple-400 text-[10px]" />
                <span className="text-[9px] font-black uppercase tracking-widest text-purple-400">
                  Flashcard Drill
                </span>
              </div>
            </div>
            <div className="w-full group">
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(masteryStats.length / flashcards.length) * 100}%`,
                  }}
                  className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                />
              </div>
            </div>
          </div>
          <FlashcardContainer
            questions={preparedFlashcards}
            isAuthenticated={isAuthenticated}
            onAnswer={onAnswer}
          />
        </motion.div>
      </div>
    );
  }

  // --- BRANCH: STANDARD QUIZ MODE ---
  return (
    <div className="w-full max-w-2xl mx-auto py-10 relative z-10 px-4 font-sans">
      {(qz.view === "quiz" || qz.view === "review") && (
        <div className="w-full mb-6 group">
          <div className="flex justify-between items-end mb-1.5 px-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
              {retryMode ? "Retry Round" : "Progress"}
            </span>
            <span className="text-[9.5px] font-black text-cyan-500 uppercase tracking-widest">
              {Math.round(
                ((qz.currentIdx + 1) / qz.activeQuestions.length) * 100,
              )}
              %
            </span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-cyan-500 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(6,182,212,0.4)]"
              style={{
                width: `${((qz.currentIdx + 1) / qz.activeQuestions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {qz.view === "welcome" && (
          <motion.div key="welcome" {...slideUp}>
            <WelcomeScreen
              key="welcome"
              onNew={(category, count) => qz.handleNewQuiz(category, count)}
              onResume={qz.handleResume}
              onWeakestDrill={qz.handleWeakestLinkDrill}
              hasProgress={qz.hasSavedProgress}
              onStart={() => {}}
            />
          </motion.div>
        )}

        {qz.view === "quiz" && (
          <QuestionCard
            key={qz.currentIdx}
            index={qz.currentIdx}
            questionsList={qz.activeQuestions}
            totalQuestions={qz.activeQuestions.length}
            currentTime={tm.formatTime()}
            isMarked={qz.markedQuestions.has(qz.currentIdx)}
            onToggleMark={() => qz.toggleMark(qz.currentIdx)}
            onNext={(correct) => {
              const currentQuestion = qz.activeQuestions[qz.currentIdx];

              if (currentQuestion && onAnswer) {
                auth.currentUser?.getIdToken().then((token) => {
                  if (token) {
                    updateCategoryStat(token, currentQuestion.cat, correct);
                  }
                });
                onAnswer(currentQuestion.id, correct);
              }

              if (currentQuestion) {
                qz.recordOutcome(currentQuestion.cat, correct, currentQuestion);
              }

              if (correct) qz.setScore((s) => s + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });

              if (qz.isReviewJump) {
                qz.setIsReviewJump(false);
                qz.setView("review");
                return;
              }

              if (qz.currentIdx + 1 >= qz.activeQuestions.length) {
                qz.setView("review");
              } else {
                qz.setCurrentIdx((i) => i + 1);
              }
            }}
          />
        )}

        {qz.view === "review" && (
          <motion.div
            key="review"
            {...slideUp}
            className="mx-auto w-full max-w-2xl bg-[#1e293b]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl"
          >
            <div className="text-center mb-8">
              <IoCheckmarkDoneCircleOutline
                size={48}
                className="mx-auto text-emerald-400 mb-4"
              />
              <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">
                Final Audit
              </h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">
                Review flagged items before state submission.
              </p>
            </div>
            <DiamondDivider />
            <div className="grid grid-cols-6 sm:grid-cols-10 gap-2 mb-10 max-h-64 overflow-y-auto pr-2">
              {qz.activeQuestions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    qz.setCurrentIdx(i);
                    qz.setIsReviewJump(true);
                    qz.setView("quiz");
                  }}
                  className={`h-10 flex flex-col items-center justify-center rounded-lg border transition-all duration-300 ${
                    qz.markedQuestions.has(i)
                      ? "border-rose-500 bg-rose-500/20 text-rose-400"
                      : "border-white/5 bg-white/5 text-slate-500 hover:border-cyan-500 hover:text-white"
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
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ResultsView
              score={qz.score}
              total={qz.activeQuestions.length}
              missed={qz.missedCategories}
              missedCount={qz.missedQuestions?.length ?? 0}
              timeTaken={tm.formatTime()}
              rank={getRank(qz.score, qz.activeQuestions.length)}
              onRestart={() => {
                setRetryMode(false);
                qz.handleRestart();
              }}
              onRetryMissed={handleRetryMissed}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {qz.view === "quiz" && (
        <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCalcOpen(true)}
            className="w-14 h-14 bg-slate-800 rounded-full border border-white/10 flex items-center justify-center text-white shadow-2xl"
          >
            <IoCalculatorOutline size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsModalOpen(true)}
            className="w-14 h-14 bg-blue-600 rounded-full border border-white/10 flex items-center justify-center text-white shadow-2xl"
          >
            <IoBookOutline size={24} />
          </motion.button>
        </div>
      )}

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
