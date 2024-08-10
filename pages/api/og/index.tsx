import { ImageResponse } from "@vercel/og";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ilalang.drepram.com";

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(
    text
  )}`;

  const css = await (await fetch(url)).text();

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const res = await fetch(resource[1]);
    if (res.status == 200) {
      return await res.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export default async function handler(req: NextRequest, res: NextResponse) {
  const { searchParams } = req.nextUrl;
  const image = searchParams.get("image");
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  const fontTexts = ["Baca di ilalang.drepram.com", title, description];
  const fontData = await loadGoogleFont(
    "Inter",
    fontTexts.join("").replace(/\s/g, "")
  );

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: "black",
          background: "#f2f2f2",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "60%",
            overflow: "hidden",
          }}
        >
          <img
            src={`${SITE_URL}${image}`}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 72,
            left: 128,
            background: "rgba(0, 0, 0, 0.5)",
            borderRadius: 8,
            color: "white",
            padding: "16px",
          }}
        >
          Baca di ilalang.drepram.com
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            padding: "72px 128px",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                fontSize: "72px",
                fontFamily: "Inter",
              }}
            >
              {title}
            </div>
          </div>
          <div style={{ display: "flex", color: "#6b7280" }}>{description}</div>
        </div>
      </div>
    ),
    {
      width: 2000,
      height: 1000,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
