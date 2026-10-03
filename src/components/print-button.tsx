"use client";

export function PrintButton({ label }: { label: string }) {
  return (
    <button className="no-print rounded-md bg-gold px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1a1408]" onClick={() => window.print()}>
      {label}
    </button>
  );
}
