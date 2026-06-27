"use server";

import { adminAuth, adminDb, FieldValue } from "@/lib/firebase/admin";
import { revalidatePath } from "next/cache";

export interface MasteryRecord {
  question_id: string;
  status: "mastered" | "review";
}

export interface CategoryStat {
  category: string;
  correct: number;
  total: number;
  percent: number;
}

async function getUidFromToken(token: string): Promise<string | null> {
  console.log("getUidFromToken called, token length:", token.length);
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    console.log("token verified, uid:", decoded.uid);
    return decoded.uid;
  } catch (err) {
    console.error("verifyIdToken failed:", err);
    return null;
  }
}

export async function updateMastery(
  token: string,
  questionId: string,
  status: "mastered" | "review"
) {
  const uid = await getUidFromToken(token);
  if (!uid) return { success: false, error: "Unauthorized" };

  try {
    await adminDb
      .collection("user_mastery")
      .doc(uid)
      .collection("questions")
      .doc(questionId)
      .set(
        {
          question_id: questionId,
          status,
          updated_at: new Date().toISOString(),
        },
        { merge: true }
      );

    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    console.error("Database telemetry sync failed:", err);
    return { success: false, error: err.message };
  }
}

export async function updateCategoryStat(
  token: string,
  category: string,
  isCorrect: boolean
) {
  const uid = await getUidFromToken(token);
  if (!uid) return { success: false, error: "Unauthorized" };

  try {
    const ref = adminDb
      .collection("user_mastery")
      .doc(uid)
      .collection("categories")
      .doc(category);

    await ref.set(
      {
        category,
        correct: FieldValue.increment(isCorrect ? 1 : 0),
        total: FieldValue.increment(1),
      },
      { merge: true }
    );

    return { success: true };
  } catch (err: any) {
    console.error("Category stat sync failed:", err);
    return { success: false, error: err.message };
  }
}

export async function getMasteryStats(token: string): Promise<MasteryRecord[]> {
  const uid = await getUidFromToken(token);
  if (!uid) return [];

  try {
    const snapshot = await adminDb
      .collection("user_mastery")
      .doc(uid)
      .collection("questions")
      .get();

    return snapshot.docs.map((doc) => doc.data() as MasteryRecord);
  } catch (err) {
    console.error("Mastery Fetch Error:", err);
    return [];
  }
}

export async function getCategoryStats(token: string): Promise<CategoryStat[]> {
  const uid = await getUidFromToken(token);
  if (!uid) return [];

  try {
    const snapshot = await adminDb
      .collection("user_mastery")
      .doc(uid)
      .collection("categories")
      .get();

    return snapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        category: d.category,
        correct: d.correct ?? 0,
        total: d.total ?? 0,
        percent: d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0,
      };
    });
  } catch (err) {
    console.error("Category Stats Fetch Error:", err);
    return [];
  }
}

export async function getQuestions() {
  const snapshot = await adminDb.collection("questions").get();
  return snapshot.docs.map((doc) => doc.data());
}

export async function getFlashcards() {
  const snapshot = await adminDb.collection("flashcards").get();
  return snapshot.docs.map((doc) => doc.data());
}
