# 🏠 Florida Real Estate Master Drill

A high-performance, interactive exam preparation engine built for Florida Real Estate candidates. This application transforms dry state exam material into a fast, fluid, and high-retention learning experience specifically aligned with the Pearson VUE Florida State Exam requirements.

> view the project [here](https://fl-re-drill.vercel.app/)

<img src="https://res.cloudinary.com/dhw9dl4gm/image/upload/v1775939262/Florida_Real_Estate_Exam_Prep___Master_Drill_2_c4dsvm.gif" width="100%" alt="Florida Real Estate Drill Demo">

-----

## 🚀 The Experience

  * **🎯 Pearson VUE Alignment:** Questions are categorized into the 13 official state exam sections (License Law, Agency, Appraisal, etc.), allowing for targeted focus on weak areas.
  * **⚡ Keyboard-First Navigation:** Optimized for rapid-fire studying with built-in shortcuts:
      * **[1] [2] [3] [4]**: Select the corresponding answer choice.
      * **[M]**: Toggle "Mark for Review" status.
      * **[Enter]**: Advance to the next question.
  * **🚩 Mark for Review & Final Audit:** Skip difficult questions and flag them for later. A dedicated **Review Screen** appears at the end of the drill, allowing you to jump back to any specific question before final submission.
  * **🔁 Intelligent Persistence:** Built-in `localStorage` synchronization. If a user closes their browser mid-drill, they can resume their exact score, time, marked questions, and question index.
  * **🧮 Integrated Toolkit:** * **Quiz Calculator:** A specialized math tool using the **Anonymous Pro** font for a high-legibility terminal feel.
      * **Formula Cheat Sheet:** Instant access to Florida-specific taxes (Doc Stamps, Intangible Tax) and acreage formulas.
  * **Styled Feedback:** Explanations are color-coded for visual retention:
      * <strong style="color: #06b6d4;">Key Points:</strong> Crucial theory and law.
      * <strong style="color: #c084fc;">Calculations:</strong> Step-by-step math breakdowns.
      * <strong style="color: #fb7185;">Corrections:</strong> Clarification on common misconceptions.

-----

## 🛠️ Architecture (Colocation Pattern)

This project uses the **Next.js App Router** with a colocated folder structure for maximum maintainability:

```text
app/
├── components/     
│   ├── quiz/       # QuestionCard, ResultsView, NavigationGrid
│   ├── Welcome/    # WelcomeScreen with Category Filtering
│   └── tools/      # QuizCalculator, FormulaModal
├── hooks/          # Logic (useTimer for tracking exam duration)
├── lib/            
│   ├── questions.ts # The 146-Question Pearson VUE Bank
│   └── utils.ts     # Double-Shuffle logic & Category extractors
├── globals.css     # Tailwind v4 & custom scrollbar logic
└── page.tsx        # Root entry point
```

-----

## ⚡ Quick Start

1.  **Clone & Install:**

    ```bash
    git clone [https://github.com/codelikeagirl29/fl-re-drill.git](https://github.com/codelikeagirl29/fl-re-drill.git)
    cd fl-re-drill
    npm install
    ```

2.  **Run Development Server:**

    ```bash
    npm run dev
    ```

-----

## 📐 Mathematical Formulas Included

The integrated **FormulaModal** provides instant access to:

  * **Deed Stamps:** (Price / 100) * $0.70 (Rounding up logic included)
  * **Note Stamps:** (New/Assumed Debt / 100) * $0.35
  * **Intangible Tax:** New Mortgage * $0.002
  * **Acreage:** 43,560 Square Feet
  * **Commission Net:** (Target + Costs) / (100% - Comm %)

-----

## 🗺️ Future Roadmap

  - [ ] **Timed Mock Exam:** A strict 3.5-hour simulation of the 100-question state test with zero rationale feedback until the end.
  - [ ] **Performance Dashboard:** Persistent history charts showing score trends over time.
  - [ ] **Supabase Integration:** Sync progress across devices via a user account.
  - [ ] **Dark Mode Toggle:** Native OS-level theme switching.

-----

## 🤝 Support & Contribution

If you're a Florida Real Estate instructor or student and want to contribute more questions or improve the logic:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

**Author:** [Lindsey Howard](http://linkedin.com/in/lindsey-howard)  
**License:** © 2026 RE Master Drill - Proprietary Study Tool