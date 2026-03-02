import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Video Metadata Viewer Online — No Upload Required",
  description:
    "Instantly view video and audio metadata in your browser — codec, bitrate, resolution, frame rate, and more. Free, private, no file uploads needed.",
  alternates: {
    canonical: "https://1000freetools.com/video-tools/video-metadata-viewer",
  },
};

export default function ShowVideoAudioMetadataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
