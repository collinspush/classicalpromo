"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { naira } from "@/lib/format";

export function CheckoutForm({
  packageId,
  submissionId,
  amount,
  title,
  providers,
  bank,
}: {
  packageId: string;
  submissionId: string;
  amount: number;
  title: string;
  providers: { id: string; label: string; configured: boolean }[];
  bank: { bankName: string; accountName: string; accountNumber: string };
}) {
  const router = useRouter();
  const [currency, setCurrency] = useState("NGN");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function pay(action: "invoice" | "simulate", provider: string) {
    setBusy(true);
    setMessage("");
    const response = await fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ packageId, submissionId, currency, provider, action }),
    });
    const data = await response.json();
    setBusy(false);
    if (!response.ok) {
      setMessage(data.error ?? "Payment could not be created.");
      return;
    }
    router.push(`/dashboard/campaigns/${data.campaignId}`);
    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-panel p-6">
      <p className="text-sm text-mist">{title}</p>
      <p className="mt-3 text-3xl">{naira(amount)}</p>
      <p className="mt-2 text-xs text-dim">Amounts are stored in naira. Other currencies are indicative until a provider is connected. No card data is collected in the browser.</p>
      <label className="mt-6 block text-[11px] uppercase tracking-[0.16em] text-mist">
        Currency
        <select className="mt-2 w-full rounded-md border border-white/10 bg-ink px-3 py-3 text-sm normal-case tracking-normal" value={currency} onChange={(event) => setCurrency(event.target.value)}>
          {["NGN", "USD", "GBP", "EUR"].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <div className="mt-6 space-y-3 text-sm">
        {providers.map((provider) => (
          <p key={provider.id} className="flex items-center justify-between border-t border-white/10 pt-3">
            <span>{provider.label}</span>
            <span className="text-dim">{provider.configured ? "Ready to connect" : "Not configured"}</span>
          </p>
        ))}
      </div>
      <div className="mt-6 rounded-lg border border-white/10 p-4 text-sm text-mist">
        <p className="text-ivory">Bank transfer</p>
        <p className="mt-2">{bank.bankName}</p>
        <p>{bank.accountName}</p>
        <p>{bank.accountNumber}</p>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button disabled={busy} onClick={() => pay("invoice", "bank_transfer")}>Create invoice</Button>
        <Button variant="line" disabled={busy} onClick={() => pay("simulate", "demo")}>Simulate payment (demo)</Button>
      </div>
      {message ? <p className="mt-4 text-sm text-gold">{message}</p> : null}
    </div>
  );
}
