"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button, Container } from "@/components/ui";

function VerifyInner() {
  const token = useSearchParams().get("token") ?? "";
  const [message, setMessage] = useState("");
  return (
    <Container className="max-w-xl py-16">
      <h1 className="font-display text-5xl uppercase tracking-[-0.04em]">Confirm your email</h1>
      <p className="mt-4 text-mist">Verification marks the address as yours. Campaigns can still be drafted before this is done.</p>
      <Button
        className="mt-8"
        onClick={async () => {
          const response = await fetch("/api/auth/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
          const data = await response.json();
          setMessage(response.ok ? "Email confirmed." : data.error);
        }}
      >
        Verify email
      </Button>
      {message ? <p className="mt-4 text-sm text-gold">{message}</p> : null}
    </Container>
  );
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyInner />
    </Suspense>
  );
}
