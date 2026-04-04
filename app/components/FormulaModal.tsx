'use client';

import { useState } from 'react';
// Added ShieldCheck, Home, and Gavel to the list below
import {
  X,
  Calculator,
  Ruler,
  TrendingUp,
  Landmark,
  Percent,
  Scale,
  FileText,
  ArrowRightLeft,
  ShieldCheck,
  Home,
  Gavel
} from 'lucide-react';

export default function FormulaModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'math' | 'legal'>('math');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-[#1e293b] border border-white/10 w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">

        {/* HEADER SECTION */}
        <div className="px-8 pt-8 pb-4">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">Exam Reference</h3>
              <p className="text-[0.625rem] text-slate-400 font-bold uppercase tracking-widest mt-1">Florida State Real Estate v2026</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all">
              <X size={20} />
            </button>
          </div>

          {/* TAB SWITCHER (The "Pill") */}
          <div className="flex p-1 bg-black/20 rounded-xl border border-white/5">
            <button
              onClick={() => setActiveTab('math')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'math' ? 'bg-[#1d4ed8] text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              <Calculator size={14} /> Math Formulas
            </button>
            <button
              onClick={() => setActiveTab('legal')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'legal' ? 'bg-[#1d4ed8] text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              <Scale size={14} /> Legal Terms
            </button>
          </div>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="px-8 pb-8 overflow-y-auto custom-scrollbar">

          {/* MATH TAB CONTENT */}
          {activeTab === 'math' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-8">

              <FormulaSection
                title="State Transfer Taxes"
                color="text-rose-400"
                formulas={[
                  {
                    label: "Deed Stamps (Documents)",
                    math: "(Price / 100) * $0.70",
                    note: "CRITICAL: Always round the Price UP to the nearest 100 first."
                  },
                  {
                    label: "Note Stamps (Promissory)",
                    math: "(Debt / 100) * $0.35",
                    note: "Applies to New AND Assumed mortgages. Round debt UP to 100."
                  },
                  {
                    label: "Intangible Tax (New Mortgage)",
                    math: "New Debt * 0.002",
                    note: "Only applies to NEW mortgages. No rounding required."
                  }
                ]}
              />

              <FormulaSection
                title="Investment & Appraisal"
                color="text-purple-400"
                formulas={[
                  {
                    label: "The IRV Circle",
                    math: "Income = Rate × Value",
                    note: "To find Value: Income / Rate. To find Rate: Income / Value."
                  },
                  {
                    label: "Net Operating Income (NOI)",
                    math: "EGI - Operating Expenses",
                    note: "Do NOT include mortgage payments (Debt Service) here."
                  }
                ]}
              />

              <FormulaSection
                title="Land Measurement"
                color="text-emerald-400"
                formulas={[
                  {
                    label: "1 Acre",
                    math: "43,560 Square Feet",
                    note: "Think '7-11' (4+3=7, 5+6=11) to remember the digits."
                  },
                  {
                    label: "1 Section",
                    math: "640 Acres (1 Sq. Mile)",
                    note: "A Township contains 36 Sections."
                  }
                ]}
              />

              <FormulaSection
                title="Property Taxes & Homestead"
                color="text-orange-400"
                formulas={[
                  {
                    label: "Taxable Value",
                    math: "Assessed Value - Exemptions",
                    note: "Standard: $25k (all taxes) + up to $25k (non-school taxes). Widowed/Blind/Disabled: Add $500 each."
                  },
                  {
                    label: "Annual Property Tax",
                    math: "Taxable Value × Millage Rate",
                    note: "Move the decimal 3 places left for mills (e.g., 9 mills = 0.009)."
                  },
                  {
                    label: "Street Paving (Special Assessment)",
                    math: "(Front Feet × Cost) × 0.50",
                    note: "The '0.50' is because you only pay for your half of the street!"
                  }
                ]}
              />

              <FormulaSection
                title="Closing Prorations"
                color="text-blue-400"
                formulas={[
                  {
                    label: "Daily Rate",
                    math: "Annual Amount ÷ 365 Days",
                    note: "For the exam, always check if the Closing Day belongs to the Buyer or Seller."
                  },
                  {
                    label: "Prepaid Rent",
                    math: "Monthly Rent ÷ Days in Month",
                    note: "Days owned by Buyer × Daily Rate = Debit Seller / Credit Buyer."
                  }
                ]}
              />

            </div>
          )}

          {/* LEGAL TAB CONTENT */}
          {activeTab === 'legal' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-8">

              {/* 1. AGENCY RELATIONSHIPS */}
              <div>
                <h4 className="text-[0.688rem] font-black uppercase tracking-[0.25em] text-blue-400 mb-5 flex items-center gap-2 border-b border-white/5 pb-2">
                  <ShieldCheck size={14} /> Agency & Fiduciary Duties
                </h4>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/[0.08] transition-colors">
                    <p className="text-sm font-black text-white mb-2 underline decoration-blue-500/50 underline-offset-4">Single Agent (COLD-AC)</p>
                    <p className="text-[0.813rem] text-slate-300 leading-relaxed">
                      The **Highest** form of representation. The agent owes **Full Fiduciary Duties** to the principal, including total Loyalty and Obedience.
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-[0.625rem] font-black text-center uppercase">
                      <span className="bg-blue-600/30 text-blue-200 py-1.5 rounded-md border border-blue-500/20">Confidentiality</span>
                      <span className="bg-blue-600/30 text-blue-200 py-1.5 rounded-md border border-blue-500/20">Obedience</span>
                      <span className="bg-blue-600/30 text-blue-200 py-1.5 rounded-md border border-blue-500/20">Loyalty</span>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/[0.08] transition-colors">
                    <p className="text-sm font-black text-white mb-2">Transaction Broker</p>
                    <p className="text-[0.813rem] text-slate-300 leading-relaxed">
                      The **Default** relationship in Florida. You represent the **Transaction**, not the person. Provides **Limited Confidentiality** only.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. TYPES OF OWNERSHIP */}
              <div>
                <h4 className="text-[0.688rem] font-black uppercase tracking-[0.25em] text-purple-400 mb-5 flex items-center gap-2 border-b border-white/5 pb-2">
                  <Home size={14} /> Estates & Tenancies
                </h4>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                    <p className="text-sm font-black text-white mb-1 uppercase tracking-tight">Fee Simple</p>
                    <p className="text-[0.813rem] text-slate-300 leading-relaxed">
                      The **Most Complete** bundle of rights. It is perpetual, inheritable, and the most common way to own property in FWB.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                    <p className="text-sm font-black text-white mb-1 uppercase tracking-tight">Tenancy by the Entireties</p>
                    <p className="text-[0.813rem] text-slate-300 leading-relaxed">
                      Ownership specifically for a **Married Couple**. Includes the **Right of Survivorship** (if one dies, the other owns it 100% automatically).
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. CORE STATUTES */}
              <div>
                <h4 className="text-[0.688rem] font-black uppercase tracking-[0.25em] text-rose-400 mb-5 flex items-center gap-2 border-b border-white/5 pb-2">
                  <Gavel size={14} /> Florida Statutes & Federal Law
                </h4>
                <div className="space-y-4">
                  <div className="bg-slate-900/40 border-l-4 border-rose-500 p-5 rounded-r-2xl">
                    <p className="text-sm font-black text-white mb-1">F.S. 475</p>
                    <p className="text-[0.813rem] text-slate-200 leading-relaxed font-medium">
                      The **"Bible"** of the exam. This is the **Administrative Law** that governs all real estate licensees, schools, and appraisers in Florida.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                    <p className="text-sm font-black text-white mb-1">Statute of Frauds</p>
                    <p className="text-[0.813rem] text-slate-300 leading-relaxed">
                      Requires real estate contracts to be **In Writing** and **Signed** to be enforceable in a court of law.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                    <p className="text-sm font-black text-white mb-1">Statute of Limitations</p>
                    <p className="text-[0.813rem] text-slate-300 leading-relaxed">
                      The "Clock" for lawsuits. **5 Years** for written contracts; **4 Years** for oral (parol) contracts.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. LEASE TYPES */}
              <div>
                <h4 className="text-[0.688rem] font-black uppercase tracking-[0.25em] text-emerald-400 mb-5 flex items-center gap-2 border-b border-white/5 pb-2">
                  <FileText size={14} /> Lease Structures
                </h4>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                    <p className="text-sm font-black text-white mb-2 uppercase">Gross Lease</p>
                    <p className="text-[0.813rem] text-slate-300 leading-relaxed">
                      Tenant pays **Fixed Rent**. Landlord pays all taxes, insurance, and maintenance. Common in **Residential**.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                    <p className="text-sm font-black text-white mb-2 uppercase">Net Lease</p>
                    <p className="text-[0.813rem] text-slate-300 leading-relaxed">
                      Tenant pays **Rent + Fixed Costs** (Taxes, Insurance, Maintenance). Common in **Commercial**.
                    </p>
                  </div>
                </div>
              </div>

              {/* 5. JOINT OWNERSHIP (PITT) */}
              <div>
                <h4 className="text-[0.688rem] font-black uppercase tracking-[0.25em] text-yellow-400 mb-5 flex items-center gap-2 border-b border-white/5 pb-2">
                  <ArrowRightLeft size={14} /> Joint Tenancy (PITT)
                </h4>
                <div className="bg-slate-900/40 border-l-4 border-yellow-500 p-5 rounded-r-2xl">
                  <p className="text-[0.813rem] text-slate-200 leading-relaxed font-medium mb-3">
                    Requires four unities to create **Right of Survivorship**:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[0.625rem] font-black uppercase">
                    <span className="bg-yellow-500/10 text-yellow-200 p-2 rounded border border-yellow-500/20 text-center">Possession</span>
                    <span className="bg-yellow-500/10 text-yellow-200 p-2 rounded border border-yellow-500/20 text-center">Interest</span>
                    <span className="bg-yellow-500/10 text-yellow-200 p-2 rounded border border-yellow-500/20 text-center">Time</span>
                    <span className="bg-yellow-500/10 text-yellow-200 p-2 rounded border border-yellow-500/20 text-center">Title</span>
                  </div>
                </div>
              </div>

              {/* 6. THE FEDERAL RESERVE */}
              <div>
                <h4 className="text-[0.688rem] font-black uppercase tracking-[0.25em] text-amber-400 mb-5 flex items-center gap-2 border-b border-white/5 pb-2">
                  <Landmark size={14} /> The Fed's Toolbelt
                </h4>
                <div className="space-y-4">
                  <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-2xl">
                    <p className="text-sm font-black text-emerald-400 mb-1 uppercase tracking-tight">To DECREASE Rates</p>
                    <p className="text-[0.813rem] text-slate-300 leading-relaxed">
                      **Decrease** Reserve Req, **Decrease** Discount Rate, or **Buy** Securities.
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border-l-4 border-rose-500 p-5 rounded-r-2xl">
                    <p className="text-sm font-black text-rose-400 mb-1 uppercase tracking-tight">To INCREASE Rates</p>
                    <p className="text-[0.813rem] text-slate-300 leading-relaxed">
                      **Increase** Reserve Req, **Increase** Discount Rate, or **Sell** Securities.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Sub-component for Formula Blocks
function FormulaSection({ title, color, formulas }: any) {
  return (
    <div className="mb-8">
      <h4 className={`text-[0.625rem] font-black uppercase tracking-[0.2em] mb-4 ${color}`}>{title}</h4>
      <div className="space-y-3">
        {formulas.map((f: any, i: number) => (
          <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/[0.07] transition-all">
            <p className="text-[0.625rem] font-bold text-slate-500 uppercase mb-1">{f.label}</p>
            <p className="text-sm font-mono font-bold text-white tracking-tight">{f.math}</p>
            {f.note && <p className="text-[0.625rem] italic text-slate-500 mt-2">Note: {f.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}