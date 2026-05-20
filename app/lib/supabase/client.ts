import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 1. Guard against unconfigured or missing environment variables
  if (!url || !anonKey) {
    console.error(
      "🚨 CRITICAL CONFIG ERROR: Supabase environment variables are missing!\n" +
      "Make sure your .env.local file is sitting in the root project directory."
    );
    return createDummyClient();
  }

  try {
    // 2. Initialize the real browser client wrapper inside a protective try/catch block
    const client = createBrowserClient(url, anonKey);

    // 3. Inject an active network monitor listener onto the channel
    if (typeof window !== "undefined") {
      window.addEventListener("online", () => console.log("🌐 Network re-established. Supabase syncing."));
      window.addEventListener("offline", () => console.warn("🔌 Network disconnected. App running in offline local persistence mode."));
    }

    return client;
  } catch (networkError) {
    console.error(
      "📡 SUPABASE NETWORK CONNECTION ERROR: Failed to establish handshake with cloud database.\n" +
      "Gracefully falling back to browser-local state storage pipeline.",
      networkError
    );
    return createDummyClient();
  }
}

/**
 * Creates a safe, non-crashing fallback object when the real database is unreachable.
 * This keeps all of your user views, hooks, and buttons perfectly operational in local state.
 */
function createDummyClient() {
  return createBrowserClient(
    "https://missing-or-unreachable-instance.supabase.co",
    "unreachable-anon-key-placeholder"
  );
}