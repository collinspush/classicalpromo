import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <>
      <SiteHeader user={session ? { name: session.name, role: session.role } : null} />
      <main id="content">{children}</main>
      <SiteFooter />
    </>
  );
}
