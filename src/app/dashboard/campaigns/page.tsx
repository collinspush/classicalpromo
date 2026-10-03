import Link from "next/link";
import { DemoMark } from "@/components/ui";
import { getSession } from "@/lib/session";
import { readDb } from "@/lib/store";

export default async function CampaignsPage() {
  const session = await getSession();
  const campaigns = readDb().campaigns.filter((campaign) => session && (campaign.artistId === session.id || (session.role !== "ARTIST" && campaign.demo)));
  return (
    <div>
      <h1 className="font-display text-4xl uppercase">My campaigns</h1>
      <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
        {campaigns.map((campaign) => (
          <Link key={campaign.id} href={`/dashboard/campaigns/${campaign.id}`} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <span>
              <span className="block">{campaign.songTitle}</span>
              <span className="text-sm text-mist">{campaign.packageName} · {campaign.status.replaceAll("_", " ")}</span>
            </span>
            {campaign.demo ? <DemoMark /> : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
