"use server";

import { createClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Define the interface so other components can import it
export interface MasteryRecord {
  question_id: string;
  status: "mastered" | "review";
}

export async function updateMastery(
  questionId: string,
  status: "mastered" | "review",
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase.from("user_mastery").upsert(
    {
      user_id: user.id,
      question_id: questionId,
      status,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,question_id" },
  );

  if (error) throw error;

  // Revalidates the cache so the Dashboard stats update immediately
  revalidatePath("/");
}

export async function getMasteryStats(): Promise<MasteryRecord[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_mastery")
    .select("question_id, status");

  if (error) {
    console.error("Mastery Fetch Error:", error);
    return [];
  }

  return data as MasteryRecord[];
}
