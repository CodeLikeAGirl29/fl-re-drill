"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  FaArrowLeft,
  FaBolt,
  FaCircleCheck,
  FaClockRotateLeft,
  FaTriangleExclamation,
  FaShield,
} from "react-icons/fa6";
import { flashcards } from "@/app/lib/flashcards";

interface MasteryRecord {
  question_id: string;
  status: "mastered" | "review";
}

interface AnalyticsViewProps {
  stats: MasteryRecord[];
  onBack: () => void;
}

export default function AnalyticsView({ stats, onBack }: AnalyticsViewProps) {
  // --- DYNAMIC LOGIC ENGINE ---
  const { domainScores, weakest, overallAccuracy, totalMastered } =
    useMemo(() => {
      const masteredIds = stats
        .filter((s) => s.status === "mastered")
        .map((s) => s.question_id);

      const calculateMastery = (cat: string) => {
        const categoryCards = flashcards.filter((f) => f.category === cat);
        if (categoryCards.length === 0) return 0;
        const count = categoryCards.filter((f) =>
          masteredIds.includes(f.id),
        ).length;
        return Math.round((count / categoryCards.length) * 100);
      };

      const domains = [
        {
          name: "Principles",
          label: "Principles & Practices",
          color: "bg-cyan-500",
        },
        { name: "Law", label: "Real Estate Law", color: "bg-rose-500" },
        {
          name: "Brokerage",
          label: "Brokerage Operations",
          color: "bg-purple-500",
        },
        { name: "Finance", label: "Escrow & Finance", color: "bg-amber-500" },
      ];

      const scores = domains.map((d) => ({
        ...d,
        score: calculateMastery(d.name),
      }));

      const weakestDomain = scores.reduce(
        (prev, curr) => (curr.score < prev.score ? curr : prev),
        scores[0],
      );

      const totalCards = flashcards.length;
      const accuracy =
        totalCards > 0
          ? Math.round((masteredIds.length / totalCards) * 100)
          : 0;

      return {
        domainScores: scores,
        weakest: weakestDomain,
        overallAccuracy: accuracy,
        totalMastered: masteredIds.length,
      };
    }, [stats]);

  const PASSING_THRESHOLD = 75;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8 font-space"
    >
      {/* HEADER NAV */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-white font-black uppercase text-[10px] tracking-widest transition-colors group"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Back to Command Center
      </button>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatRingCard
          label="Retention"
          value={`${overallAccuracy}%`}
          sub="Overall Accuracy"
          color="text-cyan-400"
          icon={<FaCircleCheck />}
        />
        <StatRingCard
          label="Velocity"
          value="2.1s"
          sub="Avg. Decision Time"
          color="text-purple-400"
          icon={<FaBolt />}
        />
        <StatRingCard
          label="Volume"
          value={totalMastered.toString()}
          sub="Cards Mastered"
          color="text-emerald-400"
          icon={<FaClockRotateLeft />}
        />
      </div>

      {/* DOMAIN MASTERY CHART */}
      <div className="bg-slate-900 border-4 border-white p-8 shadow-[8px_8px_0px_0px_rgba(34,211,238,0.1)]">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h3 className="text-2xl font-black uppercase italic text-white [text-shadow:1px_1px_0px_rgba(0,0,0,0.5)]">
              Domain Mastery
            </h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              Performance across Florida exam categories
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-[9px] font-black text-emerald-400 px-2 py-1 bg-emerald-500/5 border border-emerald-500/20 uppercase animate-pulse">
              Live Sync Active
            </span>
          </div>
        </div>

        <div className="space-y-8">
          {domainScores.map((domain) => (
            <ChartBar
              key={domain.name}
              label={domain.label}
              percentage={domain.score}
              color={domain.color}
            />
          ))}
        </div>
      </div>

      {/* DYNAMIC INTELLIGENCE REPORT */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={cn(
          "p-6 bg-slate-900 border-l-4 flex flex-col gap-2 relative overflow-hidden transition-all duration-500",
          weakest.score < PASSING_THRESHOLD
            ? "border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.15)]"
            : "border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.15)]",
        )}
      >
        {/* Decorative scanline for that Cyberpunk feel */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />

        <div className="flex items-center gap-2 mb-1">
          {weakest.score < PASSING_THRESHOLD ? (
            <FaTriangleExclamation className="text-rose-500 text-xs" />
          ) : (
            <FaShield className="text-emerald-500 text-xs" />
          )}
          <h5
            className={cn(
              "text-[10px] font-black uppercase tracking-widest",
              weakest.score < PASSING_THRESHOLD
                ? "text-rose-400"
                : "text-emerald-400",
            )}
          >
            {weakest.score < PASSING_THRESHOLD
              ? "Critical Domain Warning"
              : "System Readiness Report"}
          </h5>
        </div>

        <p className="text-[12px] font-bold text-slate-300 leading-relaxed uppercase tracking-tight relative z-10">
          {weakest.score < PASSING_THRESHOLD ? (
            <>
              Your <span className="text-white italic">"{weakest.label}"</span>{" "}
              domain is underperforming at{" "}
              <span className="text-rose-500 font-black">{weakest.score}%</span>
              . Florida state standards require{" "}
              <span className="text-white">{PASSING_THRESHOLD}%</span>.
              Immediate focused drill recommended.
            </>
          ) : (
            <>
              All domains meeting state standards. Weakest link is{" "}
              <span className="text-white italic">"{weakest.label}"</span> at
              <span className="text-emerald-400 font-black">
                {" "}
                {weakest.score}%
              </span>
              . Continue standard rotation to maintain readiness.
            </>
          )}
        </p>

        <p className="text-[9px] text-slate-600 font-black uppercase italic mt-1">
          Calculation based on {stats.length} mastery data points.
        </p>
      </motion.div>
    </motion.div>
  );
}

// --- SUB-COMPONENTS ---

function StatRingCard({ label, value, sub, color, icon }: any) {
  return (
    <div className="bg-slate-900 border-2 border-white/5 p-6 flex items-center gap-5 group hover:border-white/20 transition-all">
      <div
        className={`text-2xl ${color} opacity-40 group-hover:opacity-100 transition-opacity`}
      >
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">
          {label}
        </p>
        <h4 className="text-3xl font-black text-white tracking-tighter">
          {value}
        </h4>
        <p className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">
          {sub}
        </p>
      </div>
    </div>
  );
}

function ChartBar({ label, percentage, color }: any) {
  return (
    <div className="group">
      <div className="flex justify-between mb-2 items-end">
        <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider group-hover:text-white transition-colors">
          {label}
        </span>
        <span className="text-[11px] font-black text-white">{percentage}%</span>
      </div>
      <div className="h-4 w-full bg-slate-950/50 border border-white/10 p-[2px] rounded-none">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className={cn(
            "h-full shadow-[0_0_12px_rgba(255,255,255,0.05)]",
            color,
          )}
        />
      </div>
    </div>
  );
}
