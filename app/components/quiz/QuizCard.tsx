'use client';

import { useState } from 'react';
import { questions } from '@/app/lib/questions';

interface QuizCardProps {
  index: number;
  score: number;
  onNext: (correct: boolean) => void;
}

export default function QuestionCard({ index, score, onNext }: QuizCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const q = questions[index]; //

  const formatExplanation = (text: string) => {
    // This allows the component to style "Key Point" even if it's just plain text
    return text
      .replace(/Key Point:/gi, '<b class="text-blue-600 font-bold">Key Point:</b>')
      .replace(/Calculation:/gi, '<b class="text-purple-600 font-bold">Calculation:</b>')
      .replace(/Correction:/gi, '<b class="text-red-500 font-bold">Correction:</b>')
      .replace(/Note:/gi, '<b class="text-slate-700 font-bold underline">Note:</b>');
  };

  if (!q) return <div className="text-white text-center">Quiz Finished! Score: {score}</div>;

  return (
    <div className="bg-white/95 backdrop-blur-md p-8 rounded-[2rem] shadow-2xl border border-white/20">
      <span className="text-[0.625rem] font-black text-slate-400 uppercase tracking-widest">
        {q.cat || 'General'} {/* */}
      </span>
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
              : 'bg-white border-slate-100 hover:border-rose-400 text-slate-600'
              }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {isAnswered && (
        <div className="mt-8 pt-6 border-t border-slate-100">
          <p
            className="text-xs text-slate-500 font-normal italic mb-6 leading-relaxed px-2"
            dangerouslySetInnerHTML={{ __html: formatExplanation(q.explanation) }} //
          />
          <button
            onClick={() => { setIsAnswered(false); setSelected(null); onNext(selected === q.correct); }}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}