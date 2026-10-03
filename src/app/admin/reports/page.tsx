import { DemoMark } from "@/components/ui";
import { readDb } from "@/lib/store";

export default async function AdminReports() {
  const campaigns = (await readDb()).campaigns;
  return (
    <div>
      <h1 className="font-display text-4xl uppercase">Reports</h1>
      <div className="mt-6 space-y-6">
        {campaigns.map((campaign) => (
          <article key={campaign.id} className="rounded-xl border border-white/10 p-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl">{campaign.songTitle}</h2>
              {campaign.demo ? <DemoMark /> : null}
            </div>
            <p className="mt-2 text-sm text-mist">{campaign.artistName} · {campaign.status.replaceAll("_", " ")}</p>
            <ul className="mt-3 space-y-1 text-sm">
              {campaign.channels.flatMap((channel) => channel.metrics.map((metric) => (
                <li key={`${channel.name}-${metric.label}`}>{channel.name} · {metric.label}: {metric.awaiting ? "Awaiting campaign data." : metric.value}</li>
              )))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
