import "server-only";
import { articles as builtIn, type Article } from "@/content/articles";
import { readDb } from "@/lib/store";

export function publishedArticles(kind?: Article["kind"]) {
  const fromDb = readDb().articles.filter((article) => article.status === "published");
  const all = [...fromDb, ...builtIn];
  return kind ? all.filter((article) => article.kind === kind) : all;
}

export function findArticle(slug: string) {
  return publishedArticles().find((article) => article.slug === slug) ?? null;
}
