# 🏠 Florida Real Estate Master Drill

A high-performance, interactive exam preparation engine built for Florida Real Estate candidates. This application transforms dry state exam material into a fast, fluid, and high-retention learning experience.

view the project [here](https://fl-re-drill.vercel.app/)

-----

## 🚀 The Experience

  * **Zero-Latency Drills:** Questions are bundled locally for instant transitions. No loading spinners between questions.
  * **Intelligent Persistence:** Built-in `localStorage` synchronization. If a user closes their browser mid-drill, they can resume their exact score, time, and question index.
  * **Contextual Math Support:** A persistent **Formula Cheat Sheet** modal accessible at any time, specializing in Florida-specific taxes (Doc Stamps, Intangible Tax) and acreage.
  * **Styled Feedback:** Explanations aren't just text—they are formatted for retention:
      * \<strong style="color: \#2563eb;"\>Key Points:\</strong\> Crucial theory and law.
      * \<strong style="color: \#9333ea;"\>Calculations:\</strong\> Step-by-step math breakdowns.
  * **Modern UX:** A deep rose "Starburst" mesh gradient with glassmorphism UI cards and automatic "scroll-to-top" navigation.

-----

## 🛠️ Architecture (Colocation Pattern)

This project uses the **Next.js App Router** with a colocated folder structure for maximum maintainability:

```text
app/
├── components/     # UI Atoms (QuestionCard, FormulaModal, etc.)
├── hooks/          # Logic (useTimer for tracking exam duration)
├── lib/            # Data (The Florida Question Bank)
├── globals.css     # Tailwind v4 & Mesh Gradient logic
└── page.tsx        # Root entry point
```

-----

## ⚡ Quick Start

1.  **Clone & Install:**

    ```bash
    git clone https://github.com/codelikeagirl29/fl-re-drill.git
    cd fl-re-drill
    npm install
    ```

2.  **Run Development Server:**

    ```bash
    npm run dev
    ```

3.  **Build for Production:**

    ```bash
    npm run build
    ```

-----

## 📐 Mathematical Formulas Included

The integrated **FormulaModal** provides instant access to:

  * **Deed Stamps:** (Price / 100) \* $0.70 (Rounding up logic included)
  * **Note Stamps:** (New/Assumed Debt / 100) \* $0.35
  * **Intangible Tax:** New Mortgage \* $0.002
  * **Acreage:** 43,560 Square Feet
  * **Commission Net:** (Target + Costs) / (100% - Comm %)

-----

## 🗺️ Future Roadmap

  - [ ] **Category Filtering:** Toggle between Law, Principles, and Math specific drills.
  - [ ] **Timed Mock Exam:** A strict 3.5-hour simulation of the 100-question state test.
  - [ ] **Performance Analytics:** Charts showing which chapters the user is struggling with most.
  - [ ] **Supabase Integration:** Sync progress across devices via a user account.

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
