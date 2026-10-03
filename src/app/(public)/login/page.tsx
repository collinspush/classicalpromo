import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/auth-forms";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Log in", robots: { index: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const query = await searchParams;
  return (
    <Container className="py-16">
      <div className="max-w-md">
        <p className="text-[11px] uppercase tracking-[0.18em] text-gold">Account</p>
        <h1 className="mt-3 font-display text-5xl uppercase tracking-[-0.04em]">Log in</h1>
        <div className="mt-8">
          <LoginForm next={query.next} />
        </div>
      </div>
    </Container>
  );
}
