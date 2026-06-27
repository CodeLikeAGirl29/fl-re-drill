"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "firebase/auth";
import {
  FaPlay,
  FaSwatchbook,
  FaChartLine,
  FaFire,
  FaGraduationCap,
  FaChevronRight,
  FaCrosshairs,
  FaCalculator,
} from "react-icons/fa6";
import cn from "classnames";

import AnalyticsView from "./AnalyticsView";
import ChecklistView from "./ChecklistView";
import { type CategoryStat } from "@/app/lib/actions/mastery";

interface MasteryRecord {
  question_id: string;
  status: "mastered" | "review";
}

interface DashboardProps {
  user: User;
  masteryStats: MasteryRecord[];
  categoryStats: CategoryStat[];
  onStartQuiz: (
    mode: "standard" | "quick20" | "flashcards" | "weakest" | "review",
  ) => void;
}

export default function Dashboard({
  user,
  masteryStats,
  categoryStats,
  onStartQuiz,
}: DashboardProps) {
  const [activeSubView, setActiveSubView] = useState<
    "main" | "analytics" | "checklist"
  >("main");

  const masteredCount = masteryStats.filter(
    (s) => s.status === "mastered",
  ).length;
  const reviewCount = masteryStats.filter((s) => s.status === "review").length;
  const totalQuestions = 100;
  const progressPercent = Math.round((masteredCount / totalQuestions) * 100);

  const getRankInfo = (pct: number) => {
    if (pct >= 90)
      return {
        name: "Master",
        color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
      };
    if (pct >= 75)
      return {
        name: "Expert",
        color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
      };
    if (pct >= 50)
      return {
        name: "Senior",
        color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      };
    if (pct >= 20)
      return {
        name: "Associate",
        color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
      };
    return {
      name: "Novice",
      color: "text-slate-400 border-slate-500/30 bg-slate-500/10",
    };
  };

  const rank = getRankInfo(progressPercent);
  const initials = user.email?.split("@")[0].slice(0, 2).toUpperCase() ?? "??";
  const username = user.email?.split("@")[0] ?? "candidate";

  return (
    <div className="w-full max-w-5xl px-4 py-8">
      <AnimatePresence mode="wait">
        {activeSubView === "main" ? (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* TOP BAR */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-sm font-bold text-cyan-400 shrink-0">
                  {initials}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    Welcome back
                  </p>
                  <h2 className="text-xl font-black text-white tracking-tight capitalize">
                    {username}
                  </h2>
                </div>
              </div>
              <div
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-bold uppercase tracking-wider",
                  rank.color,
                )}
              >
                <span>⬡</span>
                {rank.name}
              </div>
            </div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard
                label="Mastered"
                value={masteredCount}
                sub="of 100 topics"
                valueColor="text-emerald-400"
              />
              // Replace the "Need review" StatCard with this:
              <button
                onClick={() => onStartQuiz("review")}
                disabled={reviewCount === 0}
                className="bg-slate-900/50 border border-white/5 hover:border-amber-500/30 rounded-xl p-4 text-left transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                  Need review
                </p>
                <p className="text-2xl font-black font-mono tracking-tight text-amber-400">
                  {reviewCount}
                </p>
                <p className="text-[10px] text-amber-500/70 font-bold mt-0.5">
                  {reviewCount > 0 ? "Tap to drill →" : "all caught up"}
                </p>
              </button>
              <StatCard
                label="Remaining"
                value={totalQuestions - masteredCount}
                sub="topics left"
                valueColor="text-slate-300"
              />
              <StatCard
                label="Mastery index"
                value={`${progressPercent}%`}
                sub="overall progress"
                valueColor="text-cyan-400"
              />
            </div>

            {/* PROGRESS BAR */}
            <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-5">
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Mastery progress
                </span>
                <span className="text-xs font-bold text-cyan-400">
                  {masteredCount} / {totalQuestions}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-600 mt-2">
                <span>Novice → Expert → Master</span>
                <span>{totalQuestions - masteredCount} remaining</span>
              </div>
            </div>

            {/* LOWER GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* LEFT — DRILLS */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 px-1">
                  Drill operations
                </p>
                <div className="space-y-2">
                  <DrillButton
                    icon={<FaPlay size={13} className="ml-0.5" />}
                    iconBg="bg-cyan-500/15 text-cyan-400"
                    title="The standard"
                    sub="100-question exam simulation"
                    onClick={() => onStartQuiz("standard")}
                  />
                  <DrillButton
                    icon={<FaFire size={14} />}
                    iconBg="bg-rose-500/15 text-rose-400"
                    title="Rapid fire"
                    sub="20-question high-intensity hit"
                    onClick={() => onStartQuiz("quick20")}
                  />
                  <DrillButton
                    icon={<FaSwatchbook size={13} />}
                    iconBg="bg-purple-500/15 text-purple-400"
                    title="Flashcards"
                    sub="Active recall, core principles"
                    onClick={() => onStartQuiz("flashcards")}
                  />
                  <DrillButton
                    icon={<FaCrosshairs size={13} />}
                    iconBg="bg-amber-500/15 text-amber-400"
                    title="Weakest drill"
                    sub="Focus on your lowest-mastery topics"
                    onClick={() => onStartQuiz("weakest")}
                  />
                </div>
              </div>

              {/* RIGHT — SUBSYSTEMS + CATEGORY SNAPSHOT */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 px-1">
                  Subsystems
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <SubButton
                    icon={<FaChartLine size={15} />}
                    iconColor="text-cyan-400"
                    title="Analytics"
                    sub="Category breakdown"
                    onClick={() => setActiveSubView("analytics")}
                  />
                  <SubButton
                    icon={<FaGraduationCap size={15} />}
                    iconColor="text-purple-400"
                    title="Tracker"
                    sub="DBPR checklist"
                    onClick={() => setActiveSubView("checklist")}
                  />
                  <SubButton
                    icon={<FaCrosshairs size={15} />}
                    iconColor="text-amber-400"
                    title="Weakest drill"
                    sub="Low-mastery focus"
                    onClick={() => onStartQuiz("weakest")}
                  />
                  <SubButton
                    icon={<FaCalculator size={15} />}
                    iconColor="text-emerald-400"
                    title="Formulas"
                    sub="Math reference"
                    onClick={() => {}}
                  />
                </div>

                {/* CATEGORY SNAPSHOT */}
                <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    Category snapshot
                  </p>
                  {categoryStats.length === 0 ? (
                    <p className="text-[11px] text-slate-600 italic">
                      Complete a quiz to see your category breakdown.
                    </p>
                  ) : (
                    categoryStats
                      .sort((a, b) => b.total - a.total)
                      .slice(0, 5)
                      .map((cat) => (
                        <div key={cat.category}>
                          <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                            <span className="truncate pr-2">
                              {cat.category}
                            </span>
                            <span className="shrink-0">{cat.percent}%</span>
                          </div>
                          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${cat.percent}%` }}
                              transition={{ duration: 0.7, ease: "easeOut" }}
                              className={cn(
                                "h-full rounded-full",
                                cat.percent >= 75
                                  ? "bg-emerald-500"
                                  : cat.percent >= 50
                                    ? "bg-cyan-500"
                                    : "bg-amber-500",
                              )}
                            />
                          </div>
                          <p className="text-[9px] text-slate-600 mt-0.5">
                            {cat.correct} / {cat.total} correct
                          </p>
                        </div>
                      ))
                  )}
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

function StatCard({
  label,
  value,
  sub,
  valueColor,
}: {
  label: string;
  value: string | number;
  sub: string;
  valueColor: string;
}) {
  return (
    <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
        {label}
      </p>
      <p
        className={cn(
          "text-2xl font-black font-mono tracking-tight",
          valueColor,
        )}
      >
        {value}
      </p>
      <p className="text-[10px] text-slate-600 font-medium mt-0.5">{sub}</p>
    </div>
  );
}

function DrillButton({
  icon,
  iconBg,
  title,
  sub,
  onClick,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  sub: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full flex items-center gap-4 bg-slate-900/40 hover:bg-slate-900/80 border border-white/5 hover:border-white/10 rounded-xl p-4 text-left transition-colors"
    >
      <div
        className={cn(
          "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
          iconBg,
        )}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white capitalize">{title}</p>
        <p className="text-[11px] text-slate-500 font-medium mt-0.5">{sub}</p>
      </div>
      <FaChevronRight size={10} className="text-slate-600 shrink-0" />
    </motion.button>
  );
}

function SubButton({
  icon,
  iconColor,
  title,
  sub,
  onClick,
}: {
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  sub: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-2 bg-slate-900/40 hover:bg-slate-900/80 border border-white/5 hover:border-white/10 rounded-xl p-4 text-left transition-colors"
    >
      <span className={cn("text-lg", iconColor)}>{icon}</span>
      <div>
        <p className="text-xs font-bold text-white">{title}</p>
        <p className="text-[10px] text-slate-500 font-medium mt-0.5">{sub}</p>
      </div>
    </button>
  );
}
