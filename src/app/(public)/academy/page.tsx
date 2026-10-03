import type { Metadata } from "next";
import Link from "next/link";
import { academyCategories } from "@/content/articles";
import { Container, PageHeader } from "@/components/ui";
import { publishedArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "ClassicalPromo Academy",
  description: "Practical guides on music marketing, playlists, TikTok, Instagram, YouTube, radio, DJs, PR, branding and release strategy.",
  alternates: { canonical: "/academy" },
};

export default async function AcademyPage() {
  const articles = await publishedArticles("academy");
  return (
    <>
      <PageHeader eyebrow="Academy" title="Learn the work before you buy it." lede="Original guides for independent artists. No guaranteed outcomes, no recycled listicles about going viral." />
      <Container className="py-12">
        <ul className="flex flex-wrap gap-2">
          {academyCategories.map((category) => (
            <li key={category} className="rounded-md border border-white/10 px-3 py-1 text-sm text-mist">{category}</li>
          ))}
        </ul>
        <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {articles.map((article) => (
            <Link key={article.slug} href={`/academy/${article.slug}`} className="grid gap-2 py-6 md:grid-cols-[160px_1fr]">
              <span className="text-[11px] uppercase tracking-[0.16em] text-gold">{article.category}</span>
              <span>
                <span className="block text-2xl">{article.title}</span>
                <span className="mt-2 block text-sm text-mist">{article.excerpt}</span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
