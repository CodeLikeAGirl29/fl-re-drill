'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Trophy, Target, RefreshCcw, AlertCircle } from 'lucide-react';
import { IoArrowForward } from "react-icons/io5";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

interface ResultsViewProps {
  score: number;
  total: number;
  missed: [string, number][];
  rank: { name: string; sub: string; color: string };
  onRestart: () => void;
}

export default function ResultsView({ score, total, rank, onRestart, missed }: ResultsViewProps) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const isPass = percentage >= 75;

  // Chart Data Configuration
  const chartData = {
    datasets: [
      {
        data: [score, Math.max(0, total - score)],
        backgroundColor: [
          isPass ? '#10b981' : '#f43f5e', // Emerald-500 or Rose-500
          'rgba(255, 255, 255, 0.05)',
        ],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
        cutout: '85%',
        borderRadius: 10,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="mx-auto w-full max-w-2xl bg-[#1e293b] p-10 rounded-3xl border border-white/10 shadow-2xl text-center">

      {/* STATUS BADGE */}
      <div className={`inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border ${isPass ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-rose-500/10 border-rose-500/50 text-rose-400'
        }`}>
        {isPass ? "OFFICIAL PASS" : "DID NOT PASS"}
      </div>

      {/* SEMI-CIRCLE CHART AREA */}
      <div className="relative h-[200px] w-[300px] mx-auto mb-4">
        <Doughnut data={chartData} options={chartOptions} />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
          <h2 className={`text-6xl font-black tracking-tighter ${rank.color}`}>
            {percentage}%
          </h2>
        </div>
      </div>

      <p className="text-white text-xl font-bold uppercase tracking-tight mb-1">{rank.name}</p>
      <p className="text-slate-400 text-sm italic mb-10">{rank.sub}</p>

      {/* SCORE BREAKDOWN */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4 text-left">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Trophy className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Correct</p>
            <p className="text-2xl font-bold text-white">{score}</p>
          </div>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4 text-left">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Target className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Total Items</p>
            <p className="text-2xl font-bold text-white">{total}</p>
          </div>
        </div>
      </div>

      {/* MISSED QUESTIONS / REVIEW SECTION */}
      {!isPass && missed.length > 0 && (
        <div className="mt-2 mb-10 text-left">
          <div className="flex items-center gap-2 mb-4 text-rose-400">
            <AlertCircle className="w-4 h-4" />
            <h3 className="text-[10px] font-black uppercase tracking-widest">Topics to Review</h3>
          </div>
          <div className="grid gap-2">
            {missed.map(([topic, count], index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-slate-300 text-xs font-medium">{topic}</span>
                <span className="text-rose-400 font-bold text-xs">{count} missed</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onRestart}
          className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl border border-white/10 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" />
          Try Again
        </button>
        {isPass ? (
          <a
            href="https://home.pearsonvue.com/fl/realestate"
            target="_blank"
            className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
          >
            Schedule Exam
            <IoArrowForward className="w-4 h-4" />
          </a>
        ) : (
          <button className="flex-1 py-4 bg-rose-600/20 text-rose-400 font-black rounded-2xl border border-rose-500/30 uppercase tracking-widest text-xs cursor-default">
            Study More
          </button>
        )}
      </div>
    </div>
  );
}