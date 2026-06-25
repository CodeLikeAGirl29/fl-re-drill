"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/client";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaGithub,
} from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage({
          text: "Account created! Redirecting...",
          type: "success",
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage({ text: "Success! Redirecting...", type: "success" });
      }
      router.push("/");
    } catch (err: any) {
      const messages: Record<string, string> = {
        "auth/email-already-in-use":
          "An account with this email already exists.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/weak-password": "Password must be at least 6 characters.",
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/invalid-credential": "Invalid email or password.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
      };
      setMessage({
        text: messages[err.code] ?? err.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    setMessage({ text: "", type: "" });
    try {
      const p =
        provider === "google"
          ? new GoogleAuthProvider()
          : new GithubAuthProvider();
      await signInWithPopup(auth, p);
      router.push("/");
    } catch (err: any) {
      // User closed the popup — silently ignore
      if (err.code === "auth/popup-closed-by-user") return;
      setMessage({ text: err.message, type: "error" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] p-4 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10">
          <div className="mb-10 text-center">
            <motion.h2
              key={isSignUp ? "signup-title" : "login-title"}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-black uppercase italic tracking-tighter text-white"
            >
              {isSignUp ? "Join the" : "Back to"} <br />
              <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                Drill
              </span>
            </motion.h2>
            <p className="text-slate-400 text-sm mt-2 font-medium">
              {isSignUp
                ? "Create your account to start training"
                : "Log in to continue your progress"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleOAuthLogin("google")}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 py-3.5 px-4 rounded-xl font-bold uppercase text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-white/5"
              >
                <FaGoogle className="text-lg" /> Continue with Google
              </button>

              <button
                onClick={() => handleOAuthLogin("github")}
                className="w-full flex items-center justify-center gap-3 bg-slate-950 border border-white/10 hover:bg-slate-900 text-white py-3.5 px-4 rounded-xl font-bold uppercase text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-black/40"
              >
                <FaGithub className="text-lg" /> Continue with GitHub
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-px bg-slate-800 flex-grow" />
              <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                Secure Email Login
              </span>
              <div className="h-px bg-slate-800 flex-grow" />
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-4">
                <div className="relative group">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-4 pl-12 pr-4 rounded-xl border border-slate-800 bg-slate-950/50 text-white placeholder:text-slate-600 outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all font-medium"
                    required
                  />
                </div>
                <div className="relative group">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-4 pl-12 pr-4 rounded-xl border border-slate-800 bg-slate-950/50 text-white placeholder:text-slate-600 outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-slate-950 py-4 rounded-xl font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] group mt-2"
              >
                {loading
                  ? "Processing..."
                  : isSignUp
                    ? "Create Account"
                    : "Sign In"}
                {!loading && (
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </form>
          </div>

          <AnimatePresence mode="wait">
            {message.text && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`mt-6 p-4 rounded-xl border text-sm font-bold flex items-center justify-center text-center ${
                  message.type === "error"
                    ? "bg-rose-500/10 border-rose-500/50 text-rose-400"
                    : "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
                }`}
              >
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full mt-8 text-slate-500 hover:text-cyan-400 font-bold text-[11px] uppercase tracking-[0.2em] transition-colors"
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
