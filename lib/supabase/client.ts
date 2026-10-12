import { createBrowserClient } from "@supabase/ssr";

/** Cliente de Supabase para Client Components (sesión vía cookies del navegador). */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
