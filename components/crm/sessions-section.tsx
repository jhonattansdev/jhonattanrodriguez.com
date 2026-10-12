"use client";

import { useState } from "react";
import { addSession, deleteSession, updateSession } from "@/app/admin/(protected)/clientes/actions";
import { DateField } from "@/components/admin/date-field";
import { MonthCalendar } from "@/components/admin/month-calendar";
import { SubmitButton } from "@/components/admin/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { adminGlassCardClass, adminGlassCardStyle } from "@/lib/admin-layout";
import { formatMinutes, type ClientSession } from "@/lib/crm-types";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function SessionsSection({ clientId, sessions }: { clientId: string; sessions: ClientSession[] }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(todayKey);
  // null = formulario de "agregar"; si no, se está viendo/editando esta sesión existente.
  const [editingSession, setEditingSession] = useState<ClientSession | null>(null);

  const byDate = new Map(sessions.map((s) => [s.session_date, s]));
  const sortedSessions = [...sessions].sort((a, b) => b.session_number - a.session_number);
  const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration_minutes ?? 0), 0);

  const openCreate = (date: string) => {
    setEditingSession(null);
    setSelectedDate(date);
    setSheetOpen(true);
  };

  const openForDate = (date: string) => {
    const existing = byDate.get(date);
    if (existing) {
      setEditingSession(existing);
      setSelectedDate(date);
    } else {
      setEditingSession(null);
      setSelectedDate(date);
    }
    setSheetOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className={`${adminGlassCardClass} p-6`} style={adminGlassCardStyle}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            {sessions.length} sesiones · {formatMinutes(totalMinutes)} invertidos en total
          </p>
          <Button type="button" size="sm" onClick={() => openCreate(todayKey())}>
            + Agregar sesión
          </Button>
        </div>
        <MonthCalendar sessionsByDate={byDate} selectedDate={selectedDate} onSelectDate={openForDate} />
        <p className="text-xs mt-3" style={{ color: "var(--muted-foreground)" }}>
          Un día con sesión abre sus detalles; un día vacío abre el formulario para registrar una nueva.
        </p>
      </div>

      {sortedSessions.length ? (
        <ul className="space-y-2">
          {sortedSessions.map((session) => (
            <li key={session.id} className={`${adminGlassCardClass} p-4`} style={adminGlassCardStyle}>
              <div className="flex items-start justify-between gap-3">
                <button
                  type="button"
                  className="text-left flex-1"
                  onClick={() => {
                    setEditingSession(session);
                    setSelectedDate(session.session_date);
                    setSheetOpen(true);
                  }}
                >
                  <p className="font-medium">
                    Sesión #{session.session_number}
                    <span className="font-normal ml-2" style={{ color: "var(--muted-foreground)" }}>
                      {session.session_date}
                      {session.duration_minutes ? ` · ${formatMinutes(session.duration_minutes)}` : ""}
                    </span>
                  </p>
                  {session.comments ? <p className="text-sm mt-1">{session.comments}</p> : null}
                  {session.reto ? (
                    <p className="text-sm mt-1" style={{ color: "var(--cm-violet-300)" }}>
                      Reto: {session.reto}
                    </p>
                  ) : null}
                </button>
                <form action={deleteSession.bind(null, session.id, clientId)}>
                  <Button type="submit" variant="ghost" size="sm">
                    Eliminar
                  </Button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Todavía no hay sesiones registradas.
        </p>
      )}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {editingSession ? `Sesión #${editingSession.session_number}` : `Sesión #${sessions.length + 1}`}
            </SheetTitle>
            <SheetDescription>
              {editingSession ? "Editá los detalles y guardá los cambios." : "El número se asigna solo al guardar."}
            </SheetDescription>
          </SheetHeader>

          {/* key: fuerza remount del formulario no controlado al cambiar de
              sesión (o pasar a modo "crear"), si no los campos quedan con el
              texto de la sesión anterior. */}
          <form
            key={editingSession?.id ?? "new"}
            action={async (formData) => {
              if (editingSession) {
                await updateSession(editingSession.id, clientId, formData);
              } else {
                await addSession(clientId, formData);
              }
              setSheetOpen(false);
            }}
            className="flex flex-col gap-4 px-4 pb-4"
          >
            {editingSession ? (
              <div className="space-y-2">
                <Label htmlFor="session_number">Número de sesión</Label>
                <Input
                  id="session_number"
                  name="session_number"
                  type="number"
                  min="1"
                  step="1"
                  defaultValue={editingSession.session_number}
                />
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  Para corregir saltos o reordenar (ej. si quedó un hueco al borrar una sesión).
                </p>
              </div>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="session_date">Fecha</Label>
              <DateField
                id="session_date"
                name="session_date"
                defaultValue={editingSession?.session_date ?? selectedDate}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration_minutes">Tiempo invertido (minutos)</Label>
              <Input
                id="duration_minutes"
                name="duration_minutes"
                type="number"
                min="0"
                step="1"
                defaultValue={editingSession?.duration_minutes ?? undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">Comentarios</Label>
              <Textarea
                id="comments"
                name="comments"
                rows={4}
                placeholder="Qué se trabajó en la sesión…"
                defaultValue={editingSession?.comments ?? ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reto">Reto</Label>
              <Textarea
                id="reto"
                name="reto"
                rows={3}
                placeholder="Tarea para la próxima sesión…"
                defaultValue={editingSession?.reto ?? ""}
              />
            </div>

            <SubmitButton className="mt-2" pendingText="Guardando...">
              {editingSession ? "Guardar cambios" : "Guardar sesión"}
            </SubmitButton>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
