import Link from "next/link";
import { getSession } from "@/lib/session";
import { readDb } from "@/lib/store";

export default async function ReportsPage() {
  const session = await getSession();
  const campaigns = readDb().campaigns.filter((campaign) => session && (campaign.artistId === session.id || session.role !== "ARTIST"));
  return (
    <div>
      <h1 className="font-display text-4xl uppercase">Reports</h1>
      <p className="mt-3 max-w-xl text-sm text-mist">Figures appear only when they were recorded. Everything else stays “Awaiting campaign data.”</p>
      <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
        {campaigns.map((campaign) => (
          <li key={campaign.id}>
            <Link href={`/dashboard/reports/${campaign.id}`} className="flex justify-between py-4 text-sm">
              <span>{campaign.songTitle}</span>
              <span className="text-mist">{campaign.packageName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
