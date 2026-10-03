import Link from "next/link";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Platform",
    links: [
      ["Pitch your song", "/pitch"],
      ["Promotion", "/promotion"],
      ["Pricing", "/pricing"],
      ["Marketplace", "/marketplace"],
      ["Create artist account", "/register"],
    ],
  },
  {
    title: "Network",
    links: [
      ["The network", "/network"],
      ["Join the network", "/partners"],
      ["Academy", "/academy"],
      ["Media", "/media"],
      ["About", "/about"],
    ],
  },
  {
    title: "Promotion",
    links: [
      ["Nigeria", "/music-promotion-nigeria"],
      ["Playlists", "/spotify-playlist-promotion"],
      ["TikTok", "/tiktok-music-promotion"],
      ["Radio", "/radio-promotion"],
      ["DJs", "/dj-promotion"],
      ["Afrobeats", "/afrobeats-promotion"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl tracking-tight">ClassicalPromo</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-mist">{site.tagline}</p>
          <p className="mt-4 text-sm text-dim">{site.support}</p>
          <a className="mt-6 inline-block text-sm text-gold" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist">{column.title}</p>
            <ul className="mt-4 space-y-2">
              {column.links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-ivory/80 hover:text-ivory">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs leading-relaxed text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ClassicalPromo. {site.domain}</p>
          <p className="max-w-xl">
            Campaigns report promotional activity. ClassicalPromo does not sell guaranteed streams, followers, views, airplay or editorial playlist placement.
          </p>
          <p className="flex gap-4">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/faq">FAQ</Link>
          </p>
        </Container>
      </div>
    </footer>
  );
}
