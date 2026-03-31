'use client';

interface WelcomeProps {
  onNew: () => void;
  onResume: () => void;
  hasProgress: boolean;
}

export default function WelcomeScreen({ onNew, onResume, hasProgress }: WelcomeProps) {
  return (
    <div className="bg-white p-10 shadow-2xl rounded-[2.5rem] w-full border border-white/20 text-center animate-in relative overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

      <div className="mb-8">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 transform -rotate-6">
          <i className="fa-solid fa-house-chimney text-3xl"></i>
        </div>
        <h1 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">Florida Real Estate Master Drill</h1>
        <p className="text-slate-400 text-sm leading-relaxed px-4">
          The definitive study tool for the Florida state exam.
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={hasProgress ? onResume : onNew}
          className={`w-full font-black py-4 px-8 rounded-2xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 ${hasProgress ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
        >
          {hasProgress ? 'Resume Quiz' : 'Start Drill'} <i className="fa-solid fa-play ml-2 text-xs"></i>
        </button>

        {hasProgress && (
          <button
            onClick={() => {
              if (confirm("Start fresh? All progress will be lost.")) onNew();
            }}
            className="w-full bg-white border-2 border-slate-100 text-slate-400 hover:text-slate-600 hover:border-slate-200 font-bold py-3 px-8 rounded-2xl transition-all text-xs"
          >
            Start New Quiz
          </button>
        )}
      </div>
    </div>
  );
}