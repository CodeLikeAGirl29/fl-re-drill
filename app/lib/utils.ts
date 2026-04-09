import { Question, Category } from './questions';

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
export function shuffleQuestionOptions(question: any) {
  // Map options to objects tracking if they are the correct answer
  const indexedOptions = question.options.map((option: string, index: number) => ({
    text: option,
    isCorrect: index === question.correct,
  }));

  // Shuffle the options
  const shuffledOptions = shuffleArray(indexedOptions);

  return {
    ...question,
    options: shuffledOptions.map(o => o.text),
    // Find where the correct answer moved to
    correct: shuffledOptions.findIndex(o => o.isCorrect)
  };
}

/**
 * Returns a subset of questions based on a specific category.
 */
export function filterByCategory(questions: Question[], category: Category | "All"): Question[] {
  if (category === "All") return questions;
  return questions.filter((q) => q.cat === category);
}

/**
 * Gets a unique list of all categories currently present in your questions data.
 */
export function getUniqueCategories(questions: Question[]): string[] {
  const cats = questions.map(q => q.cat);
  return Array.from(new Set(cats)).sort();
}