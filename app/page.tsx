"use client";

import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/app/lib/supabase/client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import QuizContainer from "./components/QuizContainer";
import WelcomeScreen from "./components/WelcomeScreen"; // Ensure this is imported
import FormulaModal from "./components/FormulaModal";
import { getMasteryStats, type MasteryRecord } from "@/app/lib/actions/mastery";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [masteryStats, setMasteryStats] = useState<MasteryRecord[]>([]);
  const [activeMode, setActiveMode] = useState<
    "standard" | "quick20" | "flashcards" | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const stats = await getMasteryStats();
        setMasteryStats(stats);
      }
    };
    checkUser();
  }, []);

  const handleExit = () => {
    setActiveMode(null);
    if (user) getMasteryStats().then(setMasteryStats);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header onOpenFormulas={() => setIsModalOpen(true)} onHome={handleExit} />

      <main className="flex-grow flex items-center justify-center p-4">
        {/* 1. If a quiz mode is active, show the container */}
        {activeMode ? (
          <QuizContainer
            mode={activeMode}
            onExit={handleExit}
            isAuthenticated={!!user} // Pass this so QuizContainer knows whether to sync
          />
        ) : /* 2. If no quiz is active, decide between Dashboard or Welcome Screen */
        user ? (
          <Dashboard
            user={user}
            masteryStats={masteryStats}
            onStartQuiz={(mode) => setActiveMode(mode)}
          />
        ) : (
          <div className="w-full max-w-2xl">
            {/* WelcomeScreen expects handlers that set the activeMode */}
            <WelcomeScreen
              onNew={(category, count) => setActiveMode("quick20")}
              onStart={() => setActiveMode("standard")}
              onResume={() => {}} // Guest can't resume
              onWeakestDrill={() => {}} // Guest doesn't have weak links
              hasProgress={false}
            />
            <p className="mt-6 text-center text-slate-600 text-[10px] uppercase font-black tracking-widest">
              Sign in to track mastery and unlock analytics
            </p>
          </div>
        )}
      </main>

      <Footer />

      <FormulaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
