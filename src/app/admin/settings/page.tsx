import { SettingsDesk } from "@/components/admin/admin-forms";
import { readDb } from "@/lib/store";

export default function AdminSettings() {
  const settings = readDb().settings;
  return (
    <div>
      <h1 className="font-display text-4xl uppercase">Settings</h1>
      <p className="mt-3 max-w-xl text-sm text-mist">Package prices override the defaults in configuration. Payment secrets stay in environment variables and are never sent to the browser.</p>
      <div className="mt-8">
        <SettingsDesk bankName={settings.bankName} accountName={settings.accountName} accountNumber={settings.accountNumber} />
      </div>
      <h2 className="mt-10 text-sm uppercase tracking-[0.16em] text-mist">Recent admin activity</h2>
      <ul className="mt-3 space-y-2 text-sm text-mist">
        {readDb().audit.slice(0, 8).map((entry) => (
          <li key={entry.id}>{entry.action} · {entry.target}</li>
        ))}
      </ul>
    </div>
  );
}
