import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { jsonError, limit, parseBody } from "@/lib/http";
import { getSession } from "@/lib/session";
import { notify, readDb, updateDb } from "@/lib/store";
import { sanitize } from "@/lib/format";
import { recommendPackage } from "@/lib/recommend";
import { pitchSchema } from "@/lib/validators";
import type { PitchPayload } from "@/lib/types";

export async function POST(req: Request) {
  const blocked = limit(req, "pitch", 8, 60 * 60 * 1000);
  if (blocked) return blocked;
  const parsed = await parseBody(req, pitchSchema);
  if ("error" in parsed) return parsed.error;
  if (parsed.data.company) return NextResponse.json({ id: "ignored" });
  const session = await getSession();
  const packageId = recommendPackage(parsed.data.goals, parsed.data.budget);
  const payload = {
    ...parsed.data,
    artistName: sanitize(parsed.data.artistName),
    songTitle: sanitize(parsed.data.songTitle),
    lyrics: sanitize(parsed.data.lyrics ?? ""),
    packageId,
  } as PitchPayload;
  const id = `sub_${randomUUID()}`;
  await updateDb((db) => {
    db.submissions.unshift({
      id,
      userId: session?.id ?? null,
      email: payload.email.toLowerCase(),
      payload,
      createdAt: new Date().toISOString(),
    });
  });
  if (session) await notify(session.id, "song_submitted", "Song submitted", `${payload.songTitle} is in the pitch queue.`);
  return NextResponse.json({ id, packageId });
}
