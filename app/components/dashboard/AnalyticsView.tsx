"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  FaArrowLeft,
  FaLayerGroup,
  FaCircleCheck,
  FaClockRotateLeft,
  FaTriangleExclamation,
  FaShield,
} from "react-icons/fa6";
import { flashcards } from "@/app/lib/flashcards";
import { questions } from "@/app/lib/questions";

interface MasteryRecord {
  question_id: string;
  status: "mastered" | "review";
}

interface AnalyticsViewProps {
  stats: MasteryRecord[];
  onBack: () => void;
}

type Domain = "Principles" | "Law" | "Brokerage" | "Finance";

// The quiz bank (questions.ts) and the flashcard deck (flashcards.ts) use
// completely different category vocabularies. Flashcards already speak in the
// four exam domains; quiz questions use granular FREC categories that we map
// down to those same four domains here so a single dashboard can reflect
// mastery earned from EITHER study mode.
const QUIZ_CAT_TO_DOMAIN: Record<string, Domain> = {
  "License Law and Qualifications": "Law",
  "Real Estate Commission Rules": "Law",
  "Violations and Penalties": "Law",
  "Real Estate Contracts": "Law",
  "Authorized Relationships and Disclosures": "Brokerage",
  "Brokerage Activities and Procedures": "Brokerage",
  "Property Rights and Ownership": "Principles",
  "Titles, Deeds, and Restrictions": "Principles",
  "Appraisal and Property Value": "Principles",
  "Planning, Zoning, and Hazards": "Principles",
  "Residential Mortgages and Finance": "Finance",
  "Real Estate Taxes and Investment": "Finance",
  "Math Calculations": "Finance",
};

// A flat catalogue of every trackable item with the domain it belongs to.
// Built once at module scope since neither source list changes at runtime.
const ALL_ITEMS: { id: string; domain: Domain }[] = [
  ...flashcards.map((f) => ({ id: f.id, domain: f.category as Domain })),
  ...questions.map((q) => ({
    id: q.id,
    domain: QUIZ_CAT_TO_DOMAIN[q.cat] ?? "Principles",
  })),
];

const DOMAIN_META: { name: Domain; label: string; color: string }[] = [
  { name: "Principles", label: "Principles & Practices", color: "bg-cyan-500" },
  { name: "Law", label: "Real Estate Law", color: "bg-rose-500" },
  { name: "Brokerage", label: "Brokerage Operations", color: "bg-purple-500" },
  { name: "Finance", label: "Escrow & Finance", color: "bg-amber-500" },
];

export default function AnalyticsView({ stats, onBack }: AnalyticsViewProps) {
  const { domainScores, weakest, overallAccuracy, coverage, totalMastered } =
    useMemo(() => {
      const masteredSet = new Set(
        stats.filter((s) => s.status === "mastered").map((s) => s.question_id),
      );
      const trackedSet = new Set(stats.map((s) => s.question_id));

      const scores = DOMAIN_META.map((d) => {
        const items = ALL_ITEMS.filter((i) => i.domain === d.name);
        const mastered = items.filter((i) => masteredSet.has(i.id)).length;
        return {
          ...d,
          total: items.length,
          masteredCount: mastered,
          score: items.length ? Math.round((mastered / items.length) * 100) : 0,
        };
      });

      const weakestDomain = scores.reduce(
        (prev, curr) => (curr.score < prev.score ? curr : prev),
        scores[0],
      );

      const totalItems = ALL_ITEMS.length;
      const mastered = ALL_ITEMS.filter((i) => masteredSet.has(i.id)).length;
      const tracked = ALL_ITEMS.filter((i) => trackedSet.has(i.id)).length;

      return {
        domainScores: scores,
        weakest: weakestDomain,
        overallAccuracy: totalItems
          ? Math.round((mastered / totalItems) * 100)
          : 0,
        coverage: totalItems ? Math.round((tracked / totalItems) * 100) : 0,
        totalMastered: mastered,
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
          sub="Mastered of all items"
          color="text-cyan-400"
          icon={<FaCircleCheck />}
        />
        <StatRingCard
          label="Coverage"
          value={`${coverage}%`}
          sub="Items attempted at least once"
          color="text-purple-400"
          icon={<FaLayerGroup />}
        />
        <StatRingCard
          label="Volume"
          value={totalMastered.toString()}
          sub="Items Mastered"
          color="text-emerald-400"
          icon={<FaClockRotateLeft />}
        />
      </div>

      {/* DOMAIN MASTERY CHART */}
      <div className="relative bg-slate-950/40 backdrop-blur-xl border border-white/5 p-8 rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-cyan-500/5 to-transparent rounded-bl-full pointer-events-none" />

        <div className="flex justify-between items-end mb-10">
          <div>
            <h3 className="text-2xl font-black uppercase italic text-white tracking-tight">
              Domain Mastery
            </h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              Performance across Florida exam categories
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">
              Live Sync
            </span>
          </div>
        </div>

        <div className="space-y-8">
          {domainScores.map((domain) => (
            <ChartBar
              key={domain.name}
              label={domain.label}
              percentage={domain.score}
              detail={`${domain.masteredCount}/${domain.total}`}
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
          "p-6 bg-slate-950/40 backdrop-blur-xl rounded-2xl border-l-4 flex flex-col gap-2 relative overflow-hidden transition-all duration-500 shadow-xl",
          weakest.score < PASSING_THRESHOLD
            ? "border-rose-500 shadow-rose-500/5"
            : "border-emerald-500 shadow-emerald-500/5",
        )}
      >
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
              Your{" "}
              <span className="text-white italic">
                &quot;{weakest.label}&quot;
              </span>{" "}
              domain is underperforming at{" "}
              <span className="text-rose-500 font-black">{weakest.score}%</span>
              . Florida state standards require{" "}
              <span className="text-white">{PASSING_THRESHOLD}%</span>.
              Immediate focused drill recommended.
            </>
          ) : (
            <>
              All domains meeting state standards. Weakest link is{" "}
              <span className="text-white italic">
                &quot;{weakest.label}&quot;
              </span>{" "}
              at
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
interface StatRingCardProps {
  label: string;
  value: string;
  sub: string;
  color: string;
  icon: React.ReactNode;
}

function StatRingCard({ label, value, sub, color, icon }: StatRingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 flex items-center gap-5 group hover:border-cyan-500/30 transition-all rounded-2xl shadow-xl"
    >
      <motion.div
        whileHover={{ skewX: -12, rotate: -5, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className={cn(
          "text-3xl p-3 rounded-xl bg-white/5 transition-colors group-hover:bg-white/10",
          color,
        )}
      >
        <div className="opacity-40 group-hover:opacity-100 transition-opacity">
          {icon}
        </div>
      </motion.div>

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
    </motion.div>
  );
}

interface ChartBarProps {
  label: string;
  percentage: number;
  detail?: string;
  color: string;
}

function ChartBar({ label, percentage, detail, color }: ChartBarProps) {
  return (
    <div className="group">
      <div className="flex justify-between mb-2 items-end">
        <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider group-hover:text-white transition-colors">
          {label}
        </span>
        <span className="text-[11px] font-black text-white">
          {detail && (
            <span className="text-slate-500 mr-2 font-bold">{detail}</span>
          )}
          {percentage}%
        </span>
      </div>
      <div className="h-2.5 w-full bg-slate-900 border border-white/5 p-[2px] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className={cn("h-full rounded-full", color)}
        />
      </div>
    </div>
  );
}
