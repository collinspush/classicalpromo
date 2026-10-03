import Link from "next/link";
import { DemoMark } from "@/components/ui";
import { formatDate, naira } from "@/lib/format";
import { getSession } from "@/lib/session";
import { readDb } from "@/lib/store";

export default async function PaymentsPage() {
  const session = await getSession();
  const payments = readDb().payments.filter((payment) => payment.userId === session?.id);
  return (
    <div>
      <h1 className="font-display text-4xl uppercase">Payments</h1>
      <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
        {payments.map((payment) => (
          <li key={payment.id} className="flex flex-wrap items-center justify-between gap-3 py-4 text-sm">
            <span>
              <Link href={`/dashboard/payments/${payment.id}`} className="text-gold">{payment.invoiceNumber}</Link>
              <span className="mt-1 block text-mist">{payment.description}</span>
            </span>
            <span className="text-right">
              <span className="block">{naira(payment.amount)} · {payment.status}</span>
              <span className="text-dim">{formatDate(payment.createdAt)}</span>
              {payment.provider === "demo" ? <DemoMark /> : null}
            </span>
          </li>
        ))}
        {payments.length === 0 ? <li className="py-6 text-mist">No invoices yet.</li> : null}
      </ul>
    </div>
  );
}
