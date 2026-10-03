import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/ui";
import { findArticle } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await findArticle(slug);
  if (!article || article.kind !== "academy") return {};
  return { title: article.title, description: article.excerpt, alternates: { canonical: `/academy/${slug}` } };
}

export default async function AcademyArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await findArticle(slug);
  if (!article || article.kind !== "academy") notFound();
  return (
    <Container className="py-16">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: article.title, datePublished: article.date, author: { "@type": "Organization", name: article.author }, description: article.excerpt, mainEntityOfPage: `${site.url}/academy/${slug}` }} />
      <p className="text-[11px] uppercase tracking-[0.18em] text-gold">{article.category}</p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl uppercase leading-[0.9] tracking-[-0.04em]">{article.title}</h1>
      <p className="mt-4 text-sm text-mist">{article.author} · {formatDate(article.date)}</p>
      <div className="mt-10 max-w-3xl space-y-5 text-lg leading-relaxed text-ivory/90">
        {article.body.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
      </div>
    </Container>
  );
}
