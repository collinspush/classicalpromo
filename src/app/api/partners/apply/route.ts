import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { findComplianceIssue } from "@/lib/compliance";
import { sanitize } from "@/lib/format";
import { jsonError, limit, parseBody } from "@/lib/http";
import { getSession } from "@/lib/session";
import { notify, readDb, updateDb } from "@/lib/store";
import { partnerSchema } from "@/lib/validators";

export async function POST(req: Request) {
  const blocked = limit(req, "partner", 6, 60 * 60 * 1000);
  if (blocked) return blocked;
  const parsed = await parseBody(req, partnerSchema);
  if ("error" in parsed) return parsed.error;
  if (parsed.data.company) return NextResponse.json({ ok: true });
  const issue = findComplianceIssue(`${parsed.data.description} ${parsed.data.proofNote}`);
  if (issue) return jsonError(issue);
  const session = await getSession();
  const id = `prt_${randomUUID()}`;
  await updateDb((db) => {
    db.partners.unshift({
      id,
      userId: session?.role === "PARTNER" ? session.id : null,
      name: sanitize(parsed.data.name),
      email: parsed.data.email.toLowerCase(),
      phone: sanitize(parsed.data.phone),
      country: sanitize(parsed.data.country),
      city: sanitize(parsed.data.city),
      categories: parsed.data.categories,
      platform: sanitize(parsed.data.platform),
      profileUrl: sanitize(parsed.data.profileUrl ?? ""),
      audience: sanitize(parsed.data.audience),
      genres: parsed.data.genres.map((item) => sanitize(item)),
      description: sanitize(parsed.data.description),
      status: "PENDING",
      proofNote: sanitize(parsed.data.proofNote),
      createdAt: new Date().toISOString(),
    });
  });
  if (session) await notify(session.id, "partner_application", "Application received", "Your partner application is pending review.");
  const admins = (await readDb()).users.filter((user) => user.role === "ADMIN");
  for (const admin of admins) {
    await notify(admin.id, "partner_application", "New partner application", `${parsed.data.name} applied and is pending.`);
  }
  return NextResponse.json({ ok: true, id });
}
