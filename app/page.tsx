"use client";

import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/app/lib/supabase/client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import QuizContainer from "./components/QuizContainer";
import WelcomeScreen from "./components/WelcomeScreen";
import FormulaModal from "./components/FormulaModal";
import {
  updateMastery,
  getMasteryStats,
  type MasteryRecord,
} from "@/app/lib/actions/mastery";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [masteryStats, setMasteryStats] = useState<MasteryRecord[]>([]);
  const [activeMode, setActiveMode] = useState<
    "standard" | "quick20" | "flashcards" | "weakest" | null
  >(null);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  
  // Single consolidated state variable for managing your modal window
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

  const handleAnswerUpdate = async (questionId: string, isCorrect: boolean) => {
    if (!user) return;
    try {
      const newStatus = isCorrect ? "mastered" : "review";
      // Update Supabase
      await updateMastery(questionId, newStatus);
      // Pull fresh data to sync the Intelligence Report locally
      const freshStats = await getMasteryStats();
      setMasteryStats(freshStats);
    } catch (err) {
      console.error("Failed to sync mastery:", err);
    }
  };

  const handleExit = async () => {
    setActiveMode(null);
    if (user) {
      // 1. Fetch fresh stats from the DB
      const freshStats = await getMasteryStats();
      // 2. Update state to trigger the Analytics recalculation
      setMasteryStats([...freshStats]);
      console.log(
        "Syncing Intelligence Report with fresh data:",
        freshStats.length,
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Perfectly mapped the Header trigger callback to toggle 
        the centered FormulaModal visibility state 
      */}
      <Header
        onOpenFormulas={() => setIsModalOpen(true)}
        onHome={() => setActiveMode(null)}
      />
      
      <main className="flex-grow flex items-center justify-center p-4">
        {/* If a quiz mode is active, show the container */}
        {activeMode ? (
          <QuizContainer
            mode={activeMode}
            category={selectedCategory}
            onExit={handleExit}
            onAnswer={handleAnswerUpdate}
            isAuthenticated={!!user}
            masteryStats={masteryStats}
          />
        ) : user ? (
          <Dashboard
            user={user}
            masteryStats={masteryStats}
            onStartQuiz={(mode) => setActiveMode(mode)}
          />
        ) : (
          <div className="w-full max-w-2xl">
            {/* WelcomeScreen expects handlers that set the activeMode */}
            <WelcomeScreen
              onStart={() => setActiveMode("standard")}
              onNew={(category, count) => {
                setSelectedCategory(category);
                if (count === 20) setActiveMode("quick20");
                else setActiveMode("standard");
              }}
              // Connect the Weakest Link handler
              onWeakestDrill={() => {}}
              onResume={() => {}}
              hasProgress={false}
            />
            <p className="mt-6 text-center text-slate-600 text-[10px] uppercase font-black tracking-widest">
              Sign in to track mastery and unlock analytics
            </p>
          </div>
        )}
      </main>

      <Footer />

      {/* Your centered Formula Modal with full screen frosted glass blur background */}
      <FormulaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}