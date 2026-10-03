import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { jsonError, limit, parseBody } from "@/lib/http";
import { findUserByEmail, issueToken, notify, updateDb } from "@/lib/store";
import { sessionCookie, signSession } from "@/lib/session";
import { sanitize, slugify } from "@/lib/format";
import { registerSchema } from "@/lib/validators";
import { site } from "@/lib/site";

export async function POST(req: Request) {
  const blocked = limit(req, "register", 8, 60 * 60 * 1000);
  if (blocked) return blocked;
  const parsed = await parseBody(req, registerSchema);
  if ("error" in parsed) return parsed.error;
  const { name, email, password, role, company } = parsed.data;
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return jsonError("Use at least 10 characters with a letter and a number.");
  }
  if (findUserByEmail(email)) return jsonError("An account with that email already exists.");
  const passwordHash = await bcrypt.hash(password, 10);
  const id = `usr_${randomUUID()}`;
  const token = issueToken(id, "verify");
  updateDb((db) => {
    db.users.push({
      id,
      email: email.toLowerCase(),
      passwordHash,
      name: sanitize(name),
      role,
      emailVerified: false,
      phone: "",
      tokenVersion: 0,
      demo: false,
      country: "",
      city: "",
      company: sanitize(company ?? ""),
      notifyEmail: true,
      createdAt: new Date().toISOString(),
      profile:
        role === "ARTIST"
          ? {
              slug: `${slugify(name)}-${id.slice(-4)}`,
              stageName: sanitize(name),
              bio: "",
              country: "",
              city: "",
              genres: [],
              website: "",
              instagram: "",
              tiktok: "",
              youtube: "",
              spotify: "",
              appleMusic: "",
              audiomack: "",
              verified: false,
              image: "/media/portrait.jpg",
            }
          : null,
    });
    db.submissions.forEach((submission) => {
      if (submission.email.toLowerCase() === email.toLowerCase()) submission.userId = id;
    });
  });
  notify(id, "account", "Confirm your email", "Open the verification link to confirm this address.");
  const session = await signSession(id, 0);
  const response = NextResponse.json({
    ok: true,
    verifyPath: `/verify-email?token=${token}`,
    note: process.env.SMTP_HOST ? "Verification email queued." : `Email delivery is not configured. Use ${site.url}/verify-email?token=${token}`,
  });
  const cookie = sessionCookie(session);
  response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
}
