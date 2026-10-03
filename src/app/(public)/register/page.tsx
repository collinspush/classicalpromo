import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/auth-forms";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Create artist account", description: "Open a ClassicalPromo artist, manager or label account.", alternates: { canonical: "/register" } };

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const query = await searchParams;
  return (
    <Container className="max-w-xl py-16">
      <p className="text-[11px] uppercase tracking-[0.18em] text-gold">Account</p>
      <h1 className="mt-3 font-display text-5xl uppercase tracking-[-0.04em]">Create artist account</h1>
      <p className="mt-4 text-mist">Managers and labels can choose their role. Partners use the network application and wait for approval.</p>
      <div className="mt-8"><RegisterForm next={query.next} /></div>
    </Container>
  );
}
