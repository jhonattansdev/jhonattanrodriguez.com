"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { DEFAULT_COP_USD_RATE, type ClientStage, type PaymentCurrency } from "@/lib/crm-types";

const CODE_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

function generateClientCode(): string {
  const bytes = randomBytes(8);
  let code = "";
  for (let i = 0; i < 8; i++) code += CODE_CHARS[bytes[i] % CODE_CHARS.length];
  return code;
}

function readString(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function readClientFields(formData: FormData) {
  return {
    name: readString(formData, "name"),
    objective: readString(formData, "objective"),
    phone: readString(formData, "phone"),
    email: readString(formData, "email"),
    location: readString(formData, "location"),
    role: readString(formData, "role"),
    niche: readString(formData, "niche"),
    stage: (readString(formData, "stage") ?? "prospecto") as ClientStage,
    notes: readString(formData, "notes"),
  };
}

export async function createClientRecord(formData: FormData) {
  const fields = readClientFields(formData);
  if (!fields.name) throw new Error("El nombre es obligatorio.");

  const supabase = createAdminClient();
  let clientId: string | null = null;

  // El choque de client_code es astronómicamente improbable (8 car. en base36);
  // un reintento con código nuevo es suficiente, no hace falta un loop largo.
  for (let attempt = 0; attempt < 2 && !clientId; attempt++) {
    const { data, error } = await supabase
      .from("clients")
      .insert({ ...fields, client_code: generateClientCode() })
      .select("id")
      .single();
    if (data) clientId = data.id;
    else if (error?.code !== "23505") throw new Error(error?.message ?? "No se pudo crear el cliente.");
  }

  if (!clientId) throw new Error("No se pudo generar un código único para el cliente.");

  if (fields.objective) {
    await supabase.from("client_objective_history").insert({ client_id: clientId, objective: fields.objective });
  }

  revalidatePath("/admin/clientes");
  redirect(`/admin/clientes/${clientId}`);
}

export async function deleteClientRecord(clientId: string) {
  const supabase = createAdminClient();
  // client_objective_history, client_payments y client_sessions tienen
  // `on delete cascade` hacia clients.id, así que borrar el cliente alcanza.
  const { error } = await supabase.from("clients").delete().eq("id", clientId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/clientes");
  redirect("/admin/clientes");
}

export async function updateClientRecord(clientId: string, formData: FormData) {
  const fields = readClientFields(formData);
  if (!fields.name) throw new Error("El nombre es obligatorio.");

  const supabase = createAdminClient();
  const { data: current } = await supabase
    .from("clients")
    .select("objective")
    .eq("id", clientId)
    .single();

  const { error } = await supabase
    .from("clients")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("id", clientId);

  if (error) throw new Error(error.message);

  if (fields.objective && fields.objective !== current?.objective) {
    await supabase.from("client_objective_history").insert({ client_id: clientId, objective: fields.objective });
  }

  revalidatePath(`/admin/clientes/${clientId}`);
  revalidatePath("/admin/clientes");
}

export async function addPayment(clientId: string, formData: FormData) {
  const planId = readString(formData, "plan_id");
  const currency = readString(formData, "currency");
  const amount = Number(formData.get("amount"));
  const paidAt = readString(formData, "paid_at");
  const paymentMethod = readString(formData, "payment_method");

  if (!planId) throw new Error("Falta el plan.");
  if (currency !== "COP" && currency !== "USD") throw new Error("Moneda inválida.");
  if (!Number.isFinite(amount) || amount <= 0) throw new Error("Monto inválido.");

  let exchangeRate: number | null = null;
  let amountUsd: number;

  if (currency === "COP") {
    const rateInput = formData.get("exchange_rate");
    exchangeRate = typeof rateInput === "string" && rateInput ? Number(rateInput) : DEFAULT_COP_USD_RATE;
    if (!Number.isFinite(exchangeRate) || exchangeRate <= 0) throw new Error("Tasa de cambio inválida.");
    amountUsd = amount / exchangeRate;
  } else {
    amountUsd = amount;
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("client_payments").insert({
    client_id: clientId,
    plan_id: planId,
    currency: currency as PaymentCurrency,
    amount,
    exchange_rate: exchangeRate,
    amount_usd: amountUsd,
    payment_method: paymentMethod,
    paid_at: paidAt ?? new Date().toISOString().slice(0, 10),
  });

  if (error) throw new Error(error.message);

  revalidatePath(`/admin/clientes/${clientId}`);
  revalidatePath("/admin/clientes");
}

export async function deletePayment(paymentId: string, clientId: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("client_payments").delete().eq("id", paymentId);
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/clientes/${clientId}`);
  revalidatePath("/admin/clientes");
}

function readSessionFields(formData: FormData) {
  const sessionDate = readString(formData, "session_date");
  if (!sessionDate) throw new Error("Falta la fecha de la sesión.");

  const durationInput = formData.get("duration_minutes");
  let durationMinutes: number | null = null;
  if (typeof durationInput === "string" && durationInput) {
    durationMinutes = Number(durationInput);
    if (!Number.isFinite(durationMinutes) || durationMinutes < 0) throw new Error("Minutos inválidos.");
  }

  return {
    session_date: sessionDate,
    comments: readString(formData, "comments"),
    reto: readString(formData, "reto"),
    duration_minutes: durationMinutes,
  };
}

export async function addSession(clientId: string, formData: FormData) {
  const fields = readSessionFields(formData);
  const supabase = createAdminClient();

  const { data: last } = await supabase
    .from("client_sessions")
    .select("session_number")
    .eq("client_id", clientId)
    .order("session_number", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextNumber = (last?.session_number ?? 0) + 1;

  const { error } = await supabase.from("client_sessions").insert({
    client_id: clientId,
    session_number: nextNumber,
    ...fields,
  });

  if (error) throw new Error(error.message);

  revalidatePath(`/admin/clientes/${clientId}`);
}

export async function updateSession(sessionId: string, clientId: string, formData: FormData) {
  const fields = readSessionFields(formData);
  const supabase = createAdminClient();

  const numberInput = formData.get("session_number");
  const payload: typeof fields & { session_number?: number } = { ...fields };
  if (typeof numberInput === "string" && numberInput) {
    const sessionNumber = Number(numberInput);
    if (!Number.isInteger(sessionNumber) || sessionNumber <= 0) {
      throw new Error("El número de sesión debe ser un entero positivo.");
    }
    const { data: clash } = await supabase
      .from("client_sessions")
      .select("id")
      .eq("client_id", clientId)
      .eq("session_number", sessionNumber)
      .neq("id", sessionId)
      .maybeSingle();
    if (clash) throw new Error(`Ya existe otra sesión con el número ${sessionNumber}.`);
    payload.session_number = sessionNumber;
  }

  const { error } = await supabase.from("client_sessions").update(payload).eq("id", sessionId);
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/clientes/${clientId}`);
}

export async function deleteSession(sessionId: string, clientId: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("client_sessions").delete().eq("id", sessionId);
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/clientes/${clientId}`);
}
