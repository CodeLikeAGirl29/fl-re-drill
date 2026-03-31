'use client';

export default function ResultsView({ score, total, missed }: any) {
  const percentage = Math.round((score / total) * 100);
  const topMissed = missed; // Passed from getTopMissed()

  return (
    <div className="bg-white/95 p-6 rounded-[2.5rem] shadow-2xl border border-white/20 animate-in w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-block p-4 rounded-full bg-indigo-50 mb-4">
          <i className="fa-solid fa-graduation-cap text-3xl text-indigo-600"></i>
        </div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Drill Complete!</h2>
        <p className="text-4xl font-black text-indigo-600 mt-2">{percentage}%</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
          {score} out of {total} Correct
        </p>
      </div>

      {topMissed.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 border-b pb-2">
            Focus Areas Needed:
          </h3>
          {topMissed.map(([cat, count]: any) => (
            <div key={cat} className="flex justify-between items-center bg-red-50 p-3 rounded-xl border border-red-100">
              <span className="text-xs font-bold text-red-700">{cat}</span>
              <span className="text-[10px] font-black bg-red-200 text-red-800 px-2 py-1 rounded-md">
                {count} Missed
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-green-50 p-4 rounded-2xl border border-green-100 text-center">
          <p className="text-sm font-bold text-green-700">Perfect Score! 🚀</p>
          <p className="text-[10px] text-green-600 mt-1 uppercase font-black">You are ready for the State Exam.</p>
        </div>
      )}

      <button
        onClick={() => window.location.reload()}
        className="mt-8 w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-900/20"
      >
        Reset Master Drill
      </button>
    </div>
  );
}