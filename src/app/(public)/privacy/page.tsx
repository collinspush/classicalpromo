import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Privacy", description: "How ClassicalPromo handles account, campaign and partner information.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Privacy" title="What we keep, and what we do not publish." lede="Account details, pitches and partner applications are used to run campaigns. Private contact details are not placed on public profiles." />
      <Container className="max-w-3xl space-y-4 py-12 leading-relaxed text-mist">
        <p>We store the information you submit: name, email, phone, location, release details, campaign goals and files you upload. Passwords are hashed. Payment card numbers are never taken by this application; a connected provider would collect those on its own page.</p>
        <p>Partner phone numbers and email addresses are visible to admins so the desk can work. They are omitted from the public network.</p>
        <p>You can ask for a correction or deletion of a pitch by writing to hello@classicalpromo.com.ng. Campaign records that have already been paid may be retained as invoices.</p>
        <p>Demo accounts on this installation are sample data. Do not put a real unreleased master into a demo workspace.</p>
      </Container>
    </>
  );
}
