import type { Metadata } from "next";
import { NetworkBrowser } from "@/components/network/network-browser";
import { Button, Container, PageHeader } from "@/components/ui";
import { readDb } from "@/lib/store";

export const metadata: Metadata = {
  title: "The ClassicalPromo network",
  description: "A reviewed network of playlist curators, DJs, radio, creators, bloggers, journalists and music communities. Private contact details stay private.",
  alternates: { canonical: "/network" },
};

export default function NetworkPage() {
  const partners = readDb().partners
    .filter((partner) => partner.status === "VERIFIED")
    .map(({ id, name, categories, country, city, genres, platform, audience, description, status }) => ({
      id, name, categories, country, city, genres, platform, audience, description, status,
    }));
  return (
    <>
      <PageHeader eyebrow="Network" title="The ClassicalPromo network." lede="ClassicalPromo is building a network of playlist curators, DJs, radio stations, presenters, TikTok, Instagram and YouTube creators, bloggers, journalists, podcasters, influencers and music communities. Profiles below are samples until partners are verified from real applications." />
      <Container className="py-12">
        <NetworkBrowser partners={partners} />
        <div className="mt-12">
          <Button href="/partners">Join the network</Button>
        </div>
      </Container>
    </>
  );
}
