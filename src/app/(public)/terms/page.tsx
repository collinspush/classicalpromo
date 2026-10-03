import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Terms", description: "ClassicalPromo campaign terms: activity is delivered, results are not guaranteed.", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Terms" title="The work is the deliverable." lede="By starting a campaign you are buying described promotional activity and a report. You are not buying streams, followers, views, airplay or editorial placement." />
      <Container className="max-w-3xl space-y-4 py-12 leading-relaxed text-mist">
        <p>ClassicalPromo may decline a pitch that asks for artificial streams, fake engagement, or guaranteed platform outcomes. Partners who offer those things can be rejected or suspended.</p>
        <p>Campaign timing, channels and price are confirmed before payment. Custom work does not begin until the scope is accepted. Invoices remain pending until a transfer or a configured provider confirms payment.</p>
        <p>You confirm that you control the recording, artwork and any creator permissions you submit. ClassicalPromo is not responsible for uncleared samples or credits you omit.</p>
        <p>These terms are a working draft for the platform foundation and should be reviewed by counsel before commercial launch.</p>
      </Container>
    </>
  );
}
