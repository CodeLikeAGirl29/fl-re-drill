import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Question } from "@/app/lib/questions";
import { FlashcardData } from "@/app/lib/flashcards";

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(query(collection(db, "questions")))
      .then((snap) => {
        const data = snap.docs.map((d) => d.data() as Question);
        setQuestions(data);
      })
      .catch((err) => console.error("Failed to load questions:", err))
      .finally(() => setLoading(false));
  }, []);

  return { questions, loading };
}

export function useFlashcards() {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(query(collection(db, "flashcards")))
      .then((snap) => {
        const data = snap.docs.map((d) => d.data() as FlashcardData);
        setFlashcards(data);
      })
      .catch((err) => console.error("Failed to load flashcards:", err))
      .finally(() => setLoading(false));
  }, []);

  return { flashcards, loading };
}
