"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./components/AuthProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import QuizContainer from "./components/quiz/QuizContainer";
import WelcomeScreen from "./components/quiz/WelcomeScreen";
import FormulaModal from "./components/FormulaModal";
import {
  updateMastery,
  updateCategoryStat,
  getMasteryStats,
  getCategoryStats,
  type MasteryRecord,
  type CategoryStat,
} from "@/app/lib/actions/mastery";

export default function Home() {
  const { user, loading } = useAuth();
  const [masteryStats, setMasteryStats] = useState<MasteryRecord[]>([]);
  const [activeMode, setActiveMode] = useState<
    "standard" | "quick20" | "flashcards" | "weakest" | null
  >(null);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([]);

  useEffect(() => {
    if (user) {
      getMasteryStats().then(setMasteryStats);
      getCategoryStats().then(setCategoryStats);
    } else {
      setMasteryStats([]);
      setCategoryStats([]);
    }
  }, [user]);

  const handleAnswerUpdate = async (questionId: string, isCorrect: boolean) => {
    if (!user) return;
    await updateMastery(questionId, isCorrect ? "mastered" : "review");
    const [mastery, cats] = await Promise.all([
      getMasteryStats(),
      getCategoryStats(),
    ]);
    setMasteryStats(mastery);
    setCategoryStats(cats);
  };

  const handleExit = async () => {
    setActiveMode(null);
    if (user) setMasteryStats([...(await getMasteryStats())]);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen font-sans">
        <Header
          onOpenFormulas={() => setIsModalOpen(true)}
          onHome={() => setActiveMode(null)}
        />
        <main className="flex-grow flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

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
            categoryStats={categoryStats}
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
