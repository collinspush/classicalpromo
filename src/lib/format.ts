import { indicativeRates, type Currency } from "@/lib/site";

export function naira(amount: number) {
  return `₦\u00a0${Math.round(amount).toLocaleString("en-NG")}`;
}

export function money(amountNgn: number, currency: Currency = "NGN") {
  const value = amountNgn * indicativeRates[currency];
  return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function sanitize(input: string) {
  return input.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export function safeNext(value: string | null | undefined, fallback = "/dashboard") {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return fallback;
  }
  return value;
}
