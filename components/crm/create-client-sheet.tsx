"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/admin/submit-button";
import { CLIENT_STAGES, CLIENT_STAGE_LABELS } from "@/lib/crm-types";
import { createClientRecord } from "@/app/admin/(protected)/clientes/actions";

const nativeSelectClass =
  "border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm dark:bg-input/30";

export function CreateClientSheet() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Nuevo cliente</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Nuevo cliente</SheetTitle>
          <SheetDescription>
            El código corto se genera solo al guardar.
          </SheetDescription>
        </SheetHeader>

        <form action={createClientRecord} className="flex flex-col gap-4 px-4 pb-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre (usuario o empresa)</Label>
            <Input id="name" name="name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="objective">Objetivo a cumplir</Label>
            <Textarea id="objective" name="objective" rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Número de contacto</Label>
            <Input id="phone" name="phone" type="tel" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input id="email" name="email" type="email" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Ubicación geográfica</Label>
            <Input id="location" name="location" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Rol / profesión</Label>
            <Input id="role" name="role" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="niche">Nicho</Label>
            <Input id="niche" name="niche" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stage">Etapa</Label>
            <select id="stage" name="stage" defaultValue="prospecto" className={nativeSelectClass}>
              {CLIENT_STAGES.map((stage) => (
                <option key={stage} value={stage}>
                  {CLIENT_STAGE_LABELS[stage]}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas internas</Label>
            <Textarea id="notes" name="notes" rows={3} />
          </div>

          <SubmitButton className="mt-2" pendingText="Creando...">
            Crear cliente
          </SubmitButton>
        </form>
      </SheetContent>
    </Sheet>
  );
}
