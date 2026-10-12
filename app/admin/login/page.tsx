"use client";

import { useActionState } from "react";
import { ThemeImageBackground } from "@/components/home/theme-image-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { THEMES } from "@/lib/design-tokens";
import { signIn, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: THEMES.index.dark.bg }}
    >
      <ThemeImageBackground dark />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-16">
        <form action={formAction} className="w-full max-w-sm space-y-5">
          <div className="space-y-1 text-center">
            <h1
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif" }}
            >
              Panel interno
            </h1>
            <p className="text-sm text-muted-foreground">Acceso solo para administración.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" name="password" type="password" autoComplete="current-password" required />
          </div>

          {state.error ? (
            <p className="text-sm text-destructive" role="alert">
              {state.error}
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Entrando…" : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
