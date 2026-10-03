import { DemoMark } from "@/components/ui";
import { readDb } from "@/lib/store";
import type { DirectoryRecord } from "@/lib/types";

export function DirectoryTable({ kind, title }: { kind: DirectoryRecord["kind"]; title: string }) {
  const rows = readDb().directory.filter((row) => row.kind === kind);
  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="font-display text-4xl uppercase">{title}</h1>
        <DemoMark />
      </div>
      <table className="mt-6 w-full text-left text-sm">
        <thead className="text-xs uppercase tracking-[0.14em] text-mist">
          <tr>
            <th className="py-2">Name</th>
            <th>Location</th>
            <th>Genres</th>
            <th>Platform</th>
            <th>Audience</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-white/10">
              <td className="py-3">{row.name}</td>
              <td>{row.location}</td>
              <td>{row.genres.join(", ")}</td>
              <td>{row.platform}</td>
              <td>{row.audience}</td>
              <td>{row.verified ? "Verified" : "Unverified"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 ? <p className="mt-4 text-mist">No records in this desk yet.</p> : null}
    </div>
  );
}
