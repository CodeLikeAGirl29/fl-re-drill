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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [supabase] = useState(() => createClient());

  useEffect(() => {
    const load = async (u: User | null) => {
      setUser(u);
      setMasteryStats(u ? await getMasteryStats() : []);
    };

    supabase.auth.getUser().then(({ data }) => load(data.user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      load(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleAnswerUpdate = async (questionId: string, isCorrect: boolean) => {
    if (!user) return;
    await updateMastery(questionId, isCorrect ? "mastered" : "review");
    setMasteryStats(await getMasteryStats());
  };

  const handleExit = async () => {
    setActiveMode(null);
    if (user) setMasteryStats([...(await getMasteryStats())]);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header
        onOpenFormulas={() => setIsModalOpen(true)}
        onHome={() => setActiveMode(null)}
      />

      <main className="flex-grow flex items-center justify-center p-4">
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
            <WelcomeScreen
              onStart={() => setActiveMode("standard")}
              onNew={(category, count) => {
                setSelectedCategory(category);
                setActiveMode(count === 20 ? "quick20" : "standard");
              }}
              onWeakestDrill={() => setActiveMode("weakest")}
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
      <FormulaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
