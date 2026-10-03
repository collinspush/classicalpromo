import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { authSecret } from "@/lib/secret";
import { findUserById, publicUser } from "@/lib/store";
import type { Role, SessionUser } from "@/lib/types";

const COOKIE = "cp_session";

export async function signSession(userId: string, tokenVersion: number) {
  return new SignJWT({ tv: tokenVersion })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(authSecret());
}

export async function readToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, authSecret());
    const sub = payload.sub;
    const tv = payload.tv;
    if (!sub || typeof tv !== "number") return null;
    return { sub, tv };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<(SessionUser & { phone: string; country: string; city: string; company: string; notifyEmail: boolean; profile: ReturnType<typeof publicUser>["profile"] }) | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  const parsed = await readToken(token);
  if (!parsed) return null;
  const user = await findUserById(parsed.sub);
  if (!user || user.tokenVersion !== parsed.tv) return null;
  return publicUser(user);
}

export function sessionCookie(token: string) {
  return {
    name: COOKIE,
    value: token,
    options: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    },
  };
}

export function canAccess(role: Role, area: "artist" | "partner" | "admin") {
  if (area === "admin") return role === "ADMIN";
  if (area === "partner") return role === "PARTNER";
  return role === "ARTIST" || role === "MANAGER" || role === "LABEL";
}
