import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// Next.js 16 renombró `middleware.ts` a `proxy.ts`; la función debe
// llamarse `proxy` (no `middleware`) para que el build la reconozca.
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
