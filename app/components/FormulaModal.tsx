"use client";

import { useState, ReactNode } from "react";
import {
  IoClose,
  IoCalculatorOutline,
  IoShieldCheckmarkOutline,
  IoHomeOutline,
  IoAnalyticsOutline,
  IoWalletOutline,
  IoMapOutline,
  IoReceiptOutline,
  IoBook,
} from "react-icons/io5";
import { MdGavel } from "react-icons/md";
import { FaBalanceScale } from "react-icons/fa";

export default function FormulaModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"math" | "legal">("math");

  // HELPER: Renders **text** as bold <strong> tags
  const renderFormattedText = (text: string) => {
    if (!text) return "";
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="text-white font-black">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-[#1e293b] border border-white/10 w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* HEADER SECTION */}
        <div className="px-8 pt-8 pb-4">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Exam Reference
              </h3>
              <p className="text-[0.625rem] text-slate-400 font-bold uppercase tracking-widest mt-1">
                Florida State Real Estate v2026
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all"
            >
              <IoClose size={24} />
            </button>
          </div>

          {/* TAB SWITCHER */}
          <div className="flex p-1 bg-black/20 rounded-xl border border-white/5">
            <button
              onClick={() => setActiveTab("math")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === "math"
                ? "bg-[#1d4ed8] text-white shadow-lg"
                : "text-slate-400 hover:text-slate-200"
                }`}
            >
              <IoCalculatorOutline size={16} /> Math Formulas
            </button>
            <button
              onClick={() => setActiveTab("legal")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === "legal"
                ? "bg-[#1d4ed8] text-white shadow-lg"
                : "text-slate-400 hover:text-slate-200"
                }`}
            >
              <FaBalanceScale size={16} /> Legal Terms
            </button>
          </div>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="px-8 pb-8 overflow-y-auto custom-scrollbar">
          {activeTab === "math" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-8">
              <FormulaSection
                title="State Transfer Taxes"
                icon={<IoReceiptOutline size={14} />}
                color="text-rose-400"
                formatter={renderFormattedText}
                formulas={[
                  {
                    label: "Deed Stamps (Documents)",
                    math: "(Price / 100) * $0.70",
                    note: "CRITICAL: Always round the Price **UP** to the nearest 100 first.",
                  },
                  {
                    label: "Note Stamps (Promissory)",
                    math: "(Debt / 100) * $0.35",
                    note: "Applies to New **AND** Assumed mortgages. Round debt UP to 100.",
                  },
                  {
                    label: "Intangible Tax (New Mortgage)",
                    math: "New Debt * 0.002",
                    note: "Only applies to **NEW** mortgages. No rounding required.",
                  },
                ]}
              />

              <FormulaSection
                title="Investment & Appraisal"
                icon={<IoAnalyticsOutline size={14} />}
                color="text-purple-400"
                formatter={renderFormattedText}
                formulas={[
                  {
                    label: "The IRV Circle",
                    math: "Income = **Rate × Value**",
                    note: "To find Value: Income / Rate. To find Rate: Income / Value.",
                  },
                  {
                    label: "Net Operating Income (NOI)",
                    math: "EGI - Operating Expenses",
                    note: "Do **NOT** include mortgage payments (Debt Service) here.",
                  },
                ]}
              />

              <FormulaSection
                title="Land Measurement"
                icon={<IoMapOutline size={14} />}
                color="text-emerald-400"
                formatter={renderFormattedText}
                formulas={[
                  {
                    label: "1 Acre",
                    math: "**43,560** Square Feet",
                    note: "Think '7-11' (4+3=7, 5+6=11) to remember the digits.",
                  },
                  {
                    label: "1 Section",
                    math: "**640 Acres** (1 Sq. Mile)",
                    note: "A Township contains 36 Sections.",
                  },
                ]}
              />

              <FormulaSection
                title="Property Taxes & Homestead"
                icon={<IoWalletOutline size={14} />}
                color="text-orange-400"
                formatter={renderFormattedText}
                formulas={[
                  {
                    label: "Taxable Value",
                    math: "Assessed Value - Exemptions",
                    note: "Standard: $25k (all taxes) + up to $25k (**non-school** taxes).",
                  },
                  {
                    label: "Annual Property Tax",
                    math: "Taxable Value × Millage Rate",
                    note: "Move the decimal **3 places left** for mills.",
                  },
                ]}
              />
            </div>
          )}

          {/* LEGAL TAB CONTENT */}
          {activeTab === "legal" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-8">

              {/* 1. AGENCY & FIDUCIARY */}
              <div>
                <h4 className="text-[0.688rem] font-black uppercase tracking-[0.25em] text-blue-400 mb-5 flex items-center gap-2 border-b border-white/5 pb-2">
                  <IoShieldCheckmarkOutline size={16} /> Agency & Fiduciary Duties
                </h4>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                    <p className="text-sm font-black text-white mb-2 underline decoration-blue-500/50 underline-offset-4">Single Agent (COLD-AC)</p>
                    <p className="text-[0.813rem] text-slate-300 leading-relaxed">
                      {renderFormattedText("Owes **Full Fiduciary Duties** (Confidentiality, Obedience, Loyalty, Disclosure, Accounting, Care). Highest representation.")}
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                    <p className="text-sm font-black text-white mb-2">Transaction Broker</p>
                    <p className="text-[0.813rem] text-slate-300 leading-relaxed">
                      {renderFormattedText("The **Default** relationship. Provides **Limited Confidentiality**. Representing the transaction, not the party.")}
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. FLORIDA LANDLORD-TENANT ACT (F.S. 83) */}
              <div>
                <h4 className="text-[0.688rem] font-black uppercase tracking-[0.25em] text-emerald-400 mb-5 flex items-center gap-2 border-b border-white/5 pb-2">
                  <IoBook size={16} /> Landlord-Tenant Law (F.S. 83)
                </h4>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                    <p className="text-sm font-black text-white mb-1 uppercase tracking-tight">Security Deposit Return</p>
                    <p className="text-[0.813rem] text-slate-300 leading-relaxed">
                      {renderFormattedText("**15 Days** to return if no claim; **30 Days** to notify tenant of a claim via certified mail.")}
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                    <p className="text-sm font-black text-white mb-1 uppercase tracking-tight">Eviction Notice</p>
                    <p className="text-[0.813rem] text-slate-300 leading-relaxed">
                      {renderFormattedText("**3-Day** notice for non-payment of rent; **7-Day** notice for lease violations (curable or non-curable).")}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. OWNERSHIP & ESTATES */}
              <div>
                <h4 className="text-[0.688rem] font-black uppercase tracking-[0.25em] text-purple-400 mb-5 flex items-center gap-2 border-b border-white/5 pb-2">
                  <IoHomeOutline size={16} /> Estates & Tenancies
                </h4>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                    <p className="text-sm font-black text-white mb-1 uppercase tracking-tight">Joint Tenancy (PITT)</p>
                    <p className="text-[0.813rem] text-slate-300 leading-relaxed">
                      {renderFormattedText("Requires **Possession, Interest, Time, and Title**. Key feature: **Right of Survivorship**.")}
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                    <p className="text-sm font-black text-white mb-1 uppercase tracking-tight">Tenancy at Sufferance</p>
                    <p className="text-[0.813rem] text-slate-300 leading-relaxed">
                      {renderFormattedText("Tenant stays **past the expiration** of the lease without the landlord's consent (a 'Holdover' tenant).")}
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. KEY PROPERTY POWERS */}
              <div>
                <h4 className="text-[0.688rem] font-black uppercase tracking-[0.25em] text-orange-400 mb-5 flex items-center gap-2 border-b border-white/5 pb-2">
                  <IoAnalyticsOutline size={16} /> Government Powers (PETE)
                </h4>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
                  <p className="text-[0.813rem] text-slate-300 leading-relaxed">
                    {renderFormattedText("**P**olice Power, **E**minent Domain, **T**axation, **E**scheat.")}
                  </p>
                  <p className="text-[0.75rem] text-slate-500 italic">
                    {renderFormattedText("**Escheat** is when the state takes property because the owner died without a will or heirs.")}
                  </p>
                </div>
              </div>

              {/* 5. STATUTES & FINES */}
              <div>
                <h4 className="text-[0.688rem] font-black uppercase tracking-[0.25em] text-rose-400 mb-5 flex items-center gap-2 border-b border-white/5 pb-2">
                  <MdGavel size={16} /> Violations & Penalties
                </h4>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                    <p className="text-sm font-black text-white mb-1">Administrative Fine</p>
                    <p className="text-[0.813rem] text-slate-200 leading-relaxed">
                      {renderFormattedText("The FREC may impose a maximum of **$5,000 per violation**.")}
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                    <p className="text-sm font-black text-white mb-1 uppercase tracking-tight">Third-Degree Felony</p>
                    <p className="text-[0.813rem] text-slate-300 leading-relaxed">
                      {renderFormattedText("Operating as a licensee **without a valid license** or providing false info on an application.")}
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

interface FormulaItem {
  label: string;
  math: string;
  note?: string;
}

interface FormulaSectionProps {
  title: string;
  icon: ReactNode;
  color: string;
  formulas: FormulaItem[];
  formatter: (text: string) => ReactNode;
}

function FormulaSection({ title, icon, color, formulas, formatter }: FormulaSectionProps) {
  return (
    <div className="mb-8">
      <h4 className={`text-[0.625rem] font-black uppercase tracking-[0.25em] mb-4 flex items-center gap-2 ${color}`}>
        {icon} {title}
      </h4>
      <div className="space-y-3">
        {formulas.map((f: FormulaItem, i: number) => (
          <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/[0.07] transition-all">
            <p className="text-[0.625rem] font-bold text-slate-500 uppercase mb-1">
              {f.label}
            </p>
            <p className="text-sm font-mono-calc font-bold text-white tracking-tight">
              {formatter(f.math)}
            </p>
            {f.note && (
              <p className="text-[0.625rem] italic text-slate-500 mt-2">
                Note: {formatter(f.note)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}