import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { sanitize } from "@/lib/format";
import { jsonError, limit, parseBody } from "@/lib/http";
import { getSession } from "@/lib/session";
import { notify, readDb, updateDb } from "@/lib/store";
import { messageSchema } from "@/lib/validators";

export async function POST(req: Request) {
  const blocked = limit(req, "message", 30, 10 * 60 * 1000);
  if (blocked) return blocked;
  const session = await getSession();
  if (!session) return jsonError("Sign in to send a message.", 401);
  const parsed = await parseBody(req, messageSchema);
  if ("error" in parsed) return parsed.error;
  const thread = readDb().messages.filter((item) => item.threadId === parsed.data.threadId);
  if (!thread.length) return jsonError("Thread not found.", 404);
  const allowed = thread.some((item) => item.participantIds.includes(session.id)) || session.role === "ADMIN";
  if (!allowed) return jsonError("You cannot write in this thread.", 403);
  const participants = thread[0].participantIds;
  updateDb((db) => {
    db.messages.push({
      id: `msg_${randomUUID()}`,
      threadId: parsed.data.threadId,
      campaignId: thread[0].campaignId,
      senderId: session.id,
      senderName: session.role === "ADMIN" ? "ClassicalPromo desk" : session.name,
      senderRole: session.role,
      body: sanitize(parsed.data.body),
      createdAt: new Date().toISOString(),
      participantIds: participants.includes(session.id) ? participants : [...participants, session.id],
    });
  });
  participants
    .filter((id) => id !== session.id)
    .forEach((id) => notify(id, "message", "New message", "You have a new message in your campaign desk."));
  return NextResponse.json({ ok: true });
}
