import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { jsonError, limit } from "@/lib/http";
import { assertSameOrigin } from "@/lib/rate-limit";
import { getSession } from "@/lib/session";

const types: Record<string, { ext: string; check: (bytes: Uint8Array) => boolean }> = {
  "image/jpeg": { ext: "jpg", check: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  "image/png": { ext: "png", check: (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 },
  "image/webp": { ext: "webp", check: (b) => b[0] === 0x52 && b[1] === 0x49 && b[8] === 0x57 && b[9] === 0x45 },
  "application/pdf": { ext: "pdf", check: (b) => b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46 },
  "audio/mpeg": { ext: "mp3", check: (b) => (b[0] === 0x49 && b[1] === 0x44 && b[2] === 0x33) || (b[0] === 0xff && (b[1] & 0xe0) === 0xe0) },
  "audio/wav": { ext: "wav", check: (b) => b[0] === 0x52 && b[1] === 0x49 && b[8] === 0x57 && b[9] === 0x41 },
};

export async function POST(req: Request) {
  try {
    assertSameOrigin(req);
  } catch {
    return jsonError("Cross-origin request blocked", 403);
  }
  const blocked = limit(req, "upload", 20, 60 * 60 * 1000);
  if (blocked) return blocked;
  const session = await getSession();
  if (!session) return jsonError("Sign in before uploading files.", 401);
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return jsonError("Attach a file.");
  const rule = types[file.type];
  if (!rule) return jsonError("Upload a JPG, PNG, WEBP, PDF, MP3 or WAV file.");
  if (file.size > 15_000_000) return jsonError("Files must be 15MB or smaller.");
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!rule.check(bytes)) return jsonError("The file contents do not match the declared type.");
  const name = `${randomUUID()}.${rule.ext}`;
  const dir = path.join(process.cwd(), "storage", "uploads", session.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, name), bytes);
  return NextResponse.json({ id: name });
}
