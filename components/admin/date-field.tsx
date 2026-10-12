"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { capitalizeFirst } from "@/lib/admin-layout";

const WEEKDAYS = ["lu", "ma", "mi", "ju", "vi", "sá", "do"];

function toDateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Lunes=0 ... domingo=6 (getDay() es domingo=0, lo rotamos). */
function mondayIndex(d: Date): number {
  return (d.getDay() + 6) % 7;
}

function parseDateKey(key: string): Date {
  return new Date(`${key}T00:00:00`);
}

/** Campo de fecha con calendario propio (reemplaza el <input type="date"> nativo del navegador, que no se puede tematizar). */
export function DateField({
  id,
  name,
  defaultValue,
  required,
}: {
  id?: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  const initial = defaultValue || toDateKey(new Date());
  const [value, setValue] = useState(initial);
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(() => {
    const d = parseDateKey(initial);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const leadingBlanks = mondayIndex(new Date(cursor.getFullYear(), cursor.getMonth(), 1));
  const cells: (Date | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(cursor.getFullYear(), cursor.getMonth(), i + 1)),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const todayKey = toDateKey(new Date());

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* El hidden es lo que viaja en el FormData; el id (para el <Label for=…>
          del campo) va en el botón, que es el control real con el que se interactúa. */}
      <input type="hidden" name={name} value={value} required={required} />
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          className="border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm dark:bg-input/30 flex items-center justify-between gap-2"
        >
          <span>
            {capitalizeFirst(
              parseDateKey(value).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" }),
            )}
          </span>
          <CalendarIcon size={15} style={{ color: "var(--muted-foreground)" }} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="start">
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            aria-label="Mes anterior"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
            className="p-1.5 rounded-md hover:opacity-70"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-semibold">
            {capitalizeFirst(cursor.toLocaleDateString("es-CO", { month: "long", year: "numeric" }))}
          </span>
          <button
            type="button"
            aria-label="Mes siguiente"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
            className="p-1.5 rounded-md hover:opacity-70"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((w) => (
            <div key={w} className="text-xs uppercase py-1" style={{ color: "var(--muted-foreground)" }}>
              {w}
            </div>
          ))}
          {cells.map((date, i) => {
            if (!date) return <div key={i} />;
            const key = toDateKey(date);
            const isSelected = key === value;
            const isToday = key === todayKey;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setValue(key);
                  setOpen(false);
                }}
                className="aspect-square rounded-md flex items-center justify-center text-sm transition-colors"
                style={{
                  border: isSelected ? "1px solid var(--cm-violet-400)" : "1px solid var(--border)",
                  background: isSelected
                    ? "color-mix(in srgb, var(--cm-violet-500) 25%, transparent)"
                    : "transparent",
                  color: isToday && !isSelected ? "var(--cm-violet-300)" : "var(--foreground)",
                }}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
