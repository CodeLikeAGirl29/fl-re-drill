"use server";

import { createClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateMastery(
  questionId: string,
  status: "mastered" | "review",
) {
  const supabase = await createClient();

  // 1. Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return { success: false, error: "You must be signed in to save progress." };
  }

  // 2. Upsert the mastery record
  const { error } = await supabase.from("user_mastery").upsert(
    {
      user_id: user.id,
      question_id: questionId,
      status,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,question_id" },
  );

  if (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to sync progress." };
  }

  // 3. Clear the cache for the results page so it shows fresh data
  revalidatePath("/results");
  return { success: true };
}

export async function getMasteryStats() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_mastery")
    .select("question_id, status");

  if (error) {
    console.error("Error fetching mastery:", error);
    return [];
  }

  return data;
}
