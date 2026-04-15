// ./lib/utils.ts
import { Question } from './questions';

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Shuffles the options array of a question and updates the 'correct' index 
 * so it still points to the right answer.
 */
export function shuffleQuestionOptions(question: Question): Question {
  // Map options to objects tracking if they are the correct answer
  const indexedOptions = question.options.map((option: string, index: number) => ({
    text: option,
    isCorrect: index === question.correct,
  }));

  // Shuffle the options
  const shuffledOptions = shuffleArray(indexedOptions);

  return {
    ...question,
    options: shuffledOptions.map(o => o.text) as [string, string, string, string],
    // Find where the correct answer moved to
    correct: shuffledOptions.findIndex(o => o.isCorrect) as 0 | 1 | 2 | 3,
    // Ensure we initialize or keep the marked status
    isMarked: question.isMarked ?? false
  };
}

/**
 * Returns a subset of questions based on a specific category.
 * Updated to use "All Categories" to match our WelcomeScreen state
 */
export function filterByCategory(questions: Question[], category: string): Question[] {
  if (category === "All Categories") return questions;
  return questions.filter((q) => q.cat === category);
}

/**
 * Gets a unique list of all categories currently present in your questions data.
 */
export function getUniqueCategories(questions: Question[]): string[] {
  const cats = questions.map(q => q.cat);
  // Using Array.from(new Set()) to ensure unique strings
  return Array.from(new Set(cats)).sort();
}