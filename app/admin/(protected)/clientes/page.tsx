import Link from "next/link";
import { StatusBadge } from "@/components/admin/status-badge";
import { Stat } from "@/components/admin/stat";
import { CreateClientSheet } from "@/components/crm/create-client-sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminGlassCardClass, adminGlassCardStyle } from "@/lib/admin-layout";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  CLIENT_STAGE_LABELS,
  CLIENT_STAGE_TONE,
  formatClientSinceDate,
  formatMinutes,
  getCurrentMonthKey,
  getCurrentMonthLabel,
  MONTHLY_INCOME_GOAL_USD,
  type Client,
  type ClientPayment,
  type ClientSession,
} from "@/lib/crm-types";

function formatUsd(value: number) {
  return `$${value.toLocaleString("es-CO", { maximumFractionDigits: 2 })} USD`;
}

export default async function ClientesPage() {
  const supabase = createAdminClient();

  const [{ data: clients }, { data: payments }, { data: sessions }] = await Promise.all([
    supabase.from("clients").select("*").order("created_at", { ascending: false }),
    supabase.from("client_payments").select("client_id, amount_usd, paid_at"),
    supabase.from("client_sessions").select("client_id, duration_minutes, session_date"),
  ]);

  const monthKey = getCurrentMonthKey();
  const paymentsByClient = new Map<string, number>();
  let totalUsd = 0;
  let monthlyUsd = 0;
  for (const payment of (payments ?? []) as Pick<ClientPayment, "client_id" | "amount_usd" | "paid_at">[]) {
    totalUsd += payment.amount_usd;
    paymentsByClient.set(payment.client_id, (paymentsByClient.get(payment.client_id) ?? 0) + payment.amount_usd);
    if (payment.paid_at.startsWith(monthKey)) monthlyUsd += payment.amount_usd;
  }

  const sessionsByClient = new Map<string, { count: number; minutes: number; dates: string[] }>();
  let totalSessions = 0;
  let totalSessionMinutes = 0;
  let monthlyMinutes = 0;
  for (const session of (sessions ?? []) as Pick<ClientSession, "client_id" | "duration_minutes" | "session_date">[]) {
    const existing = sessionsByClient.get(session.client_id) ?? { count: 0, minutes: 0, dates: [] };
    existing.count += 1;
    existing.minutes += session.duration_minutes ?? 0;
    existing.dates.push(session.session_date);
    sessionsByClient.set(session.client_id, existing);
    totalSessions += 1;
    totalSessionMinutes += session.duration_minutes ?? 0;
    if (session.session_date.startsWith(monthKey)) monthlyMinutes += session.duration_minutes ?? 0;
  }

  const totalHours = totalSessionMinutes / 60;
  const hourlyValueUsd = totalSessionMinutes > 0 ? totalUsd / totalHours : null;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl" style={{ fontFamily: "var(--font-anton), sans-serif" }}>
          CLIENTES
        </h1>
        <CreateClientSheet />
      </div>

      <div className={`${adminGlassCardClass} p-6 mb-6 flex flex-wrap justify-center gap-8`} style={adminGlassCardStyle}>
        <Stat label="Clientes" value={String(clients?.length ?? 0)} />
        <Stat label="Sesiones" value={String(totalSessions)} />
        <Stat label="Tiempo invertido" value={formatMinutes(totalSessionMinutes)} />
        <Stat label="Total pagado" value={totalUsd.toLocaleString("es-CO", { maximumFractionDigits: 2 })} unit="USD" />
        <Stat
          label="Valor hora"
          value={hourlyValueUsd !== null ? hourlyValueUsd.toLocaleString("es-CO", { maximumFractionDigits: 0 }) : "—"}
          unit={hourlyValueUsd !== null ? "USD/h" : undefined}
        />
        <Stat label={`Tiempo ${getCurrentMonthLabel()}`} value={formatMinutes(monthlyMinutes)} />
        <Stat
          label={`Ingresos ${getCurrentMonthLabel()}`}
          value={`${monthlyUsd.toLocaleString("es-CO", { maximumFractionDigits: 0 })} / ${MONTHLY_INCOME_GOAL_USD.toLocaleString("es-CO")}`}
          unit="USD"
          progress={monthlyUsd / MONTHLY_INCOME_GOAL_USD}
        />
      </div>

      <div className={adminGlassCardClass} style={adminGlassCardStyle}>
        <Table>
          <TableHeader>
            <TableRow style={{ borderColor: "var(--border)" }}>
              <TableHead>Nombre</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Etapa</TableHead>
              <TableHead>Sesiones</TableHead>
              <TableHead>Tiempo invertido</TableHead>
              <TableHead>Total pagado</TableHead>
              <TableHead>Cliente desde</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(clients as Client[] | null)?.map((client) => {
              const totalPaid = paymentsByClient.get(client.id);
              const sessionStats = sessionsByClient.get(client.id);

              return (
                <TableRow key={client.id} style={{ borderColor: "var(--border)" }}>
                  <TableCell>
                    <Link href={`/admin/clientes/${client.id}`} className="font-medium hover:underline">
                      {client.name}
                    </Link>
                  </TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {client.client_code}
                  </TableCell>
                  <TableCell>
                    <StatusBadge tone={CLIENT_STAGE_TONE[client.stage]}>{CLIENT_STAGE_LABELS[client.stage]}</StatusBadge>
                  </TableCell>
                  <TableCell style={{ color: "var(--muted-foreground)" }}>{sessionStats?.count ?? 0}</TableCell>
                  <TableCell style={{ color: "var(--muted-foreground)" }}>
                    {formatMinutes(sessionStats?.minutes ?? 0)}
                  </TableCell>
                  <TableCell>{totalPaid ? formatUsd(totalPaid) : "—"}</TableCell>
                  <TableCell style={{ color: "var(--muted-foreground)" }}>
                    {formatClientSinceDate(sessionStats?.dates ?? [], client.created_at)}
                  </TableCell>
                </TableRow>
              );
            })}
            {!clients?.length ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8" style={{ color: "var(--muted-foreground)" }}>
                  Todavía no hay clientes.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
