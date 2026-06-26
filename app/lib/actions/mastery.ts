"use server";

import { adminAuth, adminDb, FieldValue } from "@/lib/firebase/admin";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

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

async function getVerifiedUid(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("firebase-token")?.value;
    if (!token) return null;
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded.uid;
  } catch {
    return null;
  }
}

export async function updateMastery(
  questionId: string,
  status: "mastered" | "review"
) {
  const uid = await getVerifiedUid();
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

export async function updateCategoryStat(category: string, isCorrect: boolean) {
  const uid = await getVerifiedUid();
  console.log("updateCategoryStat called:", { category, isCorrect, uid });
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

export async function getMasteryStats(): Promise<MasteryRecord[]> {
  const uid = await getVerifiedUid();
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

export async function getCategoryStats(): Promise<CategoryStat[]> {
  const uid = await getVerifiedUid();
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
