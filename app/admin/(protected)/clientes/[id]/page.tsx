import Link from "next/link";
import { notFound } from "next/navigation";
import { Stat } from "@/components/admin/stat";
import { ClientProfileTabs } from "@/components/crm/client-profile-tabs";
import { CopyCodeButton } from "@/components/crm/copy-code-button";
import { DeleteClientButton } from "@/components/crm/delete-client-button";
import { adminGlassCardClass, adminGlassCardStyle } from "@/lib/admin-layout";
import { CLIENT_STAGE_LABELS, formatClientSinceDate, formatMinutes } from "@/lib/crm-types";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Client, ClientPayment, ClientSession } from "@/lib/crm-types";

export default async function ClientProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();

  const [{ data: client }, { data: payments }, { data: sessions }] = await Promise.all([
    supabase.from("clients").select("*").eq("id", id).single(),
    supabase.from("client_payments").select("*").eq("client_id", id).order("paid_at", { ascending: false }),
    supabase
      .from("client_sessions")
      .select("*")
      .eq("client_id", id)
      .order("session_number", { ascending: false }),
  ]);

  if (!client) notFound();

  const typedClient = client as Client;
  const typedPayments = (payments ?? []) as ClientPayment[];
  const typedSessions = (sessions ?? []) as ClientSession[];
  const totalUsd = typedPayments.reduce((sum, p) => sum + p.amount_usd, 0);
  const totalMinutes = typedSessions.reduce((sum, s) => sum + (s.duration_minutes ?? 0), 0);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Link href="/admin/clientes" className="text-sm hover:underline" style={{ color: "var(--muted-foreground)" }}>
          ← Clientes
        </Link>
        <div className="flex flex-col items-center text-center gap-4 mt-2 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <h1 className="text-2xl" style={{ fontFamily: "var(--font-anton), sans-serif" }}>
            {typedClient.name.toUpperCase()}
          </h1>
          {/* Copiar código / Eliminar cliente solo desde escritorio: en mobile se ocultan para no apretar el header. */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <CopyCodeButton code={typedClient.client_code} />
            <DeleteClientButton
              clientId={typedClient.id}
              clientName={typedClient.name}
              paymentsCount={typedPayments.length}
              sessionsCount={typedSessions.length}
            />
          </div>
        </div>
        <p className="text-sm font-mono mt-1 text-center sm:text-left" style={{ color: "var(--muted-foreground)" }}>
          {typedClient.client_code}
        </p>
      </div>

      <div
        className={`${adminGlassCardClass} p-6 flex flex-wrap sm:flex-nowrap justify-center gap-4 sm:gap-6 overflow-x-auto`}
        style={adminGlassCardStyle}
      >
        <Stat label="Total pagado" value={totalUsd.toLocaleString("es-CO", { maximumFractionDigits: 2 })} unit="USD" />
        <Stat label="Pagos" value={String(typedPayments.length)} />
        <Stat label="Sesiones" value={String(typedSessions.length)} />
        <Stat label="Tiempo invertido" value={formatMinutes(totalMinutes)} />
        <Stat label="Etapa" value={CLIENT_STAGE_LABELS[typedClient.stage]} />
        <Stat
          label="Cliente desde"
          value={formatClientSinceDate(
            typedSessions.map((s) => s.session_date),
            typedClient.created_at,
          )}
        />
      </div>

      <ClientProfileTabs client={typedClient} payments={typedPayments} sessions={typedSessions} />
    </div>
  );
}
