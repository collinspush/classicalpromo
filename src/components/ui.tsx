import Link from "next/link";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

const variants = {
  gold: "bg-gold text-[#1a1408] hover:bg-gold-2",
  line: "border border-white/15 text-ivory hover:border-gold/70",
  ghost: "bg-white/[0.04] text-ivory hover:bg-white/[0.08]",
};

export function Button({
  href,
  children,
  variant = "gold",
  className = "",
  type = "button",
  onClick,
  disabled,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[12px] font-semibold tracking-[0.16em] uppercase transition-colors disabled:opacity-50 ${variants[variant]} ${className}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

export function DemoMark({ children = "Demo" }: { children?: string }) {
  return (
    <span className="inline-flex items-center rounded border border-gold/40 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
      {children}
    </span>
  );
}

export function PageHeader({ eyebrow, title, lede }: { eyebrow: string; title: string; lede: string }) {
  return (
    <header className="border-b border-white/10">
      <Container className="py-16 sm:py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">{eyebrow}</p>
        <h1 className="mt-4 max-w-5xl font-display text-[clamp(2.8rem,7vw,6.2rem)] uppercase leading-[0.88] tracking-[-0.045em]">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{lede}</p>
      </Container>
    </header>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-mist">{label}</span>
      {children}
    </label>
  );
}

export const fieldClass =
  "w-full rounded-md border border-white/10 bg-ink px-3 py-3 text-sm text-ivory outline-none placeholder:text-dim focus:border-gold/70";
