import { HomePage } from "@/components/home/home-page";
import { JsonLd } from "@/components/json-ld";
import { getPackages } from "@/lib/pricing-data";
import { site } from "@/lib/site";

export default async function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.name,
          url: site.url,
          description: site.description,
          potentialAction: {
            "@type": "SearchAction",
            target: `${site.url}/media?q={query}`,
            "query-input": "required name=query",
          },
        }}
      />
      <HomePage packages={(await getPackages())} />
    </>
  );
}
