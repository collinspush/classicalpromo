import { DemoMark } from "@/components/ui";
import { getSession } from "@/lib/session";
import { readDb } from "@/lib/store";

export default async function SongsPage() {
  const session = await getSession();
  const songs = (await readDb()).songs.filter((song) => session && (song.artistId === session.id || (session.role !== "ARTIST" && song.artistId === "usr_artist")));
  return (
    <div>
      <h1 className="font-display text-4xl uppercase">My songs</h1>
      <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
        {songs.map((song) => (
          <li key={song.id} className="flex items-center justify-between py-4">
            <span>
              <span className="block">{song.title}</span>
              <span className="text-sm text-mist">{song.artistName} · {song.genre || "Genre not set"}</span>
            </span>
            {song.artistId === "usr_artist" ? <DemoMark /> : null}
          </li>
        ))}
        {songs.length === 0 ? <li className="py-6 text-mist">No songs yet. Submit one to begin.</li> : null}
      </ul>
    </div>
  );
}
