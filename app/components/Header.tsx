"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaLaptopHouse,
  FaSignOutAlt,
  FaUserCircle,
  FaGear,
} from "react-icons/fa6";
import { IoCalculatorOutline } from "react-icons/io5";
import { useAuth } from "./AuthProvider";
import { auth } from "@/lib/firebase/client";
import { signOut } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";

interface HeaderProps {
  onOpenFormulas: () => void;
  onHome?: () => void;
}

export default function Header({ onOpenFormulas, onHome }: HeaderProps) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut(auth);
    document.cookie = "firebase-token=; path=/; max-age=0";
    router.push("/");
    router.refresh();
  };

  const isSettings = pathname === "/settings";

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-slate-900/60 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
      {/* Logo */}
      <Link
        href="/"
        onClick={onHome}
        className="flex items-center gap-3 group transition-all active:scale-95"
      >
        <motion.div
          whileHover={{ skewX: -12, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:bg-cyan-400 transition-colors"
        >
          <FaLaptopHouse size={17} className="text-white text-lg" />
        </motion.div>

        <div className="font-space">
          <h1 className="text-white font-black text-[13px] tracking-tighter leading-none uppercase italic">
            RE Master <span className="text-cyan-400">Drill</span>
          </h1>
          <p className="text-[9px] text-slate-500 font-bold tracking-[0.2em] uppercase mt-1">
            Florida Edition
          </p>
        </div>
      </Link>

      {/* Nav actions */}
      <div className="flex items-center gap-2">
        {/* Formulas */}
        <motion.button
          whileHover={{ skewX: -12 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenFormulas}
          className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 px-3 sm:px-5 py-2 rounded-md text-[0.625rem] font-black uppercase tracking-tighter hover:bg-cyan-500/20 hover:text-white transition-all font-space"
        >
          <IoCalculatorOutline size={17} className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Formulas</span>
        </motion.button>

        {/* Settings */}
        <Link href="/settings">
          <motion.div
            whileHover={{ skewX: -12 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 border px-3 sm:px-5 py-2 rounded-md text-[0.625rem] font-black uppercase tracking-tighter transition-all font-space cursor-pointer ${
              isSettings
                ? "bg-slate-400/20 border-slate-400/40 text-white"
                : "bg-slate-500/10 border-slate-400/20 text-slate-400 hover:bg-slate-500/20 hover:text-white"
            }`}
          >
            <FaGear size={13} />
            <span className="hidden sm:inline">Settings</span>
          </motion.div>
        </Link>

        {/* Auth */}
        {user ? (
          <motion.button
            whileHover={{ skewX: -12 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSignOut}
            className="flex items-center gap-2 bg-rose-500/10 border border-rose-400/20 text-rose-300 px-3 sm:px-5 py-2 rounded-md text-[0.625rem] font-black uppercase tracking-tighter hover:bg-rose-500/20 hover:text-white transition-all font-space"
          >
            <FaSignOutAlt size={14} />
            <span className="hidden sm:inline">Sign Out</span>
          </motion.button>
        ) : (
          <Link href="/login">
            <motion.button
              whileHover={{ skewX: -12 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-slate-500/10 border border-slate-400/20 text-slate-300 px-3 sm:px-5 py-2 rounded-md text-[0.625rem] font-black uppercase tracking-tighter hover:bg-slate-500/20 hover:text-white transition-all font-space"
            >
              <FaUserCircle size={14} />
              <span className="hidden sm:inline">Sign In</span>
            </motion.button>
          </Link>
        )}
      </div>
    </header>
  );
}
