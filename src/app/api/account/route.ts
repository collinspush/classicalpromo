import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { sanitize } from "@/lib/format";
import { jsonError, limit, parseBody } from "@/lib/http";
import { getSession } from "@/lib/session";
import { updateDb } from "@/lib/store";

const schema = z.object({
  action: z.enum(["profile", "password", "notifications"]),
  phone: z.string().max(24).optional(),
  country: z.string().max(60).optional(),
  city: z.string().max(60).optional(),
  bio: z.string().max(800).optional(),
  website: z.string().max(200).optional(),
  instagram: z.string().max(200).optional(),
  tiktok: z.string().max(200).optional(),
  youtube: z.string().max(200).optional(),
  spotify: z.string().max(200).optional(),
  appleMusic: z.string().max(200).optional(),
  audiomack: z.string().max(200).optional(),
  genres: z.string().max(120).optional(),
  notifyEmail: z.boolean().optional(),
  currentPassword: z.string().max(80).optional(),
  nextPassword: z.string().max(80).optional(),
});

export async function POST(req: Request) {
  const blocked = limit(req, "account", 20, 15 * 60 * 1000);
  if (blocked) return blocked;
  const session = await getSession();
  if (!session) return jsonError("Sign in required.", 401);
  const parsed = await parseBody(req, schema);
  if ("error" in parsed) return parsed.error;
  const data = parsed.data;
  if (data.action === "password") {
    const userOk = await updatePassword(session.id, data.currentPassword ?? "", data.nextPassword ?? "");
    if (!userOk) return jsonError("Current password is incorrect, or the new password is too weak.");
    return NextResponse.json({ ok: true });
  }
  await updateDb((db) => {
    const user = db.users.find((item) => item.id === session.id);
    if (!user) return;
    if (data.action === "notifications") {
      user.notifyEmail = Boolean(data.notifyEmail);
      return;
    }
    user.phone = sanitize(data.phone ?? user.phone);
    user.country = sanitize(data.country ?? user.country);
    user.city = sanitize(data.city ?? user.city);
    if (user.profile) {
      user.profile.bio = sanitize(data.bio ?? user.profile.bio);
      user.profile.country = user.country;
      user.profile.city = user.city;
      user.profile.website = sanitize(data.website ?? user.profile.website);
      user.profile.instagram = sanitize(data.instagram ?? user.profile.instagram);
      user.profile.tiktok = sanitize(data.tiktok ?? user.profile.tiktok);
      user.profile.youtube = sanitize(data.youtube ?? user.profile.youtube);
      user.profile.spotify = sanitize(data.spotify ?? user.profile.spotify);
      user.profile.appleMusic = sanitize(data.appleMusic ?? user.profile.appleMusic);
      user.profile.audiomack = sanitize(data.audiomack ?? user.profile.audiomack);
      user.profile.genres = (data.genres ?? user.profile.genres.join(", "))
        .split(",")
        .map((item) => sanitize(item))
        .filter(Boolean);
    }
  });
  return NextResponse.json({ ok: true });
}

async function updatePassword(userId: string, currentPassword: string, nextPassword: string) {
  if (nextPassword.length < 10 || !/[A-Za-z]/.test(nextPassword) || !/[0-9]/.test(nextPassword)) return false;
  let ok = false;
  const hash = await bcrypt.hash(nextPassword, 10);
  await updateDb((db) => {
    const user = db.users.find((item) => item.id === userId);
    if (!user) return;
    if (!bcrypt.compareSync(currentPassword, user.passwordHash)) return;
    user.passwordHash = hash;
    user.tokenVersion += 1;
    ok = true;
  });
  return ok;
}
