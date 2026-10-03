import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/auth-forms";
import { demoAccounts, demoPassword } from "@/lib/demo-accounts";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Log in", robots: { index: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const query = await searchParams;
  return (
    <Container className="grid gap-10 py-16 lg:grid-cols-2">
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-gold">Account</p>
        <h1 className="mt-3 font-display text-5xl uppercase tracking-[-0.04em]">Log in</h1>
        <div className="mt-8 max-w-md"><LoginForm next={query.next} /></div>
      </div>
      <aside className="rounded-2xl border border-white/10 bg-panel p-6">
        <p className="text-sm text-gold">Demo</p>
        <p className="mt-2 text-sm text-mist">These accounts are sample workspaces. Password for each: {demoPassword}</p>
        <ul className="mt-4 space-y-2 text-sm">
          {demoAccounts.map(([role, email]) => (
            <li key={email} className="flex justify-between gap-4 border-t border-white/10 py-2"><span>{role}</span><span className="text-mist">{email}</span></li>
          ))}
        </ul>
      </aside>
    </Container>
  );
}
