'use client';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

// Register the parts of Chart.js we need
ChartJS.register(ArcElement, Tooltip, Legend);

interface ScoreChartProps {
  score: number;
  total: number;
}

export default function ScoreChart({ score, total }: ScoreChartProps) {
  const data = {
    datasets: [
      {
        data: [score, total - score],
        backgroundColor: ['#4f46e5', '#f1f5f9'], // rose-600 and Slate-100
        borderWidth: 0,
        circumference: 360,
        rotation: 0,
        cutout: '80%', // This makes it a "ring" instead of a pie
        borderRadius: 10,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    cutout: '80%',
    plugins: {
      tooltip: { enabled: false }, // Cleaner look without tooltips
      legend: { display: false },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <div className="relative w-40 h-40 mx-auto">
      <Doughnut data={data} options={options} />
      {/* Center Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-slate-800">{score}/{total}</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase">Score</span>
      </div>
    </div>
  );
}