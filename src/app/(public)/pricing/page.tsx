import type { Metadata } from "next";
import { servicePrices } from "@/config/pricing";
import { Button, Container, PageHeader } from "@/components/ui";
import { naira } from "@/lib/format";
import { getPackages } from "@/lib/pricing-data";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent ClassicalPromo pricing for playlist, TikTok, Instagram, radio, DJ, YouTube, blog, PR and full campaigns.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  const packages = getPackages();
  return (
    <>
      <PageHeader eyebrow="Pricing" title="Know what you are buying." lede="Prices are starting points in naira, stored so they can be updated. A custom brief is scoped before any work begins." />
      <Container className="py-14">
        <div className="grid gap-4 lg:grid-cols-4">
          {packages.map((item) => (
            <article key={item.id} className={`rounded-xl border p-5 ${item.featured ? "border-gold/50" : "border-white/10"}`}>
              <h2 className="font-display text-3xl">{item.name}</h2>
              <p className="mt-2 text-sm text-mist">{item.audience}</p>
              <p className="mt-5 text-2xl">{item.priceNgn ? naira(item.priceNgn) : "Custom"}</p>
              <p className="text-xs text-dim">{item.duration}</p>
              <ul className="mt-4 space-y-2 text-sm">{item.services.map((service) => <li key={service}>{service}</li>)}</ul>
              <p className="mt-4 text-sm text-mist">{item.reporting}</p>
              <Button href={`/pitch?package=${item.id}`} className="mt-5">Start a campaign</Button>
            </article>
          ))}
        </div>
        <div className="mt-16 space-y-8">
          {servicePrices.map((service) => (
            <article key={service.id} id={service.id} className="grid gap-6 border-t border-white/10 py-8 lg:grid-cols-4">
              <div>
                <h3 className="text-2xl">{service.name}</h3>
                <p className="mt-2 text-gold">From {naira(service.fromNgn)}</p>
                <p className="text-sm text-dim">{service.duration}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-mist">Included</p>
                <ul className="mt-2 space-y-1 text-sm">{service.included.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-mist">You receive</p>
                <ul className="mt-2 space-y-1 text-sm">{service.receives.map((item) => <li key={item}>{item}</li>)}</ul>
                <p className="mt-3 text-sm text-mist">{service.reporting}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-mist">Not guaranteed</p>
                <ul className="mt-2 space-y-1 text-sm text-mist">{service.notGuaranteed.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-white/10 p-8">
          <h2 className="font-display text-4xl uppercase">Need something custom?</h2>
          <p className="mt-3 max-w-xl text-mist">Labels, managers and established artists can brief a scope instead of a package.</p>
          <Button href="/pitch?package=custom" className="mt-6">Build a custom campaign</Button>
        </div>
      </Container>
    </>
  );
}
