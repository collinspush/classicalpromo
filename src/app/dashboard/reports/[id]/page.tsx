import { notFound } from "next/navigation";
import { PrintButton } from "@/components/print-button";
import { DemoMark } from "@/components/ui";
import { formatDate, naira } from "@/lib/format";
import { getSession } from "@/lib/session";
import { readDb } from "@/lib/store";

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  const campaign = (await readDb()).campaigns.find((item) => item.id === id);
  if (!campaign || !session || (campaign.artistId !== session.id && session.role === "ARTIST")) notFound();
  return (
    <article className="print-sheet rounded-2xl border border-white/10 bg-panel p-6 sm:p-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-gold">ClassicalPromo campaign report</p>
          <h1 className="mt-3 font-display text-4xl uppercase">{campaign.songTitle}</h1>
          <p className="mt-2 text-sm text-mist">{campaign.artistName} · {campaign.packageName}</p>
        </div>
        <div className="flex items-center gap-3">
          {campaign.demo ? <DemoMark /> : null}
          <PrintButton label="Download campaign report" />
        </div>
      </div>
      <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <div><dt className="text-dim">Campaign start</dt><dd>{campaign.startDate ? formatDate(campaign.startDate) : "Not started"}</dd></div>
        <div><dt className="text-dim">Campaign end</dt><dd>{campaign.endDate ? formatDate(campaign.endDate) : "Open"}</dd></div>
        <div><dt className="text-dim">Budget</dt><dd>{naira(campaign.budgetNgn)}</dd></div>
        <div><dt className="text-dim">Status</dt><dd>{campaign.status.replaceAll("_", " ")}</dd></div>
      </dl>
      <h2 className="mt-8 text-sm uppercase tracking-[0.16em] text-mist">Services</h2>
      <ul className="mt-2 text-sm">{campaign.services.map((service) => <li key={service}>{service}</li>)}</ul>
      <h2 className="mt-8 text-sm uppercase tracking-[0.16em] text-mist">Channel performance</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {campaign.channels.map((channel) => (
          <section key={channel.name} className="border-t border-white/10 pt-3">
            <h3>{channel.name}</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {channel.metrics.map((metric) => (
                <li key={metric.label} className="flex justify-between gap-3">
                  <span>{metric.label}</span>
                  <span>{metric.awaiting ? "Awaiting campaign data." : metric.value}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-8 text-xs text-dim">This document records promotional activity. It is not a guarantee of streams, views, followers, airplay or editorial placement.{campaign.demo ? " Demonstration numbers are samples, not a client result." : ""}</p>
    </article>
  );
}
