"use client";
import { useState, useEffect, useCallback } from "react";

export function useTimer(initialSeconds: number = 0) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    // Typed interval handle (was `any`) and guarded so it only runs while active.
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const startTimer = useCallback((startTime: number = 0) => {
    setSeconds(startTime);
    setIsActive(true);
  }, []);

  const stopTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  // BUGFIX: previously this ignored its argument and always restarted from 0,
  // which meant "Resume Previous Drill" discarded the saved elapsed time.
  // It now honors the passed-in start value.
  const resetTimer = useCallback(
    (startTime: number = 0) => startTimer(startTime),
    [startTimer]
  );

  const formatTime = useCallback(() => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [hrs, mins, secs]
      .map((v) => v.toString().padStart(2, "0"))
      .join(":");
  }, [seconds]);

  return { seconds, formatTime, startTimer, stopTimer, resetTimer, isActive };
}
