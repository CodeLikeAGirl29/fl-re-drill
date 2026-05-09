"use client";

import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaBolt,
  FaCircleCheck,
  FaClockRotateLeft,
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
  // --- LIVE DATA CALCULATIONS ---
  const totalCards = flashcards.length;
  const totalMastered = stats.filter((s) => s.status === "mastered").length;
  const overallAccuracy =
    totalCards > 0 ? Math.round((totalMastered / totalCards) * 100) : 0;

  const calculateMastery = (
    cat: "Law" | "Principles" | "Brokerage" | "Finance",
  ) => {
    const categoryCards = flashcards.filter((f) => f.category === cat);
    if (categoryCards.length === 0) return 0;

    const masteredIds = stats
      .filter((s) => s.status === "mastered")
      .map((s) => s.question_id);

    const count = categoryCards.filter((f) =>
      masteredIds.includes(f.id),
    ).length;
    return Math.round((count / categoryCards.length) * 100);
  };

  // Determine "Weakest Domain" for the Pro Insight
  const domainScores = [
    { name: "Principles", score: calculateMastery("Principles") },
    { name: "Law", score: calculateMastery("Law") },
    { name: "Brokerage", score: calculateMastery("Brokerage") },
    { name: "Finance", score: calculateMastery("Finance") },
  ];
  const weakest = domainScores.reduce((prev, curr) =>
    prev.score < curr.score ? prev : curr,
  );

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
          <ChartBar
            label="Principles & Practices"
            percentage={calculateMastery("Principles")}
            color="bg-cyan-500"
          />
          <ChartBar
            label="Real Estate Law"
            percentage={calculateMastery("Law")}
            color="bg-rose-500"
          />
          <ChartBar
            label="Brokerage Operations"
            percentage={calculateMastery("Brokerage")}
            color="bg-purple-500"
          />
          <ChartBar
            label="Escrow & Finance"
            percentage={calculateMastery("Finance")}
            color="bg-amber-500"
          />
        </div>
      </div>

      {/* ACTIONABLE INSIGHT */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 bg-white/5 border-l-4 border-cyan-500 flex flex-col gap-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.02)]"
      >
        <h5 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">
          Intelligence Report
        </h5>
        <p className="text-[12px] font-bold text-slate-300 leading-relaxed uppercase tracking-tight">
          Your <span className="text-white">"{weakest.name}"</span> score is
          currently the lowest at{" "}
          <span className="text-rose-500">{weakest.score}%</span>. We recommend
          a focused Flashcard Drill on this domain to ensure you meet the 75%
          state requirement.
        </p>
      </motion.div>
    </motion.div>
  );
}

// --- SUB-COMPONENTS (Scoped to this file) ---

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
        <h4 className="text-3xl font-black text-white">{value}</h4>
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
      <div className="h-4 w-full bg-white/5 border border-white/10 p-1 rounded-sm">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className={`h-full ${color} shadow-[0_0_12px_rgba(255,255,255,0.05)]`}
        />
      </div>
    </div>
  );
}
