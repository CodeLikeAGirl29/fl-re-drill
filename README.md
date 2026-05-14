# 🏠 Florida Real Estate Master Drill

A high-performance, interactive exam preparation engine built for Florida Real Estate candidates. This application transforms dry state exam material into a fast, fluid, and high-retention learning experience specifically aligned with the **Pearson VUE Florida State Exam** requirements.

[![CodeFactor](https://www.codefactor.io/repository/github/codelikeagirl29/fl-re-drill/badge)](https://www.codefactor.io/repository/github/codelikeagirl29/fl-re-drill)

> **View the Live Project:** [fl-re-drill.netlify.app](https://fl-re-drill.netlify.app/)

<img src="https://res.cloudinary.com/dhw9dl4gm/image/upload/v1777312428/Florida-Real-Estate-Exam-Prep-Master-Drill-04-27-2026_12_52_PM_gwzkqo.png" width="100%" alt="Florida Real Estate Drill Demo" />

-----

🚀 Key Features
🎴 Swipe-to-Master Flashcards: A Framer Motion-powered 3D flashcard engine. Swipe Right to mark as Mastered or Left for Review—perfect for tactile, rapid-fire learning.

📊 Performance Analytics: Real-time data visualization of your mastery across four key domains: Law, Principles, Brokerage, and Finance.

⚡ Quick 20 Session: High-impact "flash" study mode that shuffles and slices the bank into 20 random questions.

⌨️ Keyboard-First Navigation: Optimized for speed-running multiple-choice drills:

[1, 2, 3, 4]: Select answer | [M]: Toggle Flag | [Enter]: Advance.

🎖️ Dynamic Candidate Ranking: Gamified progression system that promotes you from Novice to Master based on your live database stats.

🔁 Full-Stack Persistence: Integrated with Supabase & Next.js Server Actions. Your progress, marked items, and domain mastery are synced to your account in real-time.

🛠️ Technical Upgrades & Optimization
Next.js 15 (Server Actions): Leveraging 'use server' for secure database upserts and revalidatePath for instant UI cache purging.

Supabase & RLS: Secure user data architecture using PostgreSQL and Row Level Security to ensure candidate progress is private and persistent.

Framer Motion 12: High-fidelity animations including 3D card flips, spring-physics dragging, and SVG drawing for the mastery progress rings.

Lighthouse Optimized: * CLS Mitigation: Size-adjusted font configurations and skeleton-loading states for data-heavy dashboard views.

Full Type Safety: 100% TypeScript coverage with strict interfaces for MasteryRecord, FlashcardData, and User contexts.

📁 Architecture (Colocation Pattern)
```
fl-re-drill/
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── app/
│   ├── (auth)/
│   │   ├── auth-code-error/
│   │   │   └── page.tsx
│   │   └── login/
│   │       └── page.tsx
│   ├── api/
│   │   └── auth/
│   │       └── callback/
│   │           └── route.ts
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── Flashcard.tsx
│   │   ├── FlashcardContainer.tsx
│   │   ├── Footer.tsx
│   │   ├── FormulaModal.tsx
│   │   ├── Header.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── QuizCalculator.tsx
│   │   ├── QuizContainer.tsx
│   │   ├── WelcomeScreen.tsx
│   │   ├── dashboard/
│   │   │   ├── AnalyticsView.tsx
│   │   │   └── ChecklistView.tsx
│   │   └── quiz/
│   │       ├── DiamondDivider.tsx
│   │       ├── QuestionCard.tsx
│   │       ├── QuizCard.tsx
│   │       ├── ResultsView.tsx
│   │       └── ScoreChart.tsx
│   ├── globals.css
│   ├── hooks/
│   │   ├── useQuiz.tsx
│   │   └── useTimer.ts
│   ├── icon.svg
│   ├── layout.tsx
│   ├── lib/
│   │   ├── actions/
│   │   │   └── mastery.ts
│   │   ├── flashcards.ts
│   │   ├── formula-data.tsx
│   │   ├── questions.ts
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── middleware.ts
│   │   │   └── server.ts
│   │   └── utils.ts
│   ├── middleware.ts
│   └── page.tsx
├── eslint.config.mjs
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── tailwind.config.js
└── tsconfig.json
```

📐 Mathematical Formulas Included
The integrated FormulaModal provides instant access to:

Deed Stamps: (Price / 100) * $0.70

Intangible Tax: New Mortgage * $0.002

The IRV Circle: Income = Rate × Value

Acreage: 43,560 Square Feet

🗺️ Roadmap
[x] Flashcard Mode: Tactile 3D swipe interface.

[x] Supabase Sync: Persistent cross-device mastery tracking.

[x] Analytics Suite: Live domain performance charts.

[ ] Timed Mock Exam: 3.5-hour simulation with zero feedback until completion.

[ ] Voice-to-Term: AI-powered term definitions for hands-free study.

🤝 Support & Contribution
Author: Lindsey Howard

License: © 2026 RE Master Drill - Proprietary Study Tool