import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { seoPages } from "@/content/seo";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/pitch", "/promotion", "/pricing", "/about", "/faq", "/network", "/partners", "/marketplace", "/academy", "/media", "/privacy", "/terms", "/register", ...seoPages.map((page) => `/${page.slug}`)];
  const stories = articles.map((article) => (article.kind === "academy" ? `/academy/${article.slug}` : `/media/${article.slug}`));
  return [...staticRoutes, ...stories, "/artists/adaeze-okonkwo"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
