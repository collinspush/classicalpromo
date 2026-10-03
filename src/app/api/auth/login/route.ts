import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { jsonError, limit, parseBody } from "@/lib/http";
import { addAudit, findUserByEmail } from "@/lib/store";
import { sessionCookie, signSession } from "@/lib/session";
import { loginSchema } from "@/lib/validators";

export async function POST(req: Request) {
  const blocked = limit(req, "login", 10, 10 * 60 * 1000);
  if (blocked) return blocked;
  const parsed = await parseBody(req, loginSchema);
  if ("error" in parsed) return parsed.error;
  const user = findUserByEmail(parsed.data.email);
  const valid = user ? await bcrypt.compare(parsed.data.password, user.passwordHash) : false;
  if (!user || !valid) return jsonError("Email or password is incorrect.", 401);
  const token = await signSession(user.id, user.tokenVersion);
  addAudit({ userId: user.id, action: "login", target: user.email, meta: "" });
  const response = NextResponse.json({
    ok: true,
    role: user.role,
    destination: user.role === "ADMIN" ? "/admin" : user.role === "PARTNER" ? "/partner" : "/dashboard",
  });
  const cookie = sessionCookie(token);
  response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
}
