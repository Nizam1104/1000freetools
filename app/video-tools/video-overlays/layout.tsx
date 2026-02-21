import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Video Watermark & Overlay Tool – Add Logo or Image to Video Online",
  description:
    "Add a watermark or image overlay to your video online for free. Control position, opacity, size, and timing. No watermark on output, no software needed.",
  alternates: {
    canonical: "https://1000freetools.com/video-tools/video-overlays",
  },
};

export default function VideoOverlaysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
