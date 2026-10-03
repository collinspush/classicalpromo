import { MessagePanel } from "@/components/messages/message-panel";
import { DemoMark } from "@/components/ui";
import { getSession } from "@/lib/session";
import { readDb } from "@/lib/store";

export default async function PartnerHome() {
  const session = await getSession();
  const partner = readDb().partners.find((item) => item.userId === session?.id);
  const messages = readDb().messages.filter((message) => session && message.participantIds.includes(session.id));
  const threads = [...new Set(messages.map((message) => message.threadId))].map((id) => ({
    id,
    title: "ClassicalPromo desk",
    messages: messages.filter((message) => message.threadId === id),
  }));
  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center gap-3">
        <h1 className="font-display text-4xl uppercase">Partner desk</h1>
        {partner?.status ? <DemoMark>{partner.status}</DemoMark> : null}
      </div>
      <p className="mt-3 max-w-2xl text-sm text-mist">You can see campaigns assigned through the desk. Artist phone numbers are not included. Do not promise spins, streams or placements in your replies.</p>
      <section className="mt-8">
        <h2 className="text-sm uppercase tracking-[0.16em] text-mist">Assigned notes</h2>
        <p className="mt-3 text-sm">Demo campaign: My New Song · DJ servicing · report what you played, or say it is not a fit.</p>
      </section>
      <section className="mt-8">
        <h2 className="text-sm uppercase tracking-[0.16em] text-mist">Messages</h2>
        <div className="mt-4"><MessagePanel threads={threads} /></div>
      </section>
    </div>
  );
}
