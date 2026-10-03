import { RedirectForm } from "@/components/admin/admin-forms";
import { readDb } from "@/lib/store";

export default async function RedirectsPage() {
  const redirects = (await readDb()).redirects;
  return (
    <div>
      <h1 className="font-display text-4xl uppercase">Redirects</h1>
      <p className="mt-3 max-w-2xl text-sm text-mist">Map an old ClassicalPromo URL to a new one. Records stay in the list when you deactivate them. Nothing here deletes a historical path.</p>
      <div className="mt-6"><RedirectForm /></div>
      <ul className="mt-8 divide-y divide-white/10 border-y border-white/10 text-sm">
        {redirects.map((redirect) => (
          <li key={redirect.id} className="py-3">{redirect.oldUrl} → {redirect.newUrl} · {redirect.type} · {redirect.status}</li>
        ))}
      </ul>
    </div>
  );
}
