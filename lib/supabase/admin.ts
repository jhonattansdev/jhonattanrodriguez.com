import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Cliente con la secret key: salta RLS, acceso total. Solo para Server
 * Actions / Route Handlers del panel interno (único admin por ahora, ver
 * `proxy.ts`) — nunca importar desde un Client Component.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
