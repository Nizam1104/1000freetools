import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Video Rotator – Rotate Video 90, 180, 270 Degrees",
  description:
    "Rotate video online for free. Fix upside-down or sideways footage by rotating 90°, 180°, or 270°. No watermark, no software install, instant download.",
  alternates: {
    canonical: "https://1000freetools.com/video-tools/rotate-video",
  },
};

export default function RotateVideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
