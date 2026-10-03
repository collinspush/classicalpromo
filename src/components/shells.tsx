"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  CreditCard,
  FilePlus,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  Store,
  User,
  Users,
  Radio,
  Headphones,
  Newspaper,
  Clapperboard,
  ListMusic,
  Shield,
} from "lucide-react";
import type { Role } from "@/lib/types";

const artistNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/songs", label: "My Songs", icon: Music },
  { href: "/dashboard/campaigns", label: "My Campaigns", icon: BarChart3 },
  { href: "/dashboard/submit", label: "Submit Song", icon: FilePlus },
  { href: "/dashboard/marketplace", label: "Promotion Marketplace", icon: Store },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const adminNav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/artists", label: "Artists", icon: Users },
  { href: "/admin/songs", label: "Songs", icon: Music },
  { href: "/admin/campaigns", label: "Campaigns", icon: BarChart3 },
  { href: "/admin/partners", label: "Partners", icon: Shield },
  { href: "/admin/playlists", label: "Playlists", icon: ListMusic },
  { href: "/admin/djs", label: "DJs", icon: Headphones },
  { href: "/admin/radio", label: "Radio", icon: Radio },
  { href: "/admin/creators", label: "Creators", icon: Clapperboard },
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/content", label: "Content", icon: Newspaper },
  { href: "/admin/redirects", label: "Redirects", icon: Settings },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function Side({ items, home }: { items: typeof artistNav; home: string }) {
  const pathname = usePathname();
  return (
    <aside className="no-print hidden w-64 shrink-0 border-r border-white/10 bg-ink-2 md:block">
      <Link href={home} className="flex h-16 items-center gap-2 border-b border-white/10 px-5">
        <span className="grid h-7 w-7 place-items-center border border-gold/50 text-xs text-gold">C</span>
        <span className="font-display text-sm">ClassicalPromo</span>
      </Link>
      <nav className="space-y-1 p-3" aria-label="Workspace">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${active ? "bg-white/5 text-ivory" : "text-mist hover:text-ivory"}`}>
              <Icon size={16} aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function ArtistShell({ name, role, children }: { name: string; role: Role; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const bottom = [
    { href: "/dashboard", label: "Home", icon: LayoutDashboard },
    { href: "/dashboard/campaigns", label: "Campaigns", icon: BarChart3 },
    { href: "/dashboard/submit", label: "Submit", icon: FilePlus },
    { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
    { href: "/dashboard/profile", label: "Profile", icon: User },
  ];
  return (
    <div className="flex min-h-screen">
      <Side items={artistNav} home="/dashboard" />
      <div className="min-w-0 flex-1 pb-24 md:pb-0">
        <div className="no-print flex h-16 items-center justify-between border-b border-white/10 px-5">
          <p className="text-sm text-mist">{role === "ARTIST" ? "Artist workspace" : role === "LABEL" ? "Label workspace" : "Manager workspace"}</p>
          <div className="flex items-center gap-4 text-sm">
            <span>{name}</span>
            <button
              className="text-mist"
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" });
                router.push("/");
                router.refresh();
              }}
            >
              Log out
            </button>
          </div>
        </div>
        <div className="px-5 py-8 sm:px-8">{children}</div>
      </div>
      <nav className="no-print fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-white/10 bg-ink/95 backdrop-blur md:hidden" aria-label="Mobile">
        {bottom.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          const submit = item.label === "Submit";
          return (
            <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-1 py-2 text-[10px] uppercase tracking-[0.12em] ${active ? "text-gold" : "text-mist"}`}>
              <span className={submit ? "-mt-5 grid h-12 w-12 place-items-center rounded-xl bg-gold text-[#1a1408]" : ""}>
                <Icon size={submit ? 18 : 16} />
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function AdminShell({ name, children }: { name: string; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen">
      <Side items={adminNav} home="/admin" />
      <div className="min-w-0 flex-1">
        <div className="no-print flex gap-2 overflow-auto border-b border-white/10 px-3 py-2 md:hidden">
          {adminNav.map((item) => (
            <Link key={item.href} href={item.href} className={`shrink-0 rounded-md px-3 py-2 text-xs ${pathname === item.href ? "bg-white/10 text-ivory" : "text-mist"}`}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <p className="text-sm text-mist">Admin</p>
          <div className="flex items-center gap-4 text-sm">
            <span>{name}</span>
            <button
              className="text-mist"
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" });
                router.push("/");
                router.refresh();
              }}
            >
              Log out
            </button>
          </div>
        </div>
        <div className="px-5 py-8 sm:px-8">{children}</div>
      </div>
    </div>
  );
}
