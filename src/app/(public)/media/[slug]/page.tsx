import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/ui";
import { findArticle } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await findArticle(slug);
  if (!article || article.kind !== "media") return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/media/${slug}` },
    openGraph: { images: [article.image] },
  };
}

export default async function MediaArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await findArticle(slug);
  if (!article || article.kind !== "media") notFound();
  return (
    <article>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "NewsArticle", headline: article.title, datePublished: article.date, author: { "@type": "Organization", name: article.author }, image: `${site.url}${article.image}`, description: article.excerpt }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Media", item: `${site.url}/media` }, { "@type": "ListItem", position: 2, name: article.title, item: `${site.url}/media/${slug}` }] }} />
      <div className="relative h-[42vh] min-h-[280px]">
        <Image src={article.image} alt="" fill className="object-cover" priority />
      </div>
      <Container className="py-12">
        <p className="text-[11px] uppercase tracking-[0.18em] text-gold">{article.category}</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl uppercase leading-[0.9] tracking-[-0.04em]">{article.title}</h1>
        <p className="mt-4 text-sm text-mist">{article.author}{article.artist ? ` · ${article.artist}` : ""}{article.genre ? ` · ${article.genre}` : ""} · {formatDate(article.date)}</p>
        <div className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed">
          {article.body.map((paragraph) => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
        </div>
      </Container>
    </article>
  );
}
