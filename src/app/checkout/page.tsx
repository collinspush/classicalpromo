import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { defaultPackages } from "@/config/pricing";
import { listProviders } from "@/lib/payments";
import { getSession } from "@/lib/session";
import { readDb } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ package?: string; submission?: string }> }) {
  const session = await getSession();
  const query = await searchParams;
  if (!session) redirect(`/login?next=${encodeURIComponent(`/checkout?package=${query.package ?? ""}&submission=${query.submission ?? ""}`)}`);
  const submission = readDb().submissions.find((item) => item.id === query.submission);
  if (!submission) {
    return (
      <main className="mx-auto max-w-xl px-5 py-16">
        <h1 className="font-display text-4xl uppercase">Checkout needs a pitch</h1>
        <p className="mt-3 text-mist">Start with the song, then come back to payment.</p>
        <Link href="/pitch" className="mt-6 inline-block text-gold">Pitch your song</Link>
      </main>
    );
  }
  const packageId = (query.package && defaultPackages.some((item) => item.id === query.package) ? query.package : submission.payload.packageId) as "starter" | "growth" | "breakout" | "custom";
  const pack = defaultPackages.find((item) => item.id === packageId)!;
  const amount = submission.payload.budget === "custom"
    ? Number(submission.payload.customBudget.replace(/[^\d]/g, "")) || pack.priceNgn || 0
    : submission.payload.budget === "500000+"
      ? 500000
      : Number(submission.payload.budget) || pack.priceNgn || 0;
  return (
    <main id="content" className="mx-auto grid max-w-5xl gap-8 px-5 py-16 lg:grid-cols-2">
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-gold">Checkout</p>
        <h1 className="mt-3 font-display text-5xl uppercase">{pack.name}</h1>
        <p className="mt-4 text-mist">{submission.payload.songTitle} · {submission.payload.songArtist}</p>
        <ul className="mt-6 space-y-2 text-sm">{pack.services.map((service) => <li key={service}>{service}</li>)}</ul>
        <p className="mt-6 text-sm text-dim">{pack.reporting} Results are not guaranteed.</p>
      </div>
      <CheckoutForm packageId={packageId} submissionId={submission.id} amount={amount} title={pack.audience} providers={listProviders()} bank={readDb().settings} />
    </main>
  );
}
