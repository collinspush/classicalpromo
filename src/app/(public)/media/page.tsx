import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { mediaCategories } from "@/content/articles";
import { Container, PageHeader } from "@/components/ui";
import { publishedArticles } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "ClassicalPromo Media",
  description: "News, releases, interviews, reviews, videos, features and industry notes from the ClassicalPromo desk.",
  alternates: { canonical: "/media" },
};

export default async function MediaPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const query = await searchParams;
  const articles = (await publishedArticles("media")).filter((article) => {
    const text = `${article.title} ${article.excerpt} ${article.artist}`.toLowerCase();
    const matchesQuery = !query.q || text.includes(query.q.toLowerCase());
    const matchesCategory = !query.category || article.category === query.category;
    return matchesQuery && matchesCategory;
  });
  return (
    <>
      <PageHeader eyebrow="Media" title="Discover new music." lede="A publication beside the promotion desk. Sample stories are marked in the article. Real coverage will name sources and dates." />
      <Container className="py-12">
        <div className="flex flex-wrap gap-2">
          {mediaCategories.map((category) => (
            <Link key={category} href={`/media?category=${encodeURIComponent(category)}`} className="rounded-md border border-white/10 px-3 py-1 text-sm text-mist hover:text-ivory">
              {category}
            </Link>
          ))}
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.slug} href={`/media/${article.slug}`} className="overflow-hidden rounded-xl border border-white/10 bg-panel hover:border-gold/40">
              <div className="relative h-48">
                <Image src={article.image} alt="" fill className="object-cover" sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw" />
              </div>
              <div className="p-5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{article.category}{article.genre ? ` · ${article.genre}` : ""}</p>
                <h2 className="mt-2 text-xl">{article.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-mist">{article.excerpt}</p>
                <p className="mt-4 text-xs text-dim">{article.artist ? `${article.artist} · ` : ""}{article.author} · {formatDate(article.date)}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
