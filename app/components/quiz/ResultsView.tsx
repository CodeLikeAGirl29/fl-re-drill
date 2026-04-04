'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResultsView({ score, total, missed }: any) {
  const percentage = Math.round((score / total) * 100);
  const topMissed = missed;

  // Chart.js Data Configuration
  const data = {
    labels: ['Correct', 'Remaining'],
    datasets: [
      {
        data: [score, total - score],
        backgroundColor: ['#4f46e5', '#f1f5f9'], // rose-600 and Slate-100
        hoverBackgroundColor: ['#4338ca', '#f1f5f9'],
        borderWidth: 0,
        circumference: 360,
        rotation: 0,
        cutout: '85%',
        borderRadius: 20,
      },
    ],
  };

  // Chart.js Options
  const options = {
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      duration: 2000,
      easing: 'easeOutQuart' as const,
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-50 p-4">
      <div className="bg-white/95 p-6 rounded-[2.5rem] shadow-2xl border border-white/20 animate-in w-full max-w-md">
        <div className="text-center mb-8 flex flex-col items-center">

          {/* Chart Container */}
          <div className="relative w-48 h-48 mb-4">
            <Doughnut data={data} options={options} />

            {/* Absolute Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-800 tracking-tighter">
                {score}/{total}
              </span>
              <span className="text-[0.625rem] font-bold text-slate-400 uppercase tracking-widest mt-1">
                {percentage}% Correct
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Drill Complete!</h2>
        </div>

        {topMissed.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-[0.625rem] font-black uppercase tracking-widest text-slate-500 border-b pb-2">
              Focus Areas Needed:
            </h3>
            {topMissed.map(([cat, count]: any) => (
              <div key={cat} className="flex justify-between items-center bg-red-50 p-3 rounded-xl border border-red-100">
                <span className="text-xs font-bold text-red-700">{cat}</span>
                <span className="text-[0.625rem] font-black bg-red-200 text-red-800 px-2 py-1 rounded-md">
                  {count} Missed
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-green-50 p-4 rounded-2xl border border-green-100 text-center">
            <p className="text-sm font-bold text-green-700">Perfect Score! 🚀</p>
            <p className="text-[0.625rem] text-green-600 mt-1 uppercase font-black">You are ready for the State Exam.</p>
          </div>
        )}

        <button
          onClick={() => window.location.reload()}
          className="mt-8 w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-900/20"
        >
          Reset Master Drill
        </button>
      </div>
    </div>
  );
}