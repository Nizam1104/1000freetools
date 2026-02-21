import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Video Cropper – Crop Video to Any Size Instantly",
  description:
    "Crop videos online for free. Remove unwanted edges, change aspect ratio, or reframe your footage. Works in-browser with no uploads required.",
  alternates: {
    canonical: "https://1000freetools.com/video-tools/crop-video",
  },
};

export default function CropVideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
