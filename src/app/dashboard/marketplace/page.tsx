import Link from "next/link";
import { naira } from "@/lib/format";
import { readDb } from "@/lib/store";

export default function DashboardMarketplace() {
  const listings = readDb().listings.filter((item) => item.active);
  return (
    <div>
      <h1 className="font-display text-4xl uppercase">Promotion marketplace</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {listings.map((listing) => (
          <Link key={listing.id} href={`/marketplace/${listing.slug}`} className="rounded-xl border border-white/10 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-gold">{listing.category}</p>
            <h2 className="mt-2 text-xl">{listing.service}</h2>
            <p className="mt-2 text-sm text-mist">{listing.country} · {listing.genre} · {naira(listing.priceNgn)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
