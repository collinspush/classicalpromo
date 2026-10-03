import { readDb } from "@/lib/store";

export default async function AdminArtists() {
  const artists = (await readDb()).users.filter((user) => user.role === "ARTIST" || user.role === "MANAGER" || user.role === "LABEL");
  return (
    <div>
      <h1 className="font-display text-4xl uppercase">Artists</h1>
      <ul className="mt-6 divide-y divide-white/10 border-y border-white/10 text-sm">
        {artists.map((user) => (
          <li key={user.id} className="py-3">
            <span className="block">{user.name}</span>
            <span className="text-mist">{user.role} · {user.email} · {user.city || "City not set"} · {user.emailVerified ? "Email verified" : "Email unconfirmed"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
