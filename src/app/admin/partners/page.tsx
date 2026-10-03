import { AdminButton } from "@/components/admin/admin-button";
import { readDb } from "@/lib/store";

const statuses = ["PENDING", "UNDER_REVIEW", "VERIFIED", "SUSPENDED", "REJECTED"];

export default function AdminPartners() {
  const partners = readDb().partners;
  return (
    <div>
      <h1 className="font-display text-4xl uppercase">Partners</h1>
      <p className="mt-3 text-sm text-mist">Verification is manual. Phone and email stay in this desk.</p>
      <div className="mt-6 space-y-4">
        {partners.map((partner) => (
          <article key={partner.id} className="rounded-xl border border-white/10 p-4 text-sm">
            <h2 className="text-lg">{partner.name}</h2>
            <p className="mt-1 text-mist">{partner.categories.join(", ")} · {partner.city}, {partner.country} · {partner.status}</p>
            <p className="mt-1 text-mist">{partner.email} · {partner.phone || "No phone"}</p>
            <p className="mt-2">{partner.description}</p>
            <p className="mt-2 text-dim">Proof: {partner.proofNote}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {statuses.map((status) => (
                <AdminButton key={status} label={status} payload={{ action: "partner", id: partner.id, status }} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
