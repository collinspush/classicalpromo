"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/site";
import type { Role } from "@/lib/types";

export type HeaderUser = { name: string; role: Role } | null;

const workspace: Record<Role, string> = {
  ARTIST: "/dashboard",
  MANAGER: "/dashboard",
  LABEL: "/dashboard",
  PARTNER: "/partner",
  ADMIN: "/admin",
};

export function SiteHeader({ user }: { user: HeaderUser }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="ClassicalPromo home">
          <span className="grid h-8 w-8 place-items-center border border-gold/50 font-display text-sm text-gold">C</span>
          <span className="font-display text-[15px] tracking-tight">ClassicalPromo</span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-[13px] text-mist transition-colors hover:text-ivory">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <Link href={workspace[user.role]} className="text-[13px] text-ivory">
              {user.role === "ADMIN" ? "Admin" : "Workspace"}
            </Link>
          ) : (
            <Link href="/login" className="text-[13px] text-mist hover:text-ivory">
              Log in
            </Link>
          )}
          <Link
            href="/pitch"
            className="rounded-md bg-gold px-4 py-2.5 text-[11px] font-semibold tracking-[0.16em] text-[#1a1408] hover:bg-gold-2"
          >
            PITCH YOUR SONG
          </Link>
        </div>
        <button className="grid h-10 w-10 place-items-center lg:hidden" aria-expanded={open} aria-label="Menu" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-ink lg:hidden">
          <nav className="flex flex-col px-5 py-4" aria-label="Mobile">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="border-b border-white/10 py-3 text-sm">
                {item.label}
              </Link>
            ))}
            <Link href={user ? workspace[user.role] : "/login"} className="py-3 text-sm text-mist">
              {user ? "Open workspace" : "Log in"}
            </Link>
            <Link href="/pitch" className="mt-3 rounded-md bg-gold px-4 py-3 text-center text-[12px] font-semibold tracking-[0.16em] text-[#1a1408]">
              PITCH YOUR SONG
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
