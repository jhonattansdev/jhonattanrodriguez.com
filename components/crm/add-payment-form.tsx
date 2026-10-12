import { addPayment } from "@/app/admin/(protected)/clientes/actions";
import { DateField } from "@/components/admin/date-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEFAULT_COP_USD_RATE, getAllPlanOptions } from "@/lib/crm-types";

const nativeSelectClass =
  "border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm dark:bg-input/30";

export function AddPaymentForm({ clientId }: { clientId: string }) {
  const planOptions = getAllPlanOptions();
  const growthOptions = planOptions.filter((o) => o.group === "Growth");
  const filmOptions = planOptions.filter((o) => o.group === "Filmmaker");

  return (
    <form action={addPayment.bind(null, clientId)} className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="plan_id">Plan</Label>
        <select id="plan_id" name="plan_id" required defaultValue="" className={nativeSelectClass}>
          <option value="" disabled>
            Elegir plan
          </option>
          <optgroup label="Growth">
            {growthOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label} · {option.priceCop} / {option.priceUsd}
              </option>
            ))}
          </optgroup>
          <optgroup label="Filmmaker">
            {filmOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label} · {option.priceCop} / {option.priceUsd}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="currency">Moneda</Label>
        <select id="currency" name="currency" defaultValue="COP" className={nativeSelectClass}>
          <option value="COP">COP</option>
          <option value="USD">USD</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Monto</Label>
        <Input id="amount" name="amount" type="number" step="0.01" min="0.01" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="exchange_rate">Tasa COP → USD</Label>
        <Input
          id="exchange_rate"
          name="exchange_rate"
          type="number"
          step="0.01"
          min="0.01"
          defaultValue={DEFAULT_COP_USD_RATE}
        />
        <p className="text-xs text-muted-foreground">Solo se usa si la moneda es COP.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="payment_method">Método de pago</Label>
        <Input id="payment_method" name="payment_method" placeholder="Transferencia, tarjeta…" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="paid_at">Fecha</Label>
        <DateField id="paid_at" name="paid_at" defaultValue={new Date().toISOString().slice(0, 10)} />
      </div>

      <SubmitButton className="sm:col-span-2" pendingText="Agregando...">
        Agregar pago
      </SubmitButton>
    </form>
  );
}
