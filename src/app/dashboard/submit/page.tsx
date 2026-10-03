import { PitchWizard } from "@/components/pitch/pitch-wizard";
import { getSession } from "@/lib/session";

export default async function SubmitPage() {
  const session = await getSession();
  if (!session) return null;
  return (
    <div>
      <h1 className="font-display text-4xl uppercase">Submit song</h1>
      <p className="mt-3 max-w-xl text-sm text-mist">The same pitch used on the public site, attached to your account.</p>
      <div className="mt-8">
        <PitchWizard authenticated preset={{ artistName: session.name, email: session.email, phone: session.phone, country: session.country || "Nigeria", city: session.city }} />
      </div>
    </div>
  );
}
