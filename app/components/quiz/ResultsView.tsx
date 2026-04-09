'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Trophy, Target, AlertCircle, RefreshCcw } from 'lucide-react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResultsView({ score, total, missed, rank }: any) {
  const percentage = Math.round((score / total) * 100);
  const topMissed = missed;

  const data = {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        data: [score, total - score],
        backgroundColor: ['#06b6d4', 'rgba(255, 255, 255, 0.05)'],
        hoverBackgroundColor: ['#0ea5e9', 'rgba(255, 255, 255, 0.1)'],
        borderWidth: 0,
        circumference: 360,
        rotation: 0,
        cutout: '82%',
        borderRadius: 10,
      },
    ],
  };

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
    <div className="mx-auto w-full max-w-2xl rounded-xl border border-[#444444] bg-[#1e293b] shadow-2xl text-white overflow-hidden animate-in fade-in zoom-in duration-500">

      {/* Header Gradient Area */}
      <div className="h-24 w-full bg-linear-to-r from-cyan-700 via-blue-500 to-indigo-600 flex items-center justify-center">
        <Trophy className="text-white drop-shadow-lg" size={40} />
      </div>

      <div className="p-8 -mt-8">
        <div className="text-center mb-8">
          <div className="inline-block relative w-48 h-48 mb-4 bg-[#1e293b] rounded-full p-2 shadow-inner border border-white/5">
            <Doughnut data={data} options={options} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white tracking-tighter">
                {percentage}%
              </span>
              <span className="text-[0.625rem] font-bold text-[#817a8e] uppercase tracking-widest">
                {score} / {total} Correct
              </span>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-1">{rank?.name || "Drill Complete"}</h2>
          <p className="text-cyan-400 italic font-medium text-sm">{rank?.sub || "Keep studying FS 475!"}</p>
        </div>

        {/* Focus Areas Section */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-rose-400" />
            <h3 className="text-[0.75rem] font-black uppercase tracking-[0.2em] text-[#817a8e]">
              Performance Breakdown
            </h3>
          </div>

          {topMissed.length > 0 ? (
            <div className="grid gap-3">
              {topMissed.map(([cat, count]: any) => (
                <div key={cat} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10 group hover:border-rose-500/50 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-[0.65rem] text-[#817a8e] uppercase font-bold tracking-tighter">Needs Review</span>
                    <span className="text-sm font-bold text-white leading-tight">{cat}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-black text-rose-400">{count}</span>
                    <span className="text-[0.5rem] text-[#817a8e] uppercase">Missed</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-emerald-500/10 p-6 rounded-xl border border-emerald-500/20 text-center">
              <p className="text-emerald-400 font-bold mb-1">Perfect Score! 🚀</p>
              <p className="text-[0.625rem] text-[#817a8e] uppercase font-black">You've mastered these concepts.</p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => window.location.reload()}
            className="group flex items-center justify-center gap-2 w-full py-4 bg-[#06b6d4] hover:bg-[#0ea5e9] text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.01] shadow-lg"
          >
            <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            Restart Master Drill
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-[#444444] text-center">
          <p className="text-[0.625rem] text-[#817a8e] uppercase tracking-[0.2em]">
            Status: <span className={percentage >= 75 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
              {percentage >= 75 ? "EXAM READY" : "ADDITIONAL STUDY REQUIRED"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}