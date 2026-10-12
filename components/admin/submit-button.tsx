"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";

/** Botón de submit que se deshabilita mientras la Server Action está en curso, para que un doble clic no dispare la acción dos veces (ej. crear el mismo cliente por duplicado). */
export function SubmitButton({
  children,
  pendingText,
  ...props
}: ComponentProps<typeof Button> & { pendingText?: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? (pendingText ?? "Guardando...") : children}
    </Button>
  );
}
