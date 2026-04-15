'use client';

import { useState, useEffect, useCallback } from 'react';
import { Timer, Bookmark, BookmarkCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuestionCard({
  index,
  onNext,
  questionsList,
  totalQuestions,
  currentTime,
  isMarked,
  onToggleMark
}: any) {
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const q = questionsList ? questionsList[index] : null;

  // Reset internal state when the question index changes
  useEffect(() => {
    setSelected(null);
    setIsAnswered(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [index]);

  const handleNextClick = useCallback(() => {
    const isCorrect = selected === q?.correct;
    onNext(isCorrect);
  }, [onNext, q?.correct, selected]);

  // STABILIZED KEYBOARD LISTENER
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Use q?.options?.length to ensure we aren't dependencies on a shifting array content
      if (!isAnswered && ['1', '2', '3', '4'].includes(event.key)) {
        const optionIndex = parseInt(event.key) - 1;
        if (q?.options && q.options[optionIndex]) {
          setSelected(optionIndex);
          setIsAnswered(true);
        }
      }

      if (event.key === 'Enter' && (isAnswered || isMarked)) {
        handleNextClick();
      }

      if (event.key.toLowerCase() === 'm') {
        onToggleMark();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);

    // We only want to restart this listener when the core state changes. 
    // Do NOT put q.options directly in here if it's being shuffled on every render.
  }, [isAnswered, isMarked, q?.q, handleNextClick, onToggleMark]);

  const addLeadingZero = (number: number) => (number > 9 ? number : `0${number}`);

  if (!q) return null;

  const formatExplanation = (text: string) => {
    if (!text) return "No explanation provided.";
    return text
      .replace(/(Key Point:)/g, '<b class="text-[#06b6d4] font-bold">$1</b>')
      .replace(/(Calculation:)/g, '<b class="text-purple-400 font-bold">$1</b>')
      .replace(/(Correction:)/g, '<b class="text-rose-400 font-bold">$1</b>');
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-md border border-[#444444] bg-[#1e293b] px-6 md:px-[40px] py-[25px] shadow-2xl relative">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-2xl font-medium text-[#06b6d4]">
            {addLeadingZero(index + 1)}
          </span>
          <span className="text-[22px] font-medium text-[#817a8e]">
            /{addLeadingZero(totalQuestions)}
          </span>
        </div>

        <button
          onClick={onToggleMark}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border ${isMarked
            ? 'bg-rose-500 border-rose-400 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]'
            : 'bg-slate-800 border-white/10 text-[#817a8e] hover:border-white/20'
            }`}
        >
          {isMarked ? <BookmarkCheck size={14} fill="white" /> : <Bookmark size={14} />}
          <span>{isMarked ? "Marked" : "Mark for Review"}</span>
        </button>

        <div className="flex w-[100px] items-center gap-2 justify-end">
          <Timer className="text-[#06b6d4]" width={24} height={24} />
          <span className="mt-0.5 block text-lg font-medium text-[#06b6d4]">
            {currentTime}
          </span>
        </div>
      </div>

      <div className="mb-1">
        <span className="text-[9px] font-black uppercase tracking-widest text-[#817a8e]">
          {q.cat}
        </span>
      </div>
      <h3 className="mb-6 text-lg font-medium text-white leading-tight">
        {q.q}
      </h3>

      {/* --- NEW DECORATIVE DIVIDER START --- */}
      <div className="relative flex items-center mb-8">
        <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
        <div className="mx-4 flex gap-1">
          <div className="w-1 h-1 rounded-full bg-cyan-500/40"></div>
          <div className="w-1 h-1 rounded-full bg-cyan-500/20"></div>
          <div className="w-1 h-1 rounded-full bg-cyan-500/10"></div>
        </div>
        <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
      </div>
      {/* --- NEW DECORATIVE DIVIDER END --- */}

      <div className="space-y-3">
        {q.options.map((opt: string, i: number) => {
          const isSelected = selected === i;
          const isCorrect = i === q.correct;

          return (
            <button
              key={`${index}-${i}`} // Stable key using index
              disabled={isAnswered}
              onClick={() => { setSelected(i); setIsAnswered(true); }}
              className={`w-full block text-left rounded-lg border px-4 py-3 text-lg transition-all duration-300 ease-in-out ${isAnswered
                ? isCorrect
                  ? 'border-emerald-500 bg-emerald-500/10 text-white'
                  : isSelected
                    ? 'border-rose-500 bg-rose-500/10 text-white'
                    : 'border-[#333] bg-[#0f172a] text-gray-500 opacity-50'
                : isSelected
                  ? 'border-[#06b6d4] bg-[#2f459c] text-white'
                  : 'border-[#333] bg-[#0f172a] text-white hover:border-[#444]'
                }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border ${isSelected ? 'bg-white text-blue-900 border-white' : 'border-white/20 text-white/40'
                  }`}>
                  {i + 1}
                </span>
                {opt}
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 p-4 rounded-lg bg-[#0f172a] border-l-2 border-[#06b6d4]"
          >
            <p
              className="text-sm text-[#817a8e] italic leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatExplanation(q.explanation) }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleNextClick}
          disabled={!isAnswered && !isMarked}
          className="min-w-[120px] transform rounded-lg border border-[#06b6d4] bg-[#06b6d4] px-6 py-2 text-sm font-semibold text-white transition duration-300 hover:scale-105 hover:bg-[#1d4ed8] disabled:opacity-20"
        >
          {index + 1 === totalQuestions ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}