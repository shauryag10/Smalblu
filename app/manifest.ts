import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SmalBlu",
    short_name: "SmalBlu",
    description: "AI-powered, cross-layer optimization for enterprise data infrastructure.",
    start_url: "/",
    display: "browser",
    background_color: "#04080f",
    theme_color: "#04080f",
    icons: [{ src: "/icon1.png", sizes: "192x192", type: "image/png" }],
  };
}
