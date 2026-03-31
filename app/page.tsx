import QuizContainer from './components/QuizContainer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <QuizContainer />

      <footer className="mt-auto py-10 opacity-30 text-white text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">
          © 2026 FL Real Estate Master Drill
        </p>
      </footer>
    </main>
  );
}