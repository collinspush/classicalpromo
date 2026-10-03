import { NextResponse } from "next/server";
import { z } from "zod";
import { jsonError, limit, parseBody } from "@/lib/http";
import { getSession } from "@/lib/session";
import { addAudit, notify, updateDb } from "@/lib/store";

const schema = z.object({
  action: z.enum(["campaign", "partner", "redirect", "settings", "article"]),
  id: z.string().max(80).optional(),
  status: z.string().max(40).optional(),
  assignee: z.string().max(80).optional(),
  oldUrl: z.string().max(200).optional(),
  newUrl: z.string().max(200).optional(),
  type: z.number().optional(),
  redirectStatus: z.enum(["active", "inactive"]).optional(),
  bankName: z.string().max(80).optional(),
  accountName: z.string().max(80).optional(),
  accountNumber: z.string().max(40).optional(),
  packageId: z.enum(["starter", "growth", "breakout", "custom"]).optional(),
  price: z.number().nullable().optional(),
  title: z.string().max(140).optional(),
  excerpt: z.string().max(240).optional(),
  body: z.string().max(8000).optional(),
  category: z.string().max(40).optional(),
});

const campaignStatuses = ["DRAFT", "AWAITING_PAYMENT", "PAID", "QUEUED", "IN_PROGRESS", "AWAITING_PARTNER_RESULTS", "COMPLETED", "CANCELLED"];
const partnerStatuses = ["PENDING", "UNDER_REVIEW", "VERIFIED", "SUSPENDED", "REJECTED"];

export async function POST(req: Request) {
  const blocked = limit(req, "admin", 40, 10 * 60 * 1000);
  if (blocked) return blocked;
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return jsonError("Admin access required.", 403);
  const parsed = await parseBody(req, schema);
  if ("error" in parsed) return parsed.error;
  const data = parsed.data;

  if (data.action === "campaign" && data.id && data.status && campaignStatuses.includes(data.status)) {
    updateDb((db) => {
      const campaign = db.campaigns.find((item) => item.id === data.id);
      if (!campaign) return;
      campaign.status = data.status as typeof campaign.status;
      if (data.assignee) campaign.assignee = data.assignee;
      if (data.status === "IN_PROGRESS" && !campaign.startDate) campaign.startDate = new Date().toISOString().slice(0, 10);
      if (data.status === "COMPLETED") campaign.progress = 100;
    });
    const campaign = (await import("@/lib/store")).readDb().campaigns.find((item) => item.id === data.id);
    if (campaign) {
      const type = data.status === "COMPLETED" ? "campaign_completed" : data.status === "IN_PROGRESS" ? "campaign_started" : "campaign_update";
      notify(campaign.artistId, type, "Campaign update", `${campaign.songTitle} is now ${data.status.replaceAll("_", " ").toLowerCase()}.`);
    }
    addAudit({ userId: session.id, action: "campaign_status", target: data.id, meta: data.status });
  }

  if (data.action === "partner" && data.id && data.status && partnerStatuses.includes(data.status)) {
    let emailUser: string | null = null;
    updateDb((db) => {
      const partner = db.partners.find((item) => item.id === data.id);
      if (!partner) return;
      partner.status = data.status as typeof partner.status;
      emailUser = partner.userId;
      db.directory.forEach((entry) => {
        if (entry.partnerId === partner.id) entry.verified = partner.status === "VERIFIED";
      });
    });
    if (emailUser) notify(emailUser, "partner_application", "Partner application updated", `Status: ${data.status.replaceAll("_", " ").toLowerCase()}.`);
    addAudit({ userId: session.id, action: "partner_status", target: data.id ?? "", meta: data.status ?? "" });
  }

  const oldUrl = data.oldUrl ?? "";
  const newUrl = data.newUrl ?? "";
  if (data.action === "redirect" && oldUrl && newUrl) {
    if (!oldUrl.startsWith("/") || !newUrl.startsWith("/") || oldUrl.startsWith("//") || newUrl.startsWith("//")) {
      return jsonError("Use internal paths beginning with a single slash.");
    }
    updateDb((db) => {
      const existing = db.redirects.find((item) => item.oldUrl === oldUrl);
      if (existing) {
        existing.newUrl = newUrl;
        existing.type = data.type === 302 ? 302 : 301;
        existing.status = data.redirectStatus ?? existing.status;
      } else {
        db.redirects.push({
          id: `red_${crypto.randomUUID()}`,
          oldUrl,
          newUrl,
          type: data.type === 302 ? 302 : 301,
          status: data.redirectStatus ?? "active",
          createdAt: new Date().toISOString(),
        });
      }
    });
    addAudit({ userId: session.id, action: "redirect", target: oldUrl, meta: newUrl });
  }

  if (data.action === "settings") {
    updateDb((db) => {
      if (data.bankName) db.settings.bankName = data.bankName;
      if (data.accountName) db.settings.accountName = data.accountName;
      if (data.accountNumber) db.settings.accountNumber = data.accountNumber;
      if (data.packageId) db.settings.packagePrices[data.packageId] = data.price ?? null;
    });
    addAudit({ userId: session.id, action: "settings", target: data.packageId ?? "bank", meta: "" });
  }

  if (data.action === "article" && data.title && data.body && data.category) {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);
    updateDb((db) => {
      db.articles.unshift({
        slug: `${slug}-${db.articles.length + 1}`,
        kind: "media",
        title: data.title ?? "",
        excerpt: data.excerpt ?? "",
        body: (data.body ?? "").split(/\n\n+/),
        category: data.category ?? "News",
        artist: "",
        genre: "",
        author: session.name,
        image: "/media/vinyl.jpg",
        date: new Date().toISOString().slice(0, 10),
        status: "published",
      });
    });
    addAudit({ userId: session.id, action: "article", target: slug, meta: "" });
  }

  return NextResponse.json({ ok: true });
}
