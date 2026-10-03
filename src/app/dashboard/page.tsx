import Link from "next/link";
import { DemoMark } from "@/components/ui";
import { naira } from "@/lib/format";
import { getSession } from "@/lib/session";
import { readDb } from "@/lib/store";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return null;
  const db = (await readDb());
  const campaigns = db.campaigns.filter((campaign) => campaign.artistId === session.id || (session.role !== "ARTIST" && campaign.demo));
  const songs = db.songs.filter((song) => song.artistId === session.id || (session.role !== "ARTIST" && song.artistId === "usr_artist"));
  const spend = db.payments.filter((payment) => payment.userId === session.id && payment.status === "SUCCESSFUL").reduce((sum, payment) => sum + payment.amount, 0);
  const current = campaigns.find((campaign) => campaign.status === "IN_PROGRESS") ?? campaigns[0];
  const roster = session.role === "ARTIST" ? [] : db.users.filter((user) => user.role === "ARTIST");
  return (
    <div>
      <p className="text-sm text-mist">Artist workspace</p>
      <h1 className="mt-2 font-display text-4xl uppercase tracking-[-0.04em] sm:text-5xl">Welcome back, {session.name}</h1>
      {!session.emailVerified ? <p className="mt-4 text-sm text-gold">Confirm your email from the verification link sent at registration.</p> : null}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Active campaigns", String(campaigns.filter((item) => item.status === "IN_PROGRESS" || item.status === "QUEUED").length)],
          ["Completed campaigns", String(campaigns.filter((item) => item.status === "COMPLETED").length)],
          ["Songs", String(songs.length)],
          ["Total campaign spend", naira(spend)],
        ].map(([label, value]) => (
          <article key={label} className="rounded-xl border border-white/10 bg-panel p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-mist">{label}</p>
            <p className="mt-3 text-2xl">{value}</p>
          </article>
        ))}
      </div>
      {current ? (
        <section className="mt-10 rounded-2xl border border-white/10 bg-panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm uppercase tracking-[0.16em] text-mist">Current campaign</h2>
            {current.demo ? <DemoMark /> : null}
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <p><span className="block text-xs text-dim">Song</span>{current.songTitle}</p>
            <p><span className="block text-xs text-dim">Campaign</span>{current.packageName}</p>
            <p><span className="block text-xs text-dim">Status</span>{current.status.replaceAll("_", " ")}</p>
            <p><span className="block text-xs text-dim">Progress</span>{current.progress}%</p>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="bar-fill h-full bg-gold" style={{ width: `${current.progress}%` }} />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {current.channels.map((channel) => (
              <article key={channel.name} className="border-t border-white/10 pt-3">
                <h3>{channel.name}</h3>
                <ul className="mt-2 space-y-1 text-sm text-mist">
                  {channel.metrics.map((metric) => (
                    <li key={metric.label} className="flex justify-between gap-4">
                      <span>{metric.label}</span>
                      <span className={metric.awaiting ? "text-dim" : "text-ivory"}>{metric.value}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <Link href={`/dashboard/campaigns/${current.id}`} className="mt-6 inline-block text-sm text-gold">View campaigns</Link>
        </section>
      ) : (
        <p className="mt-10 text-mist">No campaigns yet. Pitch a song to start.</p>
      )}
      {roster.length ? (
        <section className="mt-10">
          <h2 className="text-sm uppercase tracking-[0.16em] text-mist">Artists on this sample roster</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {roster.map((artist) => <li key={artist.id}>{artist.name} · {artist.email}</li>)}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
