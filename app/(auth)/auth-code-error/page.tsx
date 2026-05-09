"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AuthErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md bg-slate-900 border-4 border-rose-500 p-8 shadow-[8px_8px_0px_0px_rgba(244,63,94,0.3)]"
      >
        <h2 className="text-3xl font-black uppercase italic mb-4 text-rose-500">
          Link Expired
        </h2>
        <p className="text-slate-300 font-bold mb-6">
          The security link has expired or has already been used. Please try
          signing in again to receive a fresh link.
        </p>
        <Link
          href="/login"
          className="inline-block bg-white text-slate-900 px-6 py-3 font-black uppercase border-2 border-black hover:bg-cyan-400 transition-colors"
        >
          Back to Login
        </Link>
      </motion.div>
    </div>
  );
}
