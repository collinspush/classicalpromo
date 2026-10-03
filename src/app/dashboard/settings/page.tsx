import { SettingsForm } from "@/components/account/account-forms";
import { getSession } from "@/lib/session";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) return null;
  return (
    <div>
      <h1 className="font-display text-4xl uppercase">Settings</h1>
      <div className="mt-8"><SettingsForm notifyEmail={session.notifyEmail} /></div>
    </div>
  );
}
