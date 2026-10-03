import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { defaultPackages } from "@/config/pricing";
import { jsonError, limit, parseBody } from "@/lib/http";
import { getProvider } from "@/lib/payments";
import { getSession } from "@/lib/session";
import { addAudit, notify, readDb, updateDb } from "@/lib/store";
import { servicesForGoals } from "@/lib/recommend";
import type { Currency } from "@/lib/site";

const schema = z.object({
  packageId: z.enum(["starter", "growth", "breakout", "custom"]),
  submissionId: z.string().min(3).max(80),
  currency: z.enum(["NGN", "USD", "GBP", "EUR"]),
  provider: z.enum(["paystack", "stripe", "bank_transfer", "demo"]),
  action: z.enum(["invoice", "simulate"]),
});

export async function POST(req: Request) {
  const blocked = limit(req, "pay", 12, 60 * 60 * 1000);
  if (blocked) return blocked;
  const session = await getSession();
  if (!session) return jsonError("Sign in to start a campaign.", 401);
  const parsed = await parseBody(req, schema);
  if ("error" in parsed) return parsed.error;
  const db = (await readDb());
  const submission = db.submissions.find((item) => item.id === parsed.data.submissionId);
  if (!submission) return jsonError("That pitch could not be found.", 404);
  const pack = defaultPackages.find((item) => item.id === parsed.data.packageId);
  if (!pack) return jsonError("Unknown package.");
  const amount = submission.payload.budget === "custom"
    ? Number(submission.payload.customBudget.replace(/[^\d]/g, "")) || pack.priceNgn || 0
    : submission.payload.budget === "500000+"
      ? 500000
      : Number(submission.payload.budget) || pack.priceNgn || 0;
  if (!amount || amount < 1000) return jsonError("Add a valid budget before checkout.");
  const provider = parsed.data.action === "simulate" ? null : getProvider(parsed.data.provider);
  if (parsed.data.action === "invoice" && (!provider || !provider.configured)) {
    return jsonError("That payment provider is not configured yet. Use bank transfer or the demo confirmation.");
  }
  const campaignId = `cmp_${randomUUID()}`;
  const paymentId = `pay_${randomUUID()}`;
  const reference = `CP-${Date.now()}`;
  const simulated = parsed.data.action === "simulate";
  const status = simulated ? "QUEUED" : "AWAITING_PAYMENT";
  await updateDb((store) => {
    store.campaigns.unshift({
      id: campaignId,
      artistId: session.id,
      artistName: session.name,
      songId: "",
      songTitle: submission.payload.songTitle,
      packageId: pack.id,
      packageName: pack.name,
      status,
      budgetNgn: amount,
      currency: parsed.data.currency as Currency,
      goals: submission.payload.goals,
      markets: submission.payload.markets,
      genres: submission.payload.audienceGenres,
      services: servicesForGoals(submission.payload.goals, pack.id),
      progress: simulated ? 5 : 0,
      demo: session.demo || simulated,
      assignee: "Unassigned",
      startDate: "",
      endDate: "",
      channels: servicesForGoals(submission.payload.goals, pack.id).map((name) => ({
        name,
        metrics: [{ label: "Activity", value: "Awaiting campaign data", awaiting: true }],
      })),
      createdAt: new Date().toISOString(),
    });
    store.songs.unshift({
      id: `song_${randomUUID()}`,
      artistId: session.id,
      title: submission.payload.songTitle,
      artistName: submission.payload.songArtist,
      featured: submission.payload.featured,
      genre: submission.payload.releaseGenre,
      releaseDate: submission.payload.releaseDate,
      isrc: submission.payload.isrc,
      songLink: submission.payload.songLink,
      artworkName: submission.payload.artworkName,
      lyrics: submission.payload.lyrics,
      videoLink: submission.payload.videoLink,
      pressKitName: submission.payload.pressKitName,
      createdAt: new Date().toISOString(),
    });
    store.payments.unshift({
      id: paymentId,
      userId: session.id,
      campaignId,
      provider: simulated ? "demo" : parsed.data.provider,
      reference,
      amount,
      currency: parsed.data.currency,
      status: simulated ? "SUCCESSFUL" : "PENDING",
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(store.payments.length + 1).padStart(4, "0")}`,
      billTo: session.name,
      description: `${pack.name} campaign for ${submission.payload.songTitle}`,
      createdAt: new Date().toISOString(),
    });
  });
  await notify(session.id, simulated ? "payment_received" : "song_submitted", simulated ? "Payment recorded" : "Invoice created", simulated ? "Demo payment marked successful. Campaign is queued." : "Bank transfer invoice is pending.");
  if (simulated) await notify(session.id, "campaign_approved", "Campaign queued", `${submission.payload.songTitle} is queued for the desk.`);
  await addAudit({ userId: session.id, action: simulated ? "payment_demo" : "invoice", target: campaignId, meta: reference });
  return NextResponse.json({ ok: true, campaignId, paymentId });
}
