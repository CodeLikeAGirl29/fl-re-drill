'use client';

interface SectionProps {
  title: string;
  color: string;
  formulas: { label: string; math: string; note?: string }[];
}

const FormulaSection = ({ title, color, formulas }: SectionProps) => (
  <div className="mb-8 animate-in">
    <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${color}`}>
      {title}
    </h4>
    <div className="space-y-3">
      {formulas.map((f, i) => (
        <div key={i} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{f.label}</p>
          <p className="text-sm font-black text-slate-800 font-mono tracking-tight">{f.math}</p>
          {f.note && <p className="text-[10px] italic text-slate-500 mt-2 leading-relaxed">{f.note}</p>}
        </div>
      ))}
    </div>
  </div>
);

export default function FormulaModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">

        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Master Formulas</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Florida State Exam Reference</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar">

          <FormulaSection
            title="State Transfer Taxes"
            color="text-indigo-600"
            formulas={[
              { label: "Deed Stamps", math: "(Price / 100) * $0.70", note: "CRITICAL: Always round Price UP to the nearest 100 first." },
              { label: "Note Stamps", math: "(Debt / 100) * $0.35", note: "Applies to New AND Assumed mortgages. Round debt up to 100." },
              { label: "Intangible Tax", math: "New Debt * 0.002", note: "Only applies to NEW mortgages. No rounding required." }
            ]}
          />

          <FormulaSection
            title="Land & Measurement"
            color="text-emerald-600"
            formulas={[
              { label: "1 Acre", math: "43,560 Square Feet", note: "Memory Trick: 7-11 (4+3=7, 5+6=11)." },
              { label: "1 Section", math: "640 Acres", note: "Also equals 1 Square Mile." },
              { label: "1 Township", math: "36 Sections", note: "Grid is 6 miles by 6 miles." }
            ]}
          />

          <FormulaSection
            title="Investment & Appraisal"
            color="text-purple-600"
            formulas={[
              { label: "The IRV Circle", math: "Income = Rate * Value", note: "To find Value: Income / Rate. To find Rate: Income / Value." },
              { label: "Net Operating Income", math: "EGI - Operating Expenses", note: "Do NOT include mortgage payments (Debt Service) in expenses." },
              { label: "Gross Multiplier", math: "Price / Gross Income", note: "GRM uses monthly rent; GIM uses annual income." }
            ]}
          />

          <FormulaSection
            title="Commissions & Profit"
            color="text-orange-600"
            formulas={[
              { label: "Seller's Net", math: "Net Needed / (100% - Comm %)", note: "Used when seller wants a specific walk-away amount." },
              { label: "Profit / Loss %", math: "Made (or Lost) / Paid", note: "Always divide the change by what you originally PAID." }
            ]}
          />

          <FormulaSection
            title="Prorations"
            color="text-blue-600"
            formulas={[
              { label: "Daily Rate", math: "Annual Amount / 365", note: "Always double check if the closing day belongs to the Buyer or Seller." },
              { label: "Interest (Assumed)", math: "Debit Seller / Credit Buyer", note: "Interest is paid in arrears (at the end of the month)." },
              { label: "Rent (Prepaid)", math: "Debit Seller / Credit Buyer", note: "Rent is paid in advance (at the beginning of the month)." }
            ]}
          />

        </div>

        {/* Footer Hint */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            Close modal to return to drill
          </p>
        </div>

      </div>
    </div>
  );
}