import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#12202f",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 8, textTransform: "uppercase", color: "#e2a58f" }}>Italy</div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 12, lineHeight: 1.05 }}>Event Management Services</div>
        <div style={{ fontSize: 34, marginTop: 28, color: "#cfd6df" }}>
          Transfers · Group transport · Hotel blocks · Events
        </div>
      </div>
    ),
    size,
  );
}
