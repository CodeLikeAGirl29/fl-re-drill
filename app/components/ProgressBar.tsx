// components/ProgressBar.tsx

interface ProgressBarProps {
  current: number; // Number of questions answered
  total: number;   // Total number of questions
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  // Calculate percentage (0-100)
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div
      className="flex w-full h-5 bg-surface-1 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700"
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="flex flex-col justify-center rounded-full overflow-hidden bg-primary text-[10px] font-bold text-primary-foreground text-center whitespace-nowrap transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      >
        {/* Only show the text if the bar is wide enough to contain it (> 10%) */}
        {percentage > 10 && `${percentage}%`}
      </div>
    </div>
  );
}