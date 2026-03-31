'use client';

import { useState } from 'react';
// Assuming questions is a constant array or imported from lib
const questions = [
  {
    cat: "Math",
    q: "A real estate closing is set for January 10th. The buyer is assuming the seller's mortgage of $209,000 at 4.5%. Closing day belongs to buyer. What is the proration?",
    options: ["$231.90 debit seller", "$231.90 debit buyer", "$257.67 debit seller", "$257.67 debit buyer"],
    correct: 0,
    explanation: "Key Point: Interest is paid in arrears. Calculation: $209,000 * .045 / 365 * 9 days = $231.90."
  }
];

export default function QuestionCard({ index, score, onNext }: any) {
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const q = questions[index];

  const formatExplanation = (text: string) => {
    return text
      .replace(/(Key Point:)/g, '<b class="text-blue-600 font-bold">$1</b>')
      .replace(/(Calculation:)/g, '<b class="text-purple-600 font-bold">$1</b>')
      .replace(/(Correction:)/g, '<b class="text-red-500 font-bold">$1</b>');
  };

  if (!q) return <div className="text-white text-center">Quiz Finished! Score: {score}</div>;

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
              ? i === q.correct ? 'bg-green-100 border-green-500 text-green-700' : i === selected ? 'bg-red-100 border-red-500 text-red-700' : 'opacity-40'
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