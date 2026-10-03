import { defaultPackages, type PackageId } from "@/config/pricing";

const goalServices: Record<string, string> = {
  Streaming: "Streaming audience support",
  "Playlist discovery": "Playlist outreach",
  TikTok: "TikTok creator campaign",
  Instagram: "Instagram promotion",
  YouTube: "YouTube promotion",
  Radio: "Radio servicing",
  DJs: "DJ promotion",
  Blogs: "Music blog promotion",
  Press: "Press & PR",
  "Brand awareness": "Artist branding",
  "International exposure": "International market outreach",
};

export function recommendPackage(goals: string[], budget: string): PackageId {
  if (budget === "custom" || budget === "500000+") return "custom";
  const rank: Record<string, number> = {
    "25000": 1,
    "50000": 2,
    "100000": 3,
    "250000": 4,
  };
  const level = rank[budget] ?? 2;
  if (level >= 4 || (goals.length >= 6 && level >= 3)) return "breakout";
  if (level >= 3 || goals.length >= 3) return "growth";
  return "starter";
}

export function servicesForGoals(goals: string[], packageId: PackageId) {
  const fromGoals = goals.map((goal) => goalServices[goal]).filter(Boolean);
  if (fromGoals.length) return Array.from(new Set(fromGoals));
  return defaultPackages.find((item) => item.id === packageId)?.services ?? [];
}
