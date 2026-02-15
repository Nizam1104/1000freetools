import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Compressor - Compress Videos Online Free | Reduce File Size",
  description:
    "Free online video compressor to reduce file size without losing quality. Compress MP4, WebM videos instantly in your browser. No upload limits, works offline.",
  openGraph: {
    title: "Video Compressor - Compress Videos Online Free | Reduce File Size",
    description:
      "Free online video compressor to reduce file size without losing quality. Compress MP4, WebM videos instantly in your browser. No upload limits, works offline.",
    type: "website",
    url: "https://1000freetools.com/video-tools/video-compressor",
    images: [
      {
        url: "https://1000freetools.com/og-video-compressor.jpg",
        width: 1200,
        height: 630,
        alt: "Video Compressor Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Compressor - Compress Videos Online Free | Reduce File Size",
    description:
      "Free online video compressor to reduce file size without losing quality. Compress MP4, WebM videos instantly in your browser. No upload limits, works offline.",
    images: ["https://1000freetools.com/og-video-compressor.jpg"],
  },
  alternates: {
    canonical: "https://1000freetools.com/video-tools/video-compressor",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
