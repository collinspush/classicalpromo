import { NextResponse } from "next/server";
import { z } from "zod";
import { jsonError, limit, parseBody } from "@/lib/http";
import { takeToken, updateDb } from "@/lib/store";

const schema = z.object({ token: z.string().min(10) });

export async function POST(req: Request) {
  const blocked = limit(req, "verify", 10, 15 * 60 * 1000);
  if (blocked) return blocked;
  const parsed = await parseBody(req, schema);
  if ("error" in parsed) return parsed.error;
  const record = takeToken(parsed.data.token, "verify");
  if (!record) return jsonError("This verification link is invalid or expired.", 400);
  updateDb((db) => {
    const user = db.users.find((item) => item.id === record.userId);
    if (user) user.emailVerified = true;
  });
  return NextResponse.json({ ok: true });
}
