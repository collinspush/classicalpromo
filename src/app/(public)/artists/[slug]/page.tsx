import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Container, DemoMark } from "@/components/ui";
import { readDb } from "@/lib/store";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const user = (await readDb()).users.find((item) => item.profile?.slug === slug);
  if (!user?.profile) return {};
  return { title: user.profile.stageName, description: user.profile.bio, alternates: { canonical: `/artists/${slug}` } };
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const user = (await readDb()).users.find((item) => item.profile?.slug === slug);
  const profile = user?.profile;
  if (!user || !profile) notFound();
  const campaigns = (await readDb()).campaigns.filter((campaign) => campaign.artistId === user.id);
  const links = [
    ["Website", profile.website],
    ["Instagram", profile.instagram],
    ["TikTok", profile.tiktok],
    ["YouTube", profile.youtube],
    ["Spotify", profile.spotify],
    ["Apple Music", profile.appleMusic],
    ["Audiomack", profile.audiomack],
  ].filter(([, href]) => href);
  return (
    <Container className="py-16">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "MusicGroup", name: profile.stageName, genre: profile.genres, url: `${site.url}/artists/${slug}`, description: profile.bio }} />
      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        <Image src={profile.image} alt={`${profile.stageName} portrait`} width={560} height={700} className="h-[360px] w-full rounded-xl object-cover" />
        <div>
          {user.demo ? <DemoMark>Sample profile</DemoMark> : null}
          {profile.verified ? <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-gold">ClassicalPromo verified artist</p> : null}
          <h1 className="mt-3 font-display text-6xl uppercase tracking-[-0.045em]">{profile.stageName}</h1>
          <p className="mt-3 text-mist">{profile.genres.join(" · ") || "Artist"} · {profile.city}, {profile.country}</p>
          <p className="mt-6 max-w-2xl leading-relaxed text-ivory/90">{profile.bio}</p>
          <h2 className="mt-8 text-sm uppercase tracking-[0.16em] text-mist">Links</h2>
          <ul className="mt-3 flex flex-wrap gap-3 text-sm">
            {links.map(([label, href]) => (
              <li key={label}><a className="text-gold" href={href}>{label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <section className="mt-14">
        <h2 className="font-display text-3xl uppercase">Latest release</h2>
        <p className="mt-3 text-mist">{campaigns[0]?.songTitle ?? "No public release is attached yet."}</p>
      </section>
      <section className="mt-10">
        <h2 className="font-display text-3xl uppercase">Featured campaigns</h2>
        <ul className="mt-4 space-y-3">
          {campaigns.map((campaign) => (
            <li key={campaign.id} className="border-t border-white/10 py-3 text-sm">
              {campaign.songTitle} · {campaign.packageName} · {campaign.status}
              {campaign.demo ? " · Demo data" : ""}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-10">
        <h2 className="font-display text-3xl uppercase">Press coverage</h2>
        <p className="mt-3 text-mist">Awaiting published coverage. Links will appear here only when a story exists.</p>
      </section>
    </Container>
  );
}
