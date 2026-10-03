import type { Metadata } from "next";
import { PitchWizard } from "@/components/pitch/pitch-wizard";
import { Container, PageHeader } from "@/components/ui";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Pitch your song",
  description: "Submit a song to ClassicalPromo and receive a campaign recommendation based on your goals, market and budget.",
  alternates: { canonical: "/pitch" },
};

export default async function PitchPage() {
  const session = await getSession();
  return (
    <>
      <PageHeader eyebrow="Pitch" title="Got a song?" lede="Tell us about it. We'll help you build the right promotion campaign." />
      <Container className="py-12">
        <PitchWizard
          authenticated={Boolean(session)}
          preset={session ? { artistName: session.name, email: session.email, phone: session.phone, country: session.country || "Nigeria", city: session.city } : undefined}
        />
      </Container>
    </>
  );
}
