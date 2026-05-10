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
        color: "text-yellow-400",
        glow: "shadow-yellow-500/20",
      };
    if (pct >= 75)
      return {
        name: "Expert",
        color: "text-cyan-400",
        glow: "shadow-cyan-500/20",
      };
    if (pct >= 50)
      return {
        name: "Senior",
        color: "text-purple-400",
        glow: "shadow-purple-500/20",
      };
    if (pct >= 20)
      return {
        name: "Associate",
        color: "text-blue-400",
        glow: "shadow-blue-500/20",
      };
    return {
      name: "Novice",
      color: "text-slate-400",
      glow: "shadow-slate-500/10",
    };
  };

  const rank = getRankInfo(progressPercent);

  return (
    <div className="w-full max-w-6xl p-6">
      <AnimatePresence mode="wait">
        {activeSubView === "main" ? (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            {/* --- HERO SECTION --- */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div>
                    <p className="text-cyan-500 font-black uppercase tracking-[0.4em] text-[10px] mb-3">
                      Candidate Data Stream / Active
                    </p>
                    <h2 className="text-5xl font-black uppercase italic text-white tracking-tighter">
                      Welcome,{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        {user.email?.split("@")[0]}
                      </span>
                    </h2>
                  </div>

                  <div
                    className={cn(
                      "bg-slate-950/50 border border-white/10 px-8 py-4 rounded-2xl text-center backdrop-blur-md shadow-xl",
                      rank.glow,
                    )}
                  >
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                      Rank Status
                    </p>
                    <p
                      className={cn(
                        "text-2xl font-black uppercase italic tracking-tighter",
                        rank.color,
                      )}
                    >
                      {rank.name}
                    </p>
                  </div>
                </div>

                <div className="mt-10 max-w-2xl">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-[11px] font-black uppercase text-slate-400 tracking-widest">
                      Mastery Progress
                    </span>
                    <span className="text-2xl font-black text-white">
                      {progressPercent}%
                    </span>
                  </div>
                  <div className="h-3 w-full bg-slate-950 rounded-full border border-white/5 p-[2px] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* --- DRILL MODULES GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DrillCard
                title="The Standard"
                subtitle="Full 100-Question Exam Simulation"
                icon={<FaPlay />}
                color="from-cyan-500 to-blue-600"
                glow="group-hover:shadow-cyan-500/20"
                onClick={() => onStartQuiz("standard")}
              />
              <DrillCard
                title="Rapid Fire"
                subtitle="High-Intensity 20 Question Hit"
                icon={<FaFire />}
                color="from-rose-500 to-orange-600"
                glow="group-hover:shadow-rose-500/20"
                onClick={() => onStartQuiz("quick20")}
              />
              <DrillCard
                title="Flashcards"
                subtitle="Swipe & Memorize Core Principles"
                icon={<FaSwatchbook />}
                color="from-purple-500 to-indigo-600"
                glow="group-hover:shadow-purple-500/20"
                onClick={() => onStartQuiz("flashcards")}
              />
            </div>

            {/* --- SUB-VIEW TOGGLES --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SubViewButton
                onClick={() => setActiveSubView("analytics")}
                icon={<FaChartLine size={22} />}
                title="Performance Analytics"
                desc="Deep dive into your domain strengths"
                hoverColor="hover:border-cyan-500/50"
                iconColor="group-hover:text-cyan-400"
              />
              <SubViewButton
                onClick={() => setActiveSubView("checklist")}
                icon={<FaGraduationCap size={22} />}
                title="Compliance Tracker"
                desc="Monitor Florida DBPR requirements"
                hoverColor="hover:border-purple-500/50"
                iconColor="group-hover:text-purple-400"
              />
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
  icon,
  color,
  glow,
  onClick,
}: DrillCardProps) {
  return (
    <motion.button
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative group bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 text-left rounded-3xl transition-all duration-300",
        glow,
      )}
    >
      <div
        className={cn(
          "w-12 h-12 bg-gradient-to-br rounded-2xl text-slate-950 flex items-center justify-center mb-6 text-xl shadow-lg",
          color,
        )}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-black uppercase italic text-white mb-2">
        {title}
      </h3>
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
        {subtitle}
      </p>
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <FaChevronRight className="text-white/20" />
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
        "flex items-center gap-6 bg-slate-900/40 backdrop-blur-md border border-white/5 p-8 rounded-3xl transition-all group text-left",
        hoverColor,
      )}
    >
      <div
        className={cn(
          "w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 transition-all",
          iconColor,
        )}
      >
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-black uppercase text-white tracking-widest">
          {title}
        </h4>
        <p className="text-[11px] text-slate-500 font-bold uppercase mt-1">
          {desc}
        </p>
      </div>
    </button>
  );
}
