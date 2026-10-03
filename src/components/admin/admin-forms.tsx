"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, fieldClass } from "@/components/ui";

async function post(payload: Record<string, unknown>) {
  const response = await fetch("/api/admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return { ok: response.ok, error: data.error as string | undefined };
}

export function RedirectForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  return (
    <form
      className="grid gap-3 sm:grid-cols-2"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const result = await post({
          action: "redirect",
          oldUrl: form.get("oldUrl"),
          newUrl: form.get("newUrl"),
          type: Number(form.get("type")),
          redirectStatus: form.get("redirectStatus"),
        });
        setMessage(result.ok ? "Redirect saved. Old paths are kept and can be deactivated. They are not deleted." : result.error ?? "Could not save.");
        if (result.ok) router.refresh();
      }}
    >
      <input className={fieldClass} name="oldUrl" placeholder="/old-path" required />
      <input className={fieldClass} name="newUrl" placeholder="/new-path" required />
      <select className={fieldClass} name="type" defaultValue="301"><option value="301">301</option><option value="302">302</option></select>
      <select className={fieldClass} name="redirectStatus" defaultValue="active"><option value="active">active</option><option value="inactive">inactive</option></select>
      <Button type="submit">Save redirect</Button>
      {message ? <p className="text-sm text-gold sm:col-span-2">{message}</p> : null}
    </form>
  );
}

export function SettingsDesk({ bankName, accountName, accountNumber }: { bankName: string; accountName: string; accountNumber: string }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  return (
    <div className="space-y-8">
      <form
        className="grid max-w-lg gap-3"
        onSubmit={async (event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const result = await post({
            action: "settings",
            bankName: form.get("bankName"),
            accountName: form.get("accountName"),
            accountNumber: form.get("accountNumber"),
          });
          setMessage(result.ok ? "Bank details saved." : result.error ?? "Could not save.");
          if (result.ok) router.refresh();
        }}
      >
        <input className={fieldClass} name="bankName" defaultValue={bankName} />
        <input className={fieldClass} name="accountName" defaultValue={accountName} />
        <input className={fieldClass} name="accountNumber" defaultValue={accountNumber} />
        <Button type="submit">Save bank details</Button>
      </form>
      <form
        className="grid max-w-lg gap-3"
        onSubmit={async (event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const raw = String(form.get("price") ?? "");
          const result = await post({
            action: "settings",
            packageId: form.get("packageId"),
            price: raw === "" ? null : Number(raw),
          });
          setMessage(result.ok ? "Package price updated." : result.error ?? "Could not save.");
          if (result.ok) router.refresh();
        }}
      >
        <select className={fieldClass} name="packageId" defaultValue="starter">
          <option value="starter">Starter</option>
          <option value="growth">Growth</option>
          <option value="breakout">Breakout</option>
          <option value="custom">Custom</option>
        </select>
        <input className={fieldClass} name="price" placeholder="Price in NGN, blank to mark scoped" />
        <Button type="submit">Update package price</Button>
      </form>
      {message ? <p className="text-sm text-gold">{message}</p> : null}
    </div>
  );
}

export function ArticleForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  return (
    <form
      className="grid max-w-2xl gap-3"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const result = await post({
          action: "article",
          title: form.get("title"),
          excerpt: form.get("excerpt"),
          category: form.get("category"),
          body: form.get("body"),
        });
        setMessage(result.ok ? "Article published to the media desk." : result.error ?? "Could not publish.");
        if (result.ok) router.refresh();
      }}
    >
      <input className={fieldClass} name="title" placeholder="Title" required />
      <input className={fieldClass} name="excerpt" placeholder="Excerpt" required />
      <input className={fieldClass} name="category" placeholder="News" defaultValue="News" required />
      <textarea className={`${fieldClass} min-h-32`} name="body" placeholder="Paragraphs, separated by a blank line" required />
      <Button type="submit">Publish</Button>
      {message ? <p className="text-sm text-gold">{message}</p> : null}
    </form>
  );
}
