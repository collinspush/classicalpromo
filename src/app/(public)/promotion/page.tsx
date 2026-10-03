import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";
import { Button, Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Promotion services",
  description: "Playlist, creator, radio, DJ, blog, press and release campaigns from ClassicalPromo. Activity is reported. Results are not guaranteed.",
  alternates: { canonical: "/promotion" },
};

export default function PromotionPage() {
  return (
    <>
      <PageHeader eyebrow="Explore promotion" title="Promote your music everywhere that matters." lede="Twelve ways to put a record in front of the people who might use it. Every service describes the work, not a promised outcome." />
      <Container className="divide-y divide-white/10 py-8">
        {services.map((service, index) => (
          <article key={service.id} id={service.id} className="grid gap-6 py-10 lg:grid-cols-[180px_1fr_auto]">
            <p className="text-gold">0{index + 1}</p>
            <div>
              <h2 className="font-display text-4xl uppercase tracking-[-0.04em]">{service.name}</h2>
              <p className="mt-4 max-w-2xl text-lg text-ivory">{service.summary}</p>
              <p className="mt-3 max-w-2xl text-mist leading-relaxed">{service.detail}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Button href={service.href} variant="line">View service</Button>
              <Link href="/pitch" className="text-center text-[12px] uppercase tracking-[0.16em] text-gold">Start campaign</Link>
            </div>
          </article>
        ))}
      </Container>
    </>
  );
}
