import type { Metadata } from "next";
import Link from "next/link";
import { Container, DemoMark, PageHeader } from "@/components/ui";
import { naira } from "@/lib/format";
import { readDb } from "@/lib/store";

export const metadata: Metadata = {
  title: "Promotion marketplace",
  description: "Find playlist, DJ, radio, TikTok, Instagram, YouTube, blog, PR and creator campaigns. Listings cannot promise guaranteed results.",
  alternates: { canonical: "/marketplace" },
};

export default async function MarketplacePage() {
  const listings = (await readDb()).listings.filter((item) => item.active);
  return (
    <>
      <PageHeader eyebrow="Marketplace" title="Find the right promotion channel." lede="Artists can compare campaign types by audience, country, genre and deliverables. A verified mark means the listing was reviewed. It does not mean a result is guaranteed." />
      <Container className="grid gap-4 py-12 md:grid-cols-2">
        {listings.map((listing) => (
          <Link key={listing.id} href={`/marketplace/${listing.slug}`} className="rounded-xl border border-white/10 bg-panel p-5 hover:border-gold/40">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{listing.category}</p>
                <h2 className="mt-2 text-2xl">{listing.service}</h2>
              </div>
              <DemoMark>{listing.verified ? "Verified sample" : "Unverified"}</DemoMark>
            </div>
            <p className="mt-4 text-sm text-mist">{listing.audience} · {listing.country} · {listing.genre}</p>
            <p className="mt-4 text-xl">{naira(listing.priceNgn)}</p>
            <p className="text-xs text-dim">{listing.duration}</p>
          </Link>
        ))}
      </Container>
    </>
  );
}
