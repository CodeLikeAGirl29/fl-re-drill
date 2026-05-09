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

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-white font-black uppercase text-[10px] tracking-widest"
      >
        <FaArrowLeft /> Back to Command
      </button>

      <div className="bg-slate-900 border-4 border-white p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)]">
        <h3 className="text-3xl font-black uppercase italic mb-2">
          State Exam Path
        </h3>
        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-8 italic">
          Florida DBPR Compliance Tracking
        </p>

        <div className="space-y-4">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => toggleStep(step.id)}
              className={`w-full flex items-center gap-4 p-4 border-2 transition-all ${
                step.done
                  ? "border-emerald-500/50 bg-emerald-500/5"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <div
                className={step.done ? "text-emerald-500" : "text-slate-700"}
              >
                {step.done ? (
                  <FaCheckSquare size={20} />
                ) : (
                  <FaSquare size={20} />
                )}
              </div>
              <span
                className={`text-sm font-bold uppercase tracking-tight ${step.done ? "text-emerald-400 line-through opacity-50" : "text-white"}`}
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
