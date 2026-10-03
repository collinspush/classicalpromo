import type { Metadata } from "next";
import { PartnerForm } from "@/components/forms/partner-form";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Become a partner",
  description: "Apply to join the ClassicalPromo network as a DJ, curator, station, creator, blogger, journalist or podcaster.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  return (
    <>
      <PageHeader eyebrow="Partners" title="Become a ClassicalPromo partner." lede="Applications are reviewed by an admin. Public profiles appear only after verification. Phone numbers and email addresses are not published." />
      <Container className="py-12">
        <PartnerForm />
      </Container>
    </>
  );
}
