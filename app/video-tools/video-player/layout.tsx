import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Video Player – MP4, MOV etc with subtitles",
  description:
    "Play any video or audio file directly in your browser — no uploads, no software. Supports MP4, MKV, WebM more with SRT/VTT subtitles.",
  openGraph: {
    title:
      "Free Online Video Player – Play MP4, MKV, WebM & More with Subtitles",
    description:
      "Play any video or audio file directly in your browser — no uploads, no software. Supports MP4, MKV, WebM, MOV, MP3, FLAC and SRT/VTT subtitles. Free & unlimited.",
    type: "website",
    url: "https://1000freetools.com/video-tools/video-player",
    images: [
      {
        url: "https://1000freetools.com/og-video-player.jpg",
        width: 1200,
        height: 630,
        alt: "Free Online Video Player",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free Online Video Player – Play MP4, MKV, WebM & More with Subtitles",
    description:
      "Play any video or audio file directly in your browser — no uploads, no software. Supports MP4, MKV, WebM, MOV, MP3, FLAC and SRT/VTT subtitles. Free & unlimited.",
    images: ["https://1000freetools.com/og-video-player.jpg"],
  },
  alternates: {
    canonical: "https://1000freetools.com/video-tools/video-player",
  },
};

export default function VideoPlayerPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
