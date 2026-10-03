import type { Metadata } from "next";
import { ResetForm } from "@/components/auth/auth-forms";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Reset password", robots: { index: false } };

export default async function ResetPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const query = await searchParams;
  return (
    <Container className="max-w-xl py-16">
      <h1 className="font-display text-5xl uppercase tracking-[-0.04em]">Choose a new password</h1>
      <div className="mt-8">{query.token ? <ResetForm token={query.token} /> : <p className="text-mist">This reset link is missing a token.</p>}</div>
    </Container>
  );
}
