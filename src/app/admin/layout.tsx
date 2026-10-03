import { redirect } from "next/navigation";
import { AdminShell } from "@/components/shells";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/login?next=/admin");
  return <AdminShell name={session.name}><div id="content">{children}</div></AdminShell>;
}
