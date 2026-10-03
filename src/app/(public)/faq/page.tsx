import type { Metadata } from "next";
import { faqs } from "@/content/faq";
import { JsonLd } from "@/components/json-ld";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "FAQ",
  description: "How ClassicalPromo campaigns, reporting, playlists, radio, DJs and partnerships work — without guaranteed results.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }} />
      <PageHeader eyebrow="FAQ" title="Straight answers." lede="If a question is about a guarantee, the answer is no. Here is how the work actually runs." />
      <Container className="py-12">
        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((item) => (
            <details key={item.q} className="py-5">
              <summary className="cursor-pointer list-none text-xl">{item.q}</summary>
              <p className="max-w-3xl pt-3 leading-relaxed text-mist">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </>
  );
}
