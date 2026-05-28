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
  FaChevronRight,
  FaTerminal,
  FaCrosshairs,
} from "react-icons/fa";
import cn from "classnames";

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

  const masteredCount = masteryStats.filter(
    (s) => s.status === "mastered",
  ).length;
  const totalQuestions = 100;
  const progressPercent = Math.round((masteredCount / totalQuestions) * 100);

  const getRankInfo = (pct: number) => {
    if (pct >= 90)
      return {
        name: "Master",
        color: "text-yellow-400 bg-yellow-500/5 border-yellow-500/20",
        glow: "shadow-yellow-500/5",
      };
    if (pct >= 75)
      return {
        name: "Expert",
        color: "text-cyan-400 bg-cyan-500/5 border-cyan-500/20",
        glow: "shadow-cyan-500/5",
      };
    if (pct >= 50)
      return {
        name: "Senior",
        color: "text-purple-400 bg-purple-500/5 border-purple-500/20",
        glow: "shadow-purple-500/5",
      };
    if (pct >= 20)
      return {
        name: "Associate",
        color: "text-blue-400 bg-blue-500/5 border-blue-500/20",
        glow: "shadow-blue-500/5",
      };
    return {
      name: "Novice",
      color: "text-slate-400 bg-slate-500/5 border-slate-500/20",
      glow: "shadow-slate-500/5",
    };
  };

  const rank = getRankInfo(progressPercent);

  return (
    <div className="w-full max-w-6xl p-4 md:p-8 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      <AnimatePresence mode="wait">
        {activeSubView === "main" ? (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* --- TOP HEADER BAR --- */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
                  <p className="text-cyan-500 font-mono tracking-[0.3em] text-[10px] uppercase font-bold">
                    Candidate Data Stream // Active
                  </p>
                </div>
                <h2 className="text-4xl font-black uppercase italic text-white tracking-tight">
                  Welcome,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 font-sans not-italic font-black">
                    {user.email?.split("@")[0]}
                  </span>
                </h2>
              </div>

              <div
                className={cn(
                  "flex items-center gap-4 bg-slate-950/40 backdrop-blur-md border px-5 py-2.5 rounded-xl shadow-inner transition-all duration-300",
                  rank.color,
                  rank.glow,
                )}
              >
                <div className="text-left">
                  <p className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    Rank Evaluation
                  </p>
                  <p className="text-lg font-black uppercase tracking-tight font-mono">
                    {rank.name}
                  </p>
                </div>
              </div>
            </div>

            {/* --- MAIN ASYMMETRICAL TELEMETRY GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT CONTROL COLUMN: DRILLS & OPERATIONS */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
                    <FaTerminal className="text-cyan-500/70 text-[10px]" /> Select Drill Operation
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <DrillCard
                      title="The Standard"
                      subtitle="Full 100-Question Exam Simulation"
                      desc="Comprehensive baseline testing structured to emulate the timing, distribution, and formatting of the Florida state exam."
                      icon={<FaPlay className="ml-0.5" />}
                      color="from-cyan-500 to-blue-600 text-cyan-950"
                      glow="hover:border-cyan-500/30 hover:shadow-cyan-500/5"
                      onClick={() => onStartQuiz("standard")}
                    />
                    <DrillCard
                      title="Rapid Fire"
                      subtitle="High-Intensity 20 Question Hit"
                      desc="Accelerated assessment block targeted at keeping operational response velocity tight and identifying sudden logic gaps."
                      icon={<FaFire />}
                      color="from-rose-500 to-orange-500 text-rose-950"
                      glow="hover:border-rose-500/30 hover:shadow-rose-500/5"
                      onClick={() => onStartQuiz("quick20")}
                    />
                    <DrillCard
                      title="Flashcards"
                      subtitle="Swipe & Memorize Core Principles"
                      desc="Rapid conceptual retention routine mapped through active recall cards covering statutes, formulas, and operational systems."
                      icon={<FaSwatchbook />}
                      color="from-purple-500 to-indigo-500 text-purple-950"
                      glow="hover:border-purple-500/30 hover:shadow-purple-500/5"
                      onClick={() => onStartQuiz("flashcards")}
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT UTILITY COLUMN: SYSTEM PROGRESS & VIEWS */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                
                {/* CORE DIAGNOSTIC BLOCK */}
                <div className="relative bg-slate-950/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/5 to-transparent rounded-bl-full pointer-events-none" />
                  
                  <div className="flex justify-between items-baseline mb-4">
                    <div>
                      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                        Mastery Index
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Completed vs Total Target Domain
                      </p>
                    </div>
                    <span className="text-4xl font-black font-mono text-white tracking-tighter">
                      {progressPercent}%
                    </span>
                  </div>

                  <div className="h-2.5 w-full bg-slate-900 rounded-full border border-white/5 p-[2px] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    />
                  </div>

                  <div className="flex justify-between text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider mt-3">
                    <span>{masteredCount} System Mastered</span>
                    <span>100 Units</span>
                  </div>
                </div>

                {/* SUB-VIEW NAVIGATION TOGGLES */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-[0.25em] mb-1 flex items-center gap-2 px-1">
                    <FaCrosshairs className="text-purple-500/70 text-[10px]" /> Subsystems
                  </h3>

                  <SubViewButton
                    onClick={() => setActiveSubView("analytics")}
                    icon={<FaChartLine size={18} />}
                    title="Performance Analytics"
                    desc="Granular matrix breakdown of current category strengths"
                    hoverColor="hover:border-cyan-500/30 hover:bg-cyan-500/[0.02]"
                    iconColor="text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
                  />
                  <SubViewButton
                    onClick={() => setActiveSubView("checklist")}
                    icon={<FaGraduationCap size={18} />}
                    title="Compliance Tracker"
                    desc="Review and monitor Florida DBPR prerequisite pipelines"
                    hoverColor="hover:border-purple-500/30 hover:bg-purple-500/[0.02]"
                    iconColor="text-purple-400 bg-purple-500/10 border-purple-500/20"
                  />
                </div>

              </div>
            </div>
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

interface DrillCardProps {
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  glow: string;
  onClick: () => void;
}

interface SubViewButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
  hoverColor: string;
  iconColor: string;
}

function DrillCard({
  title,
  subtitle,
  desc,
  icon,
  color,
  glow,
  onClick,
}: DrillCardProps) {
  return (
    <motion.button
     whileHover={{ y: -3, backgroundColor: "rgba(15, 23, 42, 0.6)" }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={cn(
        "relative group w-full bg-slate-900/30 backdrop-blur-md border border-white/5 p-5 md:p-6 text-left rounded-2xl transition-all duration-300 flex items-start gap-5 overflow-hidden shadow-lg",
        glow,
      )}
    >
      <div
        className={cn(
          "w-11 h-11 shrink-0 bg-gradient-to-br rounded-xl flex items-center justify-center text-sm shadow-md transition-transform duration-300 group-hover:scale-105",
          color,
        )}
      >
        {icon}
      </div>

      <div className="space-y-1 pr-4">
        <div className="flex items-baseline gap-2.5">
          <h3 className="text-xl font-black uppercase italic text-white tracking-tight">
            {title}
          </h3>
          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
            // {subtitle}
          </span>
        </div>
        <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-xl">
          {desc}
        </p>
      </div>

      <div className="absolute top-6 right-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <FaChevronRight className="text-white/30 text-xs" />
      </div>
    </motion.button>
  );
}

function SubViewButton({
  onClick,
  icon,
  title,
  desc,
  hoverColor,
  iconColor,
}: SubViewButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 bg-slate-900/20 backdrop-blur-md border border-white/5 p-4 rounded-xl transition-all duration-300 group text-left shadow-md",
        hoverColor,
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-300 group-hover:scale-105",
          iconColor,
        )}
      >
        {icon}
      </div>
      <div className="space-y-0.5">
        <h4 className="text-xs font-bold uppercase text-white tracking-wider font-mono">
          {title}
        </h4>
        <p className="text-[11px] text-slate-400 font-medium">
          {desc}
        </p>
      </div>
    </button>
  );
}