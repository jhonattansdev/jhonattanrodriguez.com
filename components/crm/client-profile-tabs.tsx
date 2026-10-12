"use client";

import { useState } from "react";
import { deletePayment } from "@/app/admin/(protected)/clientes/actions";
import { Segmented } from "@/components/admin/segmented";
import { AddPaymentForm } from "@/components/crm/add-payment-form";
import { ClientProfileForm } from "@/components/crm/client-profile-form";
import { SessionsSection } from "@/components/crm/sessions-section";
import { Button } from "@/components/ui/button";
import { adminGlassCardClass, adminGlassCardStyle } from "@/lib/admin-layout";
import { resolvePlanLabel, type Client, type ClientPayment, type ClientSession } from "@/lib/crm-types";

function formatAmount(value: number, currency: string) {
  return `$${value.toLocaleString("es-CO", { maximumFractionDigits: 2 })} ${currency}`;
}

const TABS = [
  { value: "sesiones", label: "Sesiones" },
  { value: "perfil", label: "Perfil" },
  { value: "pagos", label: "Pagos" },
];

export function ClientProfileTabs({
  client,
  payments,
  sessions,
}: {
  client: Client;
  payments: ClientPayment[];
  sessions: ClientSession[];
}) {
  const [tab, setTab] = useState("perfil");

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <Segmented options={TABS} value={tab} onChange={setTab} />
      </div>

      {tab === "perfil" ? (
        <div className={`${adminGlassCardClass} p-6`} style={adminGlassCardStyle}>
          {/* key=updated_at: tras guardar, el formulario se remonta con los
              valores reales del servidor en vez de quedarse con el estado no
              controlado del textarea/inputs anteriores (si no, una segunda
              edición rápida puede perder el primer valor ya guardado). */}
          <ClientProfileForm key={client.updated_at} client={client} />
        </div>
      ) : null}

      {tab === "pagos" ? (
        <div className={`${adminGlassCardClass} p-6`} style={adminGlassCardStyle}>
          {payments.length ? (
            <ul className="space-y-2 mb-6">
              {payments.map((payment) => {
                const planTitle = resolvePlanLabel(payment.plan_id);
                return (
                  <li
                    key={payment.id}
                    className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <div>
                      <p className="font-medium">{planTitle}</p>
                      <p style={{ color: "var(--muted-foreground)" }}>
                        {formatAmount(payment.amount, payment.currency)}
                        {payment.currency === "COP" ? ` → ${formatAmount(payment.amount_usd, "USD")}` : ""}
                        {" · "}
                        {payment.paid_at}
                        {payment.payment_method ? ` · ${payment.payment_method}` : ""}
                      </p>
                    </div>
                    {/* Eliminar pago solo desde escritorio: mismo margen de seguridad que las sesiones. */}
                    <form action={deletePayment.bind(null, payment.id, client.id)} className="hidden sm:block shrink-0">
                      <Button type="submit" variant="ghost" size="sm">
                        Eliminar
                      </Button>
                    </form>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>
              Todavía no hay pagos registrados.
            </p>
          )}

          <AddPaymentForm clientId={client.id} />
        </div>
      ) : null}

      {tab === "sesiones" ? <SessionsSection clientId={client.id} sessions={sessions} /> : null}
    </div>
  );
}
