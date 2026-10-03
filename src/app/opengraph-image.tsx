import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ background: "#070708", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px", color: "#f4efe6" }}>
        <div style={{ color: "#e3b15a", letterSpacing: "0.22em", fontSize: 22 }}>CLASSICALPROMO</div>
        <div style={{ fontSize: 84, lineHeight: 0.9, fontWeight: 700, letterSpacing: "-0.04em" }}>ONE SONG. EVERY OPPORTUNITY.</div>
        <div style={{ fontSize: 28, color: "#a39e93" }}>classicalpromo.com.ng</div>
      </div>
    ),
    size,
  );
}
