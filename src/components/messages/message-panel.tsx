"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, fieldClass } from "@/components/ui";
import type { MessageRecord } from "@/lib/types";

export function MessagePanel({ threads }: { threads: { id: string; title: string; messages: MessageRecord[] }[] }) {
  const router = useRouter();
  const [active, setActive] = useState(threads[0]?.id ?? "");
  const [body, setBody] = useState("");
  const current = threads.find((thread) => thread.id === active);
  return (
    <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
      <div className="space-y-2">
        {threads.map((thread) => (
          <button key={thread.id} className={`w-full rounded-md border px-3 py-3 text-left text-sm ${active === thread.id ? "border-gold" : "border-white/10"}`} onClick={() => setActive(thread.id)}>
            {thread.title}
          </button>
        ))}
        {threads.length === 0 ? <p className="text-sm text-mist">No messages yet.</p> : null}
      </div>
      <div className="rounded-xl border border-white/10 bg-panel p-4">
        <div className="space-y-4">
          {current?.messages.map((message) => (
            <article key={message.id}>
              <p className="text-xs uppercase tracking-[0.14em] text-gold">{message.senderName}</p>
              <p className="mt-1 text-sm leading-relaxed">{message.body}</p>
            </article>
          ))}
        </div>
        {current ? (
          <form
            className="mt-6 space-y-3"
            onSubmit={async (event) => {
              event.preventDefault();
              await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ threadId: current.id, body }),
              });
              setBody("");
              router.refresh();
            }}
          >
            <textarea className={`${fieldClass} min-h-24`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Write to the ClassicalPromo desk" required />
            <Button type="submit">Send</Button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
