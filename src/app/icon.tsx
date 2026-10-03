import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: 32, height: 32, background: "#070708", color: "#e3b15a", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
        C
      </div>
    ),
    size,
  );
}
