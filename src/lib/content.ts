import "server-only";
import { articles as builtIn, type Article } from "@/content/articles";
import { readDb } from "@/lib/store";

export async function publishedArticles(kind?: Article["kind"]) {
  const fromDb = (await readDb()).articles.filter((article) => article.status === "published");
  const all = [...fromDb, ...builtIn];
  return kind ? all.filter((article) => article.kind === kind) : all;
}

export async function findArticle(slug: string) {
  return (await publishedArticles()).find((article) => article.slug === slug) ?? null;
}
