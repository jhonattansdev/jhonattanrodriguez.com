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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/admin/submit-button";
import { CLIENT_STAGES, CLIENT_STAGE_LABELS } from "@/lib/crm-types";
import { createClientRecord } from "@/app/admin/(protected)/clientes/actions";

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
            <Select name="stage" defaultValue="prospecto">
              <SelectTrigger id="stage" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CLIENT_STAGES.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {CLIENT_STAGE_LABELS[stage]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
