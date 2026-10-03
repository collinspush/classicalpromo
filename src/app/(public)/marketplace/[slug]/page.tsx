import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button, Container, DemoMark } from "@/components/ui";
import { naira } from "@/lib/format";
import { readDb } from "@/lib/store";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const listing = (await readDb()).listings.find((item) => item.slug === slug);
  if (!listing) return {};
  return { title: listing.service, description: `${listing.service} for ${listing.genre} audiences in ${listing.country}.`, alternates: { canonical: `/marketplace/${slug}` } };
}

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = (await readDb()).listings.find((item) => item.slug === slug && item.active);
  if (!listing) notFound();
  return (
    <Container className="py-16">
      <DemoMark>Sample listing</DemoMark>
      <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-gold">{listing.category}</p>
      <h1 className="mt-3 font-display text-5xl uppercase tracking-[-0.04em]">{listing.service}</h1>
      <p className="mt-4 text-mist">{listing.audience} · {listing.country} · {listing.genre}</p>
      <p className="mt-6 text-3xl">{naira(listing.priceNgn)}</p>
      <p className="text-sm text-dim">{listing.duration} · {listing.verified ? "Reviewed sample" : "Not yet verified"}</p>
      <h2 className="mt-8 text-lg">Deliverables</h2>
      <ul className="mt-3 space-y-2 text-mist">{listing.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
      <p className="mt-6 max-w-xl text-sm text-dim">This listing cannot promise guaranteed streams, followers, views or editorial placements. You are buying described promotional activity.</p>
      <Button href="/pitch" className="mt-8">Start a campaign</Button>
    </Container>
  );
}
