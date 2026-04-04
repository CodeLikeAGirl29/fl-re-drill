// components/WelcomeScreen.tsx
import { BookOpen, Target, Zap, Clock } from 'lucide-react';

export default function WelcomeScreen({ onNew, onResume, hasProgress }: any) {
  return (
    <div className="mx-auto w-full max-w-2xl rounded-xl border border-[#444444] bg-[#1e293b] shadow-2xl text-white overflow-hidden">

      {/* 1. THE GRADIENT (Moved outside of the content) */}
      <div className="h-32 w-full bg-linear-to-r from-cyan-700 via-blue-500 to-indigo-600" />

      {/* 2. THE CONTENT WRAPPER (This gets the padding now) */}
      <div className="p-8 -mt-12"> {/* Added negative margin to pull title up slightly if desired */}

        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-md">Florida Real Estate Drill</h1>
          <p className="text-blue-400 text-md italic font-medium">Drill the Concepts. Master the Exam.</p>
          <p className="text-[#817a8e] text-sm mt-1">Mastering F.S. 475 & the Emerald Coast Market</p>
        </div>

        {/* App Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
            <Zap className="text-yellow-400 mt-1" size={20} />
            <div>
              <h4 className="font-semibold text-sm">Smart Shuffle</h4>
              <p className="text-xs text-[#817a8e]">Every session is unique to prevent "memorizing the order."</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
            <Target className="text-rose-400 mt-1" size={20} />
            <div>
              <h4 className="font-semibold text-sm">Weak Point Tracking</h4>
              <p className="text-xs text-[#817a8e]">We track your missed categories to focus your study time.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
            <BookOpen className="text-[#06b6d4] mt-1" size={20} />
            <div>
              <h4 className="font-semibold text-sm">Legal Explanations</h4>
              <p className="text-xs text-[#817a8e]">Detailed rationales for F.S. 475 and F.S. 83 regulations.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
            <Clock className="text-emerald-400 mt-1" size={20} />
            <div>
              <h4 className="font-semibold text-sm">Timed Practice</h4>
              <p className="text-xs text-[#817a8e]">Simulate the 3.5-hour state exam pressure.</p>
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onNew}
            className="w-full py-4 bg-[#06b6d4] hover:bg-[#0ea5e9] text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.01] shadow-lg"
          >
            {hasProgress ? "Start New Drill" : "Begin Master Drill"}
          </button>

          {hasProgress && (
            <button
              onClick={onResume}
              className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg border border-white/10 transition-all duration-300"
            >
              Resume Previous Session
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-[#444444] text-center">
          <p className="text-[10px] text-[#817a8e] uppercase tracking-[0.2em]">
            State Exam Goal: <span className="text-[#06b6d4] font-bold">75% Passing Score</span>
          </p>
        </div>
      </div>
    </div>
  );
}