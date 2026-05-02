# 🏠 Florida Real Estate Master Drill

A high-performance, interactive exam preparation engine built for Florida Real Estate candidates. This application transforms dry state exam material into a fast, fluid, and high-retention learning experience specifically aligned with the **Pearson VUE Florida State Exam** requirements.

> **View the Live Project:** [redrill.netlify.app](https://fl-re-drill.netlify.app/)

<img src="https://res.cloudinary.com/dhw9dl4gm/image/upload/v1777312428/Florida-Real-Estate-Exam-Prep-Master-Drill-04-27-2026_12_52_PM_gwzkqo.png" width="100%" alt="Florida Real Estate Drill Demo" />

-----

## 🚀 Key Features

* **⚡ Quick 20 Session:** High-impact "flash" study mode that shuffles and slices the bank into 20 random questions—perfect for rapid review on the go.
* **🎯 Pearson VUE Alignment:** 100+ precision-engineered questions categorized into official state exam sections (License Law, Agency, Appraisal, etc.).
* **🖱️ Neobrutalist UI:** A sharp, "Cyberpunk" aesthetic featuring tactile 3D hover effects, glowing progress indicators, and a responsive layout.
* **⌨️ Keyboard-First Navigation:** Optimized for speed-running drills:
    * **[1, 2, 3, 4]**: Select answer.
    * **[M]**: Toggle "Mark for Review" status.
    * **[Enter]**: Advance to next question.
* **🚩 Non-Linear Review & Final Audit:** Skip difficult items and flag them. The **Review Engine** allows users to jump directly to flagged items and return to the audit screen instantly after correction—mimicking official Pearson VUE testing software.
* **🔁 Intelligent Persistence:** Robust `localStorage` synchronization using **Lazy Initialization**. Resuming a session perfectly restores your score, timer, marked flags, and question subset.

-----

## 🛠️ Technical Upgrades & Optimization

* **Next.js 15 & React 19:** Fully compatible with the latest Next.js 15 standards, including asynchronous `searchParams` and the new React `use` patterns.
* **Zero "Cascading Renders":** Optimized state management using the `key` prop strategy and `useCallback` memoization to ensure UI transitions are sub-16ms.
* **Modernizr Integration:** Implemented custom browser feature detection to ensure "Cyberpunk" clip-path dividers and CSS-grid layouts degrade gracefully on older devices.
* **Lighthouse Optimized:**
    * **FCP/LCP:** Leveraging Next.js `Script` strategy (`beforeInteractive`) for critical utilities.
    * **CLS Mitigation:** Sized-adjusted Google Font configurations to prevent content jumping during hydration.
* **Full Type Safety:** 100% TypeScript coverage with strict interfaces for the `Question` and `Category` types, eliminating runtime crashes during complex math calculations.

-----

## 📁 Architecture (Colocation Pattern)

```text
app/
├── components/       
│   ├── quiz/        # QuestionCard, ResultsView, ScoreChart (Chart.js 2)
│   ├── Welcome/     # Category selection & "Quick 20" logic
│   └── tools/       # QuizCalculator, FormulaModal (Math-heavy logic)
├── hooks/           # useQuiz (State Machine), useTimer (Precision tracking)
├── lib/             
│   ├── questions.ts # The Pearson VUE Bank (JSON-formatted)
│   └── utils.ts     # Double-Shuffle & Linear-to-Review navigation logic
├── globals.css      # Tailwind v4 & Neobrutalist Utility Classes
└── layout.tsx       # Modernizr injection & Metadata API
```

-----

## 📐 Mathematical Formulas Included

The integrated **FormulaModal** provides instant access to:

* **Deed Stamps:** `(Price / 100) * $0.70` (Automatic rounding logic)
* **Note Stamps:** `(Debt / 100) * $0.35`
* **Intangible Tax:** `New Mortgage * $0.002`
* **Acreage:** `43,560` Square Feet
* **The IRV Circle:** `Income = Rate × Value`

-----

## 🗺️ Roadmap

- [x] **Quick 20 Mode:** Randomized mini-sessions.
- [x] **Review Jump Logic:** Non-linear navigation for flagged items.
- [ ] **Timed Mock Exam:** 3.5-hour simulation with zero feedback until completion.
- [ ] **Supabase Sync:** Cross-device progress saving via user accounts.

-----

### 🤝 Support & Contribution

If you're a Florida Real Estate instructor or student and want to contribute more questions:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Open a Pull Request

**Author:** [Lindsey Howard](http://linkedin.com/in/lindsey-howard)  
**License:** © 2026 RE Master Drill - Proprietary Study Tool