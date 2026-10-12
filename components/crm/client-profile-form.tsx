import { updateClientRecord } from "@/app/admin/(protected)/clientes/actions";
import { SubmitButton } from "@/components/admin/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CLIENT_STAGES, CLIENT_STAGE_LABELS, type Client } from "@/lib/crm-types";

export function ClientProfileForm({ client }: { client: Client }) {
  return (
    <form action={updateClientRecord.bind(null, client.id)} className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="name">Nombre (usuario o empresa)</Label>
        <Input id="name" name="name" defaultValue={client.name} required />
      </div>

      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="objective">Objetivo a cumplir</Label>
        <Textarea id="objective" name="objective" rows={2} defaultValue={client.objective ?? ""} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Número de contacto</Label>
        <Input id="phone" name="phone" type="tel" defaultValue={client.phone ?? ""} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input id="email" name="email" type="email" defaultValue={client.email ?? ""} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Ubicación geográfica</Label>
        <Input id="location" name="location" defaultValue={client.location ?? ""} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Rol / profesión</Label>
        <Input id="role" name="role" defaultValue={client.role ?? ""} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="niche">Nicho</Label>
        <Input id="niche" name="niche" defaultValue={client.niche ?? ""} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="stage">Etapa</Label>
        <Select name="stage" defaultValue={client.stage}>
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

      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="notes">Notas internas</Label>
        <Textarea id="notes" name="notes" rows={3} defaultValue={client.notes ?? ""} />
      </div>

      <SubmitButton className="sm:col-span-2" pendingText="Guardando...">
        Guardar cambios
      </SubmitButton>
    </form>
  );
}
