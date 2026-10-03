import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Button, Container, PageHeader } from "@/components/ui";
import { getSeoPage } from "@/content/seo";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) return {};
  return { title: page.title, description: page.description, alternates: { canonical: `/${slug}` }, openGraph: { title: page.title, description: page.description } };
}

export default async function SeoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) notFound();
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: site.url }, { "@type": "ListItem", position: 2, name: page.title, item: `${site.url}/${slug}` }] }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: page.title, description: page.description, provider: { "@type": "Organization", name: site.name, url: site.url }, areaServed: "Worldwide" }} />
      <PageHeader eyebrow={page.eyebrow} title={page.heading} lede={page.lede} />
      <Container className="space-y-12 py-14">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-3xl uppercase tracking-[-0.04em]">{section.heading}</h2>
            <div className="mt-4 max-w-3xl space-y-4 leading-relaxed text-mist">
              {section.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
            </div>
          </section>
        ))}
        <Button href="/pitch">Pitch your song</Button>
      </Container>
    </>
  );
}
