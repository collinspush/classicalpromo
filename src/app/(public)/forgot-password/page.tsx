import type { Metadata } from "next";
import { ForgotForm } from "@/components/auth/auth-forms";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Forgot password", robots: { index: false } };

export default function ForgotPage() {
  return (
    <Container className="max-w-xl py-16">
      <h1 className="font-display text-5xl uppercase tracking-[-0.04em]">Forgot password</h1>
      <p className="mt-4 text-mist">If email delivery is configured, the link is only sent by email. In this demo, the link is shown after you submit.</p>
      <div className="mt-8"><ForgotForm /></div>
    </Container>
  );
}
