import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Video Resizer – Change Video Dimensions & Resolution Online",
  description:
    "Resize video dimensions online for free. Scale to 4K, 1080p, 720p or custom sizes with fill, contain, or cover fit modes. No software needed.",
  alternates: {
    canonical: "https://1000freetools.com/video-tools/resize-video-dimensions",
  },
};

export default function ResizeVideoDimensionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
