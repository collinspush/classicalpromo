import { readDb } from "@/lib/store";

export default function AdminSongs() {
  const songs = readDb().songs;
  return (
    <div>
      <h1 className="font-display text-4xl uppercase">Songs</h1>
      <ul className="mt-6 divide-y divide-white/10 border-y border-white/10 text-sm">
        {songs.map((song) => (
          <li key={song.id} className="py-3">{song.title} · {song.artistName} · {song.genre} · {song.songLink}</li>
        ))}
      </ul>
    </div>
  );
}
