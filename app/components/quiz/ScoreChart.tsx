'use client';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ScoreChartProps {
  score: number;
  total: number;
  color: string; // Add this to pass the rank/status color
}

export default function ScoreChart({ score, total, color }: ScoreChartProps) {
  const data = {
    datasets: [
      {
        data: [score, Math.max(0, total - score)],
        // Use the passed color for the "progress" part of the ring
        backgroundColor: [color, 'rgba(255, 255, 255, 0.05)'],
        borderWidth: 0,
        circumference: 360,
        rotation: 0,
        cutout: '85%',
        borderRadius: 20,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <div className="relative w-48 h-48 mx-auto">
      <Doughnut data={data} options={options} />
      {/* Center Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Efficiency</span>
        <span className="text-4xl font-black text-white leading-none">
          {total > 0 ? Math.round((score / total) * 100) : 0}%
        </span>
      </div>
    </div>
  );
}