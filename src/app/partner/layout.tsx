import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function PartnerLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session || session.role !== "PARTNER") redirect("/login?next=/partner");
  return (
    <div className="min-h-screen">
      <header className="flex h-16 items-center justify-between border-b border-white/10 px-5">
        <Link href="/partner" className="font-display">ClassicalPromo</Link>
        <p className="text-sm text-mist">{session.name}</p>
      </header>
      <main id="content" className="px-5 py-8 sm:px-8">{children}</main>
    </div>
  );
}
