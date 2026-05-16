import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.error(
      "🚨 CRITICAL ERROR: Supabase environment variables are missing!\n" +
        "Make sure your .env.local file is in the root project directory (not inside the app folder) " +
        "and contains NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );

    // Return a dummy client with placeholder strings.
    // This allows the layout to load safely so Guest Mode can be used without a white screen of death.
    return createBrowserClient(
      "https://missing-env-vars.supabase.co",
      "missing-anon-key-placeholder",
    );
  }

  // If variables exist, initialize the real browser client normally
  return createBrowserClient(url, anonKey);
}