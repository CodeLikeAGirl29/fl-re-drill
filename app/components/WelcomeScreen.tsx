"use client";

import { useState } from "react";
import { motion } from 'framer-motion';
import {
  IoFlash,
  IoBook,
  IoTimerOutline,
  IoFilter,
  IoArrowForward,
} from "react-icons/io5";
import { FiTarget } from "react-icons/fi";
import { RotateCcw, Play } from "lucide-react";
import { questions } from "../lib/questions";
import { getUniqueCategories } from "../lib/utils";

interface WelcomeScreenProps {
  onNew: (category: string, limit?: number) => void;
  onResume: () => void;
  hasProgress: boolean;
  onWeakestDrill: (limit?: number) => void;
  onStart?: () => void;
}

export default function WelcomeScreen({ onNew, onResume, hasProgress, onWeakestDrill, onStart }: WelcomeScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Dynamically get categories from your question data
  const categories = ["All Categories", ...getUniqueCategories(questions)];

  return (
    <div className="mx-auto w-full max-w-2xl rounded-xl border border-[#444444] bg-[#1e293b] shadow-2xl text-white overflow-hidden">

      {/* 1. THE IMAGE HEADER */}
      <div className="relative h-64 w-full border-b border-[#444444]">
        <img
          src="https://res.cloudinary.com/dhw9dl4gm/image/upload/v1777850611/fl-hero-img_tkgg0y.png"
          alt="Florida Real Estate"
          className="w-full h-full object-cover"
        />

        {/* 2. THE FLOATING BANNER (Left Aligned) */}
        <div className="absolute bottom-6 left-6 max-w-[80%]">
          <div className="bg-slate-900/95 backdrop-blur-md text-white px-5 py-3 rounded-xl shadow-2xl border border-white/10">
            <h1 className="text-xl md:text-2xl font-black tracking-tight uppercase italic">
              Florida Real Estate <span className="text-[#06b6d4]">Drill</span>
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-1 w-8 bg-[#06b6d4] rounded-full" />
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-300">
                Drill. Pass. Repeat.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="mb-8">
          <p className="text-blue-400 text-md italic font-medium">
            Drill the Concepts. Master the Exam.
          </p>
          <p className="text-[#817a8e] text-sm mt-1">
            Your Blueprint for State Approval.
          </p>
        </div>

        {/* App Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
            <IoFlash className="text-yellow-400 mt-1 shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-sm">Smart Shuffle</h4>
              <p className="text-xs text-[#817a8e] leading-relaxed">
                Every session is unique to prevent &quot;memorizing the order.&quot;
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
            <FiTarget className="text-rose-400 mt-1 shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-sm">Weak Point Tracking</h4>
              <p className="text-xs text-[#817a8e] leading-relaxed">
                We track your missed categories to focus your study time.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
            <IoBook className="text-[#06b6d4] mt-1 shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-sm">Legal Explanations</h4>
              <p className="text-xs text-[#817a8e] leading-relaxed">
                Detailed rationales for F.S. 475 and F.S. 83 regulations.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
            <IoTimerOutline
              className="text-emerald-400 mt-1 shrink-0"
              size={20}
            />
            <div>
              <h4 className="font-semibold text-sm">Timed Practice</h4>
              <p className="text-xs text-[#817a8e] leading-relaxed">
                Simulate the 3.5-hour state exam pressure.
              </p>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, skewX: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onWeakestDrill(20)}
          className="w-full mb-6 p-4 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-2xl flex items-center justify-between group transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-500/20 border border-rose-500/40 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.2)] group-hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all">
              <FiTarget className="text-rose-400" size={24} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em]">Targeted Protocol</p>
              <h4 className="text-white font-black uppercase tracking-tight italic text-lg">
                Weakest <span className="text-rose-400">Link Drill</span>
              </h4>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Focus on concepts needing reinforcement</p>
            </div>
          </div>
          <IoArrowForward className="text-rose-400 group-hover:translate-x-1 transition-transform" size={20} />
        </motion.button>

        {/* Category Selection Section */}
        <div className="mb-6">
          <label htmlFor="category-select" className="flex items-center gap-2 text-[#817a8e] text-xs uppercase tracking-widest font-bold mb-3">
            <IoFilter size={14} className="text-[#06b6d4]" /> Select Focus Area
          </label>
          <div className="relative">
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#06b6d4] transition-all cursor-pointer pr-10"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#1e293b]">
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <IoArrowForward className="rotate-90" size={16} />
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col gap-3">
          {/* Primary Actions side-by-side */}
          <div className="flex flex-col md:flex-row gap-3">
            <button
              onClick={() => onNew(selectedCategory)}
              className="flex-1 group py-4 bg-[#06b6d4] text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] active:scale-95 flex items-center justify-center gap-2"
            >
              {selectedCategory === "All Categories" ? "Full Master Drill" : `Full Drill`}
              <IoArrowForward className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNew(selectedCategory, 20)}
              className="flex-1 group relative inline-flex items-center justify-center h-14 overflow-hidden rounded-xl border border-indigo-500/50 bg-transparent px-6 font-bold text-indigo-400 transition-all duration-100 [box-shadow:4px_4px_0px_0px_rgba(99,102,241,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] hover:[box-shadow:0px_0px_0px_0px_rgba(99,102,241,0.3)] active:scale-95"
            >
              <span className="flex items-center gap-2">
                <IoFlash className="text-yellow-400" />
                Quick 20
              </span>
            </button>
          </div>

          {/* Resume button stays full width below if progress exists */}
          {hasProgress && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ x: 5 }}
              onClick={onResume}
              className="w-full p-4 bg-cyan-500/10 border border-cyan-400/30 rounded-2xl flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                  <RotateCcw className="text-white" size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">Active Session Detected</p>
                  <h4 className="text-white font-bold uppercase tracking-tight">Resume Previous Drill</h4>
                </div>
              </div>
              <Play className="text-cyan-400 group-hover:translate-x-1 transition-transform" size={20} />
            </motion.button>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-[#444444] text-center">
          <p className="text-[0.625rem] text-[#817a8e] uppercase tracking-[0.2em]">
            State Exam Goal:{" "}
            <span className="text-[#06b6d4] font-bold">75% Passing Score</span>
          </p>
        </div>
      </div>
    </div>
  );
}
