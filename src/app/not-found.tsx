import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-5">
      <p className="text-[11px] uppercase tracking-[0.18em] text-gold">404</p>
      <h1 className="mt-3 font-display text-5xl uppercase">This page is not on the record.</h1>
      <p className="mt-4 text-mist">If this used to be an old ClassicalPromo URL, it can be mapped from the redirect desk.</p>
      <Link href="/" className="mt-6 text-gold">Back home</Link>
    </main>
  );
}
