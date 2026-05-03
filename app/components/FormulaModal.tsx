"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoClose, IoCalculatorOutline, IoShieldCheckmarkOutline,
  IoHomeOutline, IoAnalyticsOutline, IoWalletOutline,
  IoMapOutline, IoReceiptOutline, IoBook
} from "react-icons/io5";
import { MdGavel } from "react-icons/md";
import { FaBalanceScale } from "react-icons/fa";

// --- ANIMATION VARIANTS ---
const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1, scale: 1, y: 0, filter: "blur(0px)",
    transition: { type: "spring", duration: 0.5, bounce: 0.3 }
  },
  exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 }
};

export default function FormulaModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<"math" | "legal">("math");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
          />

          {/* MODAL CONTAINER */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-[#1e293b]/90 border border-white/10 w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] font-space"
          >
            {/* HEADER SECTION */}
            <div className="px-8 pt-8 pb-4 z-20">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">
                    Exam <span className="text-cyan-400">Reference</span>
                  </h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-1">
                    Florida State Real Estate v2026
                  </p>
                </div>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/5 text-slate-400 hover:text-white transition-all"
                >
                  <IoClose size={24} />
                </motion.button>
              </div>

              {/* SLIDING TAB SWITCHER */}
              <div className="flex p-1 bg-black/40 rounded-xl border border-white/5 relative">
                <button
                  onClick={() => setActiveTab("math")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all relative z-10 ${activeTab === "math" ? "text-white" : "text-slate-500 hover:text-slate-300"
                    }`}
                >
                  <IoCalculatorOutline size={14} /> Math Formulas
                </button>
                <button
                  onClick={() => setActiveTab("legal")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all relative z-10 ${activeTab === "legal" ? "text-white" : "text-slate-500 hover:text-slate-300"
                    }`}
                >
                  <FaBalanceScale size={14} /> Legal Terms
                </button>
                <motion.div
                  className="absolute top-1 bottom-1 left-1 bg-cyan-600 rounded-lg shadow-[0_0_15px_rgba(8,145,178,0.4)]"
                  animate={{ x: activeTab === "math" ? "0%" : "100%", width: "49%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
            </div>

            {/* SCROLLABLE BODY */}
            <div className="px-8 pb-8 overflow-y-auto custom-scrollbar flex-grow">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -10 }}
                >
                  {activeTab === "math" ? (
                    <div className="space-y-10 pt-4">
                      {/* MATH 1: TRANSFER TAXES */}
                      <section>
                        <SectionHeading color="text-rose-400" label="State Transfer Taxes" icon={<IoReceiptOutline size={14} />} />
                        <div className="space-y-3">
                          <MathHUDCard label="Deed Stamps" formula="(Price / 100) * $0.70" tips={[{ type: 'ROUND', text: 'UP to nearest 100' }, { type: 'NOTE', text: 'Paid by Seller' }]} />
                          <MathHUDCard label="Note Stamps" formula="(Debt / 100) * $0.35" tips={[{ type: 'ROUND', text: 'UP to nearest 100' }, { type: 'TRAP', text: 'NEW & ASSUMED debt' }]} />
                          <MathHUDCard label="Intangible Tax" formula="New Debt * 0.002" tips={[{ type: 'TRAP', text: 'NEW mortgages only' }, { type: 'NOTE', text: 'No rounding required' }]} />
                        </div>
                      </section>

                      {/* MATH 2: APPRAISAL */}
                      <section>
                        <SectionHeading color="text-purple-400" label="Investment & Appraisal" icon={<IoAnalyticsOutline size={14} />} />
                        <div className="space-y-3">
                          <MathHUDCard label="The IRV Circle" formula="Income = Rate × Value" tips={[{ type: 'NOTE', text: 'Value = Income / Rate' }, { type: 'NOTE', text: 'Rate = Income / Value' }]} />
                          <MathHUDCard label="NOI Calculation" formula="EGI - Operating Expenses" tips={[{ type: 'TRAP', text: 'EXCLUDE Mortgage / Debt Service' }, { type: 'TRAP', text: 'EXCLUDE Income Tax' }]} />
                        </div>
                      </section>

                      {/* MATH 3: LAND MEASUREMENT */}
                      <section>
                        <SectionHeading color="text-emerald-400" label="Land Measurement" icon={<IoMapOutline size={14} />} />
                        <div className="space-y-3">
                          <MathHUDCard label="Acreage" formula="43,560 Square Feet" tips={[{ type: 'NOTE', text: '7-11 Mnemonic: (4+3=7) (5+6=11)' }]} />
                          <MathHUDCard label="Gov Survey" formula="1 Section = 640 Acres" tips={[{ type: 'NOTE', text: '1 Section = 1 sq. mile' }, { type: 'NOTE', text: 'Township = 36 Sections' }]} />
                        </div>
                      </section>

                      {/* MATH 4: PROPERTY TAXES */}
                      <section>
                        <SectionHeading color="text-orange-400" label="Property Taxes" icon={<IoWalletOutline size={14} />} />
                        <div className="space-y-3">
                          <MathHUDCard label="Taxable Value" formula="Assessed Value - Exemptions" tips={[{ type: 'TRAP', text: 'SOH Cap applies to Assessed Value' }, { type: 'NOTE', text: 'Widow/Blind/Vet: $500 add-on' }]} />
                          <MathHUDCard label="Annual Tax" formula="Taxable Value × Millage" tips={[{ type: 'ROUND', text: 'Shift decimal 3 places LEFT' }]} />
                        </div>
                      </section>
                    </div>
                  ) : (
                    <div className="space-y-10 pt-4">
                      {/* LEGAL 1: AGENCY */}
                      <section>
                        <SectionHeading color="text-blue-400" label="Agency & Fiduciary" icon={<IoShieldCheckmarkOutline size={16} />} />
                        <div className="space-y-4">
                          <LegalHUDCard title="Single Agent" acronym="COLD-AC" body="Full Fiduciary: Confidentiality, Obedience, Loyalty, Disclosure, Accounting, Care." />
                          <LegalHUDCard title="Transaction Broker" acronym="DEFAULT" body="Limited Confidentiality. Representing the transaction. No Fiduciary loyalty." />
                        </div>
                      </section>

                      {/* LEGAL 2: LANDLORD TENANT */}
                      <section>
                        <SectionHeading color="text-emerald-400" label="Landlord-Tenant (F.S. 83)" icon={<IoBook size={16} />} />
                        <div className="space-y-4">
                          <LegalHUDCard title="Security Deposits" body="15 Days to return if no claim. 30 Days to notify of claim via certified mail." />
                          <LegalHUDCard title="Eviction Timeline" body="3-Day notice for non-payment. 7-Day notice for lease violations (Curable/Non)." />
                        </div>
                      </section>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// --- HELPER SUB-COMPONENTS ---

function SectionHeading({ color, label, icon }: { color: string, label: string, icon: ReactNode }) {
  return (
    <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-6 ${color} border-b border-white/5 pb-2 flex items-center gap-2`}>
      {icon} {label}
    </h3>
  );
}

function MathHUDCard({ label, formula, tips }: { label: string, formula: string, tips: { type: 'ROUND' | 'TRAP' | 'NOTE', text: string }[] }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ x: 5 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-5 group transition-colors hover:bg-white/10"
    >
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{label}</p>
      <p className="text-lg font-black text-white mb-4 tracking-tighter italic">{formula}</p>

      <div className="flex flex-wrap gap-2">
        {tips.map((tip, i) => (
          <div key={i} className={`flex items-center gap-2 px-2 py-1 rounded-md border text-[9px] font-black uppercase tracking-tighter ${tip.type === 'ROUND' ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' :
            tip.type === 'TRAP' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' :
              'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
            }`}>
            <span className="opacity-60">{tip.type}</span>
            <span className="text-white/70 italic normal-case font-medium">{tip.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function LegalHUDCard({ title, body, acronym }: { title: string, body: string, acronym?: string }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
      className="bg-white/5 border-l-4 border-cyan-500 border-y border-r border-white/10 p-5 rounded-2xl"
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-xs font-black text-white uppercase tracking-tight italic">{title}</h4>
        {acronym && (
          <span className="bg-cyan-600 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-[0_0_10px_rgba(8,145,178,0.4)]">
            {acronym}
          </span>
        )}
      </div>
      <p className="text-[13px] text-slate-400 leading-relaxed font-medium">{body}</p>
    </motion.div>
  );
}