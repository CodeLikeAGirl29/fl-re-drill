import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { questions } from "../app/lib/questions";
import { flashcards } from "../app/lib/flashcards";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();

async function seed() {
  // Upload questions in batches of 500 (Firestore limit)
  console.log(`Uploading ${questions.length} questions...`);
  const qBatch = db.batch();
  for (const q of questions) {
    qBatch.set(db.collection("questions").doc(q.id), q);
  }
  await qBatch.commit();
  console.log(`✓ ${questions.length} questions uploaded`);

  // Upload flashcards
  console.log(`Uploading ${flashcards.length} flashcards...`);
  const fBatch = db.batch();
  for (const f of flashcards) {
    fBatch.set(db.collection("flashcards").doc(f.id), f);
  }
  await fBatch.commit();
  console.log(`✓ ${flashcards.length} flashcards uploaded`);

  console.log("✅ Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
