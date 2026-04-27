import { motion } from "framer-motion";

export default function BreathingDivider() {
  return (
    <div className="relative flex items-center mb-10 h-6 overflow-visible px-2">
      <div className="flex-grow border-t border-dashed border-white/5"></div>
      <div className="mx-6 flex items-center gap-3">
        {[0, 0.4, 0.8].map((delay, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.8, 0.2, 0.8], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
            className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]"
          />
        ))}
      </div>
      <div className="flex-grow border-t border-dashed border-white/5"></div>
    </div>
  );
}