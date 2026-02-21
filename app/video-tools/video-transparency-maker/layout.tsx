import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Video Transparency Maker – Adjust Video Opacity Online",
  description:
    "Adjust video opacity and transparency online for free. Set custom opacity levels and background colors for overlays and picture-in-picture effects. No software needed.",
  alternates: {
    canonical: "https://1000freetools.com/video-tools/video-transparency-maker",
  },
};

export default function VideoTransparencyMakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
