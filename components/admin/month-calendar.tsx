"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { capitalizeFirst } from "@/lib/admin-layout";
import type { ClientSession } from "@/lib/crm-types";

const WEEKDAYS = ["lu", "ma", "mi", "ju", "vi", "sá", "do"];

function toDateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Lunes=0 ... domingo=6 (getDay() es domingo=0, lo rotamos). */
function mondayIndex(d: Date): number {
  return (d.getDay() + 6) % 7;
}

function addDays(d: Date, amount: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + amount);
}

/** Grilla de calendario mensual, inspirada en SessionsCalendar de Coach Manager y en la parrilla de Gladwell. */
export function MonthCalendar({
  sessionsByDate,
  selectedDate,
  onSelectDate,
}: {
  sessionsByDate: Map<string, ClientSession>;
  selectedDate?: string;
  onSelectDate: (dateKey: string) => void;
}) {
  const now = new Date();
  const mostRecentKey = [...sessionsByDate.keys()].sort().at(-1);
  const initial = mostRecentKey ? new Date(mostRecentKey + "T00:00:00") : now;
  const [cursor, setCursor] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1));

  const firstOfMonth = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const leadingBlanks = mondayIndex(firstOfMonth);

  // Grilla siempre completa: se rellena con los días del mes anterior/siguiente
  // (atenuados, sin interacción) en vez de celdas vacías.
  const cells: { date: Date; inMonth: boolean }[] = [
    ...Array.from({ length: leadingBlanks }, (_, i) => ({
      date: addDays(firstOfMonth, i - leadingBlanks),
      inMonth: false,
    })),
    ...Array.from({ length: daysInMonth }, (_, i) => ({
      date: new Date(cursor.getFullYear(), cursor.getMonth(), i + 1),
      inMonth: true,
    })),
  ];
  while (cells.length % 7 !== 0) {
    cells.push({ date: addDays(cells[cells.length - 1].date, 1), inMonth: false });
  }

  const todayKey = toDateKey(now);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold">
          {capitalizeFirst(cursor.toLocaleDateString("es-CO", { month: "long", year: "numeric" }))}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCursor(new Date(now.getFullYear(), now.getMonth(), 1))}
            className="text-xs font-medium px-2 py-1.5 rounded-md hover:opacity-70"
            style={{ color: "var(--cm-violet-300)" }}
          >
            Hoy
          </button>
          <button
            type="button"
            aria-label="Mes anterior"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
            className="p-1.5 rounded-md hover:opacity-70"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Mes siguiente"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
            className="p-1.5 rounded-md hover:opacity-70"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        className="grid grid-cols-7 text-center rounded-md mb-1"
        style={{ background: "color-mix(in srgb, var(--card) 70%, transparent)", border: "1px solid var(--border)" }}
      >
        {WEEKDAYS.map((w) => (
          <div key={w} className="text-xs uppercase py-2 font-semibold" style={{ color: "var(--muted-foreground)" }}>
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {cells.map(({ date, inMonth }) => {
          const key = toDateKey(date);

          if (!inMonth) {
            return (
              <div
                key={key}
                className="rounded-lg flex flex-col items-start justify-start gap-1 p-2 text-sm text-left"
                style={{
                  minHeight: "5rem",
                  border: "1px solid var(--border)",
                  background: "color-mix(in srgb, var(--card) 20%, transparent)",
                  color: "var(--muted-foreground)",
                  opacity: 0.5,
                }}
              >
                <span>{date.getDate()}</span>
              </div>
            );
          }

          const session = sessionsByDate.get(key);
          const preview = session?.comments?.trim() || session?.reto?.trim() || "";
          const isSelected = key === selectedDate;
          const isToday = key === todayKey;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectDate(key)}
              className="rounded-lg flex flex-col items-start justify-start gap-1 p-2 text-sm text-left transition-colors hover:border-[color:var(--cm-violet-500)]"
              style={{
                minHeight: "5rem",
                border: isSelected ? "1px solid var(--cm-violet-400)" : "1px solid var(--border)",
                background: isSelected
                  ? "color-mix(in srgb, var(--cm-violet-500) 18%, transparent)"
                  : "color-mix(in srgb, var(--card) 40%, transparent)",
                color: isToday ? "var(--cm-violet-300)" : "var(--foreground)",
              }}
            >
              <span>{date.getDate()}</span>
              {session ? (
                <span className="flex items-center gap-1 w-full min-w-0 text-[11px] leading-tight" style={{ color: "var(--muted-foreground)" }}>
                  <span
                    className="shrink-0 rounded-full px-1 text-[10px]"
                    style={{ background: "var(--cm-violet-600)", color: "var(--foreground)" }}
                  >
                    #{session.session_number}
                  </span>
                  {preview ? <span className="truncate min-w-0">{preview}</span> : null}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
