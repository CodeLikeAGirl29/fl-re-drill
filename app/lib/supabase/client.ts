// app/lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

// Module-level guard so network listeners bind exactly once for the page
// lifetime, instead of re-adding on every createClient() call.
let netListenersBound = false;

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 1. Guard against unconfigured or missing environment variables
  if (!url || !anonKey) {
    console.error(
      "CONFIG ERROR: Supabase environment variables are missing.\n" +
        "Make sure your .env.local file is in the root project directory."
    );
    return createDummyClient();
  }

  try {
    // 2. Initialize the real browser client inside a protective try/catch
    const client = createBrowserClient(url, anonKey);

    // 3. Bind network monitor listeners once
    if (typeof window !== "undefined" && !netListenersBound) {
      netListenersBound = true;
      window.addEventListener("online", () =>
        console.log("Network re-established. Supabase syncing.")
      );
      window.addEventListener("offline", () =>
        console.warn("Network disconnected. Running in offline mode.")
      );
    }

    return client;
  } catch (networkError) {
    console.error(
      "SUPABASE CONNECTION ERROR: Failed to reach the cloud database.\n" +
        "Falling back to a non-crashing placeholder client.",
      networkError
    );
    return createDummyClient();
  }
}

/**
 * Creates a safe, non-crashing fallback when the real database is unreachable.
 * Calls against it will fail gracefully rather than throwing, keeping the UI
 * (views, hooks, buttons) operational in local state.
 */
function createDummyClient() {
  return createBrowserClient(
    "https://missing-or-unreachable-instance.supabase.co",
    "unreachable-anon-key-placeholder"
  );
}
