"use client";

import { useState } from "react";
import { Button, fieldClass } from "@/components/ui";

type Profile = {
  phone: string;
  country: string;
  city: string;
  bio: string;
  website: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  spotify: string;
  appleMusic: string;
  audiomack: string;
  genres: string;
  notifyEmail: boolean;
};

export function ProfileForm({ initial }: { initial: Profile }) {
  const [message, setMessage] = useState("");
  return (
    <form
      className="grid gap-4 sm:grid-cols-2"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const response = await fetch("/api/account", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "profile",
            phone: form.get("phone"),
            country: form.get("country"),
            city: form.get("city"),
            bio: form.get("bio"),
            website: form.get("website"),
            instagram: form.get("instagram"),
            tiktok: form.get("tiktok"),
            youtube: form.get("youtube"),
            spotify: form.get("spotify"),
            appleMusic: form.get("appleMusic"),
            audiomack: form.get("audiomack"),
            genres: form.get("genres"),
          }),
        });
        setMessage(response.ok ? "Profile saved." : "Could not save the profile.");
      }}
    >
      {(["phone", "country", "city", "website", "instagram", "tiktok", "youtube", "spotify", "appleMusic", "audiomack", "genres"] as const).map((name) => (
        <label key={name} className="block">
          <span className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-mist">{name}</span>
          <input className={fieldClass} name={name} defaultValue={initial[name]} />
        </label>
      ))}
      <label className="sm:col-span-2 block">
        <span className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-mist">Bio</span>
        <textarea className={`${fieldClass} min-h-28`} name="bio" defaultValue={initial.bio} />
      </label>
      <div className="sm:col-span-2">
        <Button type="submit">Save profile</Button>
        {message ? <p className="mt-3 text-sm text-gold">{message}</p> : null}
      </div>
    </form>
  );
}

export function SettingsForm({ notifyEmail }: { notifyEmail: boolean }) {
  const [message, setMessage] = useState("");
  return (
    <div className="space-y-10">
      <form
        className="space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const response = await fetch("/api/account", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "notifications", notifyEmail: form.get("notifyEmail") === "on" }),
          });
          setMessage(response.ok ? "Notification preference saved. Email is queued in the outbox until SMTP is configured." : "Could not save.");
        }}
      >
        <label className="text-sm"><input className="mr-2" type="checkbox" name="notifyEmail" defaultChecked={notifyEmail} /> Email me about campaign, payment and message updates</label>
        <Button type="submit">Save notifications</Button>
      </form>
      <form
        className="max-w-md space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const response = await fetch("/api/account", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "password", currentPassword: form.get("currentPassword"), nextPassword: form.get("nextPassword") }),
          });
          const data = await response.json();
          setMessage(response.ok ? "Password updated. Log in again." : data.error);
        }}
      >
        <input className={fieldClass} type="password" name="currentPassword" placeholder="Current password" required />
        <input className={fieldClass} type="password" name="nextPassword" placeholder="New password" required />
        <Button type="submit">Change password</Button>
      </form>
      {message ? <p className="text-sm text-gold">{message}</p> : null}
    </div>
  );
}
