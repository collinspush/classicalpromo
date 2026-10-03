import { ProfileForm } from "@/components/account/account-forms";
import { getSession } from "@/lib/session";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) return null;
  const profile = session.profile;
  return (
    <div>
      <h1 className="font-display text-4xl uppercase">Profile</h1>
      {profile?.slug ? <p className="mt-3 text-sm text-gold">Public profile: /artists/{profile.slug}</p> : null}
      <div className="mt-8">
        <ProfileForm
          initial={{
            phone: session.phone,
            country: session.country,
            city: session.city,
            bio: profile?.bio ?? "",
            website: profile?.website ?? "",
            instagram: profile?.instagram ?? "",
            tiktok: profile?.tiktok ?? "",
            youtube: profile?.youtube ?? "",
            spotify: profile?.spotify ?? "",
            appleMusic: profile?.appleMusic ?? "",
            audiomack: profile?.audiomack ?? "",
            genres: profile?.genres.join(", ") ?? "",
            notifyEmail: session.notifyEmail,
          }}
        />
      </div>
    </div>
  );
}
