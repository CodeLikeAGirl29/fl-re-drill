'use client';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import QuizContainer from './components/QuizContainer';
import FormulaModal from './components/FormulaModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onOpenFormulas={() => setIsModalOpen(true)} />
      <main className="flex-grow flex items-center justify-center p-4 pt-6">
        <QuizContainer />
      </main>
      <Footer />
      {/* The Modal lives here so it can be triggered from the Header */}
      <FormulaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}