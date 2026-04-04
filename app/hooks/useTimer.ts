'use client';
import { useState, useEffect, useRef } from 'react';

export function useTimer(initialSeconds: number = 0) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = () => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const paddedMins = mins.toString().padStart(2, '0');
    const paddedSecs = secs.toString().padStart(2, '0');

    // If hours exist, show H:MM:SS, otherwise just MM:SS
    if (hrs > 0) {
      return `${hrs}:${paddedMins}:${paddedSecs}`;
    }

    return `${paddedMins}:${paddedSecs}`;
  };

  return { seconds, formatTime };
}