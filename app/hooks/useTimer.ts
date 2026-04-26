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

  const formatTime = () => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const paddedMins = mins.toString().padStart(2, '0');
    const paddedSecs = secs.toString().padStart(2, '0');

    // Updated format to include "s" for seconds as requested
    if (hrs > 0) {
      return `${hrs}h ${paddedMins}m ${paddedSecs}s`;
    }

    return `${paddedMins}m ${paddedSecs}s`;
  };

  return { seconds, formatTime, resetTimer };
}