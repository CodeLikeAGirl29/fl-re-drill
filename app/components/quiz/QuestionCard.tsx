'use client';

import { useState, useEffect } from 'react';
import { questions } from '../../lib/questions';

export default function QuestionCard({ index, score, onNext }: any) {
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const q = questions[index];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [index]);

  // If we ran out of questions
  if (!q) {
    return (
      <div className="bg-white/95 p-8 rounded-[2rem] text-center shadow-2xl">
        <h2 className="text-2xl font-black text-slate-800">Quiz Complete!</h2>
        <p className="text-indigo-600 font-bold text-xl mt-2">Final Score: {score}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold"
        >
          Try Again
        </button>
      </div>
    );
  }

  const formatExplanation = (text: string) => {
    if (!text) return "No explanation provided.";
    return text
      .replace(/(Key Point:)/g, '<b class="text-blue-600 font-bold">$1</b>')
      .replace(/(Calculation:)/g, '<b class="text-purple-600 font-bold">$1</b>')
      .replace(/(Correction:)/g, '<b class="text-red-500 font-bold">$1</b>');
  };

  const handleNextClick = () => {
    // 1. Determine if the choice was correct
    const isCorrect = selected === q.correct;

    // 2. Reset local card state
    setIsAnswered(false);
    setSelected(null);

    // 3. Tell the parent to update the score and move to the next index
    onNext(isCorrect);
  };

  return (
    <div className="bg-white/95 backdrop-blur-md p-8 rounded-[2rem] shadow-2xl border border-white/20 animate-in">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{q.cat}</span>
      <h2 className="text-sm font-bold text-slate-800 mt-2 mb-6 leading-relaxed">{q.q}</h2>

      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            disabled={isAnswered}
            onClick={() => { setSelected(i); setIsAnswered(true); }}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all text-sm font-medium ${isAnswered
              ? i === q.correct
                ? 'bg-green-100 border-green-500 text-green-700'
                : i === selected ? 'bg-red-100 border-red-500 text-red-700' : 'opacity-40'
              : 'bg-white border-slate-100 hover:border-indigo-400 text-slate-600'
              }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {isAnswered && (
        <div className="mt-8 pt-6 border-t border-slate-100 animate-in">
          <p
            className="text-xs text-slate-500 font-normal italic mb-6 leading-relaxed px-2"
            dangerouslySetInnerHTML={{ __html: formatExplanation(q.explanation) }}
          />
          <button
            onClick={handleNextClick}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}