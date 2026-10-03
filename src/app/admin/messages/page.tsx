import { MessagePanel } from "@/components/messages/message-panel";
import { getSession } from "@/lib/session";
import { readDb } from "@/lib/store";

export default async function AdminMessages() {
  const session = await getSession();
  const messages = readDb().messages.filter((message) => session && (message.participantIds.includes(session.id) || session.role === "ADMIN"));
  const ids = [...new Set(messages.map((message) => message.threadId))];
  const threads = ids.map((id) => ({
    id,
    title: id === "thr_partner" ? "Partner desk" : "Artist desk",
    messages: messages.filter((message) => message.threadId === id),
  }));
  return (
    <div>
      <h1 className="font-display text-4xl uppercase">Messages</h1>
      <div className="mt-6"><MessagePanel threads={threads} /></div>
    </div>
  );
}
