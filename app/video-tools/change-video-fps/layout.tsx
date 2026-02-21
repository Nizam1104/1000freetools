import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video FPS Changer – Change Frame Rate Online Free | No Upload",
  description:
    "Change video frame rate instantly in your browser. Convert to 24fps, 30fps, 60fps or any custom FPS. Free, fast, no software install required.",
  alternates: {
    canonical: "https://1000freetools.com/video-tools/change-video-fps",
  },
};

export default function ChangeVideoFpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
