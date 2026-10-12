import { Anton, Barlow_Condensed, Inter } from "next/font/google";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminOrbField } from "@/components/admin/orb-field";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

// Tipografías del tema del panel interno (Coach Manager, MurphyIA), cargadas
// solo acá: no entran al bundle de ninguna otra ruta del sitio.
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const barlowCondensed = Barlow_Condensed({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// El proxy ya protege /admin/*, pero esta comprobación server-side es la que
// de verdad bloquea el render si alguien llega sin sesión (defensa en
// profundidad: el proxy puede saltarse en edge cases, el layout nunca).
export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div
      className={`admin-theme ${anton.variable} ${barlowCondensed.variable} ${inter.variable} min-h-screen relative`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      <AdminOrbField />

      <header className="relative z-10 flex items-center justify-between gap-4 px-6 py-4 border-b" style={{ borderColor: "var(--border)" }}>
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span
            className="flex items-center justify-center w-8 h-8 rounded-full text-sm"
            style={{
              background: "linear-gradient(135deg, var(--cm-violet-500), var(--cm-violet-600))",
              fontFamily: "var(--font-engagement), cursive",
            }}
          >
            JR
          </span>
          <span
            className="text-lg tracking-wide hidden sm:inline"
            style={{ fontFamily: "var(--font-anton), sans-serif" }}
          >
            CRM
          </span>
        </Link>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs sm:text-sm hidden md:inline" style={{ color: "var(--muted-foreground)" }}>
            {user.email}
          </span>
          <form action={signOut}>
            <Button type="submit" variant="outline" size="icon" aria-label="Cerrar sesión">
              <LogOut size={16} />
            </Button>
          </form>
        </div>
      </header>

      <main className="relative z-10 px-6 py-10">{children}</main>
    </div>
  );
}
