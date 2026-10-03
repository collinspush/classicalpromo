import { NextResponse } from "next/server";
import { z } from "zod";
import { limit, parseBody } from "@/lib/http";
import { findUserByEmail, issueToken, notify } from "@/lib/store";

const schema = z.object({ email: z.string().trim().email() });

export async function POST(req: Request) {
  const blocked = limit(req, "forgot", 5, 15 * 60 * 1000);
  if (blocked) return blocked;
  const parsed = await parseBody(req, schema);
  if ("error" in parsed) return parsed.error;
  const user = await findUserByEmail(parsed.data.email);
  let resetPath: string | null = null;
  if (user) {
    const token = await issueToken(user.id, "reset");
    resetPath = `/reset-password?token=${token}`;
    await notify(user.id, "password", "Reset your password", "A password reset link was requested.");
  }
  return NextResponse.json({
    ok: true,
    message: "If an account exists for that email, a reset link has been created.",
    resetPath: !process.env.SMTP_HOST && user ? resetPath : null,
  });
}
