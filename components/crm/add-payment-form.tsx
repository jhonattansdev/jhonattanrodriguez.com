"use client";

import { useState } from "react";
import { addPayment } from "@/app/admin/(protected)/clientes/actions";
import { DateField } from "@/components/admin/date-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEFAULT_COP_USD_RATE, getAllPlanOptions, type PaymentCurrency } from "@/lib/crm-types";

export function AddPaymentForm({ clientId }: { clientId: string }) {
  const planOptions = getAllPlanOptions();
  const growthOptions = planOptions.filter((o) => o.group === "Growth");
  const filmOptions = planOptions.filter((o) => o.group === "Filmmaker");
  const [currency, setCurrency] = useState<PaymentCurrency>("COP");

  return (
    <form action={addPayment.bind(null, clientId)} className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="plan_id">Plan</Label>
        <Select name="plan_id" required>
          <SelectTrigger id="plan_id" className="w-full">
            <SelectValue placeholder="Elegir plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Growth</SelectLabel>
              {growthOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label} · {option.priceCop} / {option.priceUsd}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Filmmaker</SelectLabel>
              {filmOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label} · {option.priceCop} / {option.priceUsd}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="currency">Moneda</Label>
        <Select name="currency" value={currency} onValueChange={(value) => setCurrency(value as PaymentCurrency)}>
          <SelectTrigger id="currency" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="COP">COP</SelectItem>
            <SelectItem value="USD">USD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Monto</Label>
        <Input id="amount" name="amount" type="number" step="0.01" min="0.01" required />
      </div>

      {currency === "COP" ? (
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
        </div>
      ) : null}

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
