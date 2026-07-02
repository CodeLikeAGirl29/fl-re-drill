"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaCalendarDays, FaGear } from "react-icons/fa6";
import { useSettings } from "@/hooks/useSettings";

function urgencyStyle(days: number): string {
  if (days < 0) return "border-white/5 bg-slate-900/50 text-slate-400";
  if (days === 0) return "border-amber-500/30 bg-amber-500/10 text-amber-300";
  if (days <= 7) return "border-rose-500/30 bg-rose-500/10 text-rose-300";
  if (days <= 30) return "border-amber-500/30 bg-amber-500/10 text-amber-300";
  return "border-cyan-500/30 bg-cyan-500/10 text-cyan-300";
}

function pillStyle(days: number): string {
  if (days === 0) return "text-amber-400";
  if (days <= 7) return "text-rose-400";
  if (days <= 30) return "text-amber-400";
  return "text-cyan-400";
}

function label(days: number, firstName: string): string {
  const hey = firstName ? `${firstName}, ` : "";
  if (days < 0)
    return `${hey}your exam date has passed — update it in Settings.`;
  if (days === 0) return `🎯 ${hey}your exam is today. You've got this!`;
  if (days === 1) return `${hey}your exam is tomorrow.`;
  return `${hey}${days} days until your Florida RE exam.`;
}

export default function ExamCountdown() {
  const { settings, daysUntilExam, mounted } = useSettings();

  if (!mounted) return null;

  // No date set yet → soft nudge
  if (!settings.examDate) {
    return (
      <div className="flex items-center justify-between gap-3 bg-slate-900/50 border border-white/5 rounded-xl px-5 py-3 text-[11px] font-bold text-slate-500">
        <div className="flex items-center gap-2">
          <FaCalendarDays size={12} />
          <span>Set your exam date to see a live countdown.</span>
        </div>
        <Link
          href="/settings"
          className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors shrink-0 uppercase tracking-widest text-[9px] font-black"
        >
          <FaGear size={11} />
          Settings
        </Link>
      </div>
    );
  }

  const days = daysUntilExam!;
  const firstName = settings.name.split(" ")[0];
  const formattedDate = new Date(
    settings.examDate + "T00:00:00",
  ).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex items-center justify-between gap-4 rounded-xl border px-5 py-4 ${urgencyStyle(days)}`}
    >
      {/* Left */}
      <div className="flex items-start gap-3 min-w-0">
        <FaCalendarDays size={14} className="shrink-0 mt-0.5 opacity-70" />
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-widest opacity-50 mb-0.5">
            Exam countdown
          </p>
          <p className="text-sm font-bold leading-snug capitalize">
            {label(days, firstName)}
          </p>
          {days >= 0 && (
            <p className="text-[10px] font-bold opacity-50 mt-0.5">
              {formattedDate}
            </p>
          )}
        </div>
      </div>

      {/* Right: big number */}
      {days > 0 && (
        <div className={`shrink-0 text-right ${pillStyle(days)}`}>
          <p className="text-3xl font-black font-mono tabular-nums leading-none">
            {days}
          </p>
          <p className="text-[9px] font-black uppercase tracking-[0.15em] opacity-60">
            {days === 1 ? "day" : "days"}
          </p>
        </div>
      )}
    </motion.div>
  );
}
