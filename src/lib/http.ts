import { NextResponse } from "next/server";
import type { ZodSchema } from "zod";
import { assertSameOrigin, clientKey, rateLimit } from "@/lib/rate-limit";

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function parseBody<T>(req: Request, schema: ZodSchema<T>) {
  try {
    assertSameOrigin(req);
  } catch {
    return { error: jsonError("Cross-origin request blocked", 403) };
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return { error: jsonError("Invalid JSON") };
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return { error: jsonError(parsed.error.issues[0]?.message ?? "Check the form and try again") };
  }
  return { data: parsed.data };
}

export function limit(req: Request, bucket: string, max: number, windowMs: number) {
  const result = rateLimit(clientKey(req, bucket), max, windowMs);
  if (!result.ok) return jsonError("Too many attempts. Wait a few minutes and try again.", 429);
  return null;
}
