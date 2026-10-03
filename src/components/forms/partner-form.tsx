"use client";

import { useState } from "react";
import { genres, partnerTypes } from "@/content/services";
import { Button, fieldClass } from "@/components/ui";

export function PartnerForm() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <form
      className="grid gap-4 sm:grid-cols-2"
      onSubmit={async (event) => {
        event.preventDefault();
        setBusy(true);
        setMessage("");
        const form = new FormData(event.currentTarget);
        const response = await fetch("/api/partners/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.get("name"),
            email: form.get("email"),
            phone: form.get("phone"),
            country: form.get("country"),
            city: form.get("city"),
            platform: form.get("platform"),
            profileUrl: form.get("profileUrl"),
            audience: form.get("audience"),
            description: form.get("description"),
            proofNote: form.get("proofNote"),
            categories: form.getAll("categories"),
            genres: form.getAll("genres"),
            terms: form.get("terms") === "on",
            company: "",
          }),
        });
        const data = await response.json();
        setBusy(false);
        setMessage(response.ok ? "Application received. Status: pending. An admin must verify the profile before it appears in the network." : data.error);
        if (response.ok) event.currentTarget.reset();
      }}
    >
      {["name", "email", "phone", "country", "city", "platform", "profileUrl", "audience"].map((name) => (
        <label key={name} className="block">
          <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-mist">{name}</span>
          <input className={fieldClass} name={name} required={name !== "profileUrl"} />
        </label>
      ))}
      <fieldset className="sm:col-span-2">
        <legend className="text-sm text-mist">Partner type</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {partnerTypes.map((type) => (
            <label key={type} className="text-sm"><input className="mr-2" type="checkbox" name="categories" value={type} />{type}</label>
          ))}
        </div>
      </fieldset>
      <fieldset className="sm:col-span-2">
        <legend className="text-sm text-mist">Genres</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {genres.map((genre) => (
            <label key={genre} className="text-sm"><input className="mr-2" type="checkbox" name="genres" value={genre} />{genre}</label>
          ))}
        </div>
      </fieldset>
      <label className="sm:col-span-2 block">
        <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-mist">Description</span>
        <textarea className={`${fieldClass} min-h-28`} name="description" required minLength={20} />
      </label>
      <label className="sm:col-span-2 block">
        <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-mist">Proof of ownership</span>
        <textarea className={`${fieldClass} min-h-20`} name="proofNote" required minLength={5} placeholder="Describe the profile, show or station you control. Do not promise guaranteed results." />
      </label>
      <label className="sm:col-span-2 text-sm text-mist">
        <input className="mr-2" type="checkbox" name="terms" required />
        I accept that verification is manual, contact details stay private, and I will not promise guaranteed streams, followers, views or editorial placements.
      </label>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={busy}>{busy ? "Sending" : "Join the network"}</Button>
        {message ? <p className="mt-4 text-sm text-gold">{message}</p> : null}
      </div>
    </form>
  );
}
