"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { FaFire, FaBalanceScale } from "react-icons/fa";

export default function FormulaModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"math" | "legal">("math");
  
  // Reference pointer to hook into the scrollable body element
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Monitor tab switches to instantly pull the layout back to scroll position zero
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeTab]);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 antialiased selection:bg-cyan-500/30">
          {/* Backdrop with fade animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Frame Window with scale/slide entry and exit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
            className="relative z-10 bg-[#1e293b] border border-white/10 w-full max-w-xl rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col max-h-[85vh] font-space transform-gpu will-change-transform backface-hidden"
          >
            
            {/* HEADER SECTION */}
            <div className="px-8 pt-8 pb-5 bg-[#1e293b]/50 backdrop-blur-sm border-b border-white/5 z-20">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic subpixel-antialiased">
                    Exam <span className="text-cyan-400">Reference</span>
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-1">
                    Florida State Real Estate v2026
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all transform-gpu"
                >
                  <IoClose size={24} />
                </button>
              </div>

              {/* PILL TAB SWITCHERS */}
              <div className="flex p-1.5 bg-black/40 rounded-full border border-white/5 relative overflow-hidden">
                <button
                  onClick={() => setActiveTab("math")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all relative z-10 ${
                    activeTab === "math"
                      ? "bg-cyan-600 text-white shadow-[0_4px_12px_rgba(8,145,178,0.4)]"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <IoCalculatorOutline size={14} /> Math Formulas
                </button>
                <button
                  onClick={() => setActiveTab("legal")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all relative z-10 ${
                    activeTab === "legal"
                      ? "bg-cyan-600 text-white shadow-[0_4px_12px_rgba(8,145,178,0.4)]"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <FaBalanceScale size={14} /> Legal Terms
                </button>
              </div>
            </div>

            {/* SCROLLABLE BODY */}
            <div 
              ref={scrollContainerRef}
              className="px-8 pb-8 overflow-y-auto flex-grow bg-[#1a2333]/30 select-none"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <style>{`
                div::-webkit-scrollbar {
                  display: none !important;
                }
              `}</style>

              {activeTab === "math" && (
                <div className="space-y-6 pt-6">
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

              {activeTab === "legal" && (
                <div className="space-y-6 pt-6">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-4 flex items-center gap-2 border-b border-white/5 pb-2 subpixel-antialiased">
                      <IoShieldCheckmarkOutline size={16} /> Agency & Fiduciary Duties
                    </h4>
                    <div className="space-y-4">
                      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl transform-gpu text-left">
                        <p className="text-xs font-black text-white mb-2 uppercase tracking-tight italic subpixel-antialiased">Single Agent (COLD-AC)</p>
                        <p className="text-[13px] text-slate-300 leading-relaxed font-semibold subpixel-antialiased">
                          {renderFormattedText("Owes **Full Fiduciary Duties** (Confidentiality, Obedience, Loyalty, Disclosure, Accounting, Care). Highest representation.")}
                        </p>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl transform-gpu text-left">
                        <p className="text-xs font-black text-white mb-2 uppercase tracking-tight italic subpixel-antialiased">Transaction Broker</p>
                        <p className="text-[13px] text-slate-300 leading-relaxed font-semibold subpixel-antialiased">
                          {renderFormattedText("The **Default** relationship. Provides **Limited Confidentiality**. Representing the transaction, not the party.")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-4 flex items-center gap-2 border-b border-white/5 pb-2 subpixel-antialiased">
                      <IoBook size={16} /> Landlord-Tenant Law (F.S. 83)
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl transform-gpu text-left">
                        <p className="text-xs font-black text-white mb-2 uppercase tracking-tight italic subpixel-antialiased">Security Deposit Return</p>
                        <p className="text-[13px] text-slate-300 leading-relaxed font-semibold subpixel-antialiased">
                          {renderFormattedText("**15 Days** to return if no claim; **30 Days** to notify tenant of a claim via certified mail.")}
                        </p>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl transform-gpu text-left">
                        <p className="text-xs font-black text-white mb-2 uppercase tracking-tight italic subpixel-antialiased">Eviction Notice</p>
                        <p className="text-[13px] text-slate-300 leading-relaxed font-semibold subpixel-antialiased">
                          {renderFormattedText("**3-Day** notice for non-payment of rent; **7-Day** notice for lease violations (curable or non-curable).")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 mb-4 flex items-center gap-2 border-b border-white/5 pb-2 subpixel-antialiased">
                      <IoHomeOutline size={16} /> Estates & Tenancies
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl transform-gpu text-left">
                        <p className="text-xs font-black text-white mb-2 uppercase tracking-tight italic subpixel-antialiased">Joint Tenancy (PITT)</p>
                        <p className="text-[13px] text-slate-300 leading-relaxed font-semibold subpixel-antialiased">
                          {renderFormattedText("Requires **Possession, Interest, Time, and Title**. Key feature: **Right of Survivorship**.")}
                        </p>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl transform-gpu text-left">
                        <p className="text-xs font-black text-white mb-2 uppercase tracking-tight italic subpixel-antialiased">Tenancy at Sufferance</p>
                        <p className="text-[13px] text-slate-300 leading-relaxed font-semibold subpixel-antialiased">
                          {renderFormattedText("Tenant stays **past the expiration** of the lease without the landlord's consent (a 'Holdover' tenant).")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400 mb-4 flex items-center gap-2 border-b border-white/5 pb-2 subpixel-antialiased">
                      <IoAnalyticsOutline size={16} /> Government Powers (PETE)
                    </h4>
                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2 transform-gpu text-left">
                      <p className="text-[13px] text-slate-300 leading-relaxed font-semibold subpixel-antialiased">
                        {renderFormattedText("**P**olice Power, **E**minent Domain, **T**axation, **E**scheat.")}
                      </p>
                      <p className="text-[11px] text-slate-500 italic font-semibold subpixel-antialiased">
                        {renderFormattedText("**Escheat** is when the state takes property because the owner died without a will or heirs.")}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-400 mb-4 flex items-center gap-2 border-b border-white/5 pb-2 subpixel-antialiased">
                      <MdGavel size={16} /> Violations & Penalties
                    </h4>
                    <div className="space-y-4">
                      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl transform-gpu text-left">
                        <p className="text-xs font-black text-white mb-2 uppercase tracking-tight italic subpixel-antialiased">Administrative Fine</p>
                        <p className="text-[13px] text-slate-300 leading-relaxed font-semibold subpixel-antialiased">
                          {renderFormattedText("The FREC may impose a maximum of **$5,000 per violation**.")}
                        </p>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl transform-gpu text-left">
                        <p className="text-xs font-black text-white mb-2 uppercase tracking-tight italic subpixel-antialiased">Third-Degree Felony</p>
                        <p className="text-[13px] text-slate-300 leading-relaxed font-semibold subpixel-antialiased">
                          {renderFormattedText("Operating as a licensee **without a valid license** or providing false info on an application.")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// --- SUB-COMPONENTS ENGINE ---
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
    <div className="block w-full text-left">
      <h4 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2 ${color} border-b border-white/5 pb-2 subpixel-antialiased`}>
        {icon} {title}
      </h4>
      <div className="space-y-3">
        {formulas.map((f: FormulaItem, i: number) => (
          <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl block hover:bg-white/[0.07] transition-all transform-gpu">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 subpixel-antialiased">
              {f.label}
            </p>
            
            <div className="block bg-black/20 border border-white/5 rounded-xl p-4 mb-2">
              <p className="text-sm sm:text-base font-black text-white tracking-wide italic subpixel-antialiased whitespace-normal break-words">
                {formatter(f.math)}
              </p>
            </div>
            
            {f.note && (
              <div className="flex items-start gap-1.5 mt-2 text-[10px] font-semibold text-slate-400 tracking-tight subpixel-antialiased">
                <span className="text-cyan-400 font-bold shrink-0">[NOTE]</span>
                <span className="italic leading-relaxed">{formatter(f.note)}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}