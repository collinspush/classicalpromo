import { naira } from "@/lib/format";
import { readDb } from "@/lib/store";

export default async function AdminPayments() {
  const payments = (await readDb()).payments;
  return (
    <div>
      <h1 className="font-display text-4xl uppercase">Payments</h1>
      <ul className="mt-6 divide-y divide-white/10 border-y border-white/10 text-sm">
        {payments.map((payment) => (
          <li key={payment.id} className="py-3">{payment.invoiceNumber} · {payment.billTo} · {naira(payment.amount)} · {payment.status} · {payment.provider}</li>
        ))}
      </ul>
    </div>
  );
}
