'use client';

import React from 'react';
import { Trophy, Target, RefreshCcw, AlertCircle, ExternalLink } from 'lucide-react';
import { IoArrowForward } from "react-icons/io5";
import ScoreChart from './ScoreChart'; // Import your component

interface ResultsViewProps {
  score: number;
  total: number;
  missed: string[]; // Updated to match your latest useQuiz hook
  rank: { name: string; sub: string; color: string };
  onRestart: () => void;
}

export default function ResultsView({ score, total, rank, onRestart, missed }: ResultsViewProps) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const isPass = percentage >= 75;

  // Map the rank color strings to hex for the Chart component
  const getHexColor = () => {
    if (rank.color.includes('emerald')) return '#10b981';
    if (rank.color.includes('cyan')) return '#06b6d4';
    if (rank.color.includes('blue')) return '#3b82f6';
    if (rank.color.includes('orange')) return '#f59e0b';
    return '#f43f5e'; // Default Rose
  };

  return (
    <div className="mx-auto w-full max-w-2xl bg-[#1e293b]/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl text-center font-space">

      {/* STATUS BADGE */}
      <div className={`inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border ${isPass ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-rose-500/10 border-rose-500/50 text-rose-400'
        }`}>
        {isPass ? "OFFICIAL PASS" : "DID NOT PASS"}
      </div>

      {/* REPLACED WITH SCORECHART COMPONENT */}
      <div className="mb-8">
        <ScoreChart score={score} total={total} color={getHexColor()} />
      </div>

      <div className="mb-10">
        <h2 className={`text-2xl font-black uppercase tracking-tight mb-1 ${rank.color}`}>
          {rank.name}
        </h2>
        <p className="text-slate-400 text-sm italic font-medium">{rank.sub}</p>
      </div>

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

      {/* MISSED TOPICS: Updated for string array from useQuiz */}
      {!isPass && missed.length > 0 && (
        <div className="mt-2 mb-10 text-left">
          <div className="flex items-center gap-2 mb-4 text-rose-400">
            <AlertCircle size={16} />
            <h3 className="text-[10px] font-black uppercase tracking-widest">Critical Review Areas</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(missed)).map((topic, index) => (
              <span key={index} className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-[10px] font-bold uppercase tracking-tight">
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5">
        <button
          onClick={onRestart}
          className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl border border-white/10 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
        >
          <RefreshCcw size={14} />
          Reset Protocol
        </button>
        {isPass ? (
          <a
            href="https://home.pearsonvue.com/fl/realestate"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,182,129,0.3)]"
          >
            Schedule State Exam
            <ExternalLink size={14} />
          </a>
        ) : (
          <button
            onClick={onRestart}
            className="flex-1 py-4 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 font-black rounded-2xl border border-rose-500/30 uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all"
          >
            Review Coursework
            <IoArrowForward size={14} />
          </button>
        )}
      </div>
    </div>
  );
}