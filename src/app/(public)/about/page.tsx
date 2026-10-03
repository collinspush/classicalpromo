import type { Metadata } from "next";
import { Button, Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "ClassicalPromo helps independent artists and music professionals reach legitimate promotional channels across Africa and the world.",
  alternates: { canonical: "/about" },
};

const values = [
  ["Mission", "To make professional music promotion more accessible to independent artists and music professionals, while connecting artists with legitimate promotional channels across Africa and the world."],
  ["Vision", "A promotion infrastructure that artists, managers and labels can trust at scale — with the same clarity whether the roster is one song or a hundred."],
  ["Transparency", "Services, prices, statuses and reports are written in plain language. Missing data stays missing."],
  ["Artist-first", "The song, the audience and the artist’s own accounts come before a channel template."],
  ["Technology", "Campaigns, payments, messages and reports live in one system so the work can be audited."],
  ["African music", "Nigeria and the continent are the centre of the product, not an afterthought on a global template. International artists are welcome when the brief is real."],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="We help music move." lede="ClassicalPromo is a promotion platform and a media desk. The work is outreach, servicing, advertising and reporting — not manufactured attention." />
      <Container className="grid gap-10 py-16 lg:grid-cols-2">
        {values.map(([title, copy]) => (
          <article key={title} className="border-t border-white/10 pt-5">
            <h2 className="font-display text-3xl uppercase tracking-[-0.04em]">{title}</h2>
            <p className="mt-3 text-mist leading-relaxed">{copy}</p>
          </article>
        ))}
      </Container>
      <Container className="pb-16">
        <Button href="/pitch">Pitch your song</Button>
      </Container>
    </>
  );
}
