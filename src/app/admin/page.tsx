import { DemoMark } from "@/components/ui";
import { naira } from "@/lib/format";
import { readDb } from "@/lib/store";

export default function AdminHome() {
  const db = readDb();
  const liveRevenue = db.payments.filter((payment) => payment.status === "SUCCESSFUL" && payment.provider !== "demo" && !db.campaigns.find((campaign) => campaign.id === payment.campaignId)?.demo).reduce((sum, payment) => sum + payment.amount, 0);
  const cards = [
    ["Total artists", String(db.users.filter((user) => user.role === "ARTIST").length)],
    ["Active campaigns", String(db.campaigns.filter((campaign) => campaign.status === "IN_PROGRESS" || campaign.status === "QUEUED").length)],
    ["Live revenue", naira(liveRevenue)],
    ["Pending applications", String(db.partners.filter((partner) => partner.status === "PENDING" || partner.status === "UNDER_REVIEW").length)],
    ["Active partners", String(db.partners.filter((partner) => partner.status === "VERIFIED").length)],
    ["Songs submitted", String(db.songs.length)],
  ];
  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="font-display text-4xl uppercase">Overview</h1>
        <DemoMark />
      </div>
      <p className="mt-3 max-w-2xl text-sm text-mist">Sample figures come from the demonstration workspace. Live revenue excludes demo campaigns and simulated payments.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(([label, value]) => (
          <article key={label} className="rounded-xl border border-white/10 bg-panel p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-mist">{label}</p>
            <p className="mt-3 text-3xl">{value}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
