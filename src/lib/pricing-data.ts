import "server-only";
import { defaultPackages, type PackageConfig, type PackageId } from "@/config/pricing";
import { readDb } from "@/lib/store";

export async function getPackages(): Promise<PackageConfig[]> {
  const overrides = (await readDb()).settings.packagePrices;
  return defaultPackages.map((item) => {
    if (!(item.id in overrides)) return item;
    const price = overrides[item.id as PackageId];
    if (price == null) return { ...item, priceNgn: null, priceLabel: "Scoped" };
    return { ...item, priceNgn: price, priceLabel: `₦${price.toLocaleString("en-NG")}` };
  });
}
