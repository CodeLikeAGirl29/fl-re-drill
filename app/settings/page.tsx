"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaCalendarDays,
  FaFloppyDisk,
  FaCircleCheck,
} from "react-icons/fa6";
import { useSettings } from "@/hooks/useSettings";
import ExamCountdown from "@/components/ExamCountdown";

export default function SettingsPage() {
  const { settings, updateSettings, mounted } = useSettings();
  const [draft, setDraft] = useState({ name: "", examDate: "" });
  const [saved, setSaved] = useState(false);

  // Sync draft once hook hydrates
  useEffect(() => {
    if (mounted) setDraft(settings);
  }, [mounted]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSave() {
    updateSettings(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#0a0f1a] px-4 py-10">
      <div className="mx-auto max-w-lg space-y-6">
        {/* Header */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">
            Account
          </p>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Settings
          </h1>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-slate-500">
            Personalize your study experience
          </p>
        </div>

        {/* Live countdown preview */}
        <ExamCountdown />

        {/* Card */}
        <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500"
            >
              <FaUser size={10} />
              Your Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Sarah Johnson"
              value={draft.name}
              onChange={(e) =>
                setDraft((p) => ({ ...p, name: e.target.value }))
              }
              className="w-full rounded-lg border border-white/10 bg-slate-800/60 px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
            />
            {draft.name && (
              <p className="text-[10px] font-bold text-slate-500">
                Dashboard will greet you as{" "}
                <span className="text-cyan-400">
                  {draft.name.split(" ")[0]}
                </span>
                .
              </p>
            )}
          </div>

          <div className="border-t border-white/5" />

          {/* Exam date */}
          <div className="space-y-2">
            <label
              htmlFor="examDate"
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500"
            >
              <FaCalendarDays size={10} />
              Florida RE Exam Date
            </label>
            <input
              id="examDate"
              type="date"
              value={draft.examDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) =>
                setDraft((p) => ({ ...p, examDate: e.target.value }))
              }
              className="w-full rounded-lg border border-white/10 bg-slate-800/60 px-4 py-2.5 text-sm text-white outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 [color-scheme:dark]"
            />
            <p className="text-[10px] font-bold text-slate-500">
              Shown as a live countdown on your dashboard.
            </p>
          </div>

          {/* Save */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-xs font-black uppercase tracking-widest transition-all duration-200 ${
              saved
                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 cursor-default"
                : "bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 hover:bg-cyan-500/20 hover:text-white"
            }`}
          >
            {saved ? (
              <>
                <FaCircleCheck size={13} />
                Saved
              </>
            ) : (
              <>
                <FaFloppyDisk size={13} />
                Save Settings
              </>
            )}
          </motion.button>
        </div>

        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-700">
          Saved locally on this device
        </p>
      </div>
    </main>
  );
}
