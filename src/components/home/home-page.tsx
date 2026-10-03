import Image from "next/image";
import Link from "next/link";
import { Camera, Headphones, ListMusic, Megaphone, Music2, Newspaper, Palette, Play, Radio, Users } from "lucide-react";
import { Container, Button, DemoMark } from "@/components/ui";
import { services, trustAudiences, trustPoints } from "@/content/services";
import { faqs } from "@/content/faq";
import { articles } from "@/content/articles";
import type { PackageConfig } from "@/config/pricing";
import { naira } from "@/lib/format";

const icons = {
  playlist: ListMusic,
  tiktok: Music2,
  instagram: Camera,
  youtube: Play,
  radio: Radio,
  dj: Headphones,
  blogs: Newspaper,
  pr: Megaphone,
  creators: Users,
  ads: Megaphone,
  brand: Palette,
  release: ListMusic,
};

const channels = [
  ["TikTok", "Creators contacted"],
  ["Playlists", "Independent curators"],
  ["Instagram", "Audience introductions"],
  ["YouTube", "Channel outreach"],
  ["Radio", "Stations serviced"],
  ["DJs", "Selectors briefed"],
  ["Blogs", "Stories pitched"],
  ["PR", "Desks contacted"],
];

export function HomePage({ packages }: { packages: PackageConfig[] }) {
  const stories = articles.filter((article) => article.kind === "media").slice(0, 3);
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <Container className="py-16 lg:py-24">
          <div className="rise">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">ClassicalPromo · Lagos & beyond</p>
            <h1 className="mt-5 max-w-full font-display text-[clamp(2.15rem,6.6vw,6.4rem)] uppercase leading-[0.86] tracking-[-0.045em]">
              One Song.
              <br />
              Every Opportunity.
            </h1>
          </div>
          <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="max-w-xl text-lg leading-relaxed text-mist">
              Take your music beyond the upload. Reach playlists, TikTok creators, Instagram audiences, DJs, radio, blogs, YouTube and music communities through one powerful promotion platform.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/pitch">Pitch your song</Button>
              <Button href="/promotion" variant="line">Explore promotion</Button>
            </div>
            <ol className="mt-10 grid grid-cols-2 gap-3 text-[11px] uppercase tracking-[0.16em] text-dim sm:grid-cols-4">
              {["Artist", "ClassicalPromo", "Promotion network", "Audience"].map((step, index) => (
                <li key={step} className="border-t border-gold/40 pt-3">
                  <span className="text-gold">0{index + 1}</span>
                  <span className="mt-2 block text-ivory">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute -inset-8 bg-[radial-gradient(circle_at_30%_20%,rgba(227,177,90,0.16),transparent_55%)]" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-2/90 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-mist">Campaign</p>
                  <p className="mt-1 font-medium">My New Song</p>
                </div>
                <DemoMark>Sample interface</DemoMark>
              </div>
              <div className="grid gap-5 p-5 sm:grid-cols-[120px_1fr]">
                <Image src="/media/portrait.jpg" alt="Portrait used as sample campaign artwork" width={240} height={240} className="h-[120px] w-full rounded-lg object-cover" priority />
                <div>
                  <p className="text-xs text-mist">Adaeze Okonkwo · Afrobeats · Breakout</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span>Campaign progress</span>
                    <span className="text-gold">78%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="bar-fill h-full w-[78%] bg-gold" />
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-dim">Illustrative progress for the product interface. Live campaigns show only recorded activity.</p>
                </div>
              </div>
              <ul className="border-t border-white/10">
                {channels.map(([name, detail]) => (
                  <li key={name} className="flex items-center justify-between border-b border-white/5 px-5 py-2.5 text-sm last:border-0">
                    <span>{name}</span>
                    <span className="text-xs text-mist">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10">
        <Container className="py-16 sm:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Who it is for</p>
          <h2 className="mt-4 max-w-4xl font-display text-4xl uppercase leading-[0.9] tracking-[-0.04em] sm:text-6xl">
            Built for artists who are ready to move.
          </h2>
          <ul className="mt-8 flex flex-wrap gap-2">
            {trustAudiences.map((item) => (
              <li key={item} className="rounded-md border border-white/10 px-3 py-2 text-sm text-ivory">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {trustPoints.map((point, index) => (
              <article key={point.title} className="border-t border-white/10 pt-4">
                <p className="text-xs text-gold">0{index + 1}</p>
                <h3 className="mt-3 text-lg">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{point.copy}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm text-dim">
            Testimonial placeholder — verified artist feedback will be published here when it is available. ClassicalPromo does not display invented reviews or client logos.
          </p>
        </Container>
      </section>

      <section className="grid border-b border-white/10 lg:grid-cols-2">
        <div className="relative min-h-[420px]">
          <Image src="/media/studio.jpg" alt="Recording studio with a microphone and mixing desk" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
        <div className="flex flex-col justify-end px-6 py-12 sm:px-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold">The work</p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-[0.9] tracking-[-0.04em] sm:text-5xl">Promotion should be as serious as the record.</h2>
          <p className="mt-5 max-w-md text-mist leading-relaxed">
            ClassicalPromo is a campaign desk: pitch, scope, payment, execution, updates and a report. The same standard for a first single and a label roster.
          </p>
          <Link href="/about" className="mt-6 text-sm text-gold">
            Read the mission
          </Link>
        </div>
      </section>

      <section className="border-b border-white/10" id="services">
        <Container className="py-16 sm:py-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Services</p>
          <h2 className="mt-4 max-w-4xl font-display text-4xl uppercase leading-[0.9] tracking-[-0.04em] sm:text-6xl">
            Promote your music everywhere that matters.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = icons[service.id];
              return (
                <article key={service.id} className="group rounded-xl border border-white/10 bg-panel p-5 transition-colors hover:border-gold/40">
                  <Icon className="text-gold" size={20} aria-hidden />
                  <h3 className="mt-5 text-lg">{service.name}</h3>
                  <p className="mt-2 min-h-12 text-sm leading-relaxed text-mist">{service.summary}</p>
                  <div className="mt-5 flex items-center justify-between text-[12px] uppercase tracking-[0.14em]">
                    <Link href={service.href} className="text-mist group-hover:text-ivory">
                      View service
                    </Link>
                    <Link href="/pitch" className="text-gold">
                      Start campaign
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-ink-2">
        <Container className="grid items-center gap-8 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Pitch</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.88] tracking-[-0.045em] sm:text-7xl">Got a song?</h2>
            <p className="mt-5 max-w-lg text-lg text-mist">Tell us about it. We&apos;ll help you build the right promotion campaign.</p>
            <Button href="/pitch" className="mt-8">Pitch my song</Button>
          </div>
          <Image src="/media/mic.jpg" alt="A microphone in a dim studio" width={900} height={700} className="h-[320px] w-full rounded-xl object-cover" />
        </Container>
      </section>

      <section className="border-b border-white/10">
        <Container className="py-16 sm:py-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Packages</p>
              <h2 className="mt-4 font-display text-4xl uppercase leading-[0.9] tracking-[-0.04em] sm:text-6xl">Choose a scope.</h2>
            </div>
            <Link href="/pricing" className="hidden text-sm text-gold sm:inline">
              View pricing
            </Link>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {packages.map((item) => (
              <article key={item.id} className={`flex flex-col rounded-xl border p-5 ${item.featured ? "border-gold/50 bg-panel" : "border-white/10"}`}>
                <h3 className="font-display text-2xl tracking-tight">{item.name}</h3>
                <p className="mt-2 text-sm text-mist">{item.audience}</p>
                <p className="mt-6 text-2xl">{item.priceNgn ? naira(item.priceNgn) : item.priceLabel}</p>
                <p className="text-xs text-dim">{item.duration}</p>
                <ul className="mt-5 space-y-2 text-sm text-ivory/90">
                  {item.services.slice(0, 4).map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
                <Button href={`/pitch?package=${item.id}`} variant={item.featured ? "gold" : "line"} className="mt-6">
                  Start a campaign
                </Button>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10">
        <Container className="grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Media</p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.9] tracking-[-0.04em] sm:text-6xl">Discover new music</h2>
            <p className="mt-4 text-mist">Editorial formats from the ClassicalPromo desk. Sample stories are marked inside the article.</p>
            <Button href="/media" variant="line" className="mt-6">Open the desk</Button>
          </div>
          <div className="grid gap-4">
            {stories.map((story) => (
              <Link key={story.slug} href={`/media/${story.slug}`} className="grid grid-cols-[120px_1fr] gap-4 rounded-xl border border-white/10 p-3 hover:border-gold/40">
                <Image src={story.image} alt="" width={240} height={180} className="h-[88px] w-full rounded-md object-cover" />
                <span>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-gold">{story.category}</span>
                  <span className="mt-1 block font-medium">{story.title}</span>
                  <span className="mt-1 block text-sm text-mist">{story.excerpt}</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10">
        <Container className="py-16 sm:py-20">
          <h2 className="font-display text-4xl uppercase tracking-[-0.04em]">Questions, answered plainly.</h2>
          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {faqs.slice(0, 5).map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="cursor-pointer list-none text-lg">{item.q}</summary>
                <p className="max-w-3xl pt-3 text-sm leading-relaxed text-mist">{item.a}</p>
              </details>
            ))}
          </div>
          <Link href="/faq" className="mt-6 inline-block text-sm text-gold">
            Read the full FAQ
          </Link>
        </Container>
      </section>
    </>
  );
}
