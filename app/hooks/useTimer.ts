'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer(initialSeconds: number = 0) {
  const [seconds, setSeconds] = useState(initialSeconds);

  // Use ReturnType<typeof setInterval> to avoid the NodeJS namespace error
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Clear any existing interval to prevent double-timers
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const resetTimer = useCallback((newSeconds: number) => {
    setSeconds(newSeconds);
  }, []);

  const formatTime = useCallback(() => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    // Pad with leading zeros for a cleaner look (e.g., 05 instead of 5)
    const pMins = mins.toString().padStart(2, '0');
    const pSecs = secs.toString().padStart(2, '0');

    if (hrs > 0) {
      // If there is at least 1 hour, show the H:MM:SS format
      return `${hrs}h ${pMins}m ${pSecs}s`;
    }

    // Otherwise, just show MM:SS
    return `${pMins}m ${pSecs}s`;
  }, [seconds]);

  return { seconds, formatTime, resetTimer };
}