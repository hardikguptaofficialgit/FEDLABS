import { ImageResponse } from "next/og";
import { PHOSPHOR_FLASK_FILL_PATH } from "@/lib/phosphor-flask-path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#141414",
          borderRadius: 40,
        }}
      >
        <svg viewBox="0 0 256 256" width="120" height="120">
          <path d={PHOSPHOR_FLASK_FILL_PATH} fill="#FF6200" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
