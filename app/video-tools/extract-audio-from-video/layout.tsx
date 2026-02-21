import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Audio Extractor from Video – Extract MP3, AAC, WAV Online",
  description:
    "Extract audio from video files online for free. Save as MP3, AAC, or WAV. No uploads, fast processing, completely free.",
  alternates: {
    canonical: "https://1000freetools.com/video-tools/extract-audio-from-video",
  },
};

export default function ExtractAudioFromVideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
