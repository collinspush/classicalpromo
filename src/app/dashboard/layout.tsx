import { redirect } from "next/navigation";
import { ArtistShell } from "@/components/shells";
import { canAccess, getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session || !canAccess(session.role, "artist")) redirect("/login?next=/dashboard");
  return (
    <ArtistShell name={session.name} role={session.role}>
      <div id="content">{children}</div>
    </ArtistShell>
  );
}
