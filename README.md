<h1 align="center"> 🏠 Florida Real Estate Master Drill </h1>

<p align="center"> Elevate your exam preparation with a sophisticated, data-driven mastery platform designed for the modern real estate professional. </p>

<p align="center">
  <img alt="Next" src="https://img.shields.io/badge/Next-black.svg?style=for-the-badge&logo=next.js&logoColor=white">
  <img alt="Tailwind" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
</p>
<!-- 
  **Note:** These are static placeholder badges. Replace them with your project's actual badges.
  You can generate your own at https://shields.io
-->

## 📌 Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Project Structure](#-project-structure)
- [Demo & Screenshots](#-demo--screenshots)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

### Hook
Florida Real Estate Master Drill is an interactive, high-performance web application designed to transform the grueling process of real estate exam preparation into a streamlined, analytical, and engaging learning experience.

### The Problem
> Aspiring real estate associates in Florida face one of the most rigorous licensing exams in the country. Traditional study methods—static textbooks and manual flashcards—often fail to provide the real-time feedback and performance analytics necessary to identify critical knowledge gaps. Students struggle to track their mastery over complex legal formulas, state-specific statutes, and the diverse mathematical calculations required to pass the state exam on the first attempt.

### The Solution
Florida Real Estate Master Drill bridges the gap between passive reading and active recall. By leveraging a modern React-based architecture, the platform provides a comprehensive suite of digital tools including interactive quiz containers, flipping flashcards with Framer Motion animations, and a centralized formula repository. It empowers users with real-time progress tracking, allowing them to visualize their scores through integrated charts and focus their efforts on the areas that matter most for exam success.

### Architecture Overview
The system is built upon a **Component-based Architecture** using **React 19** and **Next.js 16**. It utilizes a modular design pattern where UI logic is decoupled from data structures, ensuring scalability and maintainability. Styling is handled via **Tailwind CSS 4.0**, utilizing its latest beta features for ultra-efficient styling, while state management for quizzes and timers is encapsulated within custom React hooks.

---

## ✨ Key Features

### 🎯 Precision Quiz Engine
Experience a simulation of the actual exam environment. The `QuizContainer` and `QuestionCard` components work in tandem to deliver a seamless testing experience.
- **Dynamic Feedback:** Get instant results and visual cues on your performance.
- **Timed Sessions:** Use the integrated `useTimer` hook to build the stamina required for the timed state exam.
- **Categorized Drills:** Focus on specific sections of the Florida real estate curriculum.

### 🗂️ Active Recall Flashcards
Master terminology and statutes with interactive flashcards.
- **Tactile Interface:** High-fidelity flipping animations powered by Framer Motion.
- **Mastery Tracking:** Mark cards as mastered to filter your study sessions and focus on weaker areas.
- **Mobile Optimized:** Study on the go with a fully responsive `FlashcardContainer` designed for all screen sizes.

### 📊 Performance Analytics Dashboard
Stop guessing and start measuring. The `AnalyticsView` provides a data-driven look at your progress.
- **Score Visualization:** View your quiz trends over time with `ScoreChart`, utilizing `Chart.js` for professional-grade data presentation.
- **Completion Tracking:** Monitor your journey through the curriculum with the `ChecklistView` and integrated `ProgressBar`.
- **Mastery Levels:** Track individual topic mastery via the `mastery.ts` server actions.

### 🧮 Comprehensive Formula Sheet
Real estate math is often the biggest hurdle for candidates. Our dedicated `FormulaSheet` and `FormulaModal` provide:
- **Instant Access:** Quickly toggle a list of all essential Florida real estate formulas.
- **Structured Data:** Formulas are categorized by application (e.g., proration, commissions, investment analysis).
- **UI Integration:** Accessible from any screen via a sophisticated `Sheet` component.

### 💎 Polished User Interface
The application features a premium aesthetic defined by attention to detail.
- **Diamond Dividers:** Custom visual separators that provide a high-end, professional feel.
- **Advanced UI Components:** Built on a foundation of custom-styled badges, cards, and scroll areas for a native-app feel.
- **Responsive Design:** A fluid layout that transitions perfectly from desktop monitors to mobile devices.

---

## 🛠️ Tech Stack & Architecture

### Verified Technologies

| Technology | Purpose | Why it was Chosen |
| :--- | :--- | :--- |
| **React 19.2.6** | UI Library | Leverages the latest concurrent rendering features and improved hook performance for the quiz engine. |
| **Next.js 16.2.6** | Framework | Provides robust routing (App Router) and optimized server-side rendering for fast initial loads. |
| **Tailwind CSS 4.0.0-beta.8** | Styling | Utilizes the next generation of CSS-first styling for reduced bundle sizes and faster development. |
| **Framer Motion 11.18.2** | Animations | Delivers smooth, hardware-accelerated transitions for flashcards and modal interactions. |
| **Chart.js 4.5.1** | Data Visualization | Renders performant and interactive charts for student analytics and score tracking. |
| **TypeScript** | Type Safety | Ensures codebase reliability and reduces runtime errors in complex quiz logic. |
| **Lucide / Phosphor Icons** | Iconography | Provides a consistent and professional visual language throughout the interface. |

---

## 📁 Project Structure

```
CodeLikeAGirl29-fl-re-drill-0a08d63/
├── 📁 app/                         # Main application directory (App Router)
│   ├── 📁 (auth)/                  # Authentication routes
│   │   ├── 📁 login/               # User login page
│   │   └── 📁 auth-code-error/     # Error handling for auth flows
│   ├── 📁 api/                     # Server-side API endpoints
│   │   └── 📁 auth/                # Authentication callbacks
│   ├── 📁 components/              # Application-specific components
│   │   ├── 📁 dashboard/           # Views for analytics and checklists
│   │   ├── 📁 quiz/                # Logic for questions, results, and charts
│   │   ├── 📄 Flashcard.tsx        # Individual flashcard UI
│   │   ├── 📄 FormulaSheet.tsx     # Reference guide for real estate math
│   │   └── 📄 QuizContainer.tsx    # Wrapper for the core quiz logic
│   ├── 📁 hooks/                   # Custom React hooks (useTimer, useQuiz)
│   ├── 📁 lib/                     # Business logic and data
│   │   ├── 📁 actions/             # Server actions for mastery tracking
│   │   ├── 📁 supabase/            # Client and middleware configuration
│   │   ├── 📄 flashcards.ts        # Flashcard data and types
│   │   ├── 📄 questions.ts         # Question bank for drills
│   │   └── 📄 formula-data.tsx     # Mathematical formula definitions
│   ├── 📄 layout.tsx               # Root layout and providers
│   └── 📄 page.tsx                 # Main entry point (Landing/Dashboard)
├── 📁 components/                  # Shared UI components
│   └── 📁 ui/                      # Base components (Button, Card, Progress)
├── 📁 lib/                         # Shared utility functions
├── 📁 public/                      # Static assets and icons
├── 📄 tailwind.config.js           # Styling configuration
├── 📄 next.config.js               # Framework configuration
├── 📄 tsconfig.json                # TypeScript configuration
└── 📄 package.json                 # Project dependencies and scripts
```

---

## 📸 Demo & Screenshots

### 🖼️ Screenshots

<p align="center">
  <img src="https://res.cloudinary.com/dhw9dl4gm/image/upload/v1778958860/Florida-Real-Estate-Exam-Prep-Master-Drill-05-16-2026_02_10_PM_lcfeue.png" alt="Dashboard View" width="100%">
  <em><p align="center">Interactive Dashboard showing student progress and score analytics.</p></em>
</p>

<p align="center">
  <img src="https://res.cloudinary.com/dhw9dl4gm/image/upload/v1778958860/Florida-Real-Estate-Exam-Prep-Master-Drill-05-16-2026_02_11_PM_kmnpsc.png" alt="Quiz Interface" width="100%">
  <em><p align="center">The Precision Quiz Engine featuring real-time feedback, keyboard navigation, and countdown tracking.</p></em>
</p>

<p align="center">
  <img src="https://res.cloudinary.com/dhw9dl4gm/image/upload/v1778958860/Florida-Real-Estate-Exam-Prep-Master-Drill-05-16-2026_02_11_PM_1_aaakwn.png" alt="Quiz Feedback View" width="100%">
  <em><p align="center">Immediate evaluation view presenting contextual state statute explanations and grading metrics.</p></em>
</p>

---

## 🚀 Getting Started

### Prerequisites
- **Node.js:** Ensure you have the latest LTS version installed.
- **Package Manager:** `npm` (v9 or higher recommended).
- **Language:** Familiarity with TypeScript.

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/fl-re-drill.git
    cd fl-re-drill
    ```

2.  **Install Dependencies**
    Using the verified package manager:
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

4.  **Build for Production**
    ```bash
    npm run build
    npm run start
    ```

---

## 🔧 Usage

### Mastering the Dashboard
Upon entering the application, the `Dashboard.tsx` serves as your mission control. Switch between the `ChecklistView` to see which chapters you've completed and the `AnalyticsView` to see your performance metrics visualized via `ScoreChart`.

### Taking a Quiz
1.  Navigate to the **Quiz** section.
2.  The `QuizContainer` will initialize the `useQuiz` hook to load the question bank from `questions.ts`.
3.  Answer questions within the `QuestionCard`. Use the `Progress` bar at the top to track your completion.
4.  Upon finishing, the `ResultsView` will display a detailed breakdown of your score.

### Studying Flashcards
1.  Open the **Flashcards** module.
2.  Interact with the cards using click/tap gestures to flip and reveal answers.
3.  Use the categorization filters to focus on specific Florida Real Estate topics.

### Using the Formula Sheet
At any time during your study session, you can open the `FormulaModal`. This provides a non-intrusive `ScrollArea` containing all the mathematical formulas required for the Florida exam, from property tax calculations to net-to-seller formulas.

---

## 🤝 Contributing

We welcome contributions to improve Florida Real Estate Master Drill! Your input helps make this project better for everyone preparing for their licensing exam.

### How to Contribute

1. **Fork the repository** - Click the 'Fork' button at the top right of this page
2. **Create a feature branch** 
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes** - Improve code, documentation, or features
4. **Test thoroughly** - Ensure all UI components and hooks work as expected
   ```bash
   npm run lint
   ```
5. **Commit your changes** - Write clear, descriptive commit messages
   ```bash
   git commit -m 'Add: New mastery chart visualization'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request** - Submit your changes for review

### Development Guidelines
- ✅ Follow the existing code style using the provided `eslint.config.mjs`.
- 📝 Add comments for complex logic in hooks like `useTimer.ts`.
- 🎨 Ensure UI changes align with the existing Shadcn-based theme in `components/ui`.
- 📚 Update `flashcards.ts` or `questions.ts` if adding new curriculum content.

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.

### What this means:
- ✅ **Commercial use:** You can use this project commercially.
- ✅ **Modification:** You can modify the code for your own study tools.
- ✅ **Distribution:** You can distribute this software.
- ✅ **Private use:** You can use this project privately.
- ⚠️ **Liability:** The software is provided "as is", without warranty.
- ⚠️ **Trademark:** This license does not grant trademark rights.

---

<p align="center">Made with ❤️ for Future Florida Realtors</p>
<p align="center">
  <a href="#">⬆️ Back to Top</a>
</p>