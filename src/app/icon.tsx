import { ImageResponse } from "next/og";
import { PHOSPHOR_FLASK_FILL_PATH } from "@/lib/phosphor-flask-path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 7,
        }}
      >
        <svg viewBox="0 0 256 256" width="20" height="20">
          <path d={PHOSPHOR_FLASK_FILL_PATH} fill="#FF6200" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
