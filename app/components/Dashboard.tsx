"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "@supabase/supabase-js";
import {
  FaPlay,
  FaSwatchbook,
  FaChartLine,
  FaFire,
  FaGraduationCap,
} from "react-icons/fa";

// Sub-components
import AnalyticsView from "./dashboard/AnalyticsView";
import ChecklistView from "./dashboard/ChecklistView";

interface MasteryRecord {
  question_id: string;
  status: "mastered" | "review";
}

interface DashboardProps {
  user: User;
  masteryStats: MasteryRecord[];
  onStartQuiz: (mode: "standard" | "quick20" | "flashcards") => void;
}

export default function Dashboard({
  user,
  masteryStats,
  onStartQuiz,
}: DashboardProps) {
  const [activeSubView, setActiveSubView] = useState<
    "main" | "analytics" | "checklist"
  >("main");

  // Mastery Logic
  const masteredCount = masteryStats.filter(
    (s) => s.status === "mastered",
  ).length;
  const totalQuestions = 100;
  const progressPercent = Math.round((masteredCount / totalQuestions) * 100);

  const getRankInfo = (pct: number) => {
    if (pct >= 90) return { name: "Master", color: "text-yellow-500" };
    if (pct >= 75) return { name: "Expert", color: "text-cyan-400" };
    if (pct >= 50) return { name: "Senior", color: "text-purple-400" };
    if (pct >= 20) return { name: "Associate", color: "text-blue-400" };
    return { name: "Novice", color: "text-slate-500" };
  };

  const rank = getRankInfo(progressPercent);

  // Animation variants
  const containerVars = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const itemVars = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full max-w-5xl p-6 font-space">
      <AnimatePresence mode="wait">
        {activeSubView === "main" ? (
          <motion.div
            key="main"
            variants={containerVars}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
          >
            {/* --- HERO SECTION --- */}
            <motion.div
              variants={itemVars}
              className="relative bg-slate-900 border-4 border-white p-8 shadow-[12px_12px_0px_0px_rgba(255,255,255,0.05)]"
            >
              <div className="relative z-10">
                <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px] mb-2">
                  Active Candidate Session
                </p>

                <h2 className="text-5xl font-black uppercase italic text-white leading-tight [text-shadow:2px_2px_0px_rgba(0,0,0,0.4)]">
                  Hello, <br />
                  <span className="text-cyan-400">
                    {user.email?.split("@")[0]}
                  </span>
                </h2>

                <div className="mt-8 flex flex-col md:flex-row items-end gap-6">
                  <div className="flex-grow w-full max-w-md">
                    <div className="flex justify-between mb-2">
                      <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                        Mastery
                      </span>
                      <span className="text-[10px] font-black uppercase text-white">
                        {progressPercent}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                      />
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 px-6 py-3 text-center min-w-[140px]">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter mb-1">
                      Current Rank
                    </p>
                    <p
                      className={`text-xl font-black uppercase italic ${rank.color}`}
                    >
                      {rank.name}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* --- DRILL MODULES GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DrillCard
                title="The Standard"
                subtitle="100 Question Full Audit"
                icon={<FaPlay />}
                color="bg-cyan-500"
                onClick={() => onStartQuiz("standard")}
              />
              <DrillCard
                title="Rapid Drill"
                subtitle="Quick 20 Performance Hit"
                icon={<FaFire />}
                color="bg-rose-500"
                onClick={() => onStartQuiz("quick20")}
              />
              <DrillCard
                title="Flashcards"
                subtitle="Swipe to Master Terms"
                icon={<FaSwatchbook />}
                color="bg-purple-500"
                onClick={() => onStartQuiz("flashcards")}
              />
            </div>

            {/* --- SUB-VIEW TOGGLES --- */}
            <motion.div
              variants={itemVars}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <button
                onClick={() => setActiveSubView("analytics")}
                className="flex items-center gap-6 bg-slate-900/50 border-2 border-white/5 p-6 hover:border-cyan-500/50 hover:bg-slate-900 transition-all group text-left"
              >
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                  <FaChartLine size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase text-white tracking-widest">
                    Performance Analytics
                  </h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">
                    Visualize your weakest domains
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveSubView("checklist")}
                className="flex items-center gap-6 bg-slate-900/50 border-2 border-white/5 p-6 hover:border-purple-500/50 hover:bg-slate-900 transition-all group text-left"
              >
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400 group-hover:text-purple-400 transition-colors">
                  <FaGraduationCap size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase text-white tracking-widest">
                    Exam Checklist
                  </h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">
                    Track Florida DBPR requirements
                  </p>
                </div>
              </button>
            </motion.div>
          </motion.div>
        ) : activeSubView === "analytics" ? (
          <AnalyticsView
            key="analytics"
            stats={masteryStats}
            onBack={() => setActiveSubView("main")}
          />
        ) : (
          <ChecklistView
            key="checklist"
            onBack={() => setActiveSubView("main")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function DrillCard({ title, subtitle, icon, color, onClick }: any) {
  return (
    <motion.button
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      }}
      whileHover={{
        y: -8,
        x: -8,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative group bg-slate-900 border-4 border-white p-8 text-left shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)] hover:shadow-[9px_10px_0px_0px_rgba(34,211,238,0.2)] transition-all duration-200"
    >
      <div
        className={`w-10 h-10 ${color} text-slate-950 flex items-center justify-center mb-6 
                 text-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]
                 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-200`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-black uppercase italic text-white leading-none mb-2 [text-shadow:1px_1px_0px_rgba(0,0,0,0.5)]">
        {title}
      </h3>
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
        {subtitle}
      </p>
    </motion.button>
  );
}
