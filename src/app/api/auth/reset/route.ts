import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { jsonError, limit, parseBody } from "@/lib/http";
import { takeToken, updateDb } from "@/lib/store";

const schema = z.object({
  token: z.string().min(10),
  password: z.string().min(10).max(80),
});

export async function POST(req: Request) {
  const blocked = limit(req, "reset", 8, 15 * 60 * 1000);
  if (blocked) return blocked;
  const parsed = await parseBody(req, schema);
  if ("error" in parsed) return parsed.error;
  if (!/[A-Za-z]/.test(parsed.data.password) || !/[0-9]/.test(parsed.data.password)) {
    return jsonError("Use at least 10 characters with a letter and a number.");
  }
  const record = await takeToken(parsed.data.token, "reset");
  if (!record) return jsonError("This reset link is invalid or expired.", 400);
  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  await updateDb((db) => {
    const user = db.users.find((item) => item.id === record.userId);
    if (!user) return;
    user.passwordHash = passwordHash;
    user.tokenVersion += 1;
  });
  return NextResponse.json({ ok: true });
}
