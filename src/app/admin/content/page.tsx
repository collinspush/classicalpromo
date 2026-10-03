import { ArticleForm } from "@/components/admin/admin-forms";
import { publishedArticles } from "@/lib/content";

export default function ContentPage() {
  const articles = publishedArticles();
  return (
    <div>
      <h1 className="font-display text-4xl uppercase">Content</h1>
      <div className="mt-6"><ArticleForm /></div>
      <ul className="mt-8 divide-y divide-white/10 border-y border-white/10 text-sm">
        {articles.map((article) => (
          <li key={article.slug} className="py-3">{article.kind} · {article.category} · {article.title}</li>
        ))}
      </ul>
    </div>
  );
}
