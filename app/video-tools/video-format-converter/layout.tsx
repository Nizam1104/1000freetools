import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Video Converter – Convert MP4, WebM, MKV, MOV & More",
  description:
    "Convert video and audio files instantly in your browser — no uploads, no software, completely free. Supports MP4, WebM, MKV, MOV, MP3, WAV and more.",
  authors: [{ name: "1000 Free Tools" }],
  creator: "1000 Free Tools",
  publisher: "1000 Free Tools",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://1000freetools.com/video-tools/video-format-converter",
    siteName: "1000 Free Tools",
    title: "Free Online Video Converter – Convert MP4, WebM, MKV, MOV & More",
    description:
      "Convert video and audio files instantly in your browser — no uploads, no software, completely free. Supports MP4, WebM, MKV, MOV, MP3, WAV and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Video Converter – Convert MP4, WebM, MKV, MOV & More",
    description:
      "Convert video and audio files instantly in your browser — no uploads, no software, completely free. Supports MP4, WebM, MKV, MOV, MP3, WAV and more.",
  },
  alternates: {
    canonical: "https://1000freetools.com/video-tools/video-format-converter",
  },
};

export default function VideoFormatConverterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
