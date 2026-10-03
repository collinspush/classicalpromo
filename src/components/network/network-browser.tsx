"use client";

import { useMemo, useState } from "react";
import { DemoMark } from "@/components/ui";
import type { PartnerRecord } from "@/lib/types";

export type PublicPartner = Pick<PartnerRecord, "id" | "name" | "categories" | "country" | "city" | "genres" | "platform" | "audience" | "description" | "status">;

export function NetworkBrowser({ partners }: { partners: PublicPartner[] }) {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All");
  const [city, setCity] = useState("All");
  const [genre, setGenre] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [category, setCategory] = useState("All");
  const countries = ["All", ...new Set(partners.map((item) => item.country))];
  const cities = ["All", ...new Set(partners.map((item) => item.city))];
  const genres = ["All", ...new Set(partners.flatMap((item) => item.genres))];
  const platforms = ["All", ...new Set(partners.map((item) => item.platform))];
  const categories = ["All", ...new Set(partners.flatMap((item) => item.categories))];
  const visible = useMemo(
    () =>
      partners.filter((item) => {
        const text = `${item.name} ${item.city} ${item.genres.join(" ")} ${item.audience}`.toLowerCase();
        return (
          text.includes(query.toLowerCase()) &&
          (country === "All" || item.country === country) &&
          (city === "All" || item.city === city) &&
          (genre === "All" || item.genres.includes(genre)) &&
          (platform === "All" || item.platform === platform) &&
          (category === "All" || item.categories.includes(category))
        );
      }),
    [partners, query, country, city, genre, platform, category],
  );
  return (
    <div>
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        <input className="rounded-md border border-white/10 bg-ink px-3 py-3 text-sm" placeholder="Search" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search the network" />
        <Select label="Country" value={country} options={countries} onChange={setCountry} />
        <Select label="City" value={city} options={cities} onChange={setCity} />
        <Select label="Genre" value={genre} options={genres} onChange={setGenre} />
        <Select label="Platform" value={platform} options={platforms} onChange={setPlatform} />
        <Select label="Category" value={category} options={categories} onChange={setCategory} />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {visible.map((partner) => (
          <article key={partner.id} className="rounded-xl border border-white/10 bg-panel p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl">{partner.name}</h2>
                <p className="mt-1 text-sm text-mist">{partner.categories.join(" · ")}</p>
              </div>
              <DemoMark>{partner.status === "VERIFIED" ? "Verified sample" : partner.status}</DemoMark>
            </div>
            <p className="mt-4 text-sm text-ivory/90">{partner.city}, {partner.country}</p>
            <p className="mt-1 text-sm text-mist">{partner.platform} · {partner.audience}</p>
            <p className="mt-3 text-sm text-mist">{partner.genres.join(", ")}</p>
            <p className="mt-4 text-sm leading-relaxed text-dim">{partner.description}</p>
          </article>
        ))}
        {visible.length === 0 ? <p className="text-mist">No partners match those filters.</p> : null}
      </div>
    </div>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <select className="rounded-md border border-white/10 bg-ink px-3 py-3 text-sm" aria-label={label} value={value} onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}
