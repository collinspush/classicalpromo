export const site = {
  name: "ClassicalPromo",
  domain: "classicalpromo.com.ng",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://classicalpromo.com.ng",
  tagline: "One Song. Every Opportunity.",
  support: "Your music deserves to be heard.",
  email: "hello@classicalpromo.com.ng",
  description:
    "ClassicalPromo is a music promotion platform for African and international artists, managers, labels and music professionals. Pitch a song, build a campaign, and track real promotional activity.",
};

export const nav = [
  { href: "/promotion", label: "Promotion" },
  { href: "/network", label: "Network" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/academy", label: "Academy" },
  { href: "/media", label: "Media" },
  { href: "/pricing", label: "Pricing" },
];

export const currencies = ["NGN", "USD", "GBP", "EUR"] as const;
export type Currency = (typeof currencies)[number];

export const indicativeRates: Record<Currency, number> = {
  NGN: 1,
  USD: 0.00067,
  GBP: 0.0005,
  EUR: 0.00058,
};
