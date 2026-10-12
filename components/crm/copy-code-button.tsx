"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // Portapapeles no disponible (ej. sin permisos): no hay nada más que hacer acá.
        }
      }}
    >
      {copied ? "Copiado" : "Copiar código"}
    </Button>
  );
}
