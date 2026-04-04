'use client';

import { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuestionCard({
  index,
  onNext,
  questionsList,
  totalQuestions,
  currentTime
}: any) {
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const q = questionsList ? questionsList[index] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [index]);

  const handleNextClick = () => {
    const isCorrect = selected === q.correct;
    setIsAnswered(false);
    setSelected(null);
    onNext(isCorrect);
  };

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
    <div className="mx-auto w-full max-w-2xl rounded-md border border-[#444444] bg-[#1e293b] px-6 md:px-[40px] py-[25px] shadow-2xl">
      {/* HEADER: Progress and Timer */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-2xl font-medium text-[#06b6d4]">
            {addLeadingZero(index + 1)}
          </span>
          <span className="text-[22px] font-medium text-[#817a8e]">
            /{addLeadingZero(totalQuestions)}
          </span>
        </div>

        <div className="flex w-[120px] items-center gap-2 justify-end">
          <Timer className="text-[#06b6d4]" width={28} height={28} />
          <span className="mt-0.5 block text-lg font-medium text-[#06b6d4]">
            {currentTime}
          </span>
        </div>
      </div>

      {/* QUESTION INFO */}
      <div className="mb-1">
        <span className="text-[9px] font-black uppercase tracking-[0.1em] text-[#817a8e]">
          {q.cat}
        </span>
      </div>
      <h3 className="mb-6 text-lg font-medium text-white leading-tight">
        {q.q}
      </h3>

      {/* OPTIONS */}
      <div className="space-y-3">
        {q.options.map((opt: string, i: number) => {
          const isSelected = selected === i;
          const isCorrect = i === q.correct;

          return (
            <button
              key={i}
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
              {opt}
            </button>
          );
        })}
      </div>

      {/* RATIONALE */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 p-4 rounded-lg bg-[#0f172a] border-l-2 border-[#06b6d4]"
          >
            <p
              /* Changed text-xs to text-sm or text-base for larger text */
              className="text-sm text-[#817a8e] italic leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatExplanation(q.explanation) }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER: Next Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleNextClick}
          disabled={!isAnswered}
          className="min-w-[120px] transform rounded-lg border border-[#06b6d4] bg-[#06b6d4] px-6 py-2 text-sm font-semibold text-white transition duration-300 hover:scale-105 hover:bg-[#1d4ed8] disabled:opacity-20 disabled:grayscale"
        >
          {index + 1 === totalQuestions ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}