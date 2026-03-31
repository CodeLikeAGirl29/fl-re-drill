'use client';

interface HeaderProps {
  onOpenFormulas: () => void;
}

export default function Header({ onOpenFormulas }: HeaderProps) {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-slate-900/60 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <i className="fa-solid fa-house-laptop text-white text-lg"></i>
        </div>
        <div>
          <h1 className="text-white font-black text-xs tracking-tight leading-none uppercase">
            RE Master <span className="text-indigo-400">Drill</span>
          </h1>
          <p className="text-[9px] text-slate-500 font-bold tracking-widest uppercase mt-1">
            Florida Edition
          </p>
        </div>
      </div>

      {/* NEW: Formula Button Integrated into Header */}
      <button
        onClick={onOpenFormulas}
        className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter hover:bg-indigo-500/30 transition-all active:scale-95"
      >
        <i className="fa-solid fa-calculator text-[10px]"></i>
        <span className="hidden sm:inline">Formulas</span>
      </button>
    </header>
  );
}