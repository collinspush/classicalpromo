import { MessagePanel } from "@/components/messages/message-panel";
import { getSession } from "@/lib/session";
import { readDb } from "@/lib/store";

export default async function MessagesPage() {
  const session = await getSession();
  const messages = readDb().messages.filter((message) => session && message.participantIds.includes(session.id));
  const ids = [...new Set(messages.map((message) => message.threadId))];
  const threads = ids.map((id) => ({
    id,
    title: messages.find((message) => message.threadId === id)?.campaignId ? "Campaign desk" : "ClassicalPromo",
    messages: messages.filter((message) => message.threadId === id),
  }));
  return (
    <div>
      <h1 className="font-display text-4xl uppercase">Messages</h1>
      <p className="mt-3 text-sm text-mist">You are writing to the ClassicalPromo desk. Partner phone numbers are not shown.</p>
      <div className="mt-6"><MessagePanel threads={threads} /></div>
    </div>
  );
}
