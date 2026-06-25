"use server";

import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// Define the interface so other components can import it
export interface MasteryRecord {
  question_id: string;
  status: "mastered" | "review";
}

// Helper to verify the Firebase ID token from the cookie
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

  if (!uid) {
    return { success: false, error: "Unauthorized" };
  }

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

    // Revalidates the cache so the Dashboard stats update immediately
    revalidatePath("/");

    return { success: true };
  } catch (err: any) {
    console.error("Database telemetry sync failed:", err);
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
