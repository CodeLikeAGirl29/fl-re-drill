'use client';

import Link from 'next/link';

interface HeaderProps {
  onOpenFormulas: () => void;
  // If you want to reset the quiz state without a full page reload, 
  // you can pass an onHome reset function here
  onHome?: () => void;
}

export default function Header({ onOpenFormulas, onHome }: HeaderProps) {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-slate-900/60 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
      <Link
        href="/"
        onClick={onHome}
        className="flex items-center gap-3 group transition-all active:scale-95"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <i className="fa-solid fa-house-laptop text-white text-lg"></i>
          </div>
          <div>
            <h1 className="text-white font-black text-xs tracking-tight leading-none uppercase">
              RE Master <span className="text-cyan-400">Drill</span>
            </h1>
            <p className="text-[9px] text-slate-500 font-bold tracking-widest uppercase mt-1">
              Florida Edition
            </p>
          </div>
        </div>
      </Link>

      {/* NEW: Formula Button Integrated into Header */}
      <button
        onClick={onOpenFormulas}
        className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 px-4 py-2 rounded-full text-[0.625rem] font-black uppercase tracking-tighter hover:bg-cyan-500/30 transition-all active:scale-95"
      >
        <i className="fa-solid fa-calculator text-[0.625rem]"></i>
        <span className="hidden sm:inline">Formulas</span>
      </button>
    </header>
  );
}