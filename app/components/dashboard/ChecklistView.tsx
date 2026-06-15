"use client";

import { motion } from "framer-motion";
import { FaArrowLeft, FaCheckSquare, FaSquare } from "react-icons/fa";
import { useState } from "react";

const INITIAL_STEPS = [
  { id: 1, text: "Complete 63-Hour Pre-License Course", done: true },
  { id: 2, text: "Pass Course Final Exam (70%+)", done: true },
  { id: 3, text: "Submit Fingerprints via Pearson VUE", done: false },
  { id: 4, text: "DBPR Application Approval", done: false },
  { id: 5, text: "Schedule State Exam Date", done: false },
];

export default function ChecklistView({ onBack }: { onBack: () => void }) {
  const [steps, setSteps] = useState(INITIAL_STEPS);

  const toggleStep = (id: number) => {
    setSteps(steps.map((s) => (s.id === id ? { ...s, done: !s.done } : s)));
  };

  const completed = steps.filter((s) => s.done).length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8 font-space"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-white font-black uppercase text-[10px] tracking-widest transition-colors group"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Back to Command Center
      </button>

      <div className="relative bg-slate-950/40 backdrop-blur-xl border border-white/5 p-8 rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full pointer-events-none" />

        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-black uppercase italic text-white tracking-tight">
              State Exam Path
            </h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              Florida DBPR Compliance Tracking
            </p>
          </div>
          <span className="text-sm font-black font-mono text-emerald-400">
            {completed}/{steps.length}
          </span>
        </div>

        <div className="space-y-3">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => toggleStep(step.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border backdrop-blur-md transition-all duration-300 text-left ${
                step.done
                  ? "border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10"
                  : "border-white/5 bg-slate-900/30 hover:border-cyan-500/30"
              }`}
            >
              <div
                className={step.done ? "text-emerald-400" : "text-slate-600"}
              >
                {step.done ? (
                  <FaCheckSquare size={20} />
                ) : (
                  <FaSquare size={20} />
                )}
              </div>
              <span
                className={`text-sm font-bold uppercase tracking-tight ${
                  step.done
                    ? "text-emerald-400 line-through opacity-60"
                    : "text-white"
                }`}
              >
                {step.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
