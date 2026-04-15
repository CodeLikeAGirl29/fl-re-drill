# 🏠 Florida Real Estate Master Drill

A high-performance, interactive exam preparation engine built for Florida Real Estate candidates. This application transforms dry state exam material into a fast, fluid, and high-retention learning experience specifically aligned with the **Pearson VUE Florida State Exam** requirements.

> **View the Live Project:** [fl-re-drill.vercel.app](https://fl-re-drill.vercel.app/)

<img src="https://res.cloudinary.com/dhw9dl4gm/image/upload/v1775939262/Florida_Real_Estate_Exam_Prep___Master_Drill_2_c4dsvm.gif" width="100%" alt="Florida Real Estate Drill Demo" />

-----

## 🚀 Key Features

  * **⚡ Quick 20 Session:** High-impact "flash" study mode that shuffles and slices the bank into 20 random questions—perfect for rapid review on the go.
  * **🎯 Pearson VUE Alignment:** 146+ questions categorized into the official state exam sections (License Law, Agency, Appraisal, etc.) for targeted drilling.
  * **🖱️ Neobrutalist UI:** A sharp, "Cyberpunk" aesthetic featuring tactile 3D hover effects, glowing progress indicators, and a responsive layout.
  * **⌨️ Keyboard-First Navigation:** Optimized for speed-running drills:
      * **[1, 2, 3, 4]**: Select answer.
      * **[M]**: Toggle "Mark for Review" status.
      * **[Enter]**: Advance to next question.
  * **🚩 Mark for Review & Final Audit:** Skip difficult questions and flag them. Use the dedicated **Review Screen** to jump back and change answers before final submission.
  * **🔁 Intelligent Persistence:** Robust `localStorage` synchronization using **Lazy Initialization**. Resuming a session perfectly restores your score, timer, marked flags, and question subset.
  * **🧮 Integrated Toolkit:**
      * **Quiz Calculator:** Specialized math tool with high-legibility monospace formatting.
      * **Formula Cheat Sheet:** Instant access to Florida-specific taxes (Doc Stamps, Intangible Tax) and acreage constants.

-----

## 🛠️ Technical Upgrades & Optimization

We moved beyond the prototype phase by implementing professional-grade patterns:

  * **Next.js 15 Ready:** Fully compatible with the latest Next.js 15 standards, including asynchronous `searchParams` and `props` handling.
  * **Zero "Cascading Renders":** Optimized React state management using the `key` prop strategy to reset component states instantly without unnecessary re-renders.
  * **Lighthouse Optimized:**
      * **FCP Improvements:** Implemented `font-display: swap` to eliminate FOIT (Flash of Invisible Text).
      * **Layout Shift Mitigation:** Sized-adjusted Google Font configurations to prevent content jumping.
  * **Full Type Safety:** 100% TypeScript coverage with strict interfaces for all data structures, eliminating "any" types and runtime crashes.
  * **Accessibility (A11y):** ARIA-compliant labeling, linked form IDs, and keyboard-focus management for screen-reader compatibility.

-----

## 📁 Architecture (Colocation Pattern)

```text
app/
├── components/      
│   ├── quiz/       # QuestionCard, ResultsView, ScoreChart
│   ├── Welcome/     # WelcomeScreen with "Quick 20" logic
│   └── tools/       # QuizCalculator, FormulaModal
├── hooks/           # useTimer (Optimized precision tracking)
├── lib/             
│   ├── questions.ts # The 146-Question Pearson VUE Bank
│   └── utils.ts     # Double-Shuffle logic & Category extractors
├── globals.css      # Tailwind v4 & Cyberpunk UI Utilities
└── layout.tsx       # Metadata API & Next.js Font Optimization
```

-----

## 📐 Mathematical Formulas Included

The integrated **FormulaModal** provides instant access to:

  * **Deed Stamps:** `(Price / 100) * $0.70` (Automatic rounding logic)
  * **Note Stamps:** `(New/Assumed Debt / 100) * $0.35`
  * **Intangible Tax:** `New Mortgage * $0.002` (No rounding required)
  * **Acreage:** `43,560` Square Feet
  * **The IRV Circle:** `Income = Rate × Value`

-----

## 🗺️ Roadmap

  - [x] **Quick 20 Mode:** Randomized mini-sessions.
  - [ ] **Timed Mock Exam:** 3.5-hour simulation with zero feedback until completion.
  - [ ] **Supabase Sync:** Cross-device progress saving via user accounts.
  - [ ] **Performance Analytics:** Historical charts for score improvement tracking.

-----

## -ˋˏ✄┈┈┈┈────⋆⋅☆⋅⋆──┈──┈──┈──

### 🤝 Support & Contribution

If you're a Florida Real Estate instructor or student and want to contribute more questions:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

**Author:** [Lindsey Howard](http://linkedin.com/in/lindsey-howard)  
**License:** © 2026 RE Master Drill - Proprietary Study Tool