"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminButton({ label, payload }: { label: string; payload: Record<string, unknown> }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      className="rounded-md border border-white/15 px-3 py-2 text-xs uppercase tracking-[0.14em] hover:border-gold"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await fetch("/api/admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setBusy(false);
        router.refresh();
      }}
    >
      {busy ? "Saving" : label}
    </button>
  );
}
