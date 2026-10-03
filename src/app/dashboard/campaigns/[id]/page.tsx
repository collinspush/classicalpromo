import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoMark } from "@/components/ui";
import { formatDate, naira } from "@/lib/format";
import { getSession } from "@/lib/session";
import { readDb } from "@/lib/store";

export default async function CampaignDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  const campaign = readDb().campaigns.find((item) => item.id === id);
  if (!campaign || !session) notFound();
  if (campaign.artistId !== session.id && session.role === "ARTIST") notFound();
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-4xl uppercase">{campaign.songTitle}</h1>
        {campaign.demo ? <DemoMark /> : null}
      </div>
      <p className="mt-2 text-mist">{campaign.packageName} · {campaign.status.replaceAll("_", " ")} · {naira(campaign.budgetNgn)}</p>
      <p className="mt-2 text-sm text-dim">{campaign.startDate ? formatDate(campaign.startDate) : "Start not set"} — {campaign.endDate ? formatDate(campaign.endDate) : "End not set"} · {campaign.assignee}</p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-gold" style={{ width: `${campaign.progress}%` }} /></div>
      <ul className="mt-6 space-y-2 text-sm">{campaign.services.map((service) => <li key={service}>{service}</li>)}</ul>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {campaign.channels.map((channel) => (
          <article key={channel.name} className="rounded-xl border border-white/10 p-4">
            <h2>{channel.name}</h2>
            <ul className="mt-3 space-y-1 text-sm text-mist">
              {channel.metrics.map((metric) => <li key={metric.label}>{metric.label}: {metric.value}</li>)}
            </ul>
          </article>
        ))}
      </div>
      <Link href={`/dashboard/reports/${campaign.id}`} className="mt-8 inline-block text-sm text-gold">Open report</Link>
    </div>
  );
}
