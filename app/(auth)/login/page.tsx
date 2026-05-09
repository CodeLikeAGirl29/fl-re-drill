"use client";

import { useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { FaGoogle, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage({ text: error.message, type: "error" });
    } else {
      setMessage({
        text: isSignUp
          ? "Check your email to confirm your account!"
          : "Success! Redirecting...",
        type: "success",
      });
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/api/auth/callback` },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 font-space">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-slate-900 border-4 border-white p-8 shadow-[12px_12px_0px_0px_rgba(34,211,238,0.3)]"
      >
        <div className="mb-8">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">
            {isSignUp ? "Join the" : "Back to"} <br />
            <span className="text-cyan-400 underline decoration-white decoration-4">
              Drill
            </span>
          </h2>
        </div>

        <div className="space-y-4">
          {/* Social Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-200 text-slate-900 p-4 font-black uppercase border-2 border-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <FaGoogle /> Continue with Google
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="h-[2px] bg-slate-700 flex-grow" />
            <span className="text-slate-500 font-bold text-xs uppercase">
              OR
            </span>
            <div className="h-[2px] bg-slate-700 flex-grow" />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-5 text-slate-500" />
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 pl-12 border-2 border-slate-700 bg-slate-800 text-white font-bold outline-none focus:border-cyan-400 transition-colors"
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-4 top-5 text-slate-500" />
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 pl-12 border-2 border-slate-700 bg-slate-800 text-white font-bold outline-none focus:border-cyan-400 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 p-4 font-black uppercase border-2 border-white flex items-center justify-center gap-2 transition-all group"
            >
              {loading
                ? "Processing..."
                : isSignUp
                  ? "Create Account"
                  : "Sign In"}
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {message.text && (
          <p
            className={`mt-6 p-3 text-center font-bold text-sm border-2 ${message.type === "error" ? "bg-rose-500/20 border-rose-500 text-rose-400" : "bg-cyan-500/20 border-cyan-500 text-cyan-400"}`}
          >
            {message.text}
          </p>
        )}

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full mt-8 text-slate-400 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors"
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </motion.div>
    </div>
  );
}
