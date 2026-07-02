"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface UserSettings {
  name: string;
  examDate: string; // "YYYY-MM-DD"
}

const STORAGE_KEY = "fl_re_drill_settings";
const DEFAULT: UserSettings = { name: "", examDate: "" };

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT);
  const [mounted, setMounted] = useState(false);

  // Hydrate once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings(JSON.parse(raw));
    } catch {
      // ignore malformed data
    }
    setMounted(true);
  }, []);

  // Sync writes to localStorage
  const updateSettings = useCallback((patch: Partial<UserSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  // Derived: days until exam
  const daysUntilExam: number | null = (() => {
    if (!settings.examDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const exam = new Date(settings.examDate + "T00:00:00");
    return Math.ceil((exam.getTime() - today.getTime()) / 86_400_000);
  })();

  return { settings, updateSettings, daysUntilExam, mounted };
}
