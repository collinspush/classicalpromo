"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { budgetOptions, defaultPackages } from "@/config/pricing";
import { countries, genres, goals, markets } from "@/content/services";
import { recommendPackage, servicesForGoals } from "@/lib/recommend";
import { Button, fieldClass } from "@/components/ui";

const steps = ["Artist", "Release", "Goals", "Audience", "Budget", "Recommendation"];

const empty = {
  artistName: "",
  email: "",
  phone: "",
  country: "Nigeria",
  city: "",
  genre: "Afrobeats",
  website: "",
  instagram: "",
  tiktok: "",
  youtube: "",
  spotify: "",
  appleMusic: "",
  audiomack: "",
  songTitle: "",
  songArtist: "",
  featured: "",
  releaseGenre: "Afrobeats",
  releaseDate: "",
  isrc: "",
  songLink: "",
  artworkName: "",
  lyrics: "",
  videoLink: "",
  pressKitName: "",
  goals: [] as string[],
  markets: [] as string[],
  audienceGenres: [] as string[],
  budget: "50000",
  customBudget: "",
  company: "",
};

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function PitchWizard({ preset, authenticated = false }: { preset?: Partial<typeof empty>; authenticated?: boolean }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ ...empty, ...preset });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [submissionId, setSubmissionId] = useState("");

  const recommendation = useMemo(() => recommendPackage(form.goals, form.budget), [form.goals, form.budget]);
  const packageInfo = defaultPackages.find((item) => item.id === recommendation);
  const recommendedServices = servicesForGoals(form.goals, recommendation);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function validate(index: number) {
    if (index === 0 && (!form.artistName || !form.email.includes("@") || form.phone.length < 7 || !form.city)) {
      return "Add the artist name, a real email, a phone number and a city.";
    }
    if (index === 1 && (!form.songTitle || !form.songArtist || !form.songLink)) {
      return "Song title, artist and a song link are required. ISRC can wait.";
    }
    if (index === 2 && form.goals.length === 0) return "Choose at least one campaign goal.";
    if (index === 3 && (form.markets.length === 0 || form.audienceGenres.length === 0)) {
      return "Choose at least one country and one genre.";
    }
    if (index === 4 && form.budget === "custom" && !form.customBudget) return "Enter a custom budget, or pick a listed amount.";
    return "";
  }

  async function next() {
    const issue = validate(step);
    if (issue) {
      setError(issue);
      return;
    }
    setError("");
    if (step === 4) {
      setBusy(true);
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      setBusy(false);
      if (!response.ok) {
        setError(data.error ?? "The pitch could not be saved.");
        return;
      }
      setSubmissionId(data.id);
    }
    setStep((value) => Math.min(value + 1, steps.length - 1));
  }

  function start() {
    const nextUrl = `/checkout?package=${recommendation}&submission=${submissionId}`;
    router.push(authenticated ? nextUrl : `/register?next=${encodeURIComponent(nextUrl)}`);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
      <ol className="flex gap-2 overflow-auto lg:block lg:space-y-2">
        {steps.map((label, index) => (
          <li key={label} className={`rounded-md px-3 py-2 text-sm ${index === step ? "bg-white/5 text-ivory" : "text-dim"}`}>
            <span className="mr-2 text-gold">0{index + 1}</span>
            {label}
          </li>
        ))}
      </ol>
      <div className="rounded-2xl border border-white/10 bg-panel p-5 sm:p-8">
        {step === 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Text label="Artist name" value={form.artistName} onChange={(value) => set("artistName", value)} />
            <Text label="Email" type="email" value={form.email} onChange={(value) => set("email", value)} />
            <Text label="Phone" value={form.phone} onChange={(value) => set("phone", value)} />
            <Select label="Country" value={form.country} options={countries} onChange={(value) => set("country", value)} />
            <Text label="City" value={form.city} onChange={(value) => set("city", value)} />
            <Select label="Genre" value={form.genre} options={genres} onChange={(value) => set("genre", value)} />
            <Text label="Artist website" value={form.website} onChange={(value) => set("website", value)} />
            <Text label="Instagram" value={form.instagram} onChange={(value) => set("instagram", value)} />
            <Text label="TikTok" value={form.tiktok} onChange={(value) => set("tiktok", value)} />
            <Text label="YouTube" value={form.youtube} onChange={(value) => set("youtube", value)} />
            <Text label="Spotify" value={form.spotify} onChange={(value) => set("spotify", value)} />
            <Text label="Apple Music" value={form.appleMusic} onChange={(value) => set("appleMusic", value)} />
            <Text label="Audiomack" value={form.audiomack} onChange={(value) => set("audiomack", value)} />
          </div>
        ) : null}
        {step === 1 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Text label="Song title" value={form.songTitle} onChange={(value) => set("songTitle", value)} />
            <Text label="Artist" value={form.songArtist} onChange={(value) => set("songArtist", value)} />
            <Text label="Featured artists" value={form.featured} onChange={(value) => set("featured", value)} />
            <Select label="Genre" value={form.releaseGenre} options={genres} onChange={(value) => set("releaseGenre", value)} />
            <Text label="Release date" type="date" value={form.releaseDate} onChange={(value) => set("releaseDate", value)} />
            <Text label="ISRC (optional)" value={form.isrc} onChange={(value) => set("isrc", value)} />
            <Text label="Song link" value={form.songLink} onChange={(value) => set("songLink", value)} />
            <Text label="Music video link" value={form.videoLink} onChange={(value) => set("videoLink", value)} />
            <File label="Cover artwork" accept="image/png,image/jpeg,image/webp" onName={(name) => set("artworkName", name)} />
            <File label="Press kit" accept="application/pdf" onName={(name) => set("pressKitName", name)} />
            <label className="sm:col-span-2 block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-mist">Lyrics</span>
              <textarea className={`${fieldClass} min-h-28`} value={form.lyrics} onChange={(event) => set("lyrics", event.target.value)} />
            </label>
          </div>
        ) : null}
        {step === 2 ? <Checks legend="Campaign goals" options={goals} selected={form.goals} onToggle={(value) => set("goals", toggle(form.goals, value))} /> : null}
        {step === 3 ? (
          <div className="space-y-8">
            <Checks legend="Countries" options={markets} selected={form.markets} onToggle={(value) => set("markets", toggle(form.markets, value))} />
            <Checks legend="Genres" options={genres} selected={form.audienceGenres} onToggle={(value) => set("audienceGenres", toggle(form.audienceGenres, value))} />
          </div>
        ) : null}
        {step === 4 ? (
          <fieldset>
            <legend className="text-lg">Budget</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {budgetOptions.map((option) => (
                <label key={option.id} className={`cursor-pointer rounded-lg border px-4 py-3 ${form.budget === option.id ? "border-gold" : "border-white/10"}`}>
                  <input className="mr-2" type="radio" name="budget" checked={form.budget === option.id} onChange={() => set("budget", option.id)} />
                  {option.label}
                </label>
              ))}
            </div>
            {form.budget === "custom" ? (
              <div className="mt-4">
                <Text label="Custom amount (NGN)" value={form.customBudget} onChange={(value) => set("customBudget", value)} />
              </div>
            ) : null}
          </fieldset>
        ) : null}
        {step === 5 && packageInfo ? (
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-gold">Based on your goals, we recommend…</p>
            <h2 className="mt-3 font-display text-5xl uppercase tracking-[-0.04em]">{packageInfo.name}</h2>
            <p className="mt-3 max-w-xl text-mist">{packageInfo.audience}</p>
            <p className="mt-6 text-sm text-dim">Recommended services follow the goals you selected. This is a scope, not a guarantee of streams, placement or virality.</p>
            <ul className="mt-4 space-y-2">
              {recommendedServices.map((service) => (
                <li key={service} className="border-t border-white/10 py-2 text-sm">
                  {service}
                </li>
              ))}
            </ul>
            <Button className="mt-8" onClick={start}>
              Start this campaign
            </Button>
          </div>
        ) : null}
        <input className="hidden" tabIndex={-1} autoComplete="off" value={form.company} onChange={(event) => set("company", event.target.value)} aria-hidden />
        {error ? <p className="mt-4 text-sm text-gold">{error}</p> : null}
        {step < 5 ? (
          <div className="mt-8 flex justify-between">
            <Button variant="line" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}>
              Back
            </Button>
            <Button onClick={next} disabled={busy}>
              {step === 4 ? (busy ? "Saving" : "See recommendation") : "Continue"}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Text({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-mist">{label}</span>
      <input className={fieldClass} type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-mist">{label}</span>
      <select className={fieldClass} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function Checks({ legend, options, selected, onToggle }: { legend: string; options: readonly string[]; selected: string[]; onToggle: (value: string) => void }) {
  return (
    <fieldset>
      <legend className="text-lg">{legend}</legend>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label key={option} className={`rounded-md border px-3 py-2 text-sm ${selected.includes(option) ? "border-gold text-ivory" : "border-white/10 text-mist"}`}>
            <input className="mr-2" type="checkbox" checked={selected.includes(option)} onChange={() => onToggle(option)} />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function File({ label, accept, onName }: { label: string; accept: string; onName: (name: string) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-mist">{label}</span>
      <input
        className={`${fieldClass} file:mr-3 file:border-0 file:bg-transparent file:text-gold`}
        type="file"
        accept={accept}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          if (file.size > 8_000_000) {
            event.target.value = "";
            return;
          }
          onName(file.name);
        }}
      />
    </label>
  );
}
