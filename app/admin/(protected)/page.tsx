import { redirect } from "next/navigation";

// Sin dashboard propio: el CRM de clientes es la única sección del panel.
export default function AdminRootPage() {
  redirect("/admin/clientes");
}
