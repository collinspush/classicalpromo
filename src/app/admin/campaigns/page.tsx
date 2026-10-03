import { AdminButton } from "@/components/admin/admin-button";
import { DemoMark } from "@/components/ui";
import { naira } from "@/lib/format";
import { readDb } from "@/lib/store";

const statuses = ["DRAFT", "AWAITING_PAYMENT", "PAID", "QUEUED", "IN_PROGRESS", "AWAITING_PARTNER_RESULTS", "COMPLETED", "CANCELLED"];

export default async function AdminCampaigns() {
  const campaigns = (await readDb()).campaigns;
  return (
    <div>
      <h1 className="font-display text-4xl uppercase">Campaigns</h1>
      <div className="mt-6 space-y-4">
        {campaigns.map((campaign) => (
          <article key={campaign.id} className="rounded-xl border border-white/10 p-4 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg">{campaign.songTitle}</h2>
              {campaign.demo ? <DemoMark /> : null}
            </div>
            <p className="mt-2 text-mist">{campaign.id} · {campaign.artistName} · {campaign.packageName} · {naira(campaign.budgetNgn)}</p>
            <p className="mt-1 text-mist">Services: {campaign.services.join(", ")}</p>
            <p className="mt-1 text-mist">Status {campaign.status} · {campaign.assignee} · {campaign.startDate || "no start"} to {campaign.endDate || "no end"}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {statuses.map((status) => (
                <AdminButton key={status} label={status} payload={{ action: "campaign", id: campaign.id, status, assignee: "Amaka Diala" }} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
