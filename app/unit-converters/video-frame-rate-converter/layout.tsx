import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Frame Rate Converter",
  description: "Convert video frame rates between 24fps, 30fps, 60fps, 120fps, and more. Calculate total frames for any video duration. Free online frame rate converter for video editors and filmmakers.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/video-frame-rate-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
