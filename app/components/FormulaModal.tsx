'use client';

import { X, Calculator, Ruler, TrendingUp, Landmark, Percent } from 'lucide-react';

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  formulas: { label: string; math: string; note?: string }[];
}

const FormulaSection = ({ title, icon, color, formulas }: SectionProps) => (
  <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex items-center gap-2 mb-4">
      <div className={`p-1.5 rounded-lg bg-white/5 ${color}`}>
        {icon}
      </div>
      <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
        {title}
      </h4>
    </div>

    <div className="space-y-3">
      {formulas.map((f, i) => (
        <div
          key={i}
          className="group bg-white/5 border border-white/10 p-5 rounded-2xl hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{f.label}</p>
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <p className="text-base font-mono font-bold text-blue-400 tracking-tight leading-relaxed">
            {f.math}
          </p>

          {f.note && (
            <div className="mt-3 pt-3 border-t border-white/5">
              <p className="text-[11px] italic text-slate-400 leading-relaxed">
                <span className="text-pink-500 not-italic font-bold mr-1">Pro-Tip:</span> {f.note}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default function FormulaModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 1. Backdrop with heavy blur */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* 2. Modal Content */}
      <div className="relative bg-[#1e293b] border border-[#444444] w-full max-w-xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header - Matches the Welcome Screen Blue Gradient */}
        <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-blue-900/50 to-transparent">
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Calculator className="text-blue-500" /> Master Formulas
            </h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Florida Real Estate Core Concepts</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all border border-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar bg-[#1e293b]">

          <FormulaSection
            title="State Transfer Taxes"
            icon={<Landmark size={14} />}
            color="text-rose-400"
            formulas={[
              { label: "Deed Stamps", math: "(Price / 100) * $0.70", note: "CRITICAL: Always round Price UP to the nearest 100 first." },
              { label: "Note Stamps", math: "(Debt / 100) * $0.35", note: "Applies to New AND Assumed mortgages. Round debt up to 100." },
              { label: "Intangible Tax", math: "New Debt * 0.002", note: "Only applies to NEW mortgages. No rounding required." }
            ]}
          />

          <FormulaSection
            title="Land & Measurement"
            icon={<Ruler size={14} />}
            color="text-emerald-400"
            formulas={[
              { label: "1 Acre", math: "43,560 Square Feet", note: "Memory Trick: 7-11 (4+3=7, 5+6=11)." },
              { label: "1 Section", math: "640 Acres", note: "Also equals 1 Square Mile." }
            ]}
          />

          <FormulaSection
            title="Investment & Appraisal"
            icon={<TrendingUp size={14} />}
            color="text-purple-400"
            formulas={[
              { label: "The IRV Circle", math: "Income = Rate * Value", note: "To find Value: Income / Rate. To find Rate: Income / Value." },
              { label: "Net Operating Income", math: "EGI - Operating Expenses", note: "Do NOT include mortgage payments (Debt Service) in expenses." }
            ]}
          />

          <FormulaSection
            title="Commissions & Profit"
            icon={<Percent size={14} />}
            color="text-orange-400"
            formulas={[
              { label: "Seller's Net", math: "Net Needed / (100% - Comm %)", note: "Used when seller wants a specific walk-away amount." },
              { label: "Profit / Loss %", math: "Made (or Lost) / Paid", note: "Always divide the change by what you originally PAID." }
            ]}
          />
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-3 bg-black/20 text-center">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
            Tap outside or click X to resume drill
          </p>
        </div>
      </div>
    </div>
  );
}