import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.error(
      "CRITICAL ERROR: Supabase environment variables are missing! Check your root .env.local file.",
    );
  }

  return createBrowserClient(url!, anonKey!);
}
