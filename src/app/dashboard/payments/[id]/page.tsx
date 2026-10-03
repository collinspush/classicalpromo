import { notFound } from "next/navigation";
import { PrintButton } from "@/components/print-button";
import { formatDate, naira } from "@/lib/format";
import { getSession } from "@/lib/session";
import { readDb } from "@/lib/store";

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  const payment = readDb().payments.find((item) => item.id === id && item.userId === session?.id);
  const bank = readDb().settings;
  if (!payment) notFound();
  return (
    <article className="print-sheet max-w-2xl rounded-2xl border border-white/10 p-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-gold">Invoice / receipt</p>
          <h1 className="mt-2 font-display text-4xl">{payment.invoiceNumber}</h1>
        </div>
        <PrintButton label="Download" />
      </div>
      <dl className="mt-8 space-y-2 text-sm">
        <div className="flex justify-between"><dt>Bill to</dt><dd>{payment.billTo}</dd></div>
        <div className="flex justify-between"><dt>Description</dt><dd>{payment.description}</dd></div>
        <div className="flex justify-between"><dt>Amount</dt><dd>{naira(payment.amount)} {payment.currency}</dd></div>
        <div className="flex justify-between"><dt>Status</dt><dd>{payment.status}</dd></div>
        <div className="flex justify-between"><dt>Provider</dt><dd>{payment.provider}</dd></div>
        <div className="flex justify-between"><dt>Reference</dt><dd>{payment.reference}</dd></div>
        <div className="flex justify-between"><dt>Issued</dt><dd>{formatDate(payment.createdAt)}</dd></div>
      </dl>
      {payment.status === "PENDING" ? (
        <p className="mt-6 text-sm text-mist">Transfer to {bank.accountName}, {bank.bankName}, {bank.accountNumber}. The campaign stays awaiting payment until ClassicalPromo confirms it.</p>
      ) : null}
    </article>
  );
}
