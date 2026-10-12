"use client";

import { useTransition } from "react";
import { deleteClientRecord } from "@/app/admin/(protected)/clientes/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";

export function DeleteClientButton({
  clientId,
  clientName,
  paymentsCount,
  sessionsCount,
}: {
  clientId: string;
  clientName: string;
  paymentsCount: number;
  sessionsCount: number;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          Eliminar cliente
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar a {clientName}?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminan también sus {paymentsCount} pagos y {sessionsCount} sesiones
            registradas.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          {/* Llamada directa a la Server Action (no <form action>): un
              type="submit" dentro de AlertDialogAction se desmonta en el
              mismo clic que cierra el diálogo y el submit nativo nunca
              llega a dispararse. */}
          <AlertDialogAction
            disabled={isPending}
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => {
              startTransition(async () => {
                await deleteClientRecord(clientId);
              });
            }}
          >
            {isPending ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
